import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  canEditDelete: boolean;
}

export default function NoteCard({
  id,
  title,
  content,
  onEdit,
  onDelete,
  canEditDelete,
}: NoteCardProps) {
  return (
    <Card className="transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-medium text-foreground line-clamp-2">
            {title || "Untitled"}
          </h3>
          {canEditDelete && ( 
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-4 whitespace-pre-wrap">
          {content || "No content"}
        </p>
      </CardContent>
    </Card>
  );
}
