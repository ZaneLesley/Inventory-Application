const {Client} = require('pg');
require('dotenv').config({path: '../.env'});

const products = ['Product', 'User', 'Employee'];

const insertStoresSQL = `
    INSERT INTO store (store_name, store_location)
    VALUES ('Zane-mart', 'Oklahoma City'),
           ('Jane-mart', 'Norman'),
           ('Mark-mart', 'Moore')
    RETURNING store_id`;

async function truncateAllTables(client) {
    await client.query(`
    TRUNCATE TABLE store, item, entity_type, categories
    RESTART IDENTITY CASCADE`);
}

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();

    await truncateAllTables(client);

    console.log("Seeding...");
    const result = await client.query(insertStoresSQL);

    for (const row of result.rows) {
        const {store_id} = row;
        for (const product of products) {

            const insertProductsSQL = `
                INSERT INTO entity_type (product_category_name, store_id)
                VALUES ($1, $2)`;
            await client.query(insertProductsSQL, [product, store_id]);
        }
    }
    await client.end();
    console.log("Done seeding.");
}

main();
