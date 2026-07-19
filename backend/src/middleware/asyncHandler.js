// Wraps an async controller so any thrown error / rejected promise
// is passed to next(err) automatically, instead of crashing the
// process or needing try/catch in every single controller.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;