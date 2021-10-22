Serialise JsonLogic object expressions as Javascript string expressions

## Usage

```javascript
const renderJsonLogic = require("json-logic-to-js");

assert.equal(renderJsonLogic({"<=": [{var: "age"}, 65]}), "age <= 65")
```

See test.js for more examples.

## Motivation

[JsonLogic](https://jsonlogic.com/) (JL) provides a mechanism for defining custom data rules.
I had a need to let users define these rules within larger documents (think online spreadsheets)
where a more concise and user friendly representation of these rules would be useful.
There is a already a library [js-to-json-logic]() for transforming javascript (JS) expressions
which are more concise and user friendly (IMO) to JL expressions but not vice versa.  
However, I wanted to create a visual editor that would need to manipulate the JL object,
so needed to be able to transform back from JL to JS.  Hence I created this library.

## Requirements

1. serialise expressions that include all defined JL operators
2. be compatible with js-to-json-logic
