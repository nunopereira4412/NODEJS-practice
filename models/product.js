const mongodb = require('mongodb');
const path    = require('path');
const rootDir = require('../util/path');
const fs      = require('fs');
const Cart    = require('./cart');
const getDB   = require('../util/database').getDB;

const pathProductsFile = path.join(rootDir, 'data', 'products.js');

const getProductsFromDB = () => {
    const db = getDB(); 
    return db
        .collection("products")
        .find()
        .toArray()
        .then(products => {
            console.log(products);
            return products;
        })
        .catch(err => console.log(err));
}

class Product {
    constructor(title, imageURL, price, description) {
    // constructor(id, title, imageURL, price, description) {
        // this.id          = id;
        this.title       = title;
        this.imageURL    = imageURL;
        this.price       = price;
        this.description = description;
    }

    save() {
        const db = getDB();
        return db
            .collection("products")
            .insertOne(this)
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(err => console.log(err));
    }

    // save() {
    //     getProductsFromFile(products => {
    //         if(this.id) {
    //             const productIndexFromCart = products.findIndex(p => p.id === this.id);
    //             const updatedProducts = [...products];
    //             updatedProducts[productIndexFromCart] = this;
    //             fs.writeFile(pathProductsFile, JSON.stringify(updatedProducts), err => {
    //                 if(err) console.log(err);
    //             });
    //         } 
    //         else {
    //             this.id = Math.random().toFixed(2).toString();
    //             products.push(this);
    //             fs.writeFile(pathProductsFile, JSON.stringify(products), err => {
    //                 if(err) console.log(err);
    //             });
    //         }
    //     });
    // }

    // static deleteProductById(productId) {
    //     getProductsFromFile(products => {
    //         const p = products.find(p => p.id === productId);
    //         const updatedProducts = products.filter(p => p.id !== productId);
    //         fs.writeFile(pathProductsFile, JSON.stringify(updatedProducts), err => {
    //             if(!err) Cart.deleteProduct(productId, p.price);
    //         });
    //     }); 
    // }

    static getProductById(id) {
        const db = getDB();
        return db
            .collection("products")
            .find({_id: new mongodb.ObjectId.createFromHexString(id)})
            .next()
            .then(product => product)
            .catch(err => console.log(err));
    }
    static getProducts() {
        return getProductsFromDB();
    }
};

module.exports = Product;