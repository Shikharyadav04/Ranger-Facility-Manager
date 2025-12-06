import express from "express";

import { generate_request , getAll_request, getAssignedEngineer_Request } from "../controller/req.controller.js";
import { getCompleted_Request,getInprogess_Request ,getOpen_Request} from "../controller/req.controller.js";
import { getHigh_priority,getLow_priority,getMedium_priority } from "../controller/req.controller.js";
import { getElectrical_Request, getComputer_Science_Request,getMechanical_Request } from "../controller/req.controller.js";
const reqRouter = express.Router() ;

reqRouter.post("/generate" , generate_request);
reqRouter.get("/getAll_request" , getAll_request );
reqRouter.get("/getAssignedEngineer_Request", getAssignedEngineer_Request);


// priority API 
reqRouter.get("/getLow_priority", getLow_priority);
reqRouter.get("/getMedium_priority", getMedium_priority);
reqRouter.get("/getHigh_priority" , getHigh_priority);

// Status request API
reqRouter.get("/Completed_request", getCompleted_Request);
reqRouter.get("/Inprogess_request", getInprogess_Request);
reqRouter.get("/Open_request", getOpen_Request);

// getting domain request api 
reqRouter.get("/Electrical_request" , getElectrical_Request);
reqRouter.get("/Mechanical_request", getMechanical_Request);
reqRouter.get("/Computer_Science_request" , getComputer_Science_Request);








export default reqRouter;
