/**@type {import('pg').Pool}*/
const pool = require('../db/pool');

// Gets Categories from store_id and entity_name
async function getAllCategories(store_id, entity_name) {
    const {rows} = await pool.query(`SELECT * FROM categories WHERE store_id=$1 AND entity_name=$2`,
        [store_id, entity_name]);
    return rows
}

module.exports = {
    getAllCategories,
}