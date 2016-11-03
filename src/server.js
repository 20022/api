const express = require("express")
const path = require("path")

const readme = require("./render")
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

handlerPromise.then((handlers) => {
  app.get("/element/:id/ancestors", (req, res) => {
    handleResponse(res, handlers.ancestors(req.params.id))
  })

  app.get("/element/:id/full", (req, res) => {
    handleResponse(res, handlers.getFull(req.params.id))
  })

  app.get("/element/:id", (req, res) => {
    handleResponse(res, handlers.byId(req.params.id))
  })

  app.get("/element", (req, res) => {
    handleResponse(res, handlers.search(req.query))
  })

  app.get("/", (req, res) => {
    res.send(readme)
  })

  app.listen(3000, () => {
    console.log("ISO20022 server listening on 3000")
  })

})
