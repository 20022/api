const express = require("express")

const handlerPromise = require("./db-handlers")
const app = express()

const handleResponse = (res, promise) => {
  promise
  .then((data) => res.json(data))
  .catch((err) => {
    console.log(err)
    res.sendStatus(500).end(err)
  })
}


handlersPromise.then((handlers) => {
  app.get("/id/:id", (req, res) => {
    handleResponse(res, handlers.byId(req.params.id))
  })

  app.get("/id/:id/parents", (req, res) => {
    res.json(handlers.getParents(req.params.id))
  })

  app.get("/search/:query", (req, res) => {
    handleResponse(res, handlers.search(req.params.query))
  })

  // app.get("/allkeys", (req, res) => {
  //   res.json(handlers.allKeys())
  // })
  //
  // app.get("/unique-key-values/:key", (req, res) => {
  //   res.json(handlers.uniqueKeyValues(req.params.key))
  // })
  //
  // app.get("/query/:key/:value", (req, res) => {
  //   res.json(handlers.byKey(req.params.key, req.params.value))
  // })

  app.listen(3000, () => {
    console.log("ISO20022 server listening on 3000")
  })

})
