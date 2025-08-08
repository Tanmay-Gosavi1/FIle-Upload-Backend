const express = require('express')
const router = express.Router()

const { localFileUpload} = require('../controllers/fileUpload.js')
// imageUpload , videoUpload , imageReducerUpload ,

router.post('/localFileUpload' , localFileUpload)

module.exports = router