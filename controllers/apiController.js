exports.apiGet = (req, res) => {
    const apiRoutes = [
        {method: "GET", path: req.baseUrl + "/stores", description: "Get all Stores"}
    ];

    res.render('apiIndex', {endpoints: apiRoutes});
};
