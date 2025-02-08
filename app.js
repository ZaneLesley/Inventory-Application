require('dotenv').config();
const express = require('express');
const app = express();

app.locals.encodeURIComponent = encodeURIComponent;

// Routers
const apiRouter = require("./routes/apiRouter");

// Redirect root ("/") to "/api"
app.get("/", (req, res) => {
    res.redirect("/api");
});


// Application
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use("/api", apiRouter);


// Configuration
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});