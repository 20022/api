/* Need to transform list of ids into list of [{id, name}] */
const TOP_LEVEL_KEYS = ["xmi:id", "name", "_type"]


const hasIds = (str) => str.charAt(0) === "_"

const meta = R.pipe(
  R.omit(TOP_LEVEL_KEYS),
  R.reject(hasIds),
  R.toPairs,
  R.map(([key, value]) => {key, value})
)

const getLinks = (entities) =>
  R.pipe(
    R.omit(TOP_LEVEL_KEYS),
    R.filter(hasIds),
    R.map(R.split(" ")),
    R.map(R.map((id) => {
      return {
        name: R.pathOr(id, [id, "name"], entities),
        id,
    })),
    R.toPairs,
    R.map(([key, value]) => {key, value})
  )

const expandItem = (item, entities) => {
  return R.applySpec({
    id: R.prop("xmi:id"),
    name: R.prop("name"),
    type: R.prop("_type"),
    meta: getMeta,
    links: getLinks(entities)
  })
}
