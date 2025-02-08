const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function seedStore() {
    await prisma.store.create({
        data: {
            name: 'Zane-Mart',
            location: 'Mustang',
            products: {
                create: [
                    {name: 'Fruit'},
                    {name: 'Vegetable'}
                ]
            }
        }
    });

    await prisma.store.create({
        data: {
            name: 'Myra-Mart',
            location: 'Oklahoma City',
            products: {
                create: {name: 'Fruit'}
            }
        }
    });
}

async function resetAutoIncrement() {
    await prisma.$executeRaw`TRUNCATE TABLE "Product", "Store" RESTART IDENTITY CASCADE;`;
}


async function main() {
    await resetAutoIncrement();
    await prisma.product.deleteMany();
    await prisma.store.deleteMany();
    await seedStore();
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
});
