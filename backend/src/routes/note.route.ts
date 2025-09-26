import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createNoteController,
  getNotesController,
  getNoteByIdController,
  updateNoteController,
  deleteNoteController,
} from "../controllers/note.controller";

const router = Router();

router.post("/", authMiddleware, createNoteController);
router.get("/", authMiddleware, getNotesController);
router.get("/:id", authMiddleware, getNoteByIdController);
router.put("/:id", authMiddleware, updateNoteController);
router.delete("/:id", authMiddleware, deleteNoteController);

export default router;
