/**@type {import('pg').Pool}*/
const pool = require('../db/pool');

// Get all categories with (store_id, product_group)
async function getAllEntityTypes(store_id){
    const { rows } = await pool.query('SELECT * FROM entity_type WHERE store_id=$1',
        [store_id]);
    return rows;
}

async function getAllProductTypes(store_id, product_category_name) {
    const { rows } = await pool.query('SELECT * FROM entity_type WHERE store_id=$1 AND product_category_name=$2',
        [store_id, product_category_name]);
    return rows;
}

module.exports = {
    getAllEntityTypes,
    getAllProductTypes
}