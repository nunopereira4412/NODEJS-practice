const ObjectId = require('mongodb').ObjectId;
const path    = require('path');
const rootDir = require('../util/path');
const fs      = require('fs');
const Cart    = require('./cart');
const getDB   = require('../util/database').getDB;

const pathProductsFile = path.join(rootDir, 'data', 'products.js');

class Product {
    constructor(title, imageURL, price, description, id, userId) {
        this.title       = title;
        this.imageURL    = imageURL;
        this.price       = price;
        this.description = description;
        this._id         = id ? new ObjectId(id) : null;
        this.user        = userId;  
    }

    save() {
        const db = getDB();
        if(!this._id)
            return db
                .collection("products")
                .insertOne(this);
        else 
            return db
                .collection("products")
                .updateOne({_id: this._id}, {$set: this});
    }

    static deleteProductById(id) {
        const db = getDB();
        return db
            .collection("products")
            .deleteOne({_id: new ObjectId(id)})
            .then(res => console.log("Deleted"))
            .catch(err => console.log(err));
    }

    static getProductById(id) {
        const db = getDB();
        return db
            .collection("products")
            .find({_id: new ObjectId(id)})
            .next()
            .then(product => product)
            .catch(err => console.log(err));
    }
    
    static getProducts() {
        const db = getDB(); 
        return db
            .collection("products")
            .find()
            .toArray()
            .then(products => {
                console.log("\n\nProducts: \n\n");
                console.log(products);
                return products;
            })
            .catch(err => console.log(err));
    }
};

module.exports = Product;