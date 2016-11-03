const R = require("ramda")
const traverse = require("traverse")
const fs = require("fs")

const dd = require("./iso20022-dd.json")
const bp = require("./iso20022-bp.json")

const nodes = getNodes(dd).concat(getNodes(bp))
console.log(nodes.length)

fs.writeFileSync("./nodes.json", JSON.stringify(nodes))

function getNodes(data) {
  const traverser = traverse(data)
  const nodes = []
  traverser.forEach(function(val) {
    if (this.key === "$") {
      const path = this.path.slice()
      const p = path.join(".")
      let nameIdx = path.length - 2
      if (+path[nameIdx] >= 0) {
        nameIdx -= 1
      }
      let name = path[nameIdx]
      let parentAttrPath = path.slice(0, nameIdx)
      if (parentAttrPath.length === 0) return

      parentAttrPath.push("$")
      const parent = traverser.get(parentAttrPath)
      val.$parent = parent["xmi:id"]
      val.$type = name
      nodes.push(val)
    }
  })
  return nodes
}
