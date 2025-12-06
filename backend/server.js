
import express from "express";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import { connectDb } from "./database/connectDb.js";
import cookieParser from "cookie-parser";
import reqRouter from "./routes/req.routes.js";

configDotenv()

const app = express() ;
const PORT = process.env.PORT || 5000; 


app.get("/" , (req,res) => {
    res.send("Hello")
})


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : true}))

app.use("/api/auth",authRoutes)
app.use("/api/problem" , reqRouter );

app.listen(PORT , () => {
    connectDb();
    console.log(`Server running on ${PORT}`)
}) 