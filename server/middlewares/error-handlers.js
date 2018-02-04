/**
 * Logs errors to the stedrr
 * @param {Error} err The error object
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @param {Function} next Funtion to call to continue the request
 * @return {void}
 */
export function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

/**
 * Handles ajax requests
 * @param {Error} err The error object
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @param {Function} next Funtion to call to continue the request
 * @return {void}
 */
export function errorHandler(err, req, res, next) {
  res.status(500);

  const data = {
    message: 'Internal Server Error',
  };
  const expectsJson = true;

  if (expectsJson) {
    res.json(data);
  } else {
    res.render('error', data);
  }
}
