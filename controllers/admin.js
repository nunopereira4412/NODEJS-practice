const ObjectId = require('mongodb').ObjectId;
const Product  = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render("admin/editProduct", {
        pageTitle: "Add Product", 
        isAddProductActiveClass: true,
        productCSS: true,
        formCSS: true,
        editing: false
    });
};      

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.editMode;
    
    if(!editMode) res.redirect("/");
    
    const productId = req.params.productId;
    Product
        .findById(productId)
        .then(product => {
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
        })
        .catch(err => console.log(err));
};    

exports.postEditProduct = (req, res, next) => {
    const productId          = req.body.productId;
    const updatedTitle       = req.body.title; 
    const updatedImageURL    = req.body.imageURL;
    const updatedPrice       = Number.parseFloat(req.body.price);
    const updatedDescription = req.body.description;
    let successMsg           = "";

    Product
        .findById(productId)
        .then(product => {
            console.log("IJHKBI: ", typeof productId);
            if(product) {
                product.title       = updatedTitle;
                product.imageURL    = updatedImageURL;
                product.price       = updatedPrice;
                product.description = updatedDescription;
                successMsg          = "Product Updated!";
                return product.save();
            }
            else {
                const product = new Product({
                    title:       updatedTitle,
                    imageURL:    updatedImageURL,
                    price:       updatedPrice,
                    description: updatedDescription
                });
                successMsg = "Product Created!";
                return product.save();
            }
        })
        .then(result => {
            console.log(successMsg);
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
}; 

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.findByIdAndDelete(productId)
        .then(() => {
            console.log("Product Deleted");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    Product
        .find()
        .then(products => {
            res.render('admin/productsList', {
                products: products, 
                pageTitle: "Admin Products", 
                isAdminProductsActiveClass: true,
                hasProducts: products.length > 0,
                productCSS: false
            })
        });
};