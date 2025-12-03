import {Request} from "../models/request.model.js";


export const generate_request = async(req,res)=>{
    
    try{

        const {ranger_id , title , description , curr_status , priority , location , engineering_domain , target_date } = req.body;
        
        if(!ranger_id || !title || !description || !curr_status || !priority || !location || !engineering_domain){
            return res.status(400).json({error : "Invalid Data : Please Provide All Fields"});
        }
            
        const createNewProblem =  await Request.create ({
            ranger_id : ranger_id ,
            title : title,
            description : description,
            curr_status : curr_status,
            priority : priority,
            assigned_engineering_id : null,
            location : location ,
            engineering_domain : engineering_domain,
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

