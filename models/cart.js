const fs      = require('fs');
const { update } = require('lodash');
const path    = require('path');
const rootDir = require('../util/path');

const pathCartFile = path.join(rootDir, 'data', 'cart.js');

module.exports = class Cart {
    static addProduct(productId, productPrice) {
        fs.readFile(pathCartFile, (err, fileContent) => {
            let cart = {
                products: [], 
                totalPrice: 0
            };
            let updatedProduct       = null;
            let newTotalPrice        = null;
            let productIndexFromCart = null;
            let cartFileStats        = null;

            if(!err) {
                try {
                    cartFileStats = fs.statSync(pathCartFile);
                } catch (err) {
                    console.log(err);
                }
            }
    
            if(cartFileStats.size) {
                cart = JSON.parse(fileContent);
            }

            productIndexFromCart = cart.products.findIndex(p => p.id === productId);
            if(productIndexFromCart >= 0) {
                const oldProductFromCart = cart.products[productIndexFromCart];
                updatedProduct = {
                    ...oldProductFromCart,
                    quantity: oldProductFromCart.quantity + 1
                };
            } else {
                updatedProduct = {
                    id: productId,
                    quantity: 1
                }
            }
            newTotalPrice = cart.totalPrice + productPrice;
            
            cart.products = [...cart.products];
            if(productIndexFromCart >= 0)
                cart.products[productIndexFromCart] = updatedProduct;
            else
                cart.products.push(updatedProduct);
            cart.totalPrice = newTotalPrice;
               
            fs.writeFile(pathCartFile, JSON.stringify(cart), err => {
                if(err) console.log(err);
            });
        });
    }

    static deleteProduct(productId, productPrice) {
        fs.readFile(pathCartFile, (err, fileContent) => {

            if(err) return;

            let updatedCart = {...JSON.parse(fileContent)};
            console.log("1  ", updatedCart);
            let pToDelete = updatedCart.products.find(p => p.id === productId);
            let pToDeleteQuantity = pToDelete.quantity;

            updatedCart.products = updatedCart.products.filter(p => p.id !== productId);
        
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * pToDeleteQuantity;
            console.log("3  ", updatedCart);
            fs.writeFile(pathCartFile, JSON.stringify(updatedCart), err => {
                if(err) console.log(err);
            });
        });
    }
};