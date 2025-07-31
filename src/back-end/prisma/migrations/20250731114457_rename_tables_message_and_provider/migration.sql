/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProviderOAuth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "ProviderOAuth" DROP CONSTRAINT "ProviderOAuth_userId_fkey";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "ProviderOAuth";

-- CreateTable
CREATE TABLE "tb_provider_oauth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "SocialProviderType" NOT NULL,
    "providerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "tb_provider_oauth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "tb_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_provider_oauth_provider_providerId_key" ON "tb_provider_oauth"("provider", "providerId");

-- AddForeignKey
ALTER TABLE "tb_provider_oauth" ADD CONSTRAINT "tb_provider_oauth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_message" ADD CONSTRAINT "tb_message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_message" ADD CONSTRAINT "tb_message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
