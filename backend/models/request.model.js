import mongoose,{Schema} from "mongoose";


const requestSchema = new Schema({
    
    ranger_id : {type : mongoose.Schema.Types.ObjectId , ref : "User" },
    title : { 
        type : String ,
        required : true,
        trim :true,
        index:true
    },
    description : {
        type : String ,
        required : true,
        trim :true,
        index:true
    },
    curr_status : {type: String, required : true , enum :["Open" , "Assigned" , "Inprogess" , "Resolved" , "Closed"]},
    priority : {type: String, required : true , enum :["Low" , "Medium" , "High"]},
    assigned_engineering_id : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    location : { type : String , required : true , trim :true},
    engineering_domain : {type: String, required : true , enum : ["civil" , "mechanical", "electrical" , "computer Science" , "electronics" , "chemical" , "biotech" ]},
    target_date : {type : Date},

} ,  { timestamps : true });

const Request = mongoose.model("request" , requestSchema);

export {Request};
     

