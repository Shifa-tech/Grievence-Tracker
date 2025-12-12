import mongoose from 'mongoose'

const complaint = new mongoose.Schema({
    id:{
        type: String,
        required : true
    },
    urgency_level:{
        type: String,
        required : true

    },
    category:{
        type: String,
        required : true
    },
    isAssign:{
        type: String,
        required : true
    },
    submission_date:{
        type: String,
        required : true
    },
    status:{
        type: String,
        required : true
    }
})