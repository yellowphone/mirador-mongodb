const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Json

    type Mutation {
        createItinerary(beginning: String, end: String): String
        updateItinerary(id: String): String
        deleteItinerary(id: String): String
        createBlog: String
        updateBlog(id: String): String
        deleteBlog(id: String): String
    }

    type Query {
        findItinerary(id: String): Json
        findBlog(id: String): Json
    }
`

module.exports = typeDefs;