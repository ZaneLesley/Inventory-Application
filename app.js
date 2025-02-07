require('dotenv').config();
const express = require('express');
const app = express();

app.locals.encodeURIComponent = encodeURIComponent;

// Routers
const inventoryRouter = require("./routes/inventoryRouter");
const storeRouter = require("./routes/storeRouter");


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