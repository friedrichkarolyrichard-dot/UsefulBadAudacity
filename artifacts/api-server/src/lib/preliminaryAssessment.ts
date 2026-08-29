type CaseAssessmentInput = {
  category: string;
  symptoms: string;
  faultCodes: string[];
  drivingStatus: "yes" | "unsure" | "no";
};

export type PreliminaryAssessment = {
  urgency: "low" | "medium" | "high" | "critical";
  possibleCauses: string[];
  recommendedSteps: string[];
  customerExplanation: string;
  disclaimer: string;
};

const seriousCategories = new Set(["Bremsen", "Fahrwerk", "Startproblem"]);

export function createPreliminaryAssessment(
  input: CaseAssessmentInput,
): PreliminaryAssessment {
  const category = input.category.toLowerCase();
  const symptoms = input.symptoms.toLowerCase();
  const hasSafetySignal =
    seriousCategories.has(input.category) ||
    category.includes("brems") ||
    category.includes("fahrwerk") ||
    symptoms.includes("rauch") ||
    symptoms.includes("brems") ||
    symptoms.includes("ölverlust");

  let urgency: PreliminaryAssessment["urgency"] = "low";
  if (input.drivingStatus === "no" || (hasSafetySignal && input.drivingStatus !== "yes")) {
    urgency = input.drivingStatus === "no" ? "critical" : "high";
  } else if (input.faultCodes.length > 0 || hasSafetySignal) {
    urgency = "medium";
  }

  const possibleCauses =
    input.faultCodes.includes("P2002")
      ? [
          "Mögliche Einschränkung des Dieselpartikelfilters (DPF)",
          "Sensorik oder Abgasgegendruck könnten die Meldung auslösen",
        ]
      : seriousCategories.has(input.category)
        ? [
            `Mögliche Ursache im Bereich ${input.category.toLowerCase()}`,
            "Verschleiss oder ein Bauteildefekt kann nicht ausgeschlossen werden",
          ]
        : [
            `Mögliche Ursache im Bereich ${input.category.toLowerCase()}`,
            "Weitere Diagnose erforderlich, um den Fehler einzugrenzen",
          ];

  const recommendedSteps =
    urgency === "critical" || urgency === "high"
      ? [
          "Fahrzeug möglichst nicht weiterfahren",
          "Bitte professionelle Prüfung durch AUTO DOKTOR anfragen",
          "Fehlerspeicher und betroffene Bauteile gezielt prüfen lassen",
        ]
      : [
          "Fehlerspeicher und betroffene Systeme professionell auslesen lassen",
          "Die beschriebenen Symptome bei der Diagnose mitgeben",
          "Bei Verschlechterung das Fahrzeug nicht weiterfahren",
        ];

  return {
    urgency,
    possibleCauses,
    recommendedSteps,
    customerExplanation:
      "Diese erste Einschätzung ordnet Ihre Angaben ein und ersetzt keine technische Diagnose. Ein Mechaniker prüft die Ursache vor einer verbindlichen Empfehlung.",
    disclaimer:
      "Keine endgültige Fahrzeugdiagnose. Die technische Beurteilung erfolgt durch einen professionellen Mechaniker.",
  };
}