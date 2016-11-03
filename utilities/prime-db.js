const dbPromise = require("./db")
const nodes = require("./nodes.json")

let idx = 0

const nodesForMongo = nodes.map((node) => {
  node._type = node.$type
  node._parent = node.$parent
  delete node.$type
  delete node.$parent
  if (!node["xmi:id"]) {
    node["xmi:id"] = `custom_${idx}`
    idx += 1
  }
  return node
})

dbPromise.then((collection) => {
  collection.remove({}).then(() => {
    return collection.insertMany(nodesForMongo)
  }).then(console.log).catch(console.log)

})

// mongodb://now_iso:e1L12FYrjAsD@ds019268.mlab.com:19268/iso20022
