const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render("admin/addProduct", {
        pageTitle: "Add Product", 
        isAddProductActiveClass: true,
        productCSS: true,
        formCSS: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageURL, price, description);
    product.save();
    res.redirect("/");
}; 

exports.getProducts = (req, res, next) => {
    Product.getProducts(products => {
        res.render('admin/productsList', {
            products: products, 
            pageTitle: "Admin Products", 
            isShopActiveClass: true,
            hasProducts: products.length > 0,
            productCSS: false
        })
    });
};