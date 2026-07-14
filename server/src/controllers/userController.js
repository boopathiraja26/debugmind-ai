const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { ApiError, sendSuccess } = require("../utils/apiResponse");

// GET /api/users/profile
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  sendSuccess(res, 200, "Profile fetched successfully", { user });
});

// PUT /api/users/profile
const updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.name = name || user.name;

  await user.save();

  sendSuccess(res, 200, "Profile updated successfully", { user });
});

module.exports = {
  getProfile,
  updateProfile,
};