-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "sessionUrl" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);
