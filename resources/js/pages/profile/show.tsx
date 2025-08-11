// resources/js/Pages/Profile/Show.tsx

import { Head } from '@inertiajs/react';
import type { PageProps, Link as LinkType } from '@/types'; // Ajusta la ruta a tus tipos si es necesario

export default function Show({ user, links }: PageProps<{ user: any; links: LinkType[] }>) {
    return (
        <>
            <Head title={`${user.name} (@${user.username})`} />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center pt-10 sm:pt-16">
                {/* Placeholder para la imagen de perfil */}
                <div className="size-24 rounded-full bg-gray-300 dark:bg-gray-700 mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-500">{user.name.charAt(0)}</span>
                </div>

                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {user.name}
                </h1>
                <p className="text-md text-gray-500 dark:text-gray-400 mb-8">
                    @{user.username}
                </p>

                {/* Lista de Enlaces */}
                <div className="w-full max-w-md px-4 space-y-4">
                    {links.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-blue-500 text-white text-center font-bold py-4 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                <footer className="mt-12 text-center text-sm text-gray-400">
                    <p>Creado con MyLinks</p>
                </footer>
            </div>
        </>
    );
}