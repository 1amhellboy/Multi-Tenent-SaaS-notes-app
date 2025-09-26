import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => 
    res.json({ status: "ok" })
);

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;
console.log("Starting server...");
app.listen(PORT, () => {
  console.log(`Backend running on        : http://localhost:${PORT}`);
  console.log(`Health check available at : http://localhost:${PORT}/health`);
});




