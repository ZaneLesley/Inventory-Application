/**@type {import('pg').Pool}*/
const pool = require('../db/pool');

async function getEntityName(store_id) {
    const {rows} = await pool.query(`SELECT entity_name
                                     FROM entity_lookup
                                              INNER JOIN entity_type ON entity_lookup.entity_id = entity_type.entity_id
                                     WHERE store_id = $1`,
        [store_id])
    return rows;
}
async function getEntityTypeID(entity_name) {
    const {rows} = await pool.query(`SELECT entity_type_id
                                     FROM entity_type
                                              INNER JOIN entity_lookup ON entity_type.entity_id = entity_lookup.entity_id
                                     WHERE entity_name = $1`,
        [entity_name])
    return rows;
}

module.exports = {
    getEntityName,
    getEntityTypeID,
};