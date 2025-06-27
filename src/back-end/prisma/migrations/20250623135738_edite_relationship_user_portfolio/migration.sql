/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `tb_portfolio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `portfolioId` to the `tb_work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_work" ADD COLUMN     "portfolioId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_portfolio_authorId_key" ON "tb_portfolio"("authorId");

-- AddForeignKey
ALTER TABLE "tb_work" ADD CONSTRAINT "tb_work_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "tb_portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
