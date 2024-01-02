// require('dotenv').config({path: './env'});
import express from "express"

const app = express();
import dotenv from "dotenv"
import connectDB from "./db/conn.js";

dotenv.config({
    path: './env'
})

connectDB().then(
    ()=>{
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`server is running at port ${process.env.PORT}`)
        });
        app.on("error at server ", (err)=>{
            console.log("errr:", err);
            throw err
        })
    }
).catch((err)=>{
    console.log("Error at index page", err)
})




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