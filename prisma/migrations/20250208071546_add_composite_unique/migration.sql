/*
  Warnings:

  - A unique constraint covering the columns `[productId,name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeId,name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Item_name_key";

-- DropIndex
DROP INDEX "Product_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Item_productId_name_key" ON "Item"("productId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_storeId_name_key" ON "Product"("storeId", "name");
