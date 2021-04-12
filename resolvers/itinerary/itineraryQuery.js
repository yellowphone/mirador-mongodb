const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId;

const findItinerary = async (parent, args, context, info) => {
    const result = await context.database.collection('itineraries').findOne({_id: new ObjectID(args.id)})

    return result
}

module.exports = {
    findItinerary
}