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
    Cart.getCart(cart => {
        // if(!cartProducts) {
            Product.getProducts(products => {
                const cartProducts = [];
                for(product of products) {
                    const cartProduct = cart.products.find(p => p.id === product.id);
                    if(cartProduct)
                        cartProducts.push({
                            productData: product,
                            quantity: cartProduct.quantity
                        });
                }
                res.render('shop/cart', {
                    cartProducts: cartProducts,
                    pageTitle: "Cart", 
                    isCartActiveClass: true,
                    cartHasProducts: cartProducts.length > 0
                }); 
            });
        // }
    });
}

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

exports.removeFromCart = (req, res, next) => {
    const productId = req.body.productId;
    Cart.getCart(cart => {
        const updatedProducts = cart.products.filter(p => p.id !== productId);
        const updatedCart = {
            ...cart,
            products: updatedProducts
        };
        Cart.saveCart(updatedCart);
    });
    res.redirect("/cart");
}; 
