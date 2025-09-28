import cors from "cors";

export const corsMiddleware = cors({
  origin: "*", // allow any frontend or automated script
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});
