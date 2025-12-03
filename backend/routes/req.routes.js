import express from "express";

import { generate_request , getAll_request } from "../controller/req.controller.js";
const reqRouter = express.Router() ;

reqRouter.post("/generate" , generate_request);
reqRouter.get("/getAll_request" , getAll_request );



export default reqRouter;
