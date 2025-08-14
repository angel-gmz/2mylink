import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Link as LinkType, type PageProps, type User } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import EditLinkModal from '@/components/edit-link-modal';
import SortableLinkItem from '@/components/sortable-link-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

type LinkWithClicks = LinkType & { clicks: number };

// Ensure the User type includes the username for this page
interface DashboardUser extends User {
    username: string;
}

export default function Dashboard({ auth, links: initialLinks }: PageProps<{ links: LinkWithClicks[]; auth: { user: DashboardUser } }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        url: '',
    });

    const [editingLink, setEditingLink] = useState<LinkWithClicks | null>(null);
    const [links, setLinks] = useState(initialLinks);
    const [copied, setCopied] = useState(false);

    const publicUrl = `https://2myl.ink/${auth.user.username}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicUrl).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000); // Reset after 2 seconds
        });
    };

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
            setLinks(reorderedLinks);
            const linkIds = reorderedLinks.map((link) => link.id);
            router.patch(route('links.order.update'), { links: linkIds }, { preserveScroll: true });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <EditLinkModal link={editingLink} isOpen={!!editingLink} onClose={() => setEditingLink(null)} />

            <div className="space-y-6 p-4 md:p-6">
                {/* SHARE YOUR LINK CARD */}
                <Card>
                    <CardHeader>
                        <CardTitle>Share Your Link</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-2 text-sm text-muted-foreground">This is your public URL. Share it anywhere!</p>
                        <div className="flex items-center space-x-2">
                            <Input value={publicUrl} readOnly className="flex-grow" />
                            <Button variant="outline" onClick={copyToClipboard} className="w-[110px]">
                                {copied ? (
                                    <>
                                        <Check className="mr-2 h-4 w-4" /> Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="mr-2 h-4 w-4" /> Copy Link
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

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
                                        // --- THIS IS THE CORRECTED SECTION ---
                                        // Pass the link and onEdit function as props directly
                                        <SortableLinkItem
                                            key={link.id}
                                            link={link}
                                            onEdit={() => setEditingLink(link)}
                                        />
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
