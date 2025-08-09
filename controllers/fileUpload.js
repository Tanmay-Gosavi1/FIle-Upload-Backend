const File = require('../models/File.js')
const cloudinary = require('cloudinary').v2

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

const checkTypeValidity = (fileType , validFileTypes) =>{
    return validFileTypes.includes(fileType)
}

const uploadToCloudinary = async (file, folder ,quality)=>{
    const options = {folder}
    options.resource_type = "auto"
    if(quality){
        options.quality = quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath , options)
}

const imageUpload =async (req,res)=>{
    try {
        //Destrusturing of req
        const {name , email , tags} = req.body 
        console.log(name, email , tags)

        const file = req.files.imageFile ;
        const fileType = file.name.split('.').pop().toLowerCase() ;
        const validFileTypes = ['jpg' , 'jpeg' , 'png']

        //Validations
        if(!checkTypeValidity){
            return res.status(400).json({success:false , message : "Invalid file format"})
        }

        //Cloudinary pe store
        const response = await uploadToCloudinary(file , "FileUpload")

        //databse mei entry
        const newFile = new File({
            name , email  , tags , imgUrl : response.secure_url
        })

        await newFile.save()

        //Success response
        return res.status(200).json({success:true , message : "File uploaded successfully"})
        
    } catch (error) {
        console.log(error)
    }    
}

const videoUpload = async (req,res)=>{
    //Destructuring 
    try {
        const {name , email , tags} = req.body 
        //File type validation
        const file = req.files.videoFile
        const fileType = file.name.split('.').pop().toLowerCase()
        const validFileTypes = ["mp4"]

        if(!checkTypeValidity(fileType , validFileTypes)){
            return res.status(400).json({success:false , message : "Invalid video format"})
        }
        //Cloudinary pe store
        const response = await uploadToCloudinary(file , "FileUpload")
        console.log(response)
        //Db mei entry store
        const newFile = new File({
            name , email , tags , imgUrl : response.secure_url
        })
        await newFile.save()
        //Success response
        res.status(200).json({success : true , message : "VideoFile uploaded successfully!"})
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({success:false , message : "Issue in Video Upload"})
    }
}

const imageReduceUpload =async (req,res)=>{
    try {
        //Destrusturing of req
        const {name , email , tags} = req.body 
        console.log(name, email , tags)

        const file = req.files.imageFile ;
        const fileType = file.name.split('.')[1].pop().toLowerCase() ;
        const validFileTypes = ['jpg' , 'jpeg' , 'png']

        //Validations
        if(!checkTypeValidity){
            return res.status(400).json({success:false , message : "Invalid file format"})
        }

        //Cloudinary pe store
        const response = await uploadToCloudinary(file , "FileUpload" , 90)

        //databse mei entry
        const newFile = new File({
            name , email  , tags , imgUrl : response.secure_url
        })

        await newFile.save()

        //Success response
        return res.status(200).json({success:true , message : "File uploaded successfully"})
        
    } catch (error) {
        console.log(error)
    }    
}

module.exports = {localFileUpload , imageUpload,videoUpload ,imageReduceUpload}