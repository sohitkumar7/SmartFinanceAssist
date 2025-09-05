import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cookieParser())
app.use(express.json())

const mongodb_uri = process.env.MONGODB_URI;
const PORT = process.env.PORT;
try {
    mongoose.connect(mongodb_uri);
    console.log("Mongodb connected successfully")
} catch (error) {
    console.log(error)
}





app.listen(PORT,() => {
    console.log("Server is listening in port",PORT)
})