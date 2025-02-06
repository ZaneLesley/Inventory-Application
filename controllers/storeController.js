const {body, validationResult} = require("express-validator");
const storeQueries = require("../models/storeQueries");
const entityQueries = require("../models/entityTypeQueries");
const categoryQueries = require("../models/categoriesQueries");

exports.storeGet = async (req, res) => {
    const {id} = req.params;
    const store = await storeQueries.getStoreById(id);
    const entity_type = await entityQueries.getEntityName(store[0]["store_id"]);
    // Should only be one store to pass as id.
    res.render("storeView", {
        title: "Store View",
        store: store[0],
        entity_type: entity_type,
    });
};

exports.storeEntityGet = async (req, res) => {
    const {id, entity} = req.params;
    const store = await storeQueries.getStoreById(id);
    const categories = await categoryQueries.getAllCategories(id, entity);
    res.render("productView", {
        title: "Product View",
        store: store[0],
        categories: categories,
        url: req.baseUrl + req.url,
    });
};

exports.storeItemsGet = async (req, res) => {
    const {id, entity} = req.params;
    const store = await storeQueries.getStoreById(id);
    res.render("itemsView", {
        title: "Item View",
        store: store[0],
        url: req.get('Referer') || '/'
    });
};
