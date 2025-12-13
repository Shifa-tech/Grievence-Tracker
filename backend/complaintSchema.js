import mongoose from 'mongoose'

const complaint = new mongoose.Schema({
    id:{
        type: String,
        required : true,
        unique :true
    },
    urgency_level:{
        type: String,
        required : true,
        enum :["low" , "moderate" , "high"]
    },
    category:{
        type: String,
        required : true,
        enum : ["road-damage" , "water-leakage" , "garbage not connected"]
    },
    isAssign:{
        type: String,
        required : true,
        enum : ["Yes" , "No"]
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
export default complaint