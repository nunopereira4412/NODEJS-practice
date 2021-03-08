const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render("admin/addProduct", {
        pageTitle: "Add Product", 
        isAddProductActiveClass: true,
        productCSS: true,
        formCSS: true,
        editing: false
    });
};  

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageURL, price, description);
    product.save();
    res.redirect("/");
}; 

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.editMode;

    if(!editMode) res.redirect("/");
    
    const productId = req.params.productId;
    Product.getProductById(productId, product => {
        if(product)
            res.render("admin/editProduct", {
                pageTitle: "Edit Product", 
                isAdminProductsActiveClass: true,
                productCSS: true,
                formCSS: true,
                editing: editMode,
                product: product
            });
        else 
            res.render("errors/404");
    });
};  

exports.postEditProduct = (req, res, next) => {
    const id          = req.body.productId;
    const title       = req.body.title;
    const imageURL    = req.body.imageURL;
    const price       = req.body.price;
    const description = req.body.description;
    const product     = new Product(id, title, imageURL, price, description);
    product.save();
    res.redirect("/"); 
}   

exports.getProducts = (req, res, next) => {
    Product.getProducts(products => {
        res.render('admin/productsList', {
            products: products, 
            pageTitle: "Admin Products", 
            isAdminProductsActiveClass: true,
            hasProducts: products.length > 0,
            productCSS: false
        })
    });
};