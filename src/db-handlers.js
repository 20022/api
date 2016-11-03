const dbPromise = require("./db")
const R = require("ramda")

const byId = R.curry((collection, id) => collection.findOne({"xmi:id": id}))

const search = R.curry((collection, $search) =>
  collection.find({$text: {$search}}).limit(30).toArray()
)

const handlers = {
  byId,
  search,
}

module.exports = dbPromise.then((collection) => {
  const a = R.map((fn) => fn(collection))(handlers)

  //search(collection, "postal").then(console.log).catch(console.log)
  a.byId("_CbUL8wZpEeSPjINWZdMmvg").then(console.log).catch(console.log)
})
