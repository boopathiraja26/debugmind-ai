/**
 * Wraps an async controller/middleware to forward errors to Express error handler.
 * @param {Function} fn - async function (req, res, next)
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
