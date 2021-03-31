const { gql } = require('apollo-server');

const typeDefs = gql`
    type Mutation {
        createItinerary: String
    }

    type Query {
        findItinerary: String
    }
`

module.exports = typeDefs;