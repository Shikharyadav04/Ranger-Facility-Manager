import { User } from "../models/user.model.js";
import {Ranger} from '../models/ranger.model.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const register = async (req,res) => {
    try {
        const {fullName, email , phoneNumber, location, password ,confirmPassword} = req.body

    if( !password || !phoneNumber || !fullName || !email) {
        return res.status(400).json({error : "Invalid Data : Please Provide All Fields"})
    }
    if(password != confirmPassword){
        return res.status(400).json({error : "Password does not match"})
    }
    const existingUser = await User.findOne({email : email});

    if(existingUser) {
        return res.status(400).json({error : "User already exist"})
    }

    const avatar =  "https://robohash.org/PowerRanger.png";
    const hashedPassword = await bcrypt.hash(password , 10);
    
    const newUser = await User.create({
        email : email,
        role : "ranger",
        fullName : fullName,
        password : hashedPassword,
        avatar : avatar
    })

    const rangerProfile = await Ranger.create({
      userId: newUser._id,
      phoneNumber,
      location
    });

    console.log(rangerProfile);
    const token = jwt.sign({_id: newUser._id, role: newUser.role}, 
            process.env.JWT_KEY , {expiresIn: "10d"}
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
      },
      ranger: rangerProfile
    });
        
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
        return res.status(200).json({success: true, token, user: {_id:user._id, fullName:user.fullName, email: user.email, role: user.role, avatar:user.avatar},
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