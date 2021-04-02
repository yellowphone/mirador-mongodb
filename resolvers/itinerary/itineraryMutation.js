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
        data[insertedDate] = []
    }

    const result = await context.database.collection('itineraries').insertOne(data)
        .catch(err => console.error(`Create failed with error: ${err}`))

    return result.insertedId
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument date The date array the element wants to push to
 * @argument element The JSON sub-element for Itinerary content (experience, txt, image, etc.)
 */
 const insertElementToItinerary = async (parent, args, context, info) => {
    const filter = { _id: new ObjectID(args.id) }  
    var data = {}
    data[`${args.date}`] = args.element

    const result = await context.database.collection('itineraries').updateOne(filter, { $push: data })
        .catch(err => console.error(`Update failed with error: ${err}`))
    return result.modifiedCount;
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument date The date array the element wants to delete from
 * @argument index The index of the JSON sub-element
 */
 const deleteElementFromItinerary = async (parent, args, context, info) => {
    const filter = { _id: new ObjectID(args.id) }    
    var dataForUnset = {}
    dataForUnset[`${args.date}.${args.index}`] = 1
    var dataForPull = {}
    dataForPull[`${args.date}`] = null

    await context.database.collection('itineraries').updateOne(filter, { $unset: dataForUnset })
        .catch(err => console.error(`Update failed with error: ${err}`))

    const result = await context.database.collection('itineraries').updateOne(filter, { $pull: dataForPull })
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
    insertElementToItinerary,
    deleteElementFromItinerary,
    deleteItinerary
}