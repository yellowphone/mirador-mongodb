const findItinerary = (parent, args, context, info) => {
    context.database.collection('itineraries').findOne().then((data) => {
        console.log(data)
    })
    return "find"
}

module.exports = {
    findItinerary
}