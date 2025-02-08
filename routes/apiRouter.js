const {Router} = require("express");
const storeController = require("../controllers/storesController");
const apiController = require("../controllers/apiController");
const apiRouter = Router();

apiRouter.get("/stores/:storeId/products/:productId", storeController.getStoreProduct)
apiRouter.get("/stores/:storeId/products", storeController.getStoreProducts)
apiRouter.get("/stores/:storeId", storeController.getStore);
apiRouter.get("/stores", storeController.getAllStores)
apiRouter.get("/", apiController.apiGet)

module.exports = apiRouter;