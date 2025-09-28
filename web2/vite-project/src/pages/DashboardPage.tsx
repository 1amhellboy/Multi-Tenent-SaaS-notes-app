"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteFormModal from "../components/NoteFormModal";
import UpgradeBanner from "../components/UpgradeBanner";
import * as api from "../services/api";
import type { ApiUser, ApiNote } from "../services/type";
import { useLocation } from 'wouter';

type FormNote = {
  id?: string;
  title: string;
  content: string;
};

type User = {
  id: string;
  email: string;
  role: "admin" | "member";
  plan: "free" | "pro";
  tenantId: string;
  tenantSlug: string;
};

type Note = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [, setLocation] = useLocation();

  const isAdmin = user?.role === "admin";
  const isFreePlan = user?.plan === "free";
  const freePlanLimitReached = isFreePlan && notes.length >= 3;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user: me } = await api.getCurrentUser();

        // normalize user for frontend
        const normalizedUser: User = {
          id: me.id,
          email: me.email,
          role: me.role.toLowerCase() as "admin" | "member",
          plan: me.tenant?.plan.toLowerCase() as "free" | "pro",
          tenantId: me.tenantId,
          tenantSlug: me.tenant?.slug ?? "default-slug",
        };
        setUser(normalizedUser);

        // fetch notes
        const fetchedNotes = await api.getNotes();
        setNotes(
          Array.isArray(fetchedNotes)
            ? fetchedNotes.map((n: ApiNote) => ({
                id: n.id,
                title: n.title,
                content: n.content,
                authorId: n.authorId,
              }))
            : []
        );
      } catch (err) {
        console.error("❌ Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openNewNote = () => {
    if (freePlanLimitReached) {
      alert("Free plan limit reached (3 notes). Upgrade to Pro for unlimited notes.");
      return;
    }
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditNote = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setEditingNote(note);
      setIsModalOpen(true);
    }
  };

  const handleSaveNote = async (note: FormNote) => {
    try {
      if (note.id) {
        const updated = await api.updateNote(note.id, note.title, note.content);
        setNotes((prev) =>
          prev.map((n) =>
            n.id === note.id
              ? {
                  id: updated.id,
                  title: updated.title,
                  content: updated.content,
                  authorId: updated.authorId, // ✅ include authorId
                }
              : n
          )
        );
      } else {
        const created = await api.createNote(note.title, note.content);
        setNotes((prev) => [
          {
            id: created.id,
            title: created.title,
            content: created.content,
            authorId: created.authorId, // ✅ include authorId
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error("❌ Failed to save note", err);
    } finally {
      setIsModalOpen(false);
      setEditingNote(null);
    }
  };
  

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete note", err);
    }
  };

  const handleUpgrade = async () => {
    if (!user) return;
    try {
      await api.upgradeTenant(user.tenantSlug);
      const { user: updatedUser } = await api.getCurrentUser();
      const normalizedUser: User = {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role.toLowerCase() as "admin" | "member",
        plan: updatedUser.tenant?.plan.toLowerCase() as "free" | "pro",
        tenantId: updatedUser.tenantId,
        tenantSlug: updatedUser.tenant?.slug ?? "default-slug",
      };
      setUser(normalizedUser);
    } catch (err) {
      console.error("❌ Failed to upgrade tenant", err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {user && <Navbar user={user} />}

      {/* <section className="max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-4">
        {isAdmin && freePlanLimitReached && <UpgradeBanner onUpgrade={handleUpgrade} />}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {notes.map((n) => (
            <NoteCard
              key={n.id}
              id={n.id}
              title={n.title}
              content={n.content}
              onEdit={openEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      </section> */}


<section className="max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-4">
  {isFreePlan && (
    isAdmin ? (
      <UpgradeBanner onUpgrade={handleUpgrade} />
    ) : (
      <UpgradeBanner onUpgrade={undefined} /> 
    )
  )}

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    {notes.map((n) => (
      // <NoteCard
      //   key={n.id}
      //   id={n.id}
      //   title={n.title}
      //   content={n.content}
      //   onEdit={openEditNote}
      //   onDelete={handleDeleteNote}
      // />
      <NoteCard
  key={n.id}
  id={n.id}
  title={n.title}
  content={n.content}
  onEdit={openEditNote}
  onDelete={handleDeleteNote}
  canEditDelete={isAdmin || n.authorId === user?.id} 
/>

    ))}
  </div>
</section>


      <button
        onClick={openNewNote}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-2xl shadow-lg flex items-center justify-center"
      >
        +
      </button>

      <NoteFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        initialNote={editingNote ?? undefined}
      />
    </main>
  );
};

export default DashboardPage;
