# Unofficial ISO20022 element API

### API

 - `/element/:id` - get a single element by `xmi:id`
 - `/element` - get all elements (100 at a time)
 - `/element?limit=50&offset=5000` - paging options
 - `/element?$text=SOME_TEXT` - text searching
 - `/element?_type=SOME_TYPE` - filtering by any field
 - `/element/:id/ancestors` - an array of all the ancestors for the element
 - `/element/:id/full` - a single element, but with fields containing ids expanded
