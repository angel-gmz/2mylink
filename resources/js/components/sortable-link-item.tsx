import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function SortableLinkItem({ id, children }: PropsWithChildren<{ id: number }>) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-2">
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab touch-none p-1 text-muted-foreground hover:text-foreground"
            >
                <GripVertical size={18} />
            </button>
            <div className="flex-grow">{children}</div>
        </div>
    );
}
