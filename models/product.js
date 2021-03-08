const path    = require('path');
const rootDir = require('../util/path');
const fs      = require('fs');

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
    constructor(title, imageURL, price, description) {
        this.title = title;
        this.imageURL = imageURL;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toFixed(2).toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(pathProductsFile, JSON.stringify(products), err => {
                console.log(err);
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