const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId;

/**
 * TODO:
 * - Options to create either date - date itinerary / blob itinerary
 * - Update README
 */

const createItinerary = async (parent, args, context, info) => {

    const data = {}

    // YYYY-MM-DD
    const beginningDate = new Date(args.beginning);
    const endDate = new Date(args.end);

    for (var d = beginningDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        var year = d.getFullYear();
        var month = ('0' + (d.getMonth() + 1)).slice(-2);
        var date = ('0' + (d.getDate() + 1)).slice(-2);
        var insertedDate = `${year}-${month}-${date}`;
        data[insertedDate] = {}
    }

    const result = await context.database.collection('itineraries').insertOne(data)
        .catch(err => console.error(`Create failed with error: ${err}`))

    return result.insertedId
}

const updateItinerary = async (parent, args, context, info) => {
    const filter = { _id: args.id }
    const date = args.date
    let dataToChange = {}

    // could be notes, experience, etc
    dataToChange[date] = args.content

    const updateDocument = {
        $set: dataToChange
    }

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