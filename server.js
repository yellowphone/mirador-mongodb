'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors())
const PORT = process.env.PORT || 4001;

const { ApolloServer } = require('apollo-server-express');
const Query = require('./resolvers/Query');
const typeDefs = require('./schema');

const MongoClient = require('mongodb').MongoClient;
let db = null;
try {
    const url = process.env.MONGODB_URL;
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function (err) {
        if (err) {
            console.error("Mongodb not connected");
            console.error(err);
        }
        else {
            console.log("Mongodb connected");
            db = client.db("mirador"); //mongodb database name
        }
    });
}
catch(e) {
    console.error(e)
}


const resolvers = {
    Query
}

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: () => ({
        database: db
    })
})

server.applyMiddleware({ app });
app.listen(PORT, () => {
    console.log(
        `App listening on port ${PORT}\nVisit http://localhost:${PORT}/graphql for GraphQL playground.`
    );
})