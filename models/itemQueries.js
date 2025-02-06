/**@type {import('pg').Pool}*/
const pool = require('../db/pool');
const {getCategories} = require('./categoriesQueries');


async function getItemIDs(store_id, entity_name, category_name = null) {
    const result = await getCategories(store_id, entity_name, 'category_id');
    const category_ids = result.map(row => row.category_id);

    let query = `
        SELECT item_id
        FROM item
                 INNER JOIN categories ON item.category_id = categories.category_id
        WHERE item.category_id = ANY ($1)
    `;

    const queryParams = [category_ids]

    // Optional filter on category_name
    if (category_name) {
        query += 'AND categories.category_name = $2'
        queryParams.push(category_name)
    }
    const {rows} = await pool.query(query, queryParams);
    return rows
}

async function getItemColumnByID(item_id, column = '*') {
    const validColumn = ['item_id', 'category_id', 'item_name', 'item_price', '*'];
    if (!validColumn.includes(column)) {
        throw new Error(`${column} is not a valid column`);
    }
    const {rows} = await pool.query(`SELECT ${column}
                                     FROM item
                                     WHERE item_id = ANY ($1)`,
        [item_id]);
    return rows;
}

module.exports = {
    getItemIDs,
    getItemColumnByID,
};