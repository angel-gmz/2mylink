import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageProps, User as BaseUser } from '@/types';
import { usePage, Link } from '@inertiajs/react';
import { Crown } from 'lucide-react';

// Import AppLayout and BreadcrumbItem for the main layout
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types'; 

// Define breadcrumbs for the Subscription page, mirroring Profile.tsx
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subscription settings', 
        href: route('subscription'), // Using the 'subscription' route name from settings.php
    },
];

// Extender el tipo User de tus '@/types' para incluir el nuevo prop de Cashier
interface AppUser extends BaseUser {
    is_premium: boolean;
    premium_expires_at: string | null;
    is_subscribed_via_cashier?: boolean; // New prop from middleware
}

// Extender PageProps para que el usuario autenticado incluya el tipo AppUser
interface SubscriptionPageProps extends PageProps {
    auth: {
        user: AppUser;
    };
}

// Función para formatear la fecha
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
    const { auth } = usePage<SubscriptionPageProps>().props;
    const { user } = auth;

    // Use is_subscribed_via_cashier for premium status check
    const isUserPremium = user?.is_subscribed_via_cashier;

    return (
        // *** KEY CHANGE: Nest SettingsLayout inside AppLayout ***
        <AppLayout breadcrumbs={breadcrumbs}>
            <SettingsLayout>
                <div className="space-y-8">
                    {/* Optionally add a HeadingSmall here if you have one, like in Profile.tsx */}
                    {/* <HeadingSmall title="Subscription Status" description="Manage your premium subscription." /> */}

                    {isUserPremium ? (
                        // --- PREMIUM USER VIEW ---
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
                                <Button variant="outline" asChild>
                                    <Link href={route('billing.portal')}>Manage Subscription</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        // --- NON-PREMIUM USER VIEW ---
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
                                <Button
                                    className="w-full sm:w-auto"
                                    onClick={() => {
                                        window.location.href = route('subscription.checkout');
                                    }}
                                >
                                    <Crown className="mr-2 h-4 w-4" />
                                    Upgrade Now
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
