const mongodb     = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
    MongoClient.connect(
        'mongodb://127.0.0.1:27017/shop?compclientsors=disabled&gssapiServiceName=mongodb', 
        {useUnifiedTopology: true}
        )
        .then(client => {
            console.log("Connected!");
            _db = client.db();
            cb();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDB = () => {
    if(_db) 
        return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB        = getDB;

