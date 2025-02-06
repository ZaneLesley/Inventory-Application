const {Client} = require('pg');
const pool = require("./pool");
require('dotenv').config({path: '../.env'});

async function truncateAllTables(client) {
    await client.query(`
    TRUNCATE TABLE entity_type, categories
    RESTART IDENTITY CASCADE`);
}

async function populateEntityType(client) {
    const storeRes = await client.query(`SELECT store_id
                                         FROM store`);
    const entitiesLookupRes = await client.query(`SELECT entity_id
                                                  FROM entity_lookup`);

    const stores = storeRes.rows.map(row => row.store_id);
    const entities = entitiesLookupRes.rows.map(row => row.entity_id);

    for (const store_id of stores) {
        for (const entity_id of entities) {
            await client.query(
                'INSERT INTO entity_type (store_id, entity_id) VALUES ($1, $2)',
                [store_id, entity_id]);
        }
    }
}

async function populateCategoriesTable(client, entity_name) {
    // From ../models/entityTypeQueries.js
    const storeRes = await client.query(`SELECT store_id
                                         FROM store`);
    const store_ids = storeRes.rows.map(row => row.store_id);
    for (store_id of store_ids) {
        const {rows} = await client.query(`SELECT entity_type_id
                                           FROM entity_type
                                                    INNER JOIN entity_lookup ON entity_type.entity_id = entity_lookup.entity_id
                                           WHERE entity_name = $1

                                           INTERSECT

                                           SELECT entity_type_id
                                           FROM entity_type
                                                    INNER JOIN store ON entity_type.store_id = store.store_id
                                           WHERE store.store_id = $2;`,
            [entity_name, store_id]);
        const entity_type_id = rows.map(row => row.entity_type_id);

        const categories = ['Fruit', 'Vegetable', 'Produce'];
        const users = ['Bill', 'Bob', 'Joe'];
        if (entity_name === 'Product') {
            for (const category of categories) {
                await client.query(`INSERT INTO categories (entity_type_id, category_name)
                                    VALUES ($1, $2);`,
                    [entity_type_id[0], category]);
            }
        }

        if (entity_name === 'User') {
            for (const user of users) {
                await client.query(`INSERT INTO categories (entity_type_id, category_name)
                                    VALUES ($1, $2);`,
                    [entity_type_id[0], user]);
            }
        }
    }
}

async function populateItemTable(client) {
    return undefined;
}

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();
    console.log("Seeding...");
    await truncateAllTables(client);
    await populateEntityType(client);
    await populateCategoriesTable(client, 'Product');
    await populateCategoriesTable(client, 'User');
    await populateItemTable(client);
    await client.end();
    console.log("Done seeding.");
}

main();
