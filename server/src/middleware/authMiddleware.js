const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError } = require('../utils/apiResponse');

/**
 * Protects routes by verifying JWT from the Authorization header (Bearer token).
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, 'Not authorized, token invalid or expired');
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, 'Not authorized, user no longer exists');
  }
  if (!user.isActive) {
    throw new ApiError(403, 'This account has been deactivated');
  }

  req.user = user;
  next();
});

/**
 * Restricts route access to specific roles.
 * @param  {...string} roles
 */
const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'));
  }
  next();
};

module.exports = { protect, authorize };