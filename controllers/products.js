const products = [];

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, "views", "addProduct.html")); 
    res.render("addProduct", {
        pageTitle: "Add Product", 
        // path: '/admin/addProduct'
        isAddProductActiveClass: true,
        productCSS: true,
        formCSS: true
    });
};

exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title});
    products.push({title: req.body.title});
    res.redirect("/");
};

exports.getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, "views", "shop.html")); 
    res.render('shop', {
        products: products, 
        pageTitle: "Shop", 
        // path: '/',
        isShopActiveClass: true,
        hasProducts: products.length > 0,
        productCSS: false
    });
};