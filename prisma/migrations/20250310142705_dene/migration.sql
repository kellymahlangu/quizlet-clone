/*
  Warnings:

  - You are about to drop the column `fileId` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_fileId_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "fileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "File";
