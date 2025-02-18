const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function createStore(name, location) {
    return prisma.store.create({
        data: {name, location}
    });
}

async function createProduct(storeId, name) {
    return prisma.product.create({
        data: {name, storeId}
    });
}

async function createItem(productId, name, price) {
    return prisma.item.create({
        data: {name, price, productId}
    });
}

async function resetAutoIncrement() {
    await prisma.$executeRaw`TRUNCATE TABLE "Product", "Store" RESTART IDENTITY CASCADE;`;
}

async function seedDatabase() {
    const store = await createStore('Zane-mart', 'Mustang');

    const fruitProduct = await createProduct(store.id, 'Fruit');
    const vegetableProduct = await createProduct(store.id, 'Vegetable');

    await createItem(fruitProduct.id, 'Strawberry', 4.39);
    await createItem(vegetableProduct.id, 'Celery', 3.28);
}


async function main() {
    await resetAutoIncrement();
    await prisma.product.deleteMany();
    await prisma.store.deleteMany();
    await seedDatabase();
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
});
