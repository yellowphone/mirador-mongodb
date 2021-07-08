const {
    createTrip,
    insertElementToTrip,
    updateTripDate,
    swapElementsInTrip,
    deleteElementFromTrip,
    deleteTrip
} = require('./trip/tripMutation')

const {
    createBlog,
    insertElementToBlog,
    swapElementsInBlog,
    deleteElementFromBlog,
    deleteBlog
} = require('./blog/blogMutation')

module.exports = {
    createTrip,
    insertElementToTrip,
    updateTripDate,
    swapElementsInTrip,
    deleteElementFromTrip,
    deleteTrip,
    createBlog,
    insertElementToBlog,
    swapElementsInBlog,
    deleteElementFromBlog,
    deleteBlog
}