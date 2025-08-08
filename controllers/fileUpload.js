const File = require('../models/File.js')
const cloudinary = require('cloudinary')

const localFileUpload = (req,res)=>{
    try {
        
        //Fetch file
        const file= req.files.file
        console.log("File" , file)

        //create path where files needs to be stored in server
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}` ;
        console.log("path" , path)

        //Add path to be move function 
        file.mv(path,(err)=>{
            console.log(err)
        })

        //Successful response
        res.json({success:true , message : "Local file uploaded successfully"})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {localFileUpload}