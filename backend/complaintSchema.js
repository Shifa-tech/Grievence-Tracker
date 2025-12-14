import mongoose from 'mongoose'

const complaint = new mongoose.Schema({
    id:{
        type: String,
        required : true,
        unique :true
    },
    urgency:{
        type: String,
        required : true,
        enum :["low" , "midium" , "high"]
    },
    category:{
        type: String,
        required : true,
        enum : ["road-damage" , "water-leakage" , "garbage","electrical" , "safety" , "other"]
    },

    contactPreference:{
        type : String,
        enum:["email","sms","both"]
    },
    
    isAssign:{
        type: String,
        required : true,
        enum : ["Yes" , "No"]
    },
    title:{
        type: String,
        required : true,
    },
    description:{
         type: String,
        required : true,
    },
    location:{
         type: String,
        required : true,
    },
    photos:{
        type:Array,

    },
    submission_date:{
        type: String,
        required : true
    },
    status:{
        type: String,
        required : true,
        enum : ["open" , "in-progress","resolved"]
    }
})
const Complaint=mongoose.model('Complaint',complaint)
export default Complaint