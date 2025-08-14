import { Head, Link } from '@inertiajs/react';
import { type Link as LinkType } from '@/types';
import { cn } from '@/lib/utils';

// Define theme styles
const themeStyles = {
    default: {
        bg: 'bg-gray-100 dark:bg-gray-900',
        text: 'text-gray-800 dark:text-gray-200',
        linkBg: 'bg-blue-500 hover:bg-blue-600',
        linkText: 'text-white',
    },
    dark: {
        bg: 'bg-gray-900',
        text: 'text-gray-100',
        linkBg: 'bg-teal-500 hover:bg-teal-600',
        linkText: 'text-white',
    },
    mint: {
        bg: 'bg-green-50',
        text: 'text-green-900',
        linkBg: 'bg-green-600 hover:bg-green-700',
        linkText: 'text-white',
    },
    sunset: {
        bg: 'bg-orange-100',
        text: 'text-orange-900',
        linkBg: 'bg-red-500 hover:bg-red-600',
        linkText: 'text-white',
    },
};

// This interface now exactly matches the data sent from PublicProfileController
interface ProfileUser {
    name: string;
    username: string;
    bio: string | null;
    avatar_path: string | null;
    theme: keyof typeof themeStyles | null;
}

// Define the props for the Show component explicitly
interface ShowProps {
    user: ProfileUser;
    links: LinkType[];
}

export default function Show({ user, links }: ShowProps) {
    const currentTheme = themeStyles[user.theme || 'default'];

    return (
        <>
            <Head title={`${user.name} (@${user.username})`} />
            <div className={cn('min-h-screen flex flex-col items-center pt-10 sm:pt-16 transition-colors', currentTheme.bg, currentTheme.text)}>
                <div className="size-24 rounded-full bg-gray-300 dark:bg-gray-700 mb-4 flex items-center justify-center overflow-hidden">
                    <img
                        src={user.avatar_path ? `/storage/${user.avatar_path}` : `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                        alt={user.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                <h1 className="text-xl font-semibold">{user.name}</h1>
                <p className="text-md text-muted-foreground mb-4">@{user.username}</p>
                {user.bio && <p className="max-w-md text-center mb-8">{user.bio}</p>}

                <div className="w-full max-w-md px-4 space-y-4">
                    {links.map((link) => (
                        <a
                            key={link.id}
                            // The href now points to our tracking route
                            href={route('links.visit', link.id)}
                            // We no longer need target="_blank" as the redirect handles opening the link
                            className={cn(
                                'block w-full text-center font-bold py-4 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1',
                                currentTheme.linkBg,
                                currentTheme.linkText,
                            )}
                        >
                            {link.title}
                        </a>
                    ))}
                </div>
                <footer className="mt-12 text-center text-sm text-muted-foreground">
                    <p>
                        Powered by{' '}
                        <Link href={route('home')} className="hover:underline font-semibold">
                            2myLink
                        </Link>
                    </p>
                </footer>
            </div>
        </>
    );
}
