const { schedulingPolicy } = require('cluster');
const express        = require('express');
const routes         = express.Router();
const adminController = require('../controllers/admin');

// // /admin/addProducts --> GET
// routes.get("/addProduct", adminController.getAddProduct);

// // /admin/products --> GET
// routes.get("/products", adminController.getProducts);

// // // POST /admin/addProducts --> POST
// // routes.post("/addProduct", adminController.postAddProduct);

// // /admin/editProducts --> GET
// routes.get("/editProduct/:productId", adminController.getEditProduct);

// // /admin/editProducts --> POST
// routes.post("/editProduct", adminController.postEditProduct);

// routes.post("/deleteProduct", adminController.postDeleteProduct);

exports.routes = routes;

