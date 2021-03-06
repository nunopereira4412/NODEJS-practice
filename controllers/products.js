const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, "views", "addProduct.html")); 
    res.render("addProduct", {
        pageTitle: "Add Product", 
        isAddProductActiveClass: true,
        productCSS: true,
        formCSS: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

exports.getProducts = (req, res, next) => {
    Product.getProducts(products => {
        res.render('shop', {
            products: products, 
            pageTitle: "Shop", 
            isShopActiveClass: true,
            hasProducts: products.length > 0,
            productCSS: false
        })
    });
};