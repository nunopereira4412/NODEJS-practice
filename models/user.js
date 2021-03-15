const ObjectId = require('mongodb').ObjectId;
const getDB    = require('../util/database').getDB;

class User {
    constructor(id, name, email, cart) {
        this._id   = id;
        this.name  = name;
        this.email = email;
        this.cart  = cart;
    }

    save() {
        const db = getDB();
        return db
            .collection("users")
            .insertOne(this);
    }

    addToCart(product) {
        const db        = getDB();
        let newQuantity = 1;
        
        let updatedCartItems = [...this.cart.items];

        const cPIndex = this.cart.items.findIndex(p => p._id.toString() === product._id.toString());
        
        if(cPIndex >= 0) {
            newQuantity  = this.cart.items[cPIndex].quantity + 1;
            updatedCartItems[cPIndex].quantity = newQuantity;
        }
        else 
            updatedCartItems.push({
                _id: new ObjectId(product._id),
                title: product.title,
                quantity: newQuantity
            });

        const updatedCart = {
            items: updatedCartItems
        };
        
        return db
            .collection("users")
            .updateOne(
                {_id: new ObjectId(this._id)}, 
                {$set: {cart: updatedCart}}
            );
    }

    removeProductFromCart(productId) {
        const db              = getDB();
        const updatedProducts = this.cart.items.filter(p => p._id.toString() !== productId.toString());
        const updatedCart     = {
            items: updatedProducts
        };
        return db
            .collection("users")
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );
    }

    getCart() {
        const db = getDB();
        const productIds = this.cart.items.map(p => p._id);
        return db
            .collection("products")
            .find({_id: {$in: productIds}})
            .toArray() 
            .then(products => products.map(p => {
                const quantity = this.cart.items
                    .find(item => item._id.toString() === p._id.toString())
                    .quantity;
                return {
                    ...p,
                    quantity: quantity
                }
            }))
            .catch(err => console.log(err));
    }

    static getUserById(id) {
        const db = getDB();
        return db
            .collection("users")
            .findOne({_id: new ObjectId(id)}) 
            .then(user => user)
            .catch(err => console.log(err));
    }
}

module.exports = User;