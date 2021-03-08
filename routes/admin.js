const { schedulingPolicy } = require('cluster');
const express        = require('express');
const routes         = express.Router();
const adminController = require('../controllers/admin');

// /admin/addProducts --> GET
routes.get("/addProduct", adminController.getAddProduct);

// /admin/products --> GET
routes.get("/products", adminController.getProducts);

// POST /admin/addProducts --> POST
routes.post("/addProduct", adminController.postAddProduct);

exports.routes = routes;

