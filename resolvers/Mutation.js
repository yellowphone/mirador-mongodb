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
    swapElementsInBlog,
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
    swapElementsInBlog,
    deleteElementFromBlog,
    deleteBlog
}