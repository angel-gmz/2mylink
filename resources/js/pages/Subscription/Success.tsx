import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

// Define las props que recibirá este componente
interface SubscriptionSuccessProps extends PageProps {
    message: string; // El mensaje que viene desde el controlador de Laravel
}

export default function SubscriptionSuccess({ message }: SubscriptionSuccessProps) {
    return (
        // Asegúrate de usar el layout correcto para páginas autenticadas
        <AppLayout // Removed the 'header' prop as AppLayout does not expect it directly
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subscription Status</h2>}
        >
            <Head title="Subscription Success" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <Card className="overflow-hidden shadow-sm sm:rounded-lg">
                        <CardHeader className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-green-700">Subscription Successful!</CardTitle>
                            <CardDescription className="text-md text-gray-600">
                                {message || 'Your premium subscription has been activated.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-500 mb-6">
                                Thank you for upgrading to premium! You now have access to all exclusive features.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button asChild>
                                    <Link href={route('dashboard')}>Go to Dashboard</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('profile.edit')}>Manage Profile</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
