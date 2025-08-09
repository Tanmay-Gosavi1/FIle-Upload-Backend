const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
require('dotenv').config()

const fileSchema = new mongoose.Schema({
    name :{
        type : String ,
        required : true
    } ,
    imgUrl : {
        type : String
    },
    tags : {
        type : String
    },
    email : {
        type : String
    },
})

// postMiddleware
fileSchema.post('save',async function(doc){
    try {
        let transporter = await nodemailer.createTransport({
            host : 'smtp-relay.brevo.com',
            port : 587,
            auth : {
                user: process.env.SMTP_USER ,
                pass : process.env.SMTP_PASS
            }
        })

        let info = await transporter.sendMail({
            from : process.env.SENDER_EMAIL ,
            to : doc.email ,
            subject : 'New file uploaded on cloudinary',
            html : `<h2>Hello Man</h2><p>File uploaded</p>
            <p>View here : <a href="${doc.imgUrl}">Click me</a></p>`
        })
        console.log("imgUrl :" , doc.imgUrl)
    } catch (error) {
        console.log(error)
    }
})

module.exports = mongoose.model("File" , fileSchema)