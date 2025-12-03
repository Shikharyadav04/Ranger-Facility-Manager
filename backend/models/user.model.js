import mongoose, { Schema } from "mongoose";


const userSchema = new Schema( {
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim :true,
        index:true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim :true,
        index:true
    },
    password : {
        type :String,
        required : true,
    },
    fullName :{
        type :String,
    },

    role : {
     type : String,
    enum : ["admin" , "ranger" ,"engineer"],
    required :true,
    } ,

    avatar : {
        type : String,
    }

} , {timestamps : true})


const User = mongoose.model("User" , userSchema )

export {User}