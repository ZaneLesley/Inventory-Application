/**@type {import('pg').Pool}*/
const pool = require('../db/pool');

async function getAllStores() {
    const {rows} = await pool.query("SELECT * FROM store ORDER BY store_id");
    return rows;
}

async function getStoreById(id) {
    const {rows} = await pool.query("SELECT * FROM store WHERE store_id=$1",
        [id]);
    return rows;
}

module.exports = {
    getAllStores,
    getStoreById
};