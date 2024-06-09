/*
  Warnings:

  - You are about to drop the column `productManagerUserId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `projectOwnerUserId` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "productManagerUserId",
DROP COLUMN "projectOwnerUserId",
ADD COLUMN     "productOwnerUserId" INTEGER,
ADD COLUMN     "projectManagerUserId" INTEGER;
