const express = require('express')
const { generateImage, getImages } = require('../controllers/imageController')

const imageRouter = express.Router()

imageRouter.route('/')
    .get(getImages)
    .post(generateImage)

module.exports = imageRouter