import {ListGroup, ListGroupItem} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {Connect} from "react-redux"

import {getSearchItems} from "../modules/elements"

const truncate = (str) => {
  if (str.length <= 50) {
    return str
  }
  return str.substr(0, 50) + "..."
}

const Item = (item) => (
  <LinkContainer to={{ pathname: `/items/item.id`}}>
    <ListGroupItem>
      <h3>{item.name}</item>
      <p>{truncate(item.definition)}</p>
    </ListGroupItem>
  </LinkContainer>
)

const List = ({items}) => {
  return (
    <ListGroup>
      {items.map(renderItem)}
    </ListGroup>
  )
}

export default connect({items: getSearchItems})(List)
