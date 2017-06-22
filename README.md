# couchdb-creator
Utility for dynamically check for, and creating if their existence is doubtful, a specified DB in CouchDB via [nano](https://www.npmjs.com/package/nano). Intended for stuff like Docker containers where one is unable to create the DB manually via Futon or the like.

## Usage
```javascript
  var nano = require("nano")("http://couchdb:5984");
  var creator = require("couchdb-creator");

  var foo = creator(nano, 'foo');
```

With design_doc:
```javascript
  var nano = require("nano")("http://couchdb:5984");
  var creator = require("couchdb-creator");

  var doc = { "views":
      { "by_name_and_city":
        { "map": function(doc) { emit([doc.name, doc.city], doc._id); } }
      }
    };
  var foo = creator(nano, 'foo', {name : 'by_name_and_city', doc : doc});
```
