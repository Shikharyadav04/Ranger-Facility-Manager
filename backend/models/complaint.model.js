import mongoose, { Schema } from "mongoose";

const complaintSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "in_progress", "resolved", "closed"],
      default: "pending",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Ranger",
      required: true,
    },

    assignedEngineers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Engineer",
      }
    ],

    comments: [
      {
        text: { type: String },
        author: { type: Schema.Types.ObjectId, ref: "User" },
        timestamp: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
export { Complaint };
