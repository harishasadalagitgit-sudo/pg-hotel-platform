-- CreateEnum
CREATE TYPE "public"."ResidentStatus" AS ENUM ('PENDING', 'ACTIVE', 'CHECKED_OUT');

-- CreateTable
CREATE TABLE "public"."Resident" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "checkoutDate" TIMESTAMP(3),
    "rentAmount" DECIMAL(10,2) NOT NULL,
    "securityDeposit" DECIMAL(10,2),
    "emergencyContactName" TEXT,
    "emergencyContactPhone" TEXT,
    "status" "public"."ResidentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resident_userId_key" ON "public"."Resident"("userId");

-- CreateIndex
CREATE INDEX "Resident_roomId_idx" ON "public"."Resident"("roomId");

-- CreateIndex
CREATE INDEX "Resident_status_idx" ON "public"."Resident"("status");

-- AddForeignKey
ALTER TABLE "public"."Resident" ADD CONSTRAINT "Resident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resident" ADD CONSTRAINT "Resident_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
