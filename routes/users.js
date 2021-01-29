const express = require('express');
const bcrypt = require('bcryptjs');
const bearerToken = require('express-bearer-token');
const { User } = require('../models');
const { generateUserToken, requireAuth } = require('../auth');
const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.use(express.json());
router.use(bearerToken());

router.post(
  '/',
  asyncHandler(async (req, res) => {
    // create a new user
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ username, email, hashedPassword });
    // generate a token to send in our response
    const token = generateUserToken(user);
    res.json({ token });
  })
);

// create a protected route
router.get('/currentUser', requireAuth, asyncHandler(async (req, res) => {
  // res.json({currentUser: })
}))

module.exports = router;
