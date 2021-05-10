const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Json

    type Mutation {
        createItinerary(beginning: String, end: String): Json
        insertElementToItinerary(id: String, date: String, element: Json): String
        swapElementsInItinerary(id: String, date: String, firstIndex: Int, secondIndex: Int): String
        deleteElementFromItinerary(id: String, date: String, index: Int): String
        deleteItinerary(id: String): String
        createBlog: String
        insertElementToBlog(id: String, element: Json): String
        swapElementsInBlog(id: String, firstIndex, Int, secondIndex: Int): String
        deleteElementFromBlog(id: String, index: Int): String
        deleteBlog(id: String): String
    }

    type Query {
        findItinerary(id: String): Json
        findBlog(id: String): Json
    }
`

module.exports = typeDefs;