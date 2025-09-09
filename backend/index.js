import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import userRoute from "./Router/userRouter.js"

const app = express();
dotenv.config({quiet: true});

app.use(cookieParser())
app.use(express.json())
app.use(cors());

const mongodb_uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4001;
try {
    mongoose.connect(mongodb_uri);
    console.log("Mongodb connected successfully")
} catch (error) {
    console.log(error)
}

app.use("/api/Users",userRoute)

app.listen(PORT,() => {
    console.log("Server is listening in port",PORT)
})
