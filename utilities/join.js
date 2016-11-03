const R = require("ramda")

module.exports = R.compose(
  R.flatten,
  R.map((idx) => require(`./data/${idx}.json`))
)(R.range(0, 258))
