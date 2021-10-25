import assert from 'assert';
import transformJS from "js-to-json-logic";
import renderJsonLogic  from "./index.js";

// these tests cant ensure that this library is the inverse of js-to-json-logic,
// but they can provide confidence that the two can be thought of as compatible

// note that spaces and brackets in the text fields below are adjusted to match expected output
const roundtrips = [
  { text: "age <= 65", obj: {"<=": [{var: "age"}, 65]}},
  { text: "temperature", obj: {var: "temperature"}},
  { text: "max(1, 2, 3)", obj: {max: [1,2,3]} },
  { text: "(temp > 37) ? \"hot\" : \"normal\"", obj: {if:[{">": [{var: "temp"},37]},"hot","normal"]}},
  { text: "active || passive", obj: {"or": [{var: "active"},{var: "passive"}]}},
  { text: "!ok", obj: {"!": [{var: "ok"}]}}
]

describe('example roundtrips', () => {
  for (const test of roundtrips) {
    it(test.text, () => {
      const expr = transformJS(test.text);
      assert.deepEqual(expr, test.obj);
      assert.equal(renderJsonLogic(expr), test.text);
    })
  }
});

describe('edge cases', () => {
  it('empty object', () => {
    assert.equal(renderJsonLogic({}), "");
  });
  it('null', () => {
    assert.equal(renderJsonLogic(null), ""); // might be better to raise exception
  });
  it('undefined', () => {
    assert.equal(renderJsonLogic(undefined), undefined); // follows JSON.stringify
  });
  it('NaN', () => {
    assert.equal(renderJsonLogic(NaN), "null"); // follows JSON.stringify
  });
});
