import { Feedback } from "../models/feedback.model.js";

export const addFeedback = async (req, res) => {
    try {
        const { request_id, engineer_id, ranger_id, rating, message } = req.body;

        if (!request_id || !engineer_id || !ranger_id || !rating) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Save new feedback
        const newFeedback = await Feedback.create({
            request_id,
            engineer_id,
            ranger_id,
            rating,
            comments: [
                {
                    user: ranger_id,
                    message
                }
            ]
        });

        // Fetch all feedback for this request
        const allFeedback = await Feedback.find({ request_id });

        // Compute average rating
        const avgRating =
            allFeedback.reduce((sum, fb) => sum + fb.rating, 0) / allFeedback.length;

        return res.status(200).json({
            success: true,
            message: "Feedback added successfully",
            data: newFeedback,
            averageRating: avgRating.toFixed(2)
        });

    } catch (err) {
        console.log("Feedback Error:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



export const getFeedbackByRequest = async (req, res) => {
    try {
        const { request_id } = req.params;

        const feedback = await Feedback.find({ request_id })
            .populate("engineer_id", "email")
            .populate("ranger_id", "email");

        if (!feedback.length) {
            return res.status(200).json({
                success: true,
                count: 0,
                data: [],
                averageRating: 0
            });
        }

        // Calculate average
        const avg =
            feedback.reduce((sum, fb) => sum + (fb.rating || 0), 0) /
            feedback.length;

        return res.status(200).json({
            success: true,
            count: feedback.length,
            averageRating: avg.toFixed(2),
            data: feedback
        });

    } catch (err) {
        console.log("Get Feedback Error:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
