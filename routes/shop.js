const express            = require('express');
const routes             = express.Router();
const shopController = require('../controllers/shop');

// routes.get('/', shopController.getIndex);
routes.get('/products', shopController.getProducts);
routes.get('/products/:productId', shopController.getProductDetails);
// routes.get('/cart', shopController.getCart);
// routes.post('/addToCart', shopController.postAddToCart);
// routes.post('/removeFromCart', shopController.removeFromCart);
// routes.get('/orders', shopController.getOrders);
// routes.get('/checkout', shopController.getCheckout);

exports.routes = routes; 
