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
    const categories_names = await categoryQueries.getCategories(id, entity, 'category_name');
    const categories_ids = await categoryQueries.getCategories(id, entity, 'category_id');

    // Merge ids and names together
    const categories = categories_ids.map((id, index) => ({
        ...id,
        category_name: categories_names[index].category_name,
    }));
    console.log(categories);
    res.render("productView", {
        title: "Product View",
        store: store[0],
        categories: categories,
        previous_url: req.baseUrl + `/${encodeURIComponent(id)}`,
        next_url: req.baseUrl + `/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`,
        updateUrl: req.baseUrl + `/update/category/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`,
        updateUrl2: req.baseUrl + `/update/item/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`
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
        url: req.baseUrl + `/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`,
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
                previous_url: req.baseUrl + `/${encodeURIComponent(id)}`,
                next_url: req.baseUrl + `/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`,
                updateUrl: req.baseUrl + `/update/category/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`,
                updateUrl2: req.baseUrl + `/update/item/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`,
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
                previous_url: req.baseUrl + `/${encodeURIComponent(id)}`,
                next_url: req.baseUrl + `/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`,
                updateUrl: req.baseUrl + `/update/category/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`,
                updateUrl2: req.baseUrl + `/update/item/${encodeURIComponent(id)}/${encodeURIComponent(entity)}`,
                errors: [{msg: error.message}],
            });
        }
    }
];

validateItem = [body("item_name").trim().isAlpha('en-US').withMessage("Must contain alphabetic characters")
    .isLength({min: 2, max: 50}).withMessage("Must be between 2 and 50 characters"),
    body("item_price").trim().isDecimal({decimal_digits: '1,2'}).withMessage("Must be a decimal with 1 or 2 digits").toFloat(),
    body("category_id").trim().isNumeric().toInt()];

exports.storeItemPost = (req, res) => {
    console.log("here")
    res.send("yippee")
}

