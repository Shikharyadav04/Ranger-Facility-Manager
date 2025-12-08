import {Request} from "../models/request.model.js";

// API for generate request 
export const generate_request = async(req,res)=>{
    
    try{

        const {ranger_id , title , description , priority , location , target_date } = req.body;
        
        if(!ranger_id || !title || !description  || !priority || !location ){
            return res.status(400).json({error : "Invalid Data : Please Provide All Fields"});
        }
            
        const createNewProblem =  await Request.create ({
            ranger_id : ranger_id ,
            title : title,
            description : description,
            curr_status : "Open",
            priority : priority,
            assigned_engineering_id : null,
            location : location ,
            engineering_domain : "undefined",
            target_date : target_date,
        })

        if(createNewProblem){
            await createNewProblem.save()
            return res.status(200).json({ message : "Problem created Successfully" });
        }
        else return res.status(400).json({error : "Invalid user data !!"});

    }
    catch(err){
        console.log("Request Controller Error :  ",err.message) ;
         return res.status(500).json({
            error : "Internal Server Error",
        });

    }


    
}

// API for getting all requests
export const getAll_request = async(req,res)=>{
     
    try{
        const allRequests = await Request.find();

        return res.status(200).json({
            success: true,
            count: allRequests.length,
            data: allRequests
        });
    }
    catch(err){

        console.log("Get All Request Error:", err.message);

        return res.status(500).json({
        success: false,
        error: "Internal Server Error"
        });
    }
}

// API for get all low_priority requests
export const getLow_priority = async(req , res )=>{
       try{
            const easyRequests = await Request.find({ priority: "Low" });
            return res.status(200).json({
                success: true,
                count: easyRequests.length,
                data: easyRequests
            });
       }
       catch(err){
             console.log("Get Easy Request Error:", err.message);
    
            return res.status(500).json({
            success: false,
            error: "Internal Server Error"
            });
       }
}

// API for get all medium_priority requests
export const getMedium_priority = async(req , res )=>{
       try{
            const mediumRequests = await Request.find({ priority: "Medium" });
            return res.status(200).json({
                success: true,
                count: mediumRequests.length,
                data: mediumRequests
            });
       }
       catch(err){
             console.log("Get Medium Request Error:", err.message);
    
            return res.status(500).json({
            success: false,
            error: "Internal Server Error"
            });
       }
}

// Api for get all high_priority requests 
export const getHigh_priority = async(req , res )=>{
       try{
            const highRequests = await Request.find({ priority: "High" });
            return res.status(200).json({
                success: true,
                count: highRequests.length,
                data: highRequests
            });
       }
       catch(err){
             console.log("Get Hard Request Error:", err.message);
    
            return res.status(500).json({
            success: false,
            error: "Internal Server Error"
            });
       }
}


// API  Requests assigned to a particular engineer.
export const getAssignedEngineer_Request = async(req, res )=>{
    
    try{
        const engineerId = req.user_id;

        const assignedRequests = await Request.find({
        assigned_engineering_id: engineerId
        });

        return res.status(200).json({
        success: true,
        count: assignedRequests.length,
        data: assignedRequests
        });
    }
    catch(err){
        console.log("Assigned Engineer Request Error:", err.message);

        return res.status(500).json({
        success: false,
        error: "Internal Server Error"
        });
    }
    
}

// API for get status request 
export const getCompleted_Request = async(req, res )=>{
     
    try{
         const Completed_request = await Request.find({curr_status: "Resolved"});
         
         return res.status(200).json({
            success : true ,
            count : Completed_request.length,
            data : Completed_request 
         });
    }
    catch(err){
        console.log("Completed Request Error :" , err.message);

        return res.status(500).json({
            success : false ,
            error : "Internal server Error "

        })
    }
     
    

}


export const getInprogess_Request = async(req, res)=>{
     
    try{
        const Inprogess_Request = await Request.find({ curr_status : "Inprogess"});

        return res.status(200).json({
            status : true , 
            count : Inprogess_Request.length,
            data : Inprogess_Request 
        })
    }
    catch(err){
        console.log("get Inprogress Error: ", err.message);
        
        return res.status(500).json({
            success : false ,
            error : "Internal server error "
        })
    }
}

// Api for get all  new created request , but no engineer has been assigned yet
export const getOpen_Request = async(req, res)=>{
    try{
        const Open_request = await Request.find({curr_status : "Open"});
        
        return res.status(200).json({
            success : true , 
            count : Open_request.length , 
            data : Open_request
        })
    }
    catch(err){
        console.log("get Open request Error :" , err.message);
        return res.status(500).json({
            success : false,
            error : "Internal server Error "
        })
    }
}

// Api for getting  domain request
export const getElectrical_Request = async(req, res)=>{
    try{
        const Electrical_request = await Request.find({engineering_domain : "electrical"});
        
        return res.status(200).json({
            success : true , 
            count : Electrical_request.length , 
            data : Electrical_request
        })
    }
    catch(err){
        console.log("get electrical domain request Error :" , err.message);
        return res.status(500).json({
            success : false,
            error : "Internal server Error "
        })
    }
}

export const getMechanical_Request = async(req, res)=>{
    try{
        const Mechanical_request = await Request.find({engineering_domain : "mechanical"});
        
        return res.status(200).json({
            success : true , 
            count : Mechanical_request.length , 
            data : Mechanical_request
        })
    }
    catch(err){
        console.log("get Mechanical domain request Error :" , err.message);
        return res.status(500).json({
            success : false,
            error : "Internal server Error "
        })
    }
}

export const getComputer_Science_Request = async(req, res)=>{
    try{
        const Computer_Science = await Request.find({engineering_domain : "computer Science"});
        
        return res.status(200).json({
            success : true , 
            count : Computer_Science.length , 
            data : Computer_Science
        })
    }
    catch(err){
        console.log("get Mechanical domain request Error :" , err.message);
        return res.status(500).json({
            success : false,
            error : "Internal server Error "
        })
    }
}

