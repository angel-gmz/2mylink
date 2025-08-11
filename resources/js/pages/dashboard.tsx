// resources/js/Pages/dashboard.tsx
import AppLayout from '@/layouts/app-layout'; // Asumo que usas este layout
import { Head, Link as InertiaLink, useForm } from '@inertiajs/react';
import type { PageProps, Link as LinkType } from '@/types'; // Importa tus tipos

// --- Importa tus componentes UI ---
// Si usas ShadCN/ui u otra librería, importa los componentes.
// Si no, puedes usar etiquetas HTML normales (<form>, <input>, <button>).
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard({ auth, links }: PageProps<{ links: LinkType[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        url: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('links.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout> {/* O el layout que uses */}
            <Head title="Dashboard" />

            <div className="space-y-6 p-4 md:p-6">
                {/* FORMULARIO PARA AÑADIR ENLACES */}
                <Card>
                    <CardHeader>
                        <CardTitle>Añadir Nuevo Enlace</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Mi Portafolio"
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
                                {processing ? 'Guardando...' : 'Guardar Enlace'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* LISTA DE ENLACES EXISTENTES */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mis Enlaces</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {links.length > 0 ? (
                            links.map((link) => (
                                <div
                                    key={link.id}
                                    className="flex items-center justify-between rounded-md border p-4"
                                >
                                    <div>
                                        <p className="font-semibold">{link.title}</p>
                                        <p className="text-sm text-muted-foreground">{link.url}</p>
                                    </div>
                                    <InertiaLink
                                        href={route('links.destroy', link.id)}
                                        method="delete"
                                        as="button"
                                        className="text-sm font-medium text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </InertiaLink>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground">
                                No tienes enlaces todavía. ¡Añade el primero!
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}