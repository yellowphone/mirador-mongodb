const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId;

const findBlog = async (parent, args, context, info) => {
    const result = await context.database.collection('blogs').findOne({_id: new ObjectID(args.id)})

    return result
}

module.exports = {
    findBlog
}