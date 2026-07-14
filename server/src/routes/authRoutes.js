const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { validateRegister, validateLogin } = require('../validators/authValidator');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', validate(validateRegister), registerUser);

// @route   POST /api/auth/login
router.post('/login', validate(validateLogin), loginUser);

// @route   GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;