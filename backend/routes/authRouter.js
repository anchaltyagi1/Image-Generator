const express = require('express')
const { signup, login } = require('../controllers/authController')
const authRouter = express.Router()

authRouter.route('/sign-up')
    .post(signup)

authRouter.route('/sign-in')
    .post(login)

module.exports = authRouter