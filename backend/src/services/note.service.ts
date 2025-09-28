import prisma from "../prisma";

export async function createNoteService(
  title: string,
  content: string,
  tenantId: string,
  authorId: string
) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    include: { notes: true },
  });

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  if (tenant.plan === "FREE" && tenant.notes.length >= 3) {
    throw new Error("Note limit reached, Please upgrade to Pro.");
  }

  return prisma.note.create({
    data: { title, content, tenantId, authorId }, 
  });
}

export async function getNotesService(tenantId: string) {
  return prisma.note.findMany({
    where: { tenantId },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,  
    },
  });
}


export async function getNoteByIdService(noteId: string, tenantId: string) {
  return prisma.note.findFirst({
    where: { id: noteId, tenantId },
  });
}


export async function updateNoteService(
  noteId: string,
  tenantId: string,
  userId: string,
  role: string,
  title: string,
  content: string
) {
  const where: any = { id: noteId, tenantId };
  if (role === "member") where.authorId = userId; 

  return prisma.note.update({
    where,
    data: { title, content },
  });
}

export async function deleteNoteService(
  noteId: string,
  tenantId: string,
  userId: string,
  role: string
) {
  const where: any = { id: noteId, tenantId };
  if (role === "member") where.authorId = userId; 

  return prisma.note.delete({
    where,
  });
}
