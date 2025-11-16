import mongoose from "mongoose";

const BloodRequestSchema = new mongoose.Schema(
  {
     
    requestReceiver: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    requestSender: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    patientProblem: {
      type: String,
      required: true,
      trim: true,
    },

    needDate: {
      type: String, 
      required: true,
      trim: true,
    },

    needTime: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,    
      maxlength: 20,   
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    requestStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Model export
const NewBloodRequest =
  mongoose.models.BloodRequest ||
  mongoose.model("BloodRequest", BloodRequestSchema);

export default NewBloodRequest;
