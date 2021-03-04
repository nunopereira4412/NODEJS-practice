const path    = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router  = express.Router();

router.get("/addProduct", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "addProduct.html")); 
});

router.post("/addProduct", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;