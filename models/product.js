const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type:     String,
        required: true
    },
    imageURL: {
        type:     String,
        required: true
    },
    price: {
        type:     String,
        required: true
    },
    description: {
        type:     String,
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);

// class Product {
    // constructor(title, imageURL, price, description, id, userId) {
    //     this.title       = title;
    //     this.imageURL    = imageURL;
    //     this.price       = price;
    //     this.description = description;
    //     this._id         = id ? new ObjectId(id) : null;
    //     this.user        = userId;  
    // }

    // save() {
    //     const db = getDB();
    //     if(!this._id)
    //         return db
    //             .collection("products")
    //             .insertOne(this);
    //     else 
    //         return db
    //             .collection("products")
    //             .updateOne({_id: this._id}, {$set: this});
    // }

    // static deleteProductById(id) {
    //     const db = getDB();
    //     return db
    //         .collection("products")
    //         .deleteOne({_id: new ObjectId(id)})
    //         .then(res => console.log("Deleted"))
    //         .catch(err => console.log(err));
    // }

    // static getProductById(id) {
    //     const db = getDB();
    //     return db
    //         .collection("products")
    //         .find({_id: new ObjectId(id)})
    //         .next()
    //         .then(product => product)
    //         .catch(err => console.log(err));
    // }
    
//     static getProducts() {
//         const db = getDB(); 
//         return db
//             .collection("products")
//             .find()
//             .toArray()
//             .then(products => {
//                 console.log("\n\nProducts: \n\n");
//                 console.log(products);
//                 return products;
//             })
//             .catch(err => console.log(err));
//     }
// // };