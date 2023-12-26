// require('dotenv').config({path: './env'});

import dotenv from "dotenv"
import connectDB from "./db/conn.js";

dotenv.config({
    path: './env'
})

connectDB()




// import express from "express";
// const app = express();
// ;( async () =>{
//     try {
//      await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error", ()=>{
//             console.log("ERROR:", error);
//             throw error
//         })
//     } catch (error) {
//         console.log(error);
//         throw err
//     }
// })()