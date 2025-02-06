require('dotenv').config();
const express = require('express');
const app = express();


// Routers
const inventoryRouter = require("./routes/inventoryRouter");
const storeRouter = require("./routes/storeRouter");
const temp = require("./models/entityTypeQueries");


// Application
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use("/", inventoryRouter);
app.use("/store", storeRouter);


// Configuration
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});