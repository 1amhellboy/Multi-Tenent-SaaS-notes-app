import NoteCard from '../NoteCard';

export default function NoteCardExample() {
  const handleEdit = (id: string) => {
    console.log('Edit note:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete note:', id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-4xl">
      <NoteCard
        id="1"
        title="Meeting Notes"
        content="Discussed project timeline and deliverables. Need to follow up on budget approval and resource allocation for Q2."
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <NoteCard
        id="2"
        title="Shopping List"
        content="• Milk\n• Bread\n• Eggs\n• Fruits\n• Vegetables\n• Coffee"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <NoteCard
        id="3"
        title=""
        content="This is a note without a title. Sometimes quick thoughts don't need formal titles, just capture the idea."
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}