import Appointment from "../models/Appointment.js";

export const BookAppointment = async (req, res) => {
  try {
    const data = req.body;
    const savedData = await Appointment.create(data);
    res.status(201).send(savedData);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Error fetching hospitals" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { uniqueId } = req.query;
    const response = await Appointment.find({
      $or: [{ userId: uniqueId }, { hospitalId: uniqueId }],
    })
      .populate("userId")
      .populate("hospitalId")
      .populate("doctorId");
    res.status(200).send(response);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Error fetching hospitals" });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    const appointments = await Appointment.find({ userId })
      .populate("doctorId", "name specialization") 
      .populate("hospitalId", "hospitalName city");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Error fetching appointments." });
  }
};

