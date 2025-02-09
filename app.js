require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.locals.encodeURIComponent = encodeURIComponent;
app.use(cors());

// Logs for all routes to print requests to console.
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

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