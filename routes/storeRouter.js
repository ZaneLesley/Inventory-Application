const { Router } = require("express");
const storeController = require("../controllers/storeController");
const storeRouter = Router();

// Routes
storeRouter.get("/:id", storeController.storeGet)

module.exports = storeRouter;