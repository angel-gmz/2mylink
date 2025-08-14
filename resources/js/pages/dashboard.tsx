import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Link as LinkType, type PageProps } from '@/types';
import { Head, Link as InertiaLink, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import EditLinkModal from '@/components/edit-link-modal';
import SortableLinkItem from '@/components/sortable-link-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

export default function Dashboard({ auth, links: initialLinks }: PageProps<{ links: LinkType[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        url: '',
    });

    const [editingLink, setEditingLink] = useState<LinkType | null>(null);
    // Local state to manage link order for instant UI feedback
    const [links, setLinks] = useState(initialLinks);

    // Sync local state if the props from Laravel change
    useEffect(() => {
        setLinks(initialLinks);
    }, [initialLinks]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('links.store'), {
            onSuccess: () => reset(),
        });
    };

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = links.findIndex((link) => link.id === active.id);
            const newIndex = links.findIndex((link) => link.id === over.id);

            const reorderedLinks = arrayMove(links, oldIndex, newIndex);
            setLinks(reorderedLinks); // Update UI immediately

            // Send the new order to the backend
            const linkIds = reorderedLinks.map((link) => link.id);
            router.patch(route('links.order.update'), { links: linkIds }, { preserveScroll: true });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <EditLinkModal link={editingLink} isOpen={!!editingLink} onClose={() => setEditingLink(null)} />

            <div className="space-y-6 p-4 md:p-6">
                {/* ADD NEW LINK FORM */}
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Link</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="My Portfolio"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>
                            <div>
                                <Label htmlFor="url">URL</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    placeholder="https://..."
                                />
                                {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
                            </div>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Adding...' : 'Add Link'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* EXISTING LINKS LIST */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={links.map((link) => link.id)} strategy={verticalListSortingStrategy}>
                                {links.length > 0 ? (
                                    links.map((link) => (
                                        <SortableLinkItem key={link.id} id={link.id}>
                                            <div className="flex w-full items-center justify-between rounded-lg border bg-background p-3">
                                                <div>
                                                    <p className="font-medium">{link.title}</p>
                                                    <a
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-muted-foreground hover:underline"
                                                    >
                                                        {link.url}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => setEditingLink(link)}>
                                                        Edit
                                                    </Button>
                                                    <InertiaLink
                                                        href={route('links.destroy', link.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-destructive px-3 text-sm font-medium text-destructive-foreground ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                                    >
                                                        Delete
                                                    </InertiaLink>
                                                </div>
                                            </div>
                                        </SortableLinkItem>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">
                                        You haven't added any links yet. Create your first one!
                                    </p>
                                )}
                            </SortableContext>
                        </DndContext>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
