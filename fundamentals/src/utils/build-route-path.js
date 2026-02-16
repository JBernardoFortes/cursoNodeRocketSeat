//users/:id
export function buildRoutePath(path) {
    const routeParameterPathRegex = /:([a-zA-Z]+)/g
    
    console.log(Array.from(path.matchAll(routeParameterPathRegex)))
    // The matchAll() method of String values returns an 
    // iterator of all results matching this string against
    // a regular expression, including capturing groups

    // matchAll(regexp)
    // A regular expression object, or any object that has
    // a Symbol.matchAll method.

    // It returns a iterable iterator object ( which is not restartable)
    // of matches or an empty iterator if no matches are found.
    // Each value yielded by the iterator is an array with
    // the same shape as the ret urn value of RegExp.prototype.exec()
}
