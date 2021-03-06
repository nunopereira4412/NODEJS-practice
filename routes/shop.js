const express            = require('express');
const routes             = express.Router();
const productsController = require('../controllers/products');

routes.get('/', productsController.getProducts);

exports.routes = routes; 
