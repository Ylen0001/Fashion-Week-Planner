import express from "express";
import cors from "cors";
import appointmentsRoutes from "./routes/appointments.js";
import authRoutes from "./routes/auth.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Server is running 🚀");
  });

  app.use("/appointments", appointmentsRoutes);
  app.use("/auth", authRoutes);

  return app;
}
