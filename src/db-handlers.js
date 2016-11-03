const dbPromise = require("./db")
const R = require("ramda")

const byId = R.curry((collection, id) => collection.findOne({"xmi:id": id}))

const search = R.curry((collection, params) => {
  const limit = +params.limit || 100
  const offset = +params.offset || 0
  const textQuery = {}
  if (params.$text) {
    textQuery.$text = {$search: params.$text}
  }
  const queryParams = R.omit(["limit", "offset", "$text"], params)
  const query = R.merge(queryParams, textQuery)

  return collection.find(query).skip(offset).limit(limit).toArray()
})

const ancestors = (collection, id, results = []) => {
  return byId(collection, id).then((doc) => {
    if(doc) {
      results.push(doc)
      if(doc._parent) {
        return ancestors(collection, doc._parent, results)
      }
    }
    return results
  })
}

const getIdFields = R.curry((collection, doc) => {
  return R.composeP(
    R.merge(doc),
    R.mergeAll,
    Promise.all.bind(Promise),
    R.map(([key, promise]) => promise.then(R.objOf(key))),
    R.toPairs,
    R.map((query) => collection.find(query).toArray()),
    R.map(R.assocPath(["xmi:id", "$in"], R.__, {})),
    R.map(R.split(" ")),
    R.filter((val) => val[0] === "_"),
    R.omit(["xmi:id"]),
    Promise.resolve.bind(Promise)
  )(doc)
})

const getIdFieldsEnvelope = R.curry((collection, doc) => {
  return R.composeP(
    R.assoc("_related", R.__, doc),
    (query) => collection.find(query).toArray(),
    R.assocPath(["xmi:id", "$in"], R.__, {}),
    R.flatten,
    R.values,
    R.map(R.split(" ")),
    R.filter((val) => val[0] === "_"),
    R.omit(["xmi:id"]),
    Promise.resolve.bind(Promise)
  )(doc)
})

const getFull = R.curry((collection, id) => {
  return byId(collection, id).then(getIdFields(collection))
})

const getFullEnvelope = R.curry((collection, id) => {
  return byId(collection, id).then(getIdFieldsEnvelope(collection))
})

const handlers = {
  byId,
  search,
}

module.exports = dbPromise.then((collection) => {
  return {
    byId: byId(collection),
    search: search(collection),
    ancestors: (id) => ancestors(collection, id),
    getFull: getFull(collection),
    getFullEnvelope: getFullEnvelope(collection)
  }
})
