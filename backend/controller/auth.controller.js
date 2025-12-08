import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const register = async (req,res) => {
    try {
        const {username , email , password ,conformPassword , fullName} = req.body

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
        role : "ranger",
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

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false, error:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({success:false, error:"Email or password is wrong"});
        }

        const token = jwt.sign({_id: user._id, role: user.role}, 
            process.env.JWT_KEY , {expiresIn: "10d"}
        );
        return res.status(200).json({success: true, token, user: {_id:user._id, username:user.username ,fullName:user.fullName, role: user.role, avatar:user.avatar},
        });
    } catch(error){
        return res.status(500).json({success: false, error: error.message})
    }
}

//for middleware
const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.user});
}
export {login, register, verify};