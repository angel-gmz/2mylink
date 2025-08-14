import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BarChart2, Edit, GripVertical, MoreHorizontal, Trash2 } from 'lucide-react';

import { type Link as LinkType } from '@/types';
import { Link } from '@inertiajs/react'; // Corrected import
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

type LinkWithClicks = LinkType & { clicks: number };

interface SortableLinkItemProps {
    link: LinkWithClicks;
    onEdit: () => void;
}

export default function SortableLinkItem({ link, onEdit }: SortableLinkItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id });

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
            <div className="flex w-full min-w-0 items-center justify-between rounded-lg border bg-background p-3">
                <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{link.title}</p>
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-sm text-muted-foreground hover:underline"
                    >
                        {link.url}
                    </a>
                </div>
                <div className="ml-4 flex flex-shrink-0 items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <BarChart2 size={16} />
                        <span>{link.clicks}</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={onEdit}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className="text-red-600 focus:text-red-600">
                                <Link // Corrected component name
                                    href={route('links.destroy', link.id)}
                                    method="delete"
                                    as="button"
                                    className="w-full"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
