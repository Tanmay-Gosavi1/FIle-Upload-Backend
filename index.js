//App create
const express = require('express')
const app = express()
require('dotenv').config()

//Middlewares
const fileUpload = require('express-fileupload')
app.use(express.json())
app.use(fileUpload({useTempFiles : true }))

//Routes
const upload = require('./routes/fileRoutes.js')
app.use('/api/v1/upload' , upload)

//Database
const connectDB = require('./config/db.js')
connectDB()

//Cloud
const cloudinary = require('./config/cloudinary.js')
cloudinary()

//Server
const port  = process.env.PORT || 5001
app.listen(port,()=>{
    console.log(`Server is listening at ${port}`);
})