import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticateToken } from "../middleware/middleware.js";

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.user.userId },
    });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { brandName, appointmentDate, location, notes } = req.body;

    if (!brandName || !appointmentDate || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        brandName,
        appointmentDate: new Date(appointmentDate),
        location,
        notes,
        userId: req.user.userId,
      },
    });

    res.json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating appointment" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    await prisma.appointment.delete({
      where: { id },
    });

    res.json({ message: "Appointment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting appointment" });
  }
});

export default router;