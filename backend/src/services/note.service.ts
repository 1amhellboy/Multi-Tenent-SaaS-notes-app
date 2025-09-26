import prisma from "../prisma";

export async function createNoteService(title: string, content: string, tenantId: string, authorId: string) {
  return prisma.note.create({
    data: { title, content, tenantId, authorId },
  });
}

export async function getNotesService(tenantId: string) {
  return prisma.note.findMany({
    where: { tenantId },
  });
}

export async function getNoteByIdService(noteId: string, tenantId: string) {
  return prisma.note.findFirst({
    where: { id: noteId, tenantId },
  });
}

export async function updateNoteService(noteId: string, tenantId: string, title: string, content: string) {
  return prisma.note.updateMany({
    where: { id: noteId, tenantId },
    data: { title, content },
  });
}

export async function deleteNoteService(noteId: string, tenantId: string) {
  return prisma.note.deleteMany({
    where: { id: noteId, tenantId },
  });
}
