const { ApiError } = require('../utils/apiResponse');

/**
 * Generic validation middleware factory.
 * Accepts a Joi-like or custom validator function that returns { error, value }.
 * @param {Function} validatorFn - function(data) => { error, value }
 * @param {'body'|'query'|'params'} source
 */
const validate = (validatorFn, source = 'body') => (req, res, next) => {
  const { error, value } = validatorFn(req[source]);

  if (error) {
    const errors = Array.isArray(error) ? error : [error];
    return next(new ApiError(400, 'Validation failed', errors));
  }

  req[source] = value;
  next();
};

module.exports = validate;