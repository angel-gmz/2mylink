import SettingsLayout from '@/layouts/settings/layout'; // <-- RUTA CORREGIDA
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { Crown } from 'lucide-react';

// Función para formatear la fecha (puedes mejorarla con una librería como date-fns si lo necesitas)
function formatDate(dateString: string | null): string {
    if (!dateString) {
        return 'N/A';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function SubscriptionPage() {
    const { auth } = usePage<PageProps>().props;
    const { user } = auth;

    return (
        <SettingsLayout>
            <div className="space-y-8">
                {user.is_premium ? (
                    // --- VISTA PARA USUARIOS PREMIUM ---
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
                                    <Crown className="h-6 w-6 text-yellow-500" />
                                </div>
                                <div>
                                    <CardTitle>You are a Premium User</CardTitle>
                                    <CardDescription>
                                        Your subscription is active until: {formatDate(user.premium_expires_at)}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Thank you for your support! You have access to all exclusive features, including gradient themes.
                            </p>
                            <Button variant="outline">Manage Subscription</Button>
                        </CardContent>
                    </Card>
                ) : (
                    // --- VISTA PARA USUARIOS NO PREMIUM ---
                    <Card>
                        <CardHeader>
                            <CardTitle>Upgrade to Premium</CardTitle>
                            <CardDescription>
                                Unlock exclusive features and support the project.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                                <li>Access to all gradient themes.</li>
                                <li>Advanced analytics for your links.</li>
                                <li>Priority support.</li>
                                <li>Remove branding from your public profile.</li>
                            </ul>
                            <Button className="w-full sm:w-auto">
                                <Crown className="mr-2 h-4 w-4" />
                                Upgrade Now
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </SettingsLayout>
    );
}
