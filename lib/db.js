const MongoClient = require('mongodb').MongoClient 

const MONGO_URI =
`mongodb+srv://${process.env.mongo_username}:${process.env.mongo_pass}@${process.env.mongo_cluster}.jb7dw.mongodb.net/`

const connectDb = async () => {
    const client = await MongoClient.connect(MONGO_URI)
    return client
}

const insertRecord = async (client, dbName, collName, record) => {
    const db = client.db(dbName)
    const coll = db.collection(collName)
    const result = await coll.insertOne(record)
   
    return result
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

const findRecord = async (client, dbName, collName, query) => {
    const db = client.db(dbName)
    const coll = db.collection(collName)
    const result = await coll.findOne(query)

    return result
}

module.exports = {
    connectDb,
    insertRecord,
    findRecord,
    updateRecord
};
