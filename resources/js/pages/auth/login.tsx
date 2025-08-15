import { Head, Link } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import { Separator } from '@/components/ui/separator';

// Google Icon SVG
const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512S0 403.3 0 261.8S106.5 11.8 244 11.8S488 120.3 488 261.8zM100.3 262.3c0 24.5 5 48 14.2 69.1l-52.2 42.4C22.2 336.3 0 299.2 0 262.3S22.2 188.3 62.3 150.8l52.2 42.4c-9.2 21.1-14.2 44.6-14.2 69.1zM244 500c49.8 0 95.2-14.8 132.3-40.3l-45.8-37.1c-19.3 13.6-42.3 21.7-67.5 21.7s-48.2-8.1-67.5-21.7l-45.8 37.1C148.8 485.2 194.2 500 244 500zM425.7 372.4l-52.2-42.4c9.2-21.1 14.2-44.6 14.2-69.1s-5-48-14.2-69.1l52.2-42.4C465.8 188.3 488 225.4 488 262.3s-22.2 74-62.3 110.1zM244 122.3c22.9 0 43.8 7.9 60.2 23.3l45.8-37.1C314.9 64.3 282.1 43.8 244 43.8S173.1 64.3 138 108.5l45.8 37.1c16.4-15.4 37.3-23.3 60.2-23.3z"></path>
    </svg>
);

export default function Login() {
    return (
        <AuthLayout title="Log in to 2myLink" description="Continue with Google to access your dashboard.">
            <Head title="Log in" />

            <div className="flex flex-col gap-6">
                {/* Cambiado de <Link> a <a> para forzar una redirección completa */}
                <a href={route('auth.google.redirect')} className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    <GoogleIcon />
                    Sign in with Google
                </a>

                <div className="relative">
                    <Separator />
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs uppercase text-muted-foreground">
                        Or
                    </span>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Need an account?{' '}
                    <Link href={route('register')} className="underline underline-offset-4 hover:text-primary">
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
