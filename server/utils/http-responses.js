export function respondOk(res, data = {}) {
  res.status(200).json(data);
}

export function respondBadRequest(res, message = 'Bad Request') {
  res.status(400).json({ message });
}

export function respondUnauthorized(res, message = 'Unauthorised') {
  res.status(401).json({ message });
}

export function respondForbidden(res, message = 'Forbidden') {
  res.status(403).json({ message });
}

export function respondNotFound(res, message = 'Not Found') {
  res.status(404).json({ message });
}

export function respondServerError(res, message = 'Server Error') {
  res.status(500).json({ message });
}

export function respondWithView(res, view, data = {}) {
  res.render(view, data);
}
