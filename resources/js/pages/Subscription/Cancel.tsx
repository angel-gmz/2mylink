import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

// Define las props que recibirá este componente
interface SubscriptionCancelProps extends PageProps {
    message: string; // El mensaje que viene desde el controlador de Laravel
}

export default function SubscriptionCancel({ message }: SubscriptionCancelProps) {
    return (
        // Asegúrate de usar el layout correcto para páginas autenticadas
        <AppLayout // Removed the 'header' prop as AppLayout does not expect it directly
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subscription Status</h2>}
        >
            <Head title="Subscription Cancelled" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <Card className="overflow-hidden shadow-sm sm:rounded-lg">
                        <CardHeader className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <XCircle className="h-16 w-16 text-red-500" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-red-700">Subscription Cancelled</CardTitle>
                            <CardDescription className="text-md text-gray-600">
                                {message || 'The subscription process was cancelled.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-500 mb-6">
                                You can try again at any time or contact support if you need assistance.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button asChild>
                                    <Link href={route('subscription')}>Go back to Subscription Page</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('dashboard')}>Go to Dashboard</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
