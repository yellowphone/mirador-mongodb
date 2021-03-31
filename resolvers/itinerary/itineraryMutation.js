const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId;

const createItinerary = async (parent, args, context, info) => {
    const data = {
        test: "ok"
    }
    const result = await context.database.collection('itineraries').insertOne(data)
        .catch(err => console.error(`Create failed with error: ${err}`))

    return result.insertedId
}

const updateItinerary = async (parent, args, context, info) => {
    const filter = { _id: args.id }
    // need to change this later once we know structure of document
    const updateDocument = {}

    const result = await context.database.collection('itineraries').updateOne(filter, updateDocument)
        .catch(err => console.error(`Update failed with error: ${err}`))

    return result.modifiedCount;
}

const deleteItinerary = async (parent, args, context, info) => {
    const result = await context.database.collection('itineraries').deleteOne({_id: new ObjectID(args.id)})
        .catch(err => console.error(`Delete failed with error: ${err}`))

    return result.deletedCount
}

module.exports = {
    createItinerary,
    updateItinerary,
    deleteItinerary
}