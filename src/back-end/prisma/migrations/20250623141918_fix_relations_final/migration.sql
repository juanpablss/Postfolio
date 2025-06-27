/*
  Warnings:

  - You are about to drop the `Competion` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workDetailsId]` on the table `tb_rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workDetailsId` to the `tb_rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_rating" ADD COLUMN     "workDetailsId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Competion";

-- CreateTable
CREATE TABLE "tb_competition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),

    CONSTRAINT "tb_competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_work_for_competition_details" (
    "id" TEXT NOT NULL,
    "totalReviewers" INTEGER NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL,
    "competitionId" TEXT NOT NULL,

    CONSTRAINT "tb_work_for_competition_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_rating_workDetailsId_key" ON "tb_rating"("workDetailsId");

-- AddForeignKey
ALTER TABLE "tb_rating" ADD CONSTRAINT "tb_rating_workDetailsId_fkey" FOREIGN KEY ("workDetailsId") REFERENCES "tb_work_for_competition_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_work_for_competition_details" ADD CONSTRAINT "tb_work_for_competition_details_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "tb_competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
