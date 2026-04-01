import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    if(!brandname || !appointmentsDate || !location)
        return res.status(400).json({ error: "Missing required fields" })
      
    const { brandName, appointmentDate, location, notes } = req.body;

    const newAppointment = await prisma.appointment.create({
      data: {
        brandName,
        appointmentDate: new Date(appointmentDate),
        location,
        notes,
      },
    });

    res.json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating appointment" });
  }
});

router.get("/appointments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching appointment" });
  }
});

export default router;