const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId;

/**
 * @noargument
 */
const createBlog = async (parent, args, context, info) => {
    const data = {
        content: []
    }
    const result = await context.database.collection('blogs').insertOne(data)
        .catch(err => console.error(`Create failed with error: ${err}`))

    return result.insertedId
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument element The JSON sub-element for Blog content (experience, txt, image, etc.)
 */
const insertElementToBlog = async (parent, args, context, info) => {
    const filter = { _id: new ObjectID(args.id) }    

    const result = await context.database.collection('blogs').updateOne(filter, { $push: { content: args.element } })
        .catch(err => console.error(`Update failed with error: ${err}`))
    return result.modifiedCount;
}

/**
 * @argument id The unique identifier for the mongodb document
 * @argument index The index of the JSON sub-element
 */
const deleteElementFromBlog = async (parent, args, context, info) => {
    const filter = { _id: new ObjectID(args.id) }    
    var data = {}
    data[`content.${args.index}`] = 1

    await context.database.collection('blogs').updateOne(filter, { $unset: data })
        .catch(err => console.error(`Update failed with error: ${err}`))

    const result = await context.database.collection('blogs').updateOne(filter, { $pull: { content : null }})
        .catch(err => console.error(`Update failed with error: ${err}`))

    return result.modifiedCount;
}

const swapElementsInBlog = async (parent, args, context, info) => {
    const document = await context.database.collection('blogs').findOne({_id: new ObjectID(args.id)})
    console.log(document)
    const filter = { _id: new ObjectID(args.id) }
    const [removed] = document.splice(args.firstIndex, 1);
    document.splice(args.secondIndex, 0, removed);

    const result = await context.database.collection('blogs').updateOne(filter, { $set: document })
        .catch(err => console.error(`Update failed with error: ${err}`))
    return result.modifiedCount;
}

/**
 * @argument id The unique identifier for the mongodb document
 */
const deleteBlog = async (parent, args, context, info) => {
    const result = await context.database.collection('blogs').deleteOne({_id: new ObjectID(args.id)})
        .catch(err => console.error(`Delete failed with error: ${err}`))

    return result.deletedCount
}

module.exports = {
    createBlog,
    insertElementToBlog,
    swapElementsInBlog,
    deleteElementFromBlog,
    deleteBlog
}