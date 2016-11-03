const marked = require("marked")
const path = require("path")
const fs = require("fs")
const memoize = require("lodash.memoize")

const getStaticPath = (filename) => path.join(__dirname, `./static/${filename}`)
const getContents = (filename) => fs.readFileSync(getStaticPath(filename)).toString()

const render = (filename) => {
  return `
  <!doctype html>
  <html>
    <head>
    </head>
    <body>
      ${marked(getContents(filename))}
    </body>
  </html>
  `
}

module.exports = memoize(render)
