import assert from 'assert';
import transformJS from "js-to-json-logic";
import renderJsonLogic from "./index.js";

// these tests cant ensure that this library is the inverse of js-to-json-logic,
// but they can provide confidence that the two can be thought of as compatible

// note that spaces and brackets in the text fields below are adjusted to match expected output
const roundtrips = [{
        text: "1 == 1",
        obj: {
            "==": [1, 1]
        }
    },
    {
        text: "(3 > 1) && (1 < 3)",
        obj: {
            "and": [{
                    ">": [3, 1]
                },
                {
                    "<": [1, 3]
                }
            ]
        }
    },
    {
        text: "temperature",
        obj: {
            var: "temperature"
        }
    },
    {
        text: "age <= 65",
        obj: {
            "<=": [{
                var: "age"
            }, 65]
        }
    },
    {
        text: "max(1, 2, 3)",
        obj: {
            max: [1, 2, 3]
        }
    },
    {
        text: "if (temp > 37) { \"hot\" } else { \"normal\"}",
        obj: {
            if: [{
                ">": [{
                    var: "temp"
                }, 37]
            }, "hot", "normal"]
        }
    },
    {
        text: "active || passive",
        obj: {
            "or": [{
                var: "active"
            }, {
                var: "passive"
            }]
        }
    },
    {
        text: "!ok",
        obj: {
            "!": [{
                var: "ok"
            }]
        }
    },
    {
        text: "if ((i % 15) == 0) { \"fizzbuzz\" } else { if ((i % 3) == 0) { \"fizz\" } else { if ((i % 5) == 0) { \"buzz\" } else { i}}}",
        obj: {
            "if": [{
                    "==": [{
                        "%": [{
                            "var": "i"
                        }, 15]
                    }, 0]
                },
                "fizzbuzz",
                {
                    "if": [{
                            "==": [{
                                "%": [{
                                    "var": "i"
                                }, 3]
                            }, 0]
                        },
                        "fizz",
                        {
                            "if": [{
                                    "==": [{
                                        "%": [{
                                            "var": "i"
                                        }, 5]
                                    }, 0]
                                },
                                "buzz",
                                {
                                    "var": "i"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
];

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
    it('fizzbuzz', () => {
        // a formulation of fizzbuzz that is supported by json-logic but doesnt seem to be created by js-to-json-logic so not covered by the associated round-trip test
        const fizzbuzz = {
            "if": [{
                    "==": [{
                        "%": [{
                            "var": "i"
                        }, 15]
                    }, 0]
                },
                "fizzbuzz",
                {
                    "==": [{
                        "%": [{
                            "var": "i"
                        }, 3]
                    }, 0]
                },
                "fizz",
                {
                    "==": [{
                        "%": [{
                            "var": "i"
                        }, 5]
                    }, 0]
                },
                "buzz",
                {
                    "var": "i"
                }
            ]
        };
        const copy = JSON.parse(JSON.stringify(fizzbuzz));
        assert.equal(renderJsonLogic(fizzbuzz), "if ((i % 15) == 0) { \"fizzbuzz\" } else if ((i % 3) == 0) { \"fizz\" } else if ((i % 5) == 0) { \"buzz\" } else { i}");
        assert.deepEqual(fizzbuzz, copy, "expression should not be changed by render");
    })
});
