const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId;

const createBlog = async (parent, args, context, info) => {
    const data = {
        test: "ok"
    }
    const result = await context.database.collection('blogs').insertOne(data)
        .catch(err => console.error(`Create failed with error: ${err}`))

    return result.insertedId
}

const updateBlog = async (parent, args, context, info) => {
    const filter = { _id: args.id }
    // need to change this later once we know structure of document
    const updateDocument = {}

    const result = await context.database.collection('blogs').updateOne(filter, updateDocument)
        .catch(err => console.error(`Update failed with error: ${err}`))

    return result.modifiedCount;
}

const deleteBlog = async (parent, args, context, info) => {
    const result = await context.database.collection('blogs').deleteOne({_id: new ObjectID(args.id)})
        .catch(err => console.error(`Delete failed with error: ${err}`))

    return result.deletedCount
}

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog
}