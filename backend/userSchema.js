import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const user = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        enum: ["road-damage", "water-leakage", "garbage", "electrical", "safety", "none"],
        default: "none"
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
})

user.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

user.methods.generateToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        role: this.role
    },
    process.env.ACCESS_TOKEN,
    {
        expiresIn: process.env.TOKEN_EXPIRY || '1d'
    })
}

user.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    },
    process.env.REFRESH_TOKEN,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
    })
}

const User = mongoose.model('User', user);
export default User;