import { randomUUID } from "node:crypto";
import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, appointmentsTable, diagnosticCasesTable } from "@workspace/db";
import {
  CreateAppointmentRequestBody,
  CreateAppointmentRequestParams,
  CreateAppointmentRequestResponse,
  CreateCaseBody,
  CreateCaseResponse,
  GetCaseParams,
  GetCaseResponse,
  ListServicesResponse,
} from "@workspace/api-zod";
import { createPreliminaryAssessment } from "../lib/preliminaryAssessment";

const router: IRouter = Router();

const services = [
  {
    slug: "ai-auto-check",
    name: "AI AUTO CHECK",
    price: "CHF 19",
    description: "Eine strukturierte Voranalyse Ihrer Angaben.",
    features: ["Schnelle erste Einordnung", "Foto- und Fehlercode-Analyse", "Keine endgültige Fahrzeugdiagnose"],
  },
  {
    slug: "autodoktor-diagnose",
    name: "AUTODOKTOR DIAGNOSE",
    price: "CHF 79",
    description: "OBD, Fehlerspeicher und Basisdiagnose mit Mechanikerprüfung.",
    features: ["OBD-Auslesung", "Fehlerspeicher", "Mechanikerprüfung", "AI-supported report"],
  },
  {
    slug: "fahrzeug-check",
    name: "FAHRZEUG CHECK",
    price: "CHF 99",
    description: "20–30-Punkte-Fahrzeugprüfung für mehr Sicherheit.",
    features: ["Basis-Check", "Zustandsbericht", "Klare nächste Schritte"],
  },
  {
    slug: "mfk-ready",
    name: "MFK READY",
    price: "CHF 149",
    description: "Vorbereitung und Prüfung vor der MFK.",
    features: ["Vorabkontrolle", "MFK-relevante Punkte", "Vorbereitungsempfehlung"],
  },
  {
    slug: "hol-bringservice",
    name: "HOL- & BRINGSERVICE",
    price: "ab CHF 39",
    description: "Wir holen Ihr Fahrzeug nach Vereinbarung ab.",
    features: ["Einfach anfragen", "Rückgabe nach der Arbeit", "Preis nach Distanz"],
  },
  {
    slug: "second-opinion",
    name: "SECOND OPINION",
    price: "CHF 39–59",
    description: "Eine zweite Einschätzung zu einer Reparaturofferte.",
    features: ["Offerte prüfen", "Fragen verständlich klären", "Unabhängige Einordnung"],
  },
];

function mapCase(
  row: typeof diagnosticCasesTable.$inferSelect,
  appointment: typeof appointmentsTable.$inferSelect | undefined,
) {
  return {
    id: row.id,
    caseNumber: row.caseNumber,
    status: row.status as "NEW" | "PRELIMINARY_REVIEW" | "DIAGNOSIS_REQUESTED",
    createdAt: row.createdAt,
    vehicle: row.vehicle,
    category: row.category,
    symptoms: row.symptoms,
    faultCodes: row.faultCodes,
    media: row.media,
    drivingStatus: row.drivingStatus as "yes" | "unsure" | "no",
    contact: row.contact,
    assessment: row.assessment,
    appointment: appointment
      ? {
          id: appointment.id,
          caseId: appointment.caseId,
          service: appointment.service,
          preferredDate: appointment.preferredDate,
          preferredTime: appointment.preferredTime,
          address: appointment.address,
          note: appointment.note,
          status: appointment.status as "REQUESTED" | "CONFIRMED",
        }
      : null,
  };
}

router.get("/services", (_req, res): void => {
  res.json(ListServicesResponse.parse(services));
});

router.post("/cases", async (req, res): Promise<void> => {
  const parsed = CreateCaseBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.flatten() }, "Invalid case submission");
    res.status(400).json({ error: "Bitte füllen Sie die Pflichtfelder aus." });
    return;
  }

  const input = parsed.data;
  const assessment = createPreliminaryAssessment({
    category: input.category,
    symptoms: input.symptoms,
    faultCodes: input.faultCodes,
    drivingStatus: input.drivingStatus,
  });
  const id = randomUUID();
  const caseNumber = `AD-${new Date().getFullYear()}-${id.slice(0, 6).toUpperCase()}`;

  const [created] = await db
    .insert(diagnosticCasesTable)
    .values({
      id,
      caseNumber,
      status: "PRELIMINARY_REVIEW",
      vehicle: input.vehicle,
      category: input.category,
      symptoms: input.symptoms,
      faultCodes: input.faultCodes,
      media: input.media,
      drivingStatus: input.drivingStatus,
      contact: input.contact,
      assessment,
    })
    .returning();

  res.status(201).json(CreateCaseResponse.parse(mapCase(created, undefined)));
});

router.get("/cases/:caseId", async (req, res): Promise<void> => {
  const params = GetCaseParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Ungültige Fallnummer." });
    return;
  }

  const [found] = await db
    .select()
    .from(diagnosticCasesTable)
    .where(eq(diagnosticCasesTable.id, params.data.caseId))
    .limit(1);
  if (!found) {
    res.status(404).json({ error: "Fall nicht gefunden." });
    return;
  }

  const [appointment] = await db
    .select()
    .from(appointmentsTable)
    .where(eq(appointmentsTable.caseId, found.id))
    .orderBy(desc(appointmentsTable.createdAt))
    .limit(1);

  res.json(GetCaseResponse.parse(mapCase(found, appointment)));
});

router.post("/cases/:caseId/appointments", async (req, res): Promise<void> => {
  const params = CreateAppointmentRequestParams.safeParse(req.params);
  const parsed = CreateAppointmentRequestBody.safeParse(req.body);
  if (!params.success || !parsed.success) {
    res.status(400).json({ error: "Bitte prüfen Sie Ihre Terminangaben." });
    return;
  }

  const [found] = await db
    .select({ id: diagnosticCasesTable.id })
    .from(diagnosticCasesTable)
    .where(eq(diagnosticCasesTable.id, params.data.caseId))
    .limit(1);
  if (!found) {
    res.status(404).json({ error: "Fall nicht gefunden." });
    return;
  }

  const id = randomUUID();
  const [appointment] = await db
    .insert(appointmentsTable)
    .values({
      id,
      caseId: params.data.caseId,
      service: "AUTODOKTOR DIAGNOSE",
      preferredDate: parsed.data.preferredDate.toISOString().slice(0, 10),
      preferredTime: parsed.data.preferredTime,
      address: parsed.data.address,
      note: parsed.data.note ?? "",
      status: "REQUESTED",
    })
    .returning();

  await db
    .update(diagnosticCasesTable)
    .set({ status: "DIAGNOSIS_REQUESTED" })
    .where(and(eq(diagnosticCasesTable.id, params.data.caseId)));

  res.status(201).json(
    CreateAppointmentRequestResponse.parse({
      id: appointment.id,
      caseId: appointment.caseId,
      service: appointment.service,
      preferredDate: appointment.preferredDate,
      preferredTime: appointment.preferredTime,
      address: appointment.address,
      note: appointment.note,
      status: appointment.status,
    }),
  );
});

export default router;