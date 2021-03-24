const Product = require('../models/product');

const db      = require('../util/database');

exports.getAddProduct = (req, res, next) => {
    res.render("admin/editProduct", {
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
    const price = Number.parseFloat(req.body.price);
    const description = req.body.description;
    const product = new Product(null, title, imageURL, price, description);

    //this can be in a callback for the redirect to happen after

    product
        .save()
        .then(() => res.redirect("/admin/addProduct"))
        .catch(err => console.log(err));
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
    const price       = Number.parseFloat(req.body.price);
    const description = req.body.description;
    const product     = new Product(id, title, imageURL, price, description);
    product.save();
    res.redirect("/admin/products"); 
}   

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    //this can be in a callback for the redirect to happen after
    Product.deleteProductById(productId);
    res.redirect("/admin/products");
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