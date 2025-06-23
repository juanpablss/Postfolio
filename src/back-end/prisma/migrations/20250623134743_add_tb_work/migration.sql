-- CreateTable
CREATE TABLE "tb_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_portfolio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pageLink" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "tb_portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_work" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "githubLink" TEXT,

    CONSTRAINT "tb_work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_rating" (
    "id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "tb_rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_rating_userId_portfolioId_key" ON "tb_rating"("userId", "portfolioId");

-- AddForeignKey
ALTER TABLE "tb_portfolio" ADD CONSTRAINT "tb_portfolio_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_rating" ADD CONSTRAINT "tb_rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_rating" ADD CONSTRAINT "tb_rating_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "tb_portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
