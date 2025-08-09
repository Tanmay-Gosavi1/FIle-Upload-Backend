const express = require('express')
const router = express.Router()

const {imageUpload , localFileUpload , videoUpload} = require('../controllers/fileUpload.js')
// imageReducerUpload ,

router.post('/localFileUpload' , localFileUpload)
router.post('/imageUpload' , imageUpload)
router.post('/videoUpload' , videoUpload)

module.exports = router