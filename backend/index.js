import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import AuthRoute from "./Routes/AuthRoute.js"
import CarRoute from "./Routes/CarRoute.js"
import OwnerRoute from "./Routes/OwnerRoute.js"
import BookingRoute from "./Routes/BookingRoute.js"
import UserRoute from "./Routes/UserRoute.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// middlwares
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// routes 
app.use('/api/auth',AuthRoute)
app.use('/api/cars',CarRoute)
app.use('/api/owner',OwnerRoute)
app.use('/api/booking',BookingRoute)
app.use('/api/user',UserRoute)




// connect to database
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to db")
}).catch((error)=>{
    console.log("failed to connect to db",error)
})


// app.use("/",(req,res)=>{
//     res.send("hello")
// })

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})