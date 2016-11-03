const {MongoClient} = require("mongodb")
const mongoUri = process.env.MONGO || `mongodb://localhost:27017/iso20022?w=1`

const dbPromise = MongoClient.connect(mongoUri)
const dbCollection = dbPromise.then((db) => db.collection("elements"))

dbCollection.then((collection) => {
  collection.createIndex({"xmi:id":1}, {unique: true})
  collection.createIndex({"_parent":1})
  collection.createIndex({"_name":1})
  collection.createIndex({
    "name":"text",
    "definition":"text",
    "content":"text",
  }, { weights: {
    name: 3
  }})
})

module.exports = dbCollection
