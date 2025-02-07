const {Router} = require("express");
const storeController = require("../controllers/storeController");
const storeRouter = Router();

storeRouter.post("/update/:id/:entity", storeController.storeCategoryPost);
storeRouter.get("/:id/:entity/:item", storeController.storeItemsGet);
storeRouter.get("/:id/:entity/", storeController.storeEntityGet);
storeRouter.get("/:id", storeController.storeGet);

module.exports = storeRouter;