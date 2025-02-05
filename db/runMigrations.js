const fs = require('fs');
const path = require('path');
const {Client} = require('pg');
require('dotenv').config({path: '../.env'});

const MIGRATIONS_PATH = path.join(__dirname, 'migrations');

// Returns the files in the migration folder sorted, 001_ -> 002_ -> etc.
function getMigrationFiles() {
    return fs.readdirSync(MIGRATIONS_PATH)
        .filter(file => file.endsWith('.sql'))
        .sort();
}

async function runMigrations() {
    console.log("Starting migrations");

    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();

    try {
        const migrationsFiles = getMigrationFiles();
        for (const file of migrationsFiles) {
            const filePath = path.join(MIGRATIONS_PATH, file);

            const sql = fs.readFileSync(filePath, 'utf8');
            console.log(`running  migrations: ${filePath}`);

            await client.query(sql);
        }

        console.log("Finished migrations");
    } catch (error) {
        console.log(`Error running migrations: ${error}`);
    } finally {
        await client.end();
    }
}

runMigrations();