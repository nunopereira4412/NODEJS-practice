const Product = require('../models/product');
const Cart    = require('../models/cart');

exports.getIndex = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: "Index", 
        isIndexActiveClass: true
    })
};

exports.getProducts = (req, res, next) => {
    Product.getProducts(products => {
        if(products)
            res.render('shop/productsList', {
                products: products, 
                pageTitle: "Products List", 
                isProductsActiveClass: true,
                hasProducts: products.length > 0,
                productCSS: false
            });
        else res.render("errors/404");
    });
};

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.getProductById(productId, product => {
        if(product)
            res.render("shop/productDetails", {
                product: product,
                pageTitle: "Product Details",
                isProductsActiveClass: true
            })
        else res.render("errors/404");
    });
};

exports.getCart = (req, res, next) => {
    const productId = req.params.productId;
    // Cart.addProduct(productId, cart => {
    //     res.render('shop/cart', {
    //         cart: cart,
    //         pageTitle: "Cart", 
    //         isCartActiveClass: true
    //     })
    // });
    res.redirect("/");
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: "Orders", 
        isOrdersActiveClass: true
    })
};
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: "Checkout", 
        isCheckoutActiveClass: true
    })
};

exports.postAddToCart = (req, res, next) => {
    const id = req.body.productId;
    Product.getProductById(id, product => {
        Cart.addProduct(id, product.price);
    });
    res.redirect("/cart");
}; 
