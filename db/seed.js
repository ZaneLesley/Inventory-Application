const {Client} = require('pg');
require('dotenv').config({path: '../.env'});

const SQL = `
    INSERT INTO store (store_name, store_location)
    VALUES ('Zane-mart', 'Oklahoma City'),
           ('Jane-mart', 'Norman'),
           ('Mark-mart', 'Moore')`;

async function main() {
    console.log("Seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Done seeding.");
}

main();
