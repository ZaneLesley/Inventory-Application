const {body, validationResult} = require("express-validator");
const {getStoreById} = require("../models/storeQueries");

exports.storeGet = async (req, res) => {
    const {id} = req.params;
    const store = await getStoreById(id);
    // Should only be one store to pass as id is the PK.
    res.render("storeView", {
        title: "Store View",
        store: store[0]
    });
};
