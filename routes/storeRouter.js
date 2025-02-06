const {Router} = require("express");
const storeController = require("../controllers/storeController");
const storeRouter = Router();

// Routes
storeRouter.get("/:id", storeController.storeGet);
storeRouter.get("/:id/:entity/", storeController.storeEntityGet);
storeRouter.get("/:id/:entity/:item", storeController.storeItemsGet);

module.exports = storeRouter;