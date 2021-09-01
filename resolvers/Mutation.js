const {
    createTrip,
    insertElementToTrip,
    updateTripDate,
    swapElementsInTrip,
    deleteElementFromTrip,
    insertElementToNotes,
    swapElementsInNotes,
    deleteElementFromNotes,
    insertNoteElementIntoTrip,
    insertTripElementIntoNotes,
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
    insertElementToNotes,
    swapElementsInNotes,
    deleteElementFromNotes,
    insertNoteElementIntoTrip,
    insertTripElementIntoNotes,
    deleteTrip,
    
    createBlog,
    insertElementToBlog,
    swapElementsInBlog,
    deleteElementFromBlog,
    deleteBlog
}