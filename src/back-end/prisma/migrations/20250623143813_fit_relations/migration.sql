/*
  Warnings:

  - A unique constraint covering the columns `[competitionId,workId]` on the table `tb_work_for_competition_details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workId` to the `tb_work_for_competition_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_work_for_competition_details" ADD COLUMN     "workId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_work_for_competition_details_competitionId_workId_key" ON "tb_work_for_competition_details"("competitionId", "workId");

-- AddForeignKey
ALTER TABLE "tb_work_for_competition_details" ADD CONSTRAINT "tb_work_for_competition_details_workId_fkey" FOREIGN KEY ("workId") REFERENCES "tb_work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
