
const Cart    = require('./cart');
const db      = require('../util/database');

module.exports = class Product {
    constructor(id, title, imageURL, price, description) {
        this.id          = id;
        this.title       = title;
        this.imageURL    = imageURL;
        this.price       = price;
        this.description = description;
    }

    save() {
        return db
            .execute("INSERT INTO products (title, price, description, imageURL) VALUES (?, ?, ?, ?)",
            [this.title, this.price, this.description, this.imageURL]);
    }

//     static deleteProductById(productId) {
//         getProductsFromFile(products => {
//             const p = products.find(p => p.id === productId);
//             const updatedProducts = products.filter(p => p.id !== productId);
//             fs.writeFile(pathProductsFile, JSON.stringify(updatedProducts), err => {
//                 if(!err) Cart.deleteProduct(productId, p.price);
//             });
//         }); 
//     }

    static getProductById(id) {
        return db
            .execute("SELECT * FROM products WHERE products.id = ?", [id]);
    }

    static getProducts() {
        return db
            .execute("SELECT * FROM products")
            .then(products => products);
    }
}