import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n Database Connection !!!!`);
        
    } catch (error) {
        console.log("Error hai:", error);
    }
}

export default connectDB