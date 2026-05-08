-- CreateTable
CREATE TABLE "VocabReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "reading" TEXT NOT NULL DEFAULT '',
    "meaning" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "tier" INTEGER NOT NULL DEFAULT 0,
    "nextReviewAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VocabReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "VocabReview_userId_word_key" ON "VocabReview"("userId", "word");

-- CreateIndex
CREATE INDEX "VocabReview_userId_nextReviewAt_idx" ON "VocabReview"("userId", "nextReviewAt");
