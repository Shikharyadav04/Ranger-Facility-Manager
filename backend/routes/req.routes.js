import express from "express";

import { generate_request , getAll_request, getHigh_priority, getLow_priority, getMedium_priority } from "../controller/req.controller.js";
const reqRouter = express.Router() ;

reqRouter.post("/generate" , generate_request);
reqRouter.get("/getAll_request" , getAll_request );
reqRouter.get("/getLow_priority", getLow_priority);
reqRouter.get("/getMedium_priority", getMedium_priority);
reqRouter.get("/getHigh_priority" , getHigh_priority);




export default reqRouter;
