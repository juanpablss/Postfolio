/*
  Warnings:

  - You are about to drop the `tb_work_for_competition_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_rating" DROP CONSTRAINT "tb_rating_workDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "tb_work_for_competition_details" DROP CONSTRAINT "tb_work_for_competition_details_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "tb_work_for_competition_details" DROP CONSTRAINT "tb_work_for_competition_details_workId_fkey";

-- DropTable
DROP TABLE "tb_work_for_competition_details";

-- CreateTable
CREATE TABLE "tb_work_comp_details" (
    "id" TEXT NOT NULL,
    "totalReviewers" INTEGER NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL,
    "competitionId" TEXT NOT NULL,
    "workId" TEXT NOT NULL,

    CONSTRAINT "tb_work_comp_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_work_comp_details_competitionId_workId_key" ON "tb_work_comp_details"("competitionId", "workId");

-- AddForeignKey
ALTER TABLE "tb_rating" ADD CONSTRAINT "tb_rating_workDetailsId_fkey" FOREIGN KEY ("workDetailsId") REFERENCES "tb_work_comp_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_work_comp_details" ADD CONSTRAINT "tb_work_comp_details_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "tb_competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_work_comp_details" ADD CONSTRAINT "tb_work_comp_details_workId_fkey" FOREIGN KEY ("workId") REFERENCES "tb_work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
