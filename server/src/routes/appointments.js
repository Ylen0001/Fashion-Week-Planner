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

    const parsedDate = new Date(appointmentDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid appointment date" });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        brandName,
        appointmentDate: parsedDate,
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

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid appointment id" });
    }

    const { brandName, appointmentDate, location, notes } = req.body;

    if (!brandName || !appointmentDate || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const parsedDate = new Date(appointmentDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid appointment date" });
    }

    const existing = await prisma.appointment.findFirst({
      where: { id, userId: req.user.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        brandName,
        appointmentDate: parsedDate,
        location,
        notes,
      },
    });

    res.json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating appointment" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid appointment id" });
    }

    const result = await prisma.appointment.deleteMany({
      where: { id, userId: req.user.userId },
    });

    if (result.count === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting appointment" });
  }
});

export default router;