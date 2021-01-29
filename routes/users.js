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

// frontend js

// const form = document.getElementById('some-form')

// form.addEventListener('submit', (e) => {
//   // do some things
//   const res = await fetch('/users', {
//     method: 'POST',
//     body: JSON.stringify(body)
//   })
//   const data = await res.json()
//   localStorage.setItem('auth-token', data.token)
// })

// const res = await fetch('/users/currentUser', {
//   method: 'POST',
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
//   }
// })

// create a protected route
router.get(
  '/currentUser',
  requireAuth,
  asyncHandler(async (req, res) => {
    res.json({ currentUser: res.locals.user });
  })
);

module.exports = router;
