const {body, validationResult} = require("express-validator");
const storeQueries = require("../models/storeQueries");
const entityQueries = require("../models/entityTypeQueries");
const categoryQueries = require("../models/categoriesQueries");
const itemQueries = require("../models/itemQueries");
const req = require("express/lib/request");


// GETS

// "/"
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

// "/store/:id
exports.storeEntityGet = async (req, res) => {
    const {id, entity} = req.params;
    const store = await storeQueries.getStoreById(id);
    const categories = await categoryQueries.getCategories(id, entity, 'category_name');
    res.render("productView", {
        title: "Product View",
        store: store[0],
        categories: categories,
        previous_url: req.baseUrl + `/${id}`,
        next_url: req.baseUrl + `/${id}/${entity}`,
        updateUrl: req.baseUrl + `/update/${id}/${entity}`
    });
};

exports.storeItemsGet = async (req, res) => {
    const {id, entity, item} = req.params;
    const store = await storeQueries.getStoreById(id);
    const result = await itemQueries.getItemIDs(id, entity, item);
    const IDs = result.map(row => row.item_id);
    const items = await itemQueries.getItemColumnByID(IDs, '*');
    res.render("itemsView", {
        title: "Item View",
        store: store[0],
        url: req.baseUrl + `/${id}/${entity}`,
        items: items,
    });
};

// POST

const validateCategory = [body("category_name").trim().isAlpha('en-US', {ignore: '\s'}).withMessage("Must contain alphabetic characters")
    .isLength({min: 2, max: 50}).withMessage("Must be between 2 and 50 characters")];
/**
 * @type {import("express").RequestHandler[]}
 */
exports.storeCategoryPost = [
    validateCategory,
    async (req, res) => {
        const errors = validationResult(req);
        const {id, entity} = req.params;
        const {category_name} = req.body;

        if (!errors.isEmpty()) {
            const store = await storeQueries.getStoreById(id);
            const categories = await categoryQueries.getCategories(id, entity, 'category_name');
            return res.status(400).render("productView", {
                title: "Product View",
                store: store[0],
                categories: categories,
                previous_url: req.baseUrl + `/${id}`,
                next_url: req.baseUrl + `/${id}/${entity}`,
                updateUrl: req.baseUrl + `/update/${id}/${entity}`,
                errors: errors.array(),
            });
        }
        try {
            const result = await entityQueries.getEntityTypeID(entity, id);
            const entity_type_id = result.map(row => row.entity_type_id);
            await categoryQueries.insertCategory(entity_type_id, category_name);
            res.redirect(req.baseUrl + `/${id}/${entity}`);
        } catch (error) {
            const store = await storeQueries.getStoreById(id);
            const categories = await categoryQueries.getCategories(id, entity, 'category_name');
            return res.status(400).render("productView", {
                title: "Product View",
                store: store[0],
                categories: categories,
                previous_url: req.baseUrl + `/${id}`,
                next_url: req.baseUrl + `/${id}/${entity}`,
                updateUrl: req.baseUrl + `/update/${id}/${entity}`,
                errors: [{msg: error.message}],
            });
        }
    }
];

