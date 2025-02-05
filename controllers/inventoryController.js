const {body, validationResult} = require("express-validator");
const {getAllStores} = require("../models/storeQueries");

exports.inventoryGet = async (req, res) => {
    try {
        const stores = await getAllStores();
        res.render("index", {
            title: "Main Page",
            stores: stores,
        });
    } catch (error) {
        console.log(`error fetching the stores: ${error}`);
        res.status(500).send('Internal Server Error');
    }
};