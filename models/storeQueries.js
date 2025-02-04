const pool = require('../db/pool');

async function getAllStores() {
    const {rows} = await pool.query("SELECT * FROM store ORDER BY store_id");
    return rows;
}

module.exports = {
    getAllStores,
};