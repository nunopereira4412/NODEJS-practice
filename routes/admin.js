const express            = require('express');
const routes             = express.Router();
const productsController = require('../controllers/products');

routes.get("/addProduct", productsController.getAddProduct);
routes.post("/addProduct", productsController.postAddProduct);

exports.routes = routes;

