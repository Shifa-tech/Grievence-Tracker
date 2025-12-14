import express from "express"
import User from "userSchema.js"

const router=express.Router();

router.post("/login",async(req,res)=>{
    const [username,password]=req.body;
    const user = await User.findOne(username);
    if(!user) {
        return res.json({message:"Invalid Credential"})
    }
    if(user.password!==password) {
        return res.json({message:"Invalid Password"})
    }
    res.json({
        message:"successfully logged in!"
    })
})
router.post("/register",async(req,res)=>{
    const [username,email,password]=req.body;
    const user = await User.findOne(username);
    if(user) {
        return res.json({message:"Already Registered"})
    }
    const newUser=new User({
        role:"citizen",
        username:username,
        email:email,
        password:password
    })

    await newUser.save();
    res.json({
        message:"successfully registered!"
    })
})
