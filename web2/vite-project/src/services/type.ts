// User from backend
export type ApiUser = {
    id: string;
    email: string;
    role: "ADMIN" | "MEMBER";
    tenantId: string;
    tenant?: {
      slug: string;
      plan: "FREE" | "PRO";
    };
  };
  
  // Note from backend
  export type ApiNote = {
    id: string;
    title: string;
    content: string;
    tenantId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
  };
  