import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Link as LinkType, type PageProps, type User } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import EditLinkModal from '@/components/edit-link-modal';
import QrCodeModal from '@/components/qr-code-modal';
import SortableLinkItem from '@/components/sortable-link-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Copy, Link2, Minus, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

type Item = LinkType & {
    clicks: number;
    type: 'link' | 'divider';
    is_active: boolean;
};

interface DashboardUser extends User {
    username: string;
}

export default function Dashboard({ auth, links: initialLinks }: PageProps<{ links: Item[]; auth: { user: DashboardUser } }>) {
    const [newItemType, setNewItemType] = useState<'link' | 'divider'>('link');
    
    // Inicializa el formulario con los valores por defecto
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        url: '', 
        type: 'link' as 'link' | 'divider', // Tipo explícito
    });

    const [editingLink, setEditingLink] = useState<Item | null>(null);
    const [links, setLinks] = useState(initialLinks);
    const [copied, setCopied] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);

    const publicUrl = `https://2myl.ink/${auth.user.username}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    useEffect(() => {
        setLinks(initialLinks);
    }, [initialLinks]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Creamos un objeto con los datos a enviar
        const dataToSubmit = {
            title: data.title,
            type: data.type,
            // Solo incluye la URL si el tipo es 'link'
            ...(data.type === 'link' && { url: data.url })
        };

        // SOLUCIÓN AL ERROR 1: Usar la sintaxis correcta de Inertia
        post(route('links.store'), {
            onSuccess: () => {
                reset(); // Resetea el formulario completamente
                setNewItemType('link'); // Vuelve a la pestaña de links
                
                // Asegurar que el formulario esté completamente limpio
                setTimeout(() => {
                    setData({
                        title: '',
                        url: '',
                        type: 'link',
                    });
                    
                    if (titleInputRef.current) {
                        titleInputRef.current.focus();
                    }
                }, 50); // Pequeño delay para asegurar que el reset se complete
            },
            preserveScroll: true,
            onError: (errors: Record<string, string>) => {
                console.error("Error al enviar el formulario:", errors);
            }
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

    const handleSetNewItemType = (type: 'link' | 'divider') => {
        setNewItemType(type);
        
        // SOLUCIÓN: Resetear completamente el formulario al cambiar de pestaña
        setData({
            title: '',
            url: '',
            type: type,
        });
        
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* Modales */}
            <EditLinkModal link={editingLink} isOpen={!!editingLink} onClose={() => setEditingLink(null)} />
            <QrCodeModal
                url={publicUrl}
                username={auth.user.username}
                isOpen={isQrModalOpen}
                onClose={() => setIsQrModalOpen(false)} // SOLUCIÓN AL ERROR 2: Nombre correcto
            />

            <div className="space-y-6 p-4 md:p-6">
                {/* TARJETA PARA COMPARTIR ENLACE */}
                <Card>
                    <CardHeader>
                        <CardTitle>Share Your Link</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-2 text-sm text-muted-foreground">This is your public URL. Share it anywhere!</p>
                        <div className="flex items-center space-x-2">
                            <Input value={publicUrl} readOnly className="flex-1" />
                            <Button variant="outline" size="icon" onClick={() => setIsQrModalOpen(true)} className="shrink-0">
                                <QrCode className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" onClick={copyToClipboard} className="shrink-0">
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

                {/* FORMULARIO PARA AÑADIR NUEVOS ÍTEMS */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center border-b">
                            <button 
                                onClick={() => handleSetNewItemType('link')} 
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2 font-semibold', 
                                    newItemType === 'link' 
                                        ? 'border-b-2 border-primary text-primary' 
                                        : 'text-muted-foreground'
                                )}
                            >
                                <Link2 size={16} /> Add Link
                            </button>
                            <button 
                                onClick={() => handleSetNewItemType('divider')} 
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2 font-semibold', 
                                    newItemType === 'divider' 
                                        ? 'border-b-2 border-primary text-primary' 
                                        : 'text-muted-foreground'
                                )}
                            >
                                <Minus size={16} /> Add Divider
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">
                                    {newItemType === 'link' ? 'Title' : 'Divider Text'}
                                </Label>
                                <Input
                                    id="title"
                                    ref={titleInputRef}
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder={newItemType === 'link' ? 'My Portfolio' : 'e.g., Social Media'}
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>
                            
                            {/* El campo URL solo se muestra si el tipo de ítem es 'link' */}
                            {newItemType === 'link' && (
                                <div>
                                    <Label htmlFor="url">URL</Label>
                                    <Input
                                        id="url"
                                        type="url"
                                        value={data.url || ''}
                                        onChange={(e) => setData('url', e.target.value)}
                                        placeholder="https://..."
                                    />
                                    {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
                                </div>
                            )}
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Adding...' : `Add ${newItemType === 'link' ? 'Link' : 'Divider'}`}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* LISTA DE ÍTEMS EXISTENTES */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Links & Dividers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={links.map((link) => link.id)} strategy={verticalListSortingStrategy}>
                                {links.length > 0 ? (
                                    links.map((item) => (
                                        <SortableLinkItem
                                            key={item.id}
                                            link={item}
                                            onEdit={() => setEditingLink(item)}
                                        />
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">
                                        You haven't added any items yet. Create your first one!
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