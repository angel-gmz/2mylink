import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

// Icono simple para el logo
const LogoIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.1905 15.2381L10.8095 8.7619M7.28571 12H16.7143" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.5 12C5.5 15.5899 8.41015 18.5 12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
);


export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="2mylink - All your links in one place" />
            <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                {/* Header / Navigation */}
                <header className="w-full px-6 py-4 sm:px-10">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                            <LogoIcon />
                            <span>2mylink</span>
                        </Link>

                        {/* Auth Links */}
                        <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-4 py-2 text-gray-600 ring-1 ring-transparent transition hover:text-black hover:dark:text-white focus:outline-none focus-visible:ring-blue-500"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-4 py-2 text-gray-600 ring-1 ring-transparent transition hover:text-black hover:dark:text-white focus:outline-none focus-visible:ring-blue-500"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Main Hero Section */}
                <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                            One Link to Rule Them All
                        </h1>
                        <p className="mt-4 max-w-lg mx-auto text-lg text-gray-600 dark:text-gray-400">
                            Create a single, beautiful page to house all your important links. Perfect for your social media bios, portfolios, and more.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={route('register')}
                                className="w-full sm:w-auto rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                                Create your 2mylink for free
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full px-6 py-4 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} 2mylink. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
