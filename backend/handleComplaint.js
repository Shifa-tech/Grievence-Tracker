import express from "express"
import Complaint from "./complaintSchema.js"
import User from "./userSchema.js";
import { sendComplaintStatusSMS } from './twilioService.js'
import { sendComplaintStatusEmail } from './emailService.js'

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
        console.error(error);
        res.status(500).json({ message: "Error while fetching complaint" });
    }
})

router.get("/stats", async (req, res) => {
  try {
    // Get user counts
    const totalStaff = await User.countDocuments({ role: 'staff' })
    const totalCitizens = await User.countDocuments({ role: 'citizen' })
    const totalAdmins = await User.countDocuments({ role: 'admin' })
    const totalUsers = await User.countDocuments()
    
    // Complaint counts
    const totalComplaints = await Complaint.countDocuments()
    const open = await Complaint.countDocuments({ status: 'open' })
    const inProgress = await Complaint.countDocuments({ status: 'in-progress' })
    const resolved = await Complaint.countDocuments({ status: 'resolved' })
    
    const resolutionRate = totalComplaints > 0 ? ((resolved / totalComplaints) * 100).toFixed(1) : 0
    
    // Avg resolution time
    const resolvedComplaints = await Complaint.find({ status: 'resolved' })
    let avgResolutionTime = 0
    if (resolvedComplaints.length > 0) {
      const totalTime = resolvedComplaints.reduce((acc, c) => {
        const created = new Date(c.createdAt)
        const resolvedDate = new Date(c.updatedAt || c.createdAt)
        return acc + ((resolvedDate - created) / (1000 * 60 * 60))
      }, 0)
      avgResolutionTime = (totalTime / resolvedComplaints.length).toFixed(1)
    }
    
    // Group by category
    const byCategory = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ])
    const categoryMap = {}
    byCategory.forEach(c => { categoryMap[c._id] = c.count })
    
    // Group by location
    const byLocation = await Complaint.aggregate([
      { $group: { _id: "$location", count: { $sum: 1 } } }
    ])
    const locationMap = {}
    byLocation.forEach(l => { locationMap[l._id] = l.count })
    
    // Group by urgency
    const byUrgency = await Complaint.aggregate([
      { $group: { _id: "$urgency", count: { $sum: 1 } } }
    ])
    const urgencyMap = { low: 0, medium: 0, high: 0 }
    byUrgency.forEach(u => { urgencyMap[u._id] = u.count })
    
    res.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          staff: totalStaff,
          citizens: totalCitizens,
          admins: totalAdmins
        },
        complaints: {
          total: totalComplaints,
          open,
          inProgress,
          resolved,
          resolutionRate,
          avgResolutionTime
        },
        byCategory: categoryMap,
        byLocation: locationMap,
        byUrgency: urgencyMap
      }
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    res.status(500).json({ success: false, message: "Error fetching statistics" })
  }
})

router.get("/department/:dept", async (req, res) => {           //This is intentionally kept before /:userId router to avoid conflict
  try {
    const { dept } = req.params;
    
    // Convert department name to match category in database
    // If department is "water-leakage", find complaints with that category
    const complaints = await Complaint.find({ 
      category: dept 
    }).populate('userId', 'username email');
    
    res.json({
      success: true,
      complaints: complaints
    });
  } catch (error) {
    console.error("Error fetching department complaints:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching department complaints" 
    });
  }
});

router.get("/staff/:staffId", async (req, res) => {
  try {
    const { staffId } = req.params;
    
    const staff = await User.findById(staffId);
    if (!staff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }
    
    const department = staff.department;
    
    const departmentComplaints = await Complaint.find({ category: department });
    
    const totalAssigned = departmentComplaints.length;
    const totalResolved = departmentComplaints.filter(c => c.status === 'resolved').length;
    const inProgress = departmentComplaints.filter(c => c.status === 'in-progress').length;
    const pending = departmentComplaints.filter(c => c.status === 'open').length;
    
    res.json({
      success: true,
      stats: {
        totalResolved,
        totalAssigned,
        inProgress,
        pending
      }
    });
  } catch (error) {
    console.error("Error fetching staff stats:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching staff stats" 
    });
  }
});

router.get("/user/:userId/stats", async (req, res) => {
  try {
    const { userId } = req.params;
    const userComplaints = await Complaint.find({ userId });
    
    const stats = {
      total: userComplaints.length,
      open: userComplaints.filter(c => c.status === 'open').length,
      inProgress: userComplaints.filter(c => c.status === 'in-progress').length,
      resolved: userComplaints.filter(c => c.status === 'resolved').length
    };
    
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching stats" });
  }
});

router.get("/track/:complaintId", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findById(complaintId);
    
    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }
    
    res.json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching complaint" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    console.log("Request Arrived for user complaints");
    const userId = req.params.userId;
    const user_complaint = await Complaint.find({ userId: userId });
    res.json(user_complaint);  
  } catch (error) {
    console.log("Error in retrieving user complaint");
    console.error(error);
    res.status(500).json([]);  
  }
});

router.patch('/:complaintId/status', async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;

    if (!["open", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Get complaint and user
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const oldStatus = complaint.status;
    
    // Update status
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    // Send notification based on user's preference
    if (oldStatus !== status) {
      const user = await User.findById(complaint.userId);
      
      if (user) {
        const preference = complaint.contactPreference || 'email';
        
        // Send Email
        if (preference === 'email' || preference === 'both') {
          if (user.email) {
            await sendComplaintStatusEmail(user, complaint, oldStatus, status);
            console.log(`📧 Email sent to ${user.email}`);
          } else {
            console.log(`⚠️ No email for user ${user.username}`);
          }
        }
        
        // Send SMS
        if (preference === 'sms' || preference === 'both') {
          if (user.phone) {
            await sendComplaintStatusSMS(user, complaint, oldStatus, status);
            console.log(`📱 SMS sent to ${user.phone}`);
          } else {
            console.log(`⚠️ No phone for user ${user.username}`);
          }
        }
      }
    }

    res.json({
      success: true,
      message: "Complaint status updated successfully",
      complaint: updatedComplaint
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ message: "Error updating complaint status" });
  }
});

export default router