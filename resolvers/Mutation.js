const {
    createItinerary,
    updateItinerary,
    deleteItinerary
} = require('./itinerary/itineraryMutation')

const {
    createBlog,
    updateBlog,
    deleteBlog
} = require('./blog/blogMutation')

module.exports = {
    createItinerary,
    updateItinerary,
    deleteItinerary,
    createBlog,
    updateBlog,
    deleteBlog
}