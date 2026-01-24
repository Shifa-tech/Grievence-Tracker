import express from "express"
import Complaint from "./complaintSchema.js"

const router=express.Router();

router.post('/',async(req,res)=>{
    const date = new Date().toLocaleString();
    const {complaintType,complaintTitle,complaintDescription,locationArea,contactPreference,urgency,photos,userId}=req.body;
    try{
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