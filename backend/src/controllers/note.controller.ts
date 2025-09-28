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

    const updatedNote = await updateNoteService(
      req.params.id,
      req.user!.tenantId,
      req.user!.id,
      req.user!.role.toLowerCase(),
      title,
      content
    );

    if (!updatedNote) {
      return res.status(403).json({ message: "Not authorized or note not found" });
    }

    res.json(updatedNote); 
  } catch (err) {
    console.error("❌ Update note error:", err);
    res.status(500).json({ message: "Failed to update note" });
  }
}

export async function deleteNoteController(req: AuthRequest, res: Response) {
  try {
    const deletedNote = await deleteNoteService(
      req.params.id,
      req.user!.tenantId,
      req.user!.id,
      req.user!.role.toLowerCase()
    );

    if (!deletedNote) {
      return res.status(403).json({ message: "Not authorized or note not found" });
    }

    res.json(deletedNote); 
  } catch (err) {
    console.error("❌ Delete note error:", err);
    res.status(500).json({ message: "Failed to delete note" });
  }
}
