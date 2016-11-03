const marked = require("marked")
const path = require("path")
const fs = require("fs")

const readmePath = path.join(__dirname, `../readme.md`)
const readme = fs.readFileSync(readmePath).toString()
const html = `
  <!doctype html>
  <html>
    <head>
    </head>
    <body>
      ${marked(readme)}
    </body>
  </html>
  `
  
module.exports = html
