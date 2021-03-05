const path    = require('path');
const express = require('express');
const rootDir = require('../util/path');
const routes  = express.Router();

const products = [];

routes.get("/addProduct", (req, res, next) => {
    // res.sendFile(path.join(rootDir, "views", "addProduct.html")); 
    res.render("addProduct", {pageTitle: "Add Product", path: '/admin/addProduct'});
});

routes.post("/addProduct", (req, res, next) => {
    // products.push({title: req.body.title});
    products.push({title: req.body.title});
    res.redirect("/");
});

exports.products = products;
exports.routes   = routes;

