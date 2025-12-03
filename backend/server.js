
import express from "express";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import { connectDb } from "./database/connectDb.js";

configDotenv()

const app = express() ;
const PORT = process.env.PORT || 5000; 


app.get("/" , (req,res) => {
    res.send("Hello")
})

app.use("/api/auth",authRoutes)

app.listen(PORT , () => {
    connectDb();
    console.log(`Server running on ${PORT}`)
}) 