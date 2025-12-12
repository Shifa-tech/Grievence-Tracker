import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();

const app=express();
app.use(cors()); //cors is used to connect react with backened
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Atlas Connected!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); 
  }
};

app.use("/api/user",handleUser)
app.use("/api/complaint",handlecomplaint)

app.listen(process.env.port,()=>{
    console.log("server is running");
})