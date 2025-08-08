const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('Database connected successfully!');
    })
    .catch(err=>{
        console.log('Issue in db connection')
        console.error(err)
        process.exit(1)
    })
}

module.exports = connectDB