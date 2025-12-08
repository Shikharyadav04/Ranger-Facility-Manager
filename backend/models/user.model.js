import mongoose, { Schema } from "mongoose";

//base model -> Admin
const userSchema = new Schema( {
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