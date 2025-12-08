import express from "express";
import { login, register, verify } from "../controller/auth.controller.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router() ;

router.post("/register" , register)
router.post('/login', login);
router.get('/verify', authMiddleware, verify);


export default router 
