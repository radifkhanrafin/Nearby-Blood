import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  gender: { type: String },
  profile: { type: String },
  dateOfBirth: { type: Date },
  age: { type: Number },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  weightKg: { type: Number },
  lastDonationDate: { type: Date },
  isDonor: { type: Boolean, default: false },
  availability: {
    type: String,
    enum: ["available", "unavailable", "busy"],
    default: "available"
  },

  medicalHistory: { type: String, default: "" },

  emergencyContact: {
    name: { type: String },
    relation: { type: String },
    phone: { type: String },
  },

  presentAddress: {
    street: { type: String },
    city: { type: String },
    district: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },

  permanentAddress: {
    street: { type: String },
    city: { type: String },
    district: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },

  registrationId: { type: String, unique: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
