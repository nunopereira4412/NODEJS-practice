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
    Product.getProductById(productId)
        .then(product => {  
            req.user.addToCart(product);
        })
        .catch(err => console.log(err));
        res.redirect("/cart");
}; 

exports.removeFromCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user.removeProductFromCart(productId)
        .then(res => console.log(res))
        .catch(err => console.log(err));
     res.redirect("/cart");
}; 


exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            res.render('shop/cart', {
                cartProducts: cart,
                pageTitle: "Cart", 
                isCartActiveClass: true,
                cartHasProducts: cart.length > 0
            })
        }); 
}

