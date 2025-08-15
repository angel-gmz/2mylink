import { Head, Link } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import { Separator } from '@/components/ui/separator';

// Google Icon SVG
const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        {/* The `dark:fill-white` class will turn the icon white in dark mode */}
        <path className="fill-black dark:fill-white" d="M32.582 370.734C15.127 336.291 5.12 297.425 5.12 256c0-41.426 10.007-80.291 27.462-114.735C74.705 57.484 161.047 0 261.12 0c69.12 0 126.836 25.367 171.287 66.793l-73.31 73.309c-26.763-25.135-60.276-38.168-97.977-38.168-66.56 0-123.113 44.917-143.36 105.426-5.12 15.36-8.146 31.65-8.146 48.64 0 16.989 3.026 33.28 8.146 48.64l-.303.232h.303c20.247 60.51 76.8 105.426 143.36 105.426 34.443 0 63.534-9.31 86.341-24.67 27.23-18.152 45.382-45.148 51.433-77.032H261.12v-99.142h241.105c3.025 16.757 4.654 34.211 4.654 52.364 0 77.963-27.927 143.592-76.334 188.276-42.356 39.098-100.305 61.905-169.425 61.905-100.073 0-186.415-57.483-228.538-141.032v-.233z"></path>
    </svg>
);

export default function Register() {
    return (
        <AuthLayout title="Create an account" description="Get started by creating your account with Google.">
            <Head title="Register" />

            <div className="flex flex-col gap-6">
                {/* Changed from <Link> to <a> to force a full page redirect */}
                <a href={route('auth.google.redirect')} className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    <GoogleIcon />
                    Sign up with Google
                </a>

                <div className="relative">
                    <Separator />
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs uppercase text-muted-foreground">
                        Or
                    </span>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href={route('login')} className="underline underline-offset-4 hover:text-primary">
                        Log in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
