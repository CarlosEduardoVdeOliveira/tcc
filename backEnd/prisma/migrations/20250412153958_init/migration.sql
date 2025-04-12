-- CreateTable
CREATE TABLE "producers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "startDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "beehives" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "producerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "startDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "typeBeehive" TEXT NOT NULL,
    "observations" TEXT,
    CONSTRAINT "beehives_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "producers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "activities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "typeActivity" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,
    "observations" TEXT,
    CONSTRAINT "activities_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "production_honey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "dateCollection" DATETIME NOT NULL,
    "amount" DECIMAL NOT NULL,
    "quality" TEXT NOT NULL,
    "observations" TEXT,
    CONSTRAINT "production_honey_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "temperatures_humidity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "internalTemperature" DECIMAL NOT NULL,
    "externalTemperature" DECIMAL NOT NULL,
    "humidityInternal" DECIMAL NOT NULL,
    "humidityExternal" DECIMAL NOT NULL,
    CONSTRAINT "temperatures_humidity_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "foods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "typeFood" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "observations" TEXT,
    CONSTRAINT "foods_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "diseases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "diseasePrague" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "observations" TEXT,
    CONSTRAINT "diseases_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "producers_email_key" ON "producers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "producers_cpfCnpj_key" ON "producers"("cpfCnpj");
