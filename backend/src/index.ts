import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import noteRoutes from "./routes/note.route";
import tenantRoutes from "./routes/tenant.route";
// import { corsMiddleware } from "./middlewares/cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => 
    res.json({ status: "ok" })
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);
app.use("/tenants", tenantRoutes);

export default app;

// const PORT = process.env.PORT || 4000;
// console.log("Starting server...");
// app.listen(PORT, () => {
//   console.log(`Backend running on        : http://localhost:${PORT}`);
//   console.log(`Health check available at : http://localhost:${PORT}/health`);
// });




