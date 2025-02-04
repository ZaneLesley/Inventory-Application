const {body, validationResult } = require("express-validator");

exports.inventoryGet = (req, res) => {
    res.render("index", {
        title: "Main Page",
    });
}