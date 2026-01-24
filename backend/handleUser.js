import express from "express"
import User from "./userSchema.js"

const router=express.Router();

router.post("/login",async(req,res)=>{
    try{
    const {username,password}=req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    const user = await User.findOne({username : username});
    if(!user) {
        console.log("User Not Found");
        
        return res.json({message:"Invalid Credential"})
    }
    console.log("User found with the entered username");
    
    if(user.password!==password) {
        console.log('====================================');
        console.log("Password is Incorrect");
        console.log('====================================');
        return res.json({message:"Invalid Password",
            data: {
                id: user._id,
                role: user.role,
                username: user.username,
                email: user.email
            }
        })
    }
    res.status(200).json({
        message:"successfully logged in!",
        data :{
          id: user._id,
          role: user.role,
          username: user.username,
          email: user.email
        }
    })
    }catch(err){
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
})

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

    const user = await User.findOne({username : username});
    if (user) {
    return res.status(409).json({  
      message: "Already Registered",
      data: {
        id: user._id,  
        role: user.role,
        username: user.username,
        email: user.email
      }
        });
    }
    const newUser=new User({
        role:"citizen",
        username:username,
        email:email,
        password:password
    })

    const response = {
        id:newUser._id,
        role:"citizen",
        username:username,
        email:email
    }

    await newUser.save();
    res.status(201).json({
        message:"successfully registered!",
        data : response
    })

    }catch(error){
        console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
    }
})
export default router