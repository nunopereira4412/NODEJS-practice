const Product = require('../models/product');
const ObjectId = require('mongodb').ObjectId;
const Cart    = require('../models/cart');
const User    = require('../models/user');

exports.getIndex = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: "Index", 
        isIndexActiveClass: true
    });
};

exports.getProducts = (req, res, next) => {
    Product
        .find()
        .then(products => {
            console.log(products);
            res.render('shop/productsList', {
                products: products, 
                pageTitle: "Products List", 
                isProductsActiveClass: true,
                hasProducts: products.length > 0,
                productCSS: false
            });
        })
        .catch(err => console.log(err))
}

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product
        .findById(new ObjectId(productId))
        .then(product => {
            if(product)
                res.render("shop/productDetails", {
                    product: product,
                    pageTitle: "Product Details",
                    isProductsActiveClass: true
                })
            else res.render("errors/404");
        });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: "Orders", 
        isOrdersActiveClass: true
    })
};

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         pageTitle: "Checkout", 
//         isCheckoutActiveClass: true
//     })
// };

exports.postAddToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product
        .findById(productId)
        .then(product => req.user.addToCart(product))
        .then(result => {
            console.log(result);
            res.redirect("/cart");
        }) 
        .catch(err => console.log(err));
}; 

exports.removeFromCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user
        .removeFromCart(productId)
        .then(result => {
            console.log(result);
            res.redirect("/cart");
        })
        .catch(err => console.log(err));
}; 


exports.getCart = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .execPopulate()
        .then(user => {
            const items = user.cart.items;
            res.render('shop/cart', {
                cartProducts: items,
                pageTitle: "Cart", 
                isCartActiveClass: true,
                cartHasProducts: items.length > 0
            })
        }); 
}

