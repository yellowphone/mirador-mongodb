const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId;

/**
 * @argument beginning The beginning date of the itinerary
 * @argument end The end date of the itinerary
 */
const createItinerary = async (parent, args, context, info) => {
    const data = {}

    // itinerary is created through "/create/itinerary"
    if (args.beginning && args.end) {
        // Date format: YYYY-MM-DD
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
        return result.ops[0]
    }
    // itinerary is created through the card view and no dates are inputted
    else {
        const result = await context.database.collection('itineraries').insertOne(data)
            .catch(err => console.error(`Create failed with error: ${err}`))
        return result.ops[0]
    }
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

const updateItineraryDate = async (parent, args, context, info) => {
    const document = await context.database.collection('itineraries').findOne({_id: new ObjectID(args.id)})
    const filter = { _id: new ObjectID(args.id) }  

    // Date format: YYYY-MM-DD
    const beginningDate = new Date(args.beginning);
    const endDate = new Date(args.end);

    var outOfRangeDateChecker = []

    // inserting new dates
    for (var d = beginningDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        var year = d.getFullYear();
        var month = ('0' + (d.getMonth() + 1)).slice(-2);
        var date = ('0' + (d.getDate() + 1)).slice(-2);
        var insertedDate = `${year}-${month}-${date}`;
        if (document[insertedDate] === undefined) {
            document[insertedDate] = []
        }
        outOfRangeDateChecker.push(insertedDate);
    }

    // removing old dates that don't overlap
    for (var i in document) {
        if (i !== "_id" && !outOfRangeDateChecker.includes(i)) {
            delete document[i]
        }
    }

    // sorting
    const ordered = Object.keys(document).sort().reduce(
        (obj, key) => { 
          obj[key] = document[key]; 
          return obj;
        }, 
        {}
      );

    const result = await context.database.collection('itineraries').replaceOne(filter, ordered)
        .catch(err => console.error(`Update failed with error: ${err}`));

    return result.ops[0];
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument date The date array the element wants to push to
 * @argument firstIndex The first index to remove the element from
 * @argument secondIndex The second index to insert the removed element into
 */
const swapElementsInItinerary = async (parent, args, context, info) => {
    const document = await context.database.collection('itineraries').findOne({_id: new ObjectID(args.id)})
    const filter = { _id: new ObjectID(args.id) }
    const newElem = document[`${args.date}`]
    const [removed] = newElem.splice(args.firstIndex, 1);
    newElem.splice(args.secondIndex, 0, removed);
    let data = {}
    data[`${args.date}`] = newElem

    const result = await context.database.collection('itineraries').updateOne(filter, { $set: data })
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
    updateItineraryDate,
    swapElementsInItinerary,
    deleteElementFromItinerary,
    deleteItinerary
}