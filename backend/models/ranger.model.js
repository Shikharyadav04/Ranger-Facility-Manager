import mongoose, { Schema } from "mongoose";

const rangerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    complaints: [
      {
        type: Schema.Types.ObjectId,
        ref: "Complaint",
      }
    ],
  },
  { timestamps: true }
);

const Ranger = mongoose.model("Ranger", rangerSchema);
export { Ranger };
