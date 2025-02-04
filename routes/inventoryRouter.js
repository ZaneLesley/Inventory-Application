const { Router} = require('express');
const inventoryController = require("../controllers/inventoryController");
const inventoryRouter = Router();

// Routes
inventoryRouter.get("/", inventoryController.inventoryGet)

module.exports = inventoryRouter;