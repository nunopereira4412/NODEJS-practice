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
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(pathProductsFile, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static getProducts(cb) {
        getProductsFromFile(cb);
    }
};