import { useState } from 'react';
import { Button } from '@/components/ui/button';
import NoteFormModal from '../NoteFormModal';

export default function NoteFormModalExample() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSave = (note: { id?: string; title: string; content: string }) => {
    console.log('Save note:', note);
    return Promise.resolve();
  };

  const existingNote = {
    id: '123',
    title: 'Existing Note',
    content: 'This is an existing note with some content that can be edited.',
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-4">
        <Button onClick={() => setIsCreateOpen(true)}>
          Open Create Modal
        </Button>
        <Button variant="outline" onClick={() => setIsEditOpen(true)}>
          Open Edit Modal
        </Button>
      </div>
      
      <NoteFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleSave}
      />
      
      <NoteFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
        initialNote={existingNote}
      />
    </div>
  );
}