export default function handleErrors(err, req, res, next) {
  res.status(500);

  const data = {
    message: 'Internal Server Error',
  };
  const expectsJson = req.accepts('application/json');

  if (expectsJson) {
    res.json(data);
  } else {
    res.render('error', data);
  }
}
