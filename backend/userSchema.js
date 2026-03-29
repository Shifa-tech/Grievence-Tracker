import mongoose from "mongoose";

const user=new mongoose.Schema({
    role:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique : true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        
    },
    department:{
        type:String,
        enum : ["road-damage" , "water-leakage" , "garbage","electrical" , "safety" , "other"],
        default:"none"
    }
})

const User = mongoose.model('User' ,user );
export default User;