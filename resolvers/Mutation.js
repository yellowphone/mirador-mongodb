const {
    createItinerary,
    insertElementToItinerary,
    deleteElementFromItinerary,
    deleteItinerary
} = require('./itinerary/itineraryMutation')

const {
    createBlog,
    insertElementToBlog,
    deleteElementFromBlog,
    deleteBlog
} = require('./blog/blogMutation')

module.exports = {
    createItinerary,
    insertElementToItinerary,
    deleteElementFromItinerary,
    deleteItinerary,
    createBlog,
    insertElementToBlog,
    deleteElementFromBlog,
    deleteBlog
}