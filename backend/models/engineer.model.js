import mongoose, { Schema } from "mongoose";

const engineerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    assignedComplaints: [
      {
        type: Schema.Types.ObjectId,
        ref: "Complaint",
      }
    ],
  },
  { timestamps: true }
);

const Engineer = mongoose.model("Engineer", engineerSchema);
export { Engineer };
