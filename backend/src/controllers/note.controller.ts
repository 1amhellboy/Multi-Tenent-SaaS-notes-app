import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createNoteService,
  getNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
} from "../services/note.service";

export async function createNoteController(req: AuthRequest, res: Response) {
  try {
    const { title, content } = req.body;
    const note = await createNoteService(title, content, req.user!.tenantId, req.user!.id);
    res.status(201).json(note);
  } catch (err:any) {
    if(err.message.includes("Note limit reached")) {
      return res.status(403).json({ message: err.message });
    }
    console.error("Create note error:", err);
    res.status(500).json({ message: "Failed to create note" });
  }
}

export async function getNotesController(req: AuthRequest, res: Response) {
  try {
    const notes = await getNotesService(req.user!.tenantId);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
}

export async function getNoteByIdController(req: AuthRequest, res: Response) {
  try {
    const note = await getNoteByIdService(req.params.id, req.user!.tenantId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch note" });
  }
}

export async function updateNoteController(req: AuthRequest, res: Response) {
  try {
    const { title, content } = req.body;
    const result = await updateNoteService(req.params.id, req.user!.tenantId, title, content);
    if (result.count === 0) return res.status(404).json({ message: "Note not found or unauthorized" });
    res.json({ message: "Note updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update note" });
  }
}

export async function deleteNoteController(req: AuthRequest, res: Response) {
  try {
    const result = await deleteNoteService(req.params.id, req.user!.tenantId);
    if (result.count === 0) return res.status(404).json({ message: "Note not found or unauthorized" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note" });
  }
}
