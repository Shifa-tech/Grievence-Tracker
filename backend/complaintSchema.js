import mongoose from 'mongoose'

const complaint = new mongoose.Schema({
    urgency:{
        type: String,
        required : true,
        enum :["low" , "medium" , "high"]
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
        type: Boolean,
        default:false
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
        default :[]
    },
    submission_date:{
        type: Date,
        required : true
    },
    status:{
        type: String,
        required : true,
        enum : ["open" , "in-progress","resolved"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:'true'
    }
})
const Complaint=mongoose.model('Complaint',complaint)
export default Complaint