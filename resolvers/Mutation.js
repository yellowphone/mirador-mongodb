const {
    createItinerary,
    insertElementToItinerary,
    swapElementsInItinerary,
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
    swapElementsInItinerary,
    deleteElementFromItinerary,
    deleteItinerary,
    createBlog,
    insertElementToBlog,
    deleteElementFromBlog,
    deleteBlog
}