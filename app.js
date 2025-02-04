require('dotenv').config();
const express = require('express');
const app = express();


// Routers
const inventoryRouter = require("./routes/inventoryRouter");


// Application
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use("/", inventoryRouter);


// Configuration
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});