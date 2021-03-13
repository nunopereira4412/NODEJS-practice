const Product = require('../models/product');


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
    Product.getProductById(productId)
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
    const id          = req.body.productId;
    const title       = req.body.title; 
    const imageURL    = req.body.imageURL;
    const price       = Number.parseFloat(req.body.price);
    const description = req.body.description;
    const product     = new Product(title, imageURL, price, description, id);
    console.log("HHHH: ", product);
    product.save()
        .then(res => {
            console.log("Created product!");
            console.log(res);
        })
        .catch(err => console.log(err));    
    res.redirect("/admin/products");
}; 

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.deleteProductById(productId)
        .then(() => {
            console.log("Product Deleted");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    const products = Product.getProducts() 
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