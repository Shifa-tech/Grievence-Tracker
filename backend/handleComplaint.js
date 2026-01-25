import express from "express"
import Complaint from "./complaintSchema.js"

const router=express.Router();
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 5 // Maximum 5 files
  }
})

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true })
}

router.use('/uploads', express.static('uploads'))


router.post('/',upload.array('photos', 5),async(req,res)=>{
    const date = new Date().toLocaleString();
    try{
        const photos = req.files ? req.files.map(file => `/api/complaint/uploads/${file.filename}`) : []
        const {complaintType,complaintTitle,complaintDescription,locationArea,contactPreference,urgency,userId}=req.body;

        const complaint=new Complaint({
           urgency:urgency,
           category:complaintType,
           isAssign : false,
           status:"open",
           title:complaintTitle,
           description:complaintDescription,
           location:locationArea,
           photos:photos,
           contactPreference:contactPreference,
           submission_date:date,
           userId:userId
        })
        await complaint.save();
            res.status(201).json({
            message: 'Complaint submitted successfully',
            complaint: complaint
        })
    }
    catch(err){
        console.log("Error while submitting complaint");
        console.error(err);
    }

})
router.get('/',async(req,res)=>{
    try{
       const complaint= await Complaint.find();
       res.json(complaint)
    }catch(error){
        console.log("Error while fetching complaint");
        console.error(err);
    }
})

router.get(`/:userId`,async(req,res)=>{
        try{
            console.log("Request Arrived");
            const userId=req.params.userId
            const user_complaint = await Complaint.find({userId:userId})
            if(!user_complaint)res.status(404).json({message:"Cannot retrive user complaint"})
            res.json(user_complaint)
    }catch(error){
        console.log("Error in retriving user complaint");
    }
})
router.patch('/',async(req,res)=>{
      try{

    }catch(error){
        
    }
})
export default router