/**@type {import('pg').Pool}*/
const pool = require('../db/pool');
const {getEntityTypeID} = require('./entityTypeQueries');


/** Pulls from the categories table based on entity_type_id
 * @param {string} entity_name - Product, Consumer, User, Etc.
 * @param {string} column - What column from the query you want to pull from
 * @returns all category_ids/names depending on what column is set for
 */
async function getCategories(store_id, entity_name, column = 'category_name') {
    const validColumns = ['category_name', 'category_id'];
    if (!validColumns.includes(column)) {
        throw new Error('Invalid column name: ${ column }');
    }

    const entityTypeIDRes = await getEntityTypeID(entity_name);
    const entityTypeIDs = entityTypeIDRes.map(id => id.entity_type_id);
    const {rows} = await pool.query(`SELECT ${column}
                                     FROM categories
                                              INNER JOIN entity_type ON categories.entity_type_id = entity_type.entity_type_id
                                     WHERE categories.entity_type_id = ANY ($1)
                                       AND store_id = $2`,
        [entityTypeIDs, store_id]);
    return rows;
}

module.exports = {
    getCategories,
};