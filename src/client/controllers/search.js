import {FieldGroup, Checkbox, ControlLabel, FormControl, Button} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {Connect} from "react-redux"

import {getSearchTerms, search, fieldChange, ITEM_TYPES} from "../modules/elements"

const Item = (item) => (
  <LinkContainer to={{ pathname: `/items/item.id`}}>
    <ListGroupItem>
      <h3>{item.name}</item>
      <p>{truncate(item.definition)}</p>
    </ListGroupItem>
  </LinkContainer>
)

const renderCheckboxes = (types, data, onChange) => {
  return (
    <div>
      {types.map((type) => (
        <Checkbox checked={!!data[type.name]} onChange={onChange(type.name)}>
          {type.label}
        </Checkbox>
      ))}
    </div>
  )
}

const SearchForm = ({form, handleFieldChange, handleSearch}) => {
  return (
    <form>
      <FormGroup controlId="searchText">
        <ControlLabel>Search</ControlLabel>
        <FormControl
          type="text"
          placeholder="enter text"
          value={form.searchText}
          onChange={handleFieldChange("searchText")} />
      </FormGroup>
      {renderCheckboxes(ITEM_TYPES, form, handleFieldChange)}

      <Button onClick={handleSearch}>Search</Button>
    </form>

  )
}

export default connect(
  {form: getSearchTerms},
  {handleFieldChange: fieldChange, handleSearch: search}
)(SearchForm)
