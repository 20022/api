# Unofficial ISO20022 element API

### API

 - `/element/:id` - get a single element by `xmi:id`
 - `/element` - get all elements (100 at a time)
 - `/element?limit=50&offset=5000` - paging options
 - `/element?$text=SOME_TEXT` - text searching
 - `/element?_type=SOME_TYPE` - filtering by any field
