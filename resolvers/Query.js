const hello = (parent, args, context, info) => {
    context.database.collection('itineraries').findOne().then((data) => {
        console.log(data)
    })
    return "ok"
}

module.exports = {
    hello
}