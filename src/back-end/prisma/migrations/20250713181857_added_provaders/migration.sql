-- CreateEnum
CREATE TYPE "SocialProviderType" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "tb_user" ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ProviderOAuth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "SocialProviderType" NOT NULL,
    "providerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ProviderOAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderOAuth_provider_providerId_key" ON "ProviderOAuth"("provider", "providerId");

-- AddForeignKey
ALTER TABLE "ProviderOAuth" ADD CONSTRAINT "ProviderOAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
