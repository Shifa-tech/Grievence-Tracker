import express from "express"
import Complaint from "./complaintSchema.js"

const router=express.Router();
router.post('/',async(req,res)=>{
    const date = new Date().toLocalString();
    const {category,title,description,location,contactPreference,urgency,photos}=req.body;
    try{
        const complaint=new Complaint({
           urgency:urgency,
           category:category,
           isAssign : "false",
           status:"Open",
           title:title,
           description:description,
           location:location,
           photos:photos,
           contactPreference:contactPreference,
           submission_date:date,
        })
        await complaint.save();
        res.json({
            message:"complaint is submitted"
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
router.get(`/citizen/:userId`,async(req,res)=>{
        try{
            const user_complaint = await Complaint.find({userId:req.body.userId})
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