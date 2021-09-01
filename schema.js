const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Json

    type Mutation {
        createTrip(beginning: String, end: String): Json
        insertElementToTrip(id: String, date: String, element: Json): String
        updateTripDate(id: String, beginning: String, end: String): Json
        swapElementsInTrip(id: String, date: String, firstIndex: Int, secondIndex: Int): String
        deleteElementFromTrip(id: String, date: String, index: Int): String
        insertElementToNotes(id: String, element: Json): String
        swapElementsInNotes(id: String, firstIndex: Int, secondIndex: Int): String
        insertNoteElementIntoTrip(id: String, noteIndex: Int, tripIndex: Int, date: String): String
        insertTripElementIntoNotes(id: String, noteIndex: Int, tripIndex: Int, date: String): String
        deleteElementFromNotes(id: String, index: Int): String
        deleteTrip(id: String): String
        
        createBlog: String
        insertElementToBlog(id: String, element: Json): String
        swapElementsInBlog(id: String, firstIndex: Int, secondIndex: Int): String
        deleteElementFromBlog(id: String, index: Int): String
        deleteBlog(id: String): String
    }

    type Query {
        findTrip(id: String): Json
        findBlog(id: String): Json
    }
`

module.exports = typeDefs;