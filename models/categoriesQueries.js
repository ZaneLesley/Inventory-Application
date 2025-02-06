/**@type {import('pg').Pool}*/
const pool = require('../db/pool');
const {getEntityTypeID} = require('./entityTypeQueries');


// Gets categories from a store based on which entity_type you want to search on (User, Product, Consumer)
async function getAllCategories(store_id, entity_name) {
    const entityTypeIDRes = await getEntityTypeID(entity_name);
    const entityTypeIDs = entityTypeIDRes.map(id => id.entity_type_id);
    const {rows} = await pool.query(`SELECT category_name
                                     FROM categories
                                              INNER JOIN entity_type ON categories.entity_type_id = entity_type.entity_type_id
                                     WHERE categories.entity_type_id = ANY ($1)
                                       AND store_id = $2`,
        [entityTypeIDs, store_id]);
    return rows;
}

module.exports = {
    getAllCategories,
};