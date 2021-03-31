const { gql } = require('apollo-server');

const typeDefs = gql`

    type Mutation {
        createItinerary: String
        updateItinerary(id: String): String
        deleteItinerary(id: String): String
        createBlog: String
        updateBlog(id: String): String
        deleteBlog(id: String): String
    }

    type Query {
        findItinerary(id: String): String
        findBlog(id: String): String
    }
`

module.exports = typeDefs;