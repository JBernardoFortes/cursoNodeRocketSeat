export function buildRoutePath(path) {
  const routeParameterPathRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(
    routeParameterPathRegex,
    "(?<$1>[a-z0-9\-_]+)",
  );
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}
