Serialise JSON Logic objects into JavaScript syntax.

## Usage

```javascript
import renderJsonLogic from "json-logic-to-js";

assert.equal(renderJsonLogic({"<=": [{var: "age"}, 65]}), "age <= 65")
```

See test.js for more examples.

## Motivation

[JSON Logic](https://jsonlogic.com/) (JL) provides a mechanism for defining custom data rules.
I had a need to let users define these rules within larger documents (think online spreadsheets)
where a more concise and user friendly representation of these rules would be useful.
The library [js-to-json-logic](https://github.com/krismuniz/js-to-json-logic) generates
JSON Logic objects from JavaScript syntax expressions which are more concise and user friendly (IMO).
However, for my use case I'll need to also transform back to JS syntax from JL objects,
e.g. from a visual editor that would need to manipulate the JL object. Hence I created this library.

## Requirements

1. serialise expressions that include all defined JL operators
2. be compatible with js-to-json-logic
