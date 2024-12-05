import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  sentByUserId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Hospital schema
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital", // Reference to the Hospital schema
    required: true,
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required : true,
},
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
  },
  patientPhone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  symptoms: {
    type: String, // Short description of symptoms
    required: false,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"], // Appointment status
    default: "Scheduled",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation timestamp
  },
});

const Appointment = mongoose.model("Appointments", appointmentSchema);
export default Appointment;
