const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Json

    type Mutation {
        createItinerary(beginning: String, end: String): String
        insertElementToItinerary(id: String, date: String, element: Json): String
        deleteElementFromItinerary(id: String, date: String, index: Int): String
        deleteItinerary(id: String): String
        createBlog: String
        insertElementToBlog(id: String, element: Json): String
        deleteElementFromBlog(id: String, index: Int): String
        deleteBlog(id: String): String
    }

    type Query {
        findItinerary(id: String): Json
        findBlog(id: String): Json
    }
`

module.exports = typeDefs;