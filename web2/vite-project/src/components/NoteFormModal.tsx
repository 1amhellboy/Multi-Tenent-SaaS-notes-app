import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: { id?: string; title: string; content: string }) => void;
  initialNote?: { id?: string; title: string; content: string };
}

export default function NoteFormModal({ isOpen, onClose, onSave, initialNote }: NoteFormModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '');
      setContent(initialNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialNote, isOpen]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        id: initialNote?.id,
        title,
        content,
      });
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]" data-testid="modal-note-form">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">
            {initialNote?.id ? 'Edit Note' : 'Create New Note'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid="input-title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Enter note content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="resize-none"
              data-testid="input-content"
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            data-testid="button-save"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}