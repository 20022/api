const R  = require("ramda")
const fs = require("fs")
const nodes = require("./nodes.json")

R.splitEvery(800, nodes).forEach((data, idx) => {
  fs.writeFileSync(`./data/${idx}.json`, JSON.stringify(data))
})
