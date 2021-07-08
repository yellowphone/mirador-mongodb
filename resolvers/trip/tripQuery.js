const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId;

const findTrip = async (parent, args, context, info) => {
    const result = await context.database.collection('trips').findOne({_id: new ObjectID(args.id)})

    return result
}

module.exports = {
    findTrip
}