const MongoClient = require('mongodb').MongoClient 

const MONGO_URI =
`mongodb+srv://${process.env.mongo_username}:${process.env.mongo_pass}@${process.env.mongo_cluster}.jb7dw.mongodb.net/`

const connectDb = async () => {
    const client = await MongoClient.connect(MONGO_URI)
    return client
}

const getCollection = async (client) => {
    return client.db('user_db').collection('users')
}

const findRecord = async (client, query) => {
    const coll = await getCollection(client)
    return await coll.findOne(query)
}

const insertRecord = async (client, record) => {
    const coll = await getCollection(client)
    return await coll.insertOne(record)
}

const updateRecord = async (client, dbName, collName, query, setter) => {
    const db = client.db(dbName)
    const coll = db.collection(collName)
    // { email: email }, { $set: {pass: newPass } }
    const result = await coll.updateOne(
        query,
        setter
    )
   
    return result
}

module.exports = {
    connectDb,
    insertRecord,
    findRecord,
    updateRecord
};
