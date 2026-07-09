import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import paymentRoutes from './paymentRoutes.js'
import handleUser from "./handleUser.js";
import handleComplaint from "./handleComplaint.js";

dotenv.config();

console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? '✅ Loaded' : '❌ Missing')
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '✅ Loaded' : '❌ Missing')

if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
  console.error('❌ ERROR: ACCESS_TOKEN and REFRESH_TOKEN must be set in .env file');
  process.exit(1);
}

const app=express();
app.use(cors());                 //cors is used to connect react with backened
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({ extended: true,limit:'10mb' })); // For form data


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
    });
    console.log('✅ MongoDB Atlas Connected!');
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); 
  }
};
connectDB();

app.use("/api/user",handleUser)
app.use("/api/complaint",handleComplaint)
app.use("/api/payment", paymentRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port : ${process.env.PORT}`);
})