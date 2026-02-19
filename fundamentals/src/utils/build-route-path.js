//users/:id
export function buildRoutePath(path) {
  const routeParameterPathRegex = /:([a-zA-Z]+)/g;

  const pathWithParams = path.replaceAll(
    routeParameterPathRegex,
    "(?<$1>[a-z0-9\-_]+)",
  );

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
  // achei confuso ^^ 

  // The replaceAll() method of String values returns a new string
  // with all matches of a pattern replaced by a replacement.
  // The pattern can be a string or a RegExp, and the replacement
  // can be a string or a function to be called for each match.
  // The original string is left unchanged

  // replaceAll(CanvasPattern, replacement)
  //
  // Pattern - Can be a string or an object with a Symbol.replace
  // method -- the typical example being a regular expression.
  // Any value that doesn't have the Symbol.replace method will
  // be coerced to a string
  // replacement - Can be a string or a function. The replacement
  // has the same semantics as that of String.prototype.replace()
  //
  // Return value
  // A new String, with all matches of a pattern replaced by a
  // replacement

  // --=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-

  // The matchAll() method of String values returns an
  //
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
