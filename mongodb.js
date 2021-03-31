// const MongoClient = require('mongodb').MongoClient;
// const dotenv = require('dotenv');
// dotenv.config();

// const url = process.env.MONGODB_URL;
// export const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(function (err) {
//     if (err) {
//         console.error("Mongodb not connected");
//         return null;
//     }
//     else {
//         console.log("Mongodb connected");
//         db = client.db("mirador"); //mongodb database name
//         return db;
//     }
// });