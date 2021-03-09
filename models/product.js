const path    = require('path');
const rootDir = require('../util/path');
const fs      = require('fs');
const Cart    = require('./cart');


const pathProductsFile = path.join(rootDir, 'data', 'products.js');

const getProductsFromFile = cb => {
    fs.readFile(pathProductsFile, (err, fileContent) => {
        let products = [];
        if(!err)
            products = JSON.parse(fileContent);
        cb(products);
    });
};

module.exports = class Product {
    constructor(id, title, imageURL, price, description) {
        this.id          = id;
        this.title       = title;
        this.imageURL    = imageURL;
        this.price       = price;
        this.description = description;
    }

    save() {
        getProductsFromFile(products => {
            if(this.id) {
                const productIndexFromCart = products.findIndex(p => p.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[productIndexFromCart] = this;
                fs.writeFile(pathProductsFile, JSON.stringify(updatedProducts), err => {
                    if(err) console.log(err);
                });
            } 
            else {
                this.id = Math.random().toFixed(2).toString();
                products.push(this);
                fs.writeFile(pathProductsFile, JSON.stringify(products), err => {
                    if(err) console.log(err);
                });
            }
        });
    }

    static deleteProductById(productId) {
        getProductsFromFile(products => {
            const p = products.find(p => p.id === productId);
            const updatedProducts = products.filter(p => p.id !== productId);
            fs.writeFile(pathProductsFile, JSON.stringify(updatedProducts), err => {
                if(!err) Cart.deleteProduct(productId, p.price);
            });
        }); 
    }

    static getProductById(id, cb) {
        getProductsFromFile(products => {
           const p = products.find(p => p.id === id);
           cb(p);
        });
    }

    static getProducts(cb) {
        getProductsFromFile(cb);
    }
};