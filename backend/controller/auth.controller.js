import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
export const register = async (req,res) => {
    try {
        const {username , email , password ,conformPassword , fullName , role} = req.body

    if( !password || !username || !fullName || !email || !role) {
        return res.status(400).json({error : "Invalid Data : Please Provide All Fields"})
    }
    if(password != conformPassword){
        return res.status(400).json({error : "Password does not match"})
    }
    const existingUser = await User.findOne({
        $or : [{username:  username} , {email : email}]
    })

    if(existingUser) {
        return res.status(400).json({error : "User already exist"})
    }

    const avatar =  "https://robohash.org/PowerRanger.png" 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt)
    
    const newUser = await User.create({
        username : username,
        email : email,
        role : role,
        fullName : fullName,
        password : hashedPassword,
        avatar : avatar
    })

    if(newUser) {
        await newUser.save()
        return res.status(200).json({
            user : {
            id: newUser._id ,
            fullName : newUser.fullName,
            username : newUser.username,
            email : newUser.email
            } ,
            message : "User Registered Successfully"
        })
    }else return res.status(400).json({error : "Invalid user data !!"})
    

    
        
    } catch (error) {
        console.log("Register Controller Error :  ",error.message) ;
        return res.status(500).json({
            error : "Internal Server Error",
        });
    }


}