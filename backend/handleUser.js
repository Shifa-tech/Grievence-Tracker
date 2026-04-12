import express from "express"
import User from "./userSchema.js"
import bcrypt from 'bcrypt'

const router=express.Router();

router.get("/staff", async(req,res)=>{
    try {
        const staff = await User.find({ role: 'staff' }).select('-password');
        console.log(staff);
        console.log("Staff acquired");
        
        res.status(200).json(staff)
        
    } catch (error) {
        console.log("Error while fetching complaint");
        console.error(err);
        res.status(500).json([]);  
    }
})

router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken');
    res.status(200).json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.post("/login",async(req,res)=>{
    try{
    const {username,password}=req.body;

    if (!username || !password) {
        return res.status(400).json({success:false ,  message: "Username and password required" });
    }

    const user = await User.findOne({username : username});

    if(!user) {
        console.log("User Not Found");
        
        return res.json({success:false , message:"Invalid Credential"})
    }
    console.log("User found with the entered username");
    
    const isPasswordValid = await user.isPasswordCorrect(password);
    
    if (!isPasswordValid) {
      console.log("Password incorrect for user:", username);
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }
    
    const accessToken = user.generateToken();
    const refreshToken = user.generateRefreshToken();
    
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success:true,
        message:"successfully logged in!",
        data :{
          id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
          department : user.department
        },
        accessToken,refreshToken
    })
    }catch(err){
        console.error("Login error:", err);
        res.status(500).json({success:false , message: "Internal server error", error: err.message });
    }
})

router.post("/create-staff", async (req, res) => {
  try {
    const { username, email, password, department, role } = req.body;
    
    console.log(" Creating staff:", { username, email, department });
    
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "Username or email already exists" 
      });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newStaff = new User({
      role: role || "staff",  
      username: username,
      email: email,
      password: hashedPassword,
      department: department || "none"
    });
    
    await newStaff.save();
    const accessToken = newStaff.generateToken();
    
    const response = {
      id: newStaff._id,
      role: newStaff.role,
      username: newStaff.username,
      email: newStaff.email,
      department: newStaff.department
    };
    
    console.log(" Staff created successfully:", username);
    
    res.status(201).json({
      success: true,
      message: "Staff created successfully!",
      data: response,
      accessToken: accessToken
    });
    
  } catch (error) {
    console.error(" Error creating staff:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error", 
      error: error.message 
    });
  }
});

router.post("/register",async(req,res)=>{
    try{
    if (!req.body) {
      return res.status(400).json({ 
        message: "Request body is missing" 
      });
    }

    const {username,email,password}=req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: "All fields are required: username, email, password" 
      });
    }

    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });

    const data = {
          id: existingUser._id,  
          role: existingUser.role,
          username: existingUser.username,
          email: existingUser.email}
    
    if (existingUser) {
      return res.status(409).json({  
        success: false,
        message: "Username or email already registered",
        data: data
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser=new User({
        role:"citizen",
        username:username,
        email:email,
        password:hashedPassword,
        department:"none"
    })
    await newUser.save();

    const accessToken = newUser.generateToken();
    const refreshToken = newUser.generateRefreshToken();
    
    newUser.refreshToken = refreshToken;
    await newUser.save({ validateBeforeSave: false });
    
    const response = {
        id:newUser._id,
        role:"citizen",
        username:username,
        email:email,
        department : "none"
    }

    res.status(201).json({
        success:true,
        message:"successfully registered!",
        data : response,
        accessToken:accessToken
    })

    }catch(error){
        console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
    }
})

router.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      console.log("Logout successful");
    }
    
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Error during logout" });
  }
});

export default router