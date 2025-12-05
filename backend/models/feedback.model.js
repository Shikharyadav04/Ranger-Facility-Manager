import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({

    request_id : { 
        type : mongoose.Schema.Types.ObjectId, 
        ref : "request", 
        required : true 
    },

    engineer_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    ranger_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            message: { type: String, trim: true },
            timestamp: { type: Date, default: Date.now }
        }
    ],

    rating: { type: Number, min: 1, max: 5 },

    statusAfterFeedback: {
        type: String,
        enum: ["Resolved", "Reopened"],
        default: "Resolved"
    }

}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

export { Feedback };
