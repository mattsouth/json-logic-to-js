// generates anonymous function for rendering an infix operator
function infix2(functor) {
    // expects args to be a double valued array.  ignores any other array elements.
    return function(args, depth) {
        const rendered = render(args[0], depth) + " " + functor + " " + render(args[1], depth);
        return depth>1 ? "(" + rendered + ")" : rendered;
    }
}

// generates anonymous function for rendering a single valued prefix operator
function prefix1(functor) {
    // expects args to be a single valued array or a single value.
    return function(args, depth) {
        return Array.isArray(args) ? functor + render(args[0], depth) : functor + render(args, depth);
    }
}

// a map of custom strategies for rendering operators
const rendermap = {
    var: (args) => Array.isArray(args) ? args[0] : args,
    and: infix2("&&"),
    or: infix2("||"),
    "!": prefix1("!"),
    "!!": prefix1("!!"),
    if: (args, depth) => render(args[0], depth) + " ? " + render(args[1], depth) + " : " + render(args[2], depth)
};

[">=","<=","<",">","==","===","!=","!==","+","-","*","/","%"].forEach((sym) => rendermap[sym] = infix2(sym));

// workhorse recursive function
function render(expr, depth=0) {
    if (typeof expr === "object") {
        const [key, value] = Object.entries(expr)[0];
        if (Object.keys(rendermap).includes(key)) {
            return rendermap[key](value, depth+1);
        } else {
            // default rendering of an operator is "prefixmany"
            return key + "(" + value.map((arg) => render(arg, depth)).join(", ") + ")";
        }
    } else {
        // should suffice for all non-object valued expressions
        return JSON.stringify(expr);
    }
}

/**
 * convert jsonLogic expression to equivalent javascript expression string.
 */
export default function renderJsonLogic(expr) {
    return render(expr);
}
