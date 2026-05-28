/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,appointmentDate]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Appointment_doctorId_idx" ON "Appointment"("doctorId");

-- CreateIndex
CREATE INDEX "Appointment_status_idx" ON "Appointment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_doctorId_appointmentDate_key" ON "Appointment"("doctorId", "appointmentDate");

-- CreateIndex
CREATE INDEX "QueueToken_doctorId_idx" ON "QueueToken"("doctorId");

-- CreateIndex
CREATE INDEX "QueueToken_status_idx" ON "QueueToken"("status");
