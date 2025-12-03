import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        
        console.log("DataBase Connected Successfully !!")

    } catch (error) {
        console.log("Error connecting to Database " ,error)
        throw error
    }
}

export {connectDb}