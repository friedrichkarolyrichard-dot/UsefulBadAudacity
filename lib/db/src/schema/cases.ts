import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const diagnosticCasesTable = pgTable("diagnostic_cases", {
  id: text("id").primaryKey(),
  caseNumber: text("case_number").notNull().unique(),
  status: text("status").notNull().default("NEW"),
  vehicle: jsonb("vehicle").notNull(),
  category: text("category").notNull(),
  symptoms: text("symptoms").notNull(),
  faultCodes: text("fault_codes").array().notNull().default([]),
  media: jsonb("media").notNull().default([]),
  drivingStatus: text("driving_status").notNull(),
  contact: jsonb("contact").notNull(),
  assessment: jsonb("assessment").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertDiagnosticCaseSchema = createInsertSchema(diagnosticCasesTable).omit({
  createdAt: true,
});
export type InsertDiagnosticCase = z.infer<typeof insertDiagnosticCaseSchema>;
export type DiagnosticCase = typeof diagnosticCasesTable.$inferSelect;