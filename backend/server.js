import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import handleUser from "./handleUser.js";
import handleComplaint from "./handleComplaint.js";

dotenv.config();

const app=express();
app.use(cors());                 //cors is used to connect react with backened
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data


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