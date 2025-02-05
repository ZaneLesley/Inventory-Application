const {body, validationResult} = require("express-validator");
const storeQueries = require("../models/storeQueries");
const entityQueries = require("../models/entityTypeQueries");

exports.storeGet = async (req, res) => {
    const {id} = req.params;
    const store = await storeQueries.getStoreById(id);
    const entity_type = await entityQueries.getAllEntityTypes(store[0]["store_id"]);
    // Should only be one store to pass as id is the PK.
    res.render("storeView", {
        title: "Store View",
        store: store[0],
        entity_type: entity_type,
    });
};
