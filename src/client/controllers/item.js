import {Panel} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {Connect} from "react-redux"

import {getItemFromRoute} from "../modules/elements"


const Meta = (props) => (
  <li>Meta here {JSON.stringify(props)}</li>
)

const Link = (props) => (
  <li>Link here {JSON.stringify(props)}</li>
)


const Item = ({item}) => {
  return (
    <Panel header={item.name}>
      <p>{item.definition}</p>
      <ul>{item.meta.map(Meta)}</ul>
      <ul>{item.links.map(Link)}</ul>
    </Panel>
  )
}

export default connect({item: getItemFromRoute})(List)
