/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `tb_rating` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_rating" DROP CONSTRAINT "tb_rating_portfolioId_fkey";

-- DropIndex
DROP INDEX "tb_rating_userId_portfolioId_key";

-- AlterTable
ALTER TABLE "tb_rating" DROP COLUMN "portfolioId";
