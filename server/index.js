import express from "express";
import cors from "cors";
import appointmentsRoutes from "./src/routes/appointments.js";
import authRoutes from "./src/routes/auth.js"
import dotenv from "dotenv"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/appointments", appointmentsRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
