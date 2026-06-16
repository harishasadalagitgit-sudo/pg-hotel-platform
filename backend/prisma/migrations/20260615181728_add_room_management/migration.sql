-- CreateEnum
CREATE TYPE "public"."RoomType" AS ENUM ('HOTEL', 'MONTHLY_AC', 'MONTHLY_NON_AC', 'WEEKLY_NON_AC');

-- CreateEnum
CREATE TYPE "public"."RoomStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "public"."Room" (
    "id" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "roomType" "public"."RoomType" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "isAc" BOOLEAN NOT NULL,
    "status" "public"."RoomStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomNumber_key" ON "public"."Room"("roomNumber");
