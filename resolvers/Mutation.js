const {
    createItinerary,
    insertElementToItinerary,
    updateItineraryDate,
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
    updateItineraryDate,
    swapElementsInItinerary,
    deleteElementFromItinerary,
    deleteItinerary,
    createBlog,
    insertElementToBlog,
    swapElementsInBlog,
    deleteElementFromBlog,
    deleteBlog
}