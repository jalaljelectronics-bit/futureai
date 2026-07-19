// Mounted LAST in app.js. Any error passed via next(err) — including
// ones thrown inside asyncHandler-wrapped controllers — lands here.
function errorHandler(err, req, res, next) {
  console.error(err); // full detail in server logs only

  const status = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'Something went wrong' // never leak stack traces / DB errors to the client
      : err.message;

  res.status(status).json({ success: false, message });
}

module.exports = errorHandler;