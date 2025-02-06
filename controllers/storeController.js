const {body, validationResult} = require("express-validator");
const storeQueries = require("../models/storeQueries");
const entityQueries = require("../models/entityTypeQueries");
const categoryQueries = require("../models/categoriesQueries");
const itemQueries = require("../models/itemQueries");

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
    const categories = await categoryQueries.getCategories(id, entity, 'category_name');
    res.render("productView", {
        title: "Product View",
        store: store[0],
        categories: categories,
        url: req.baseUrl + req.url,
        url2: req.baseUrl + `/${id}`
    });
};

exports.storeItemsGet = async (req, res) => {
    const {id, entity, item} = req.params;
    const store = await storeQueries.getStoreById(id);
    const result = await itemQueries.getItemIDs(id, entity, item)
    const IDs = result.map(row => row.item_id)
    const items = await itemQueries.getItemColumnByID(IDs, '*');
    res.render("itemsView", {
        title: "Item View",
        store: store[0],
        url: req.get('Referer') || '/',
        items: items,
    });
};
