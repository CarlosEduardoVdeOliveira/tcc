-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_activities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "dateActivity" DATETIME NOT NULL,
    "typeActivity" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,
    "observations" TEXT,
    CONSTRAINT "activities_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_activities" ("beehiveId", "dateActivity", "descriptions", "id", "observations", "typeActivity") SELECT "beehiveId", "dateActivity", "descriptions", "id", "observations", "typeActivity" FROM "activities";
DROP TABLE "activities";
ALTER TABLE "new_activities" RENAME TO "activities";
CREATE TABLE "new_diseases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "dateDiagnosis" DATETIME NOT NULL,
    "diseasePrague" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "observations" TEXT,
    CONSTRAINT "diseases_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_diseases" ("beehiveId", "dateDiagnosis", "diseasePrague", "id", "observations", "treatment") SELECT "beehiveId", "dateDiagnosis", "diseasePrague", "id", "observations", "treatment" FROM "diseases";
DROP TABLE "diseases";
ALTER TABLE "new_diseases" RENAME TO "diseases";
CREATE TABLE "new_foods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "dateFeeding" DATETIME NOT NULL,
    "typeFood" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "observations" TEXT,
    CONSTRAINT "foods_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_foods" ("amount", "beehiveId", "dateFeeding", "id", "observations", "typeFood") SELECT "amount", "beehiveId", "dateFeeding", "id", "observations", "typeFood" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
CREATE TABLE "new_production_honey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "dateCollection" DATETIME NOT NULL,
    "amount" DECIMAL NOT NULL,
    "quality" TEXT NOT NULL,
    "observations" TEXT,
    CONSTRAINT "production_honey_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_production_honey" ("amount", "beehiveId", "dateCollection", "id", "observations", "quality") SELECT "amount", "beehiveId", "dateCollection", "id", "observations", "quality" FROM "production_honey";
DROP TABLE "production_honey";
ALTER TABLE "new_production_honey" RENAME TO "production_honey";
CREATE TABLE "new_temperatures_humidity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beehiveId" INTEGER NOT NULL,
    "dateMeasurement" DATETIME NOT NULL,
    "internalTemperature" DECIMAL NOT NULL,
    "externalTemperature" DECIMAL NOT NULL,
    "humidityInternal" DECIMAL NOT NULL,
    "humidityExternal" DECIMAL NOT NULL,
    CONSTRAINT "temperatures_humidity_beehiveId_fkey" FOREIGN KEY ("beehiveId") REFERENCES "beehives" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_temperatures_humidity" ("beehiveId", "dateMeasurement", "externalTemperature", "humidityExternal", "humidityInternal", "id", "internalTemperature") SELECT "beehiveId", "dateMeasurement", "externalTemperature", "humidityExternal", "humidityInternal", "id", "internalTemperature" FROM "temperatures_humidity";
DROP TABLE "temperatures_humidity";
ALTER TABLE "new_temperatures_humidity" RENAME TO "temperatures_humidity";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
