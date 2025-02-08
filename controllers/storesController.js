const {body, validationResult} = require("express-validator");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


// GETS

// GET /stores
exports.getAllStores = async (req, res) => {
    try {
        const all_stores = await prisma.store.findMany();
        res.json(all_stores);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
};


// /stores/:storeId
exports.getStore = async (req, res) => {
    try {
        const {storeId} = req.params;
        const store = await prisma.store.findUnique({
            where: {id: parseInt(storeId)},
        });

        res.json(store);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// stores/:storeId/Product
exports.getStoreProducts = async (req, res) => {
    const {storeId} = req.params;
    const product = await prisma.product.findMany({
        where: {storeId: parseInt(storeId)},
    });
    res.json(product);
};

// stores/:storeId/Product/:productId
// stores/:storeId/product/:productId
exports.getStoreProduct = async (req, res) => {
    try {
        const {storeId, productId} = req.params;

        const product = await prisma.product.findFirst({
            where: {
                id: parseInt(productId),
                storeId: parseInt(storeId)
            }
        });

        if (!product) {
            return res.status(404).json({error: 'Product not found for this store.'});
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({error: error.message});
    }
};

