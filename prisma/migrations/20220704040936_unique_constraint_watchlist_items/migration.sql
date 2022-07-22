/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `WatchListItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchListItem_userId_movieId_key" ON "WatchListItem"("userId", "movieId");
