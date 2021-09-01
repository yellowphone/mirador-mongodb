const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId;

/**
 * @argument beginning The beginning date of the trip
 * @argument end The end date of the trip
 */
const createTrip = async (parent, args, context, info) => {
    const data = {}
    data['notes'] = []
    data['trip'] = {}

    // trip is created through "/create/trip"
    if (args.beginning && args.end) {
        // Date format: YYYY-MM-DD
        const beginningDate = new Date(args.beginning);
        beginningDate.setDate(beginningDate.getDate() + 1);
        const endDate = new Date(args.end);
        endDate.setDate(endDate.getDate() + 1);

        for (var d = beginningDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            var year = d.getFullYear();
            var month = ('0' + (d.getMonth() + 1)).slice(-2);
            var date = ('0' + (d.getDate())).slice(-2);
            var insertedDate = `${year}-${month}-${date}`;
            data['trip'][insertedDate] = []
        }
        
        const result = await context.database.collection('trips').insertOne(data)
            .catch(err => console.error(`Create failed with error: ${err}`))
        return result.ops[0]
    }
    // trip is created through the card view and no dates are inputted
    else {
        const result = await context.database.collection('trips').insertOne(data)
            .catch(err => console.error(`Create failed with error: ${err}`))
        return result.ops[0]
    }
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument date The date array the element wants to push to
 * @argument element The JSON sub-element for Trip content (experience, txt, image, etc.)
 */
const insertElementToTrip = async (parent, args, context, info) => {
    const filter = { _id: new ObjectID(args.id) }  
    var data = {}
    data[`trip.${args.date}`] = args.element

    const result = await context.database.collection('trips').updateOne(filter, { $push: data })
        .catch(err => console.error(`Update failed with error: ${err}`))
    return result.modifiedCount;
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument beginning The new beginning date of the trip
 * @argument end The new end date of the trip
 */
const updateTripDate = async (parent, args, context, info) => {
    const document = await context.database.collection('trips').findOne({_id: new ObjectID(args.id)})
    const filter = { _id: new ObjectID(args.id) }  

    // Date format: YYYY-MM-DD
    const beginningDate = new Date(args.beginning);
    beginningDate.setDate(beginningDate.getDate() + 1);
    const endDate = new Date(args.end);
    endDate.setDate(endDate.getDate() + 1);

    var outOfRangeDateChecker = []

    // inserting new dates
    for (var d = beginningDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        var year = d.getFullYear();
        var month = ('0' + (d.getMonth() + 1)).slice(-2);
        var date = ('0' + (d.getDate())).slice(-2);
        var insertedDate = `${year}-${month}-${date}`;
        if (document['trip'][insertedDate] === undefined) {
            document['trip'][insertedDate] = []
        }
        outOfRangeDateChecker.push(insertedDate);
    }

    // removing old dates that don't overlap
    for (var i in document['trip']) {
        if (!outOfRangeDateChecker.includes(i)) {
            delete document['trip'][i]
        }
    }

    // sorting
    const ordered = Object.keys(document['trip']).sort().reduce(
        (obj, key) => { 
          obj[key] = document['trip'][key]; 
          return obj;
        }, 
        {}
    );

    const newDocument = {
        "trip": ordered,
        "notes": document['notes']
    }

    const result = await context.database.collection('trips').replaceOne(filter, newDocument)
        .catch(err => console.error(`Update failed with error: ${err}`));

    return result.ops[0];
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument date The date array the element wants to push to
 * @argument firstIndex The first index to remove the element from
 * @argument secondIndex The second index to insert the removed element into
 */
const swapElementsInTrip = async (parent, args, context, info) => {
    const document = await context.database.collection('trips').findOne({_id: new ObjectID(args.id)})
    const filter = { _id: new ObjectID(args.id) }
    const newElem = document['trip'][`${args.date}`]
    const [removed] = newElem.splice(args.firstIndex, 1);
    newElem.splice(args.secondIndex, 0, removed);
    let data = {}
    data[`trip.${args.date}`] = newElem

    const result = await context.database.collection('trips').updateOne(filter, { $set: data })
        .catch(err => console.error(`Update failed with error: ${err}`))
    return result.modifiedCount;
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument date The date array the element wants to delete from
 * @argument index The index of the JSON sub-element
 */
 const deleteElementFromTrip = async (parent, args, context, info) => {
    const filter = { _id: new ObjectID(args.id) }    
    var dataForUnset = {}
    dataForUnset[`trip.${args.date}.${args.index}`] = 1
    var dataForPull = {}
    dataForPull[`trip.${args.date}`] = null

    await context.database.collection('trips').updateOne(filter, { $unset: dataForUnset })
        .catch(err => console.error(`Update failed with error: ${err}`))

    const result = await context.database.collection('trips').updateOne(filter, { $pull: dataForPull })
        .catch(err => console.error(`Update failed with error: ${err}`))

    return result.modifiedCount;
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument date The date array the element wants to push to
 * @argument element The JSON sub-element for Trip content (experience, txt, image, etc.)
 */
const insertElementToNotes = async (parent, args, context, info) => {
    const filter = { _id: new ObjectID(args.id) }  
    var data = {}
    data[`notes`] = args.element

    const result = await context.database.collection('trips').updateOne(filter, { $push: data })
        .catch(err => console.error(`Update failed with error: ${err}`))
    return result.modifiedCount;
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument date The date array the element wants to push to
 * @argument firstIndex The first index to remove the element from
 * @argument secondIndex The second index to insert the removed element into
 */
const swapElementsInNotes = async (parent, args, context, info) => {
    const document = await context.database.collection('trips').findOne({_id: new ObjectID(args.id)})
    const filter = { _id: new ObjectID(args.id) }
    const newElem = document['notes']
    const [removed] = newElem.splice(args.firstIndex, 1);
    newElem.splice(args.secondIndex, 0, removed);
    let data = {}
    data[`notes`] = newElem

    const result = await context.database.collection('trips').updateOne(filter, { $set: data })
        .catch(err => console.error(`Update failed with error: ${err}`))
    return result.modifiedCount;
}

// insert note element into trips
const insertNoteElementIntoTrip = async (parent, args, context, info) => {
    const document = await context.database.collection('trips').findOne({_id: new ObjectID(args.id)})
    const filter = { _id: new ObjectID(args.id) }
    const notes = document['notes']
    const trip = document['trip']
    const [removed] = notes.splice(args.noteIndex, 1);
    trip[args.date].splice(args.tripIndex, 0, removed);
    let data = {}
    data['notes'] = notes
    data['trip'] = trip

    const result = await context.database.collection('trips').updateOne(filter, { $set: data })
        .catch(err => console.error(`Update failed with error: ${err}`))
    return result.modifiedCount;
}

// insert trip element into notes
const insertTripElementIntoNotes = async (parent, args, context, info) => {
    const document = await context.database.collection('trips').findOne({_id: new ObjectID(args.id)})
    const filter = { _id: new ObjectID(args.id) }
    const notes = document['notes']
    const trip = document['trip'] 
    const [removed] = trip[args.date].splice(args.tripIndex, 1);
    notes.splice(args.noteIndex, 0, removed);
    let data = {}
    data['notes'] = notes
    data['trip'] = trip

    const result = await context.database.collection('trips').updateOne(filter, { $set: data })
        .catch(err => console.error(`Update failed with error: ${err}`))
    return result.modifiedCount;
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument date The date array the element wants to delete from
 * @argument index The index of the JSON sub-element
 */
const deleteElementFromNotes = async (parent, args, context, info) => {
    const filter = { _id: new ObjectID(args.id) }    
    var dataForUnset = {}
    dataForUnset[`notes.${args.index}`] = 1
    var dataForPull = {}
    dataForPull[`notes`] = null

    await context.database.collection('trips').updateOne(filter, { $unset: dataForUnset })
        .catch(err => console.error(`Update failed with error: ${err}`))

    const result = await context.database.collection('trips').updateOne(filter, { $pull: dataForPull })
        .catch(err => console.error(`Update failed with error: ${err}`))

    return result.modifiedCount;
}

const deleteTrip = async (parent, args, context, info) => {
    const result = await context.database.collection('trips').deleteOne({_id: new ObjectID(args.id)})
        .catch(err => console.error(`Delete failed with error: ${err}`))

    return result.deletedCount
}

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
    deleteTrip
}