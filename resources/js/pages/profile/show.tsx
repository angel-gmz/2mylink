import { Head, Link as InertiaLink } from '@inertiajs/react';
import { type Link as LinkType, type Theme } from '@/types';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

// --- 1. TIPO CORREGIDO ---
// Se define una interfaz explícita para el usuario del perfil público,
// asegurando que cada propiedad tenga el tipo correcto y evitando conflictos.
interface ProfileUser {
    name: string;
    username: string;
    bio: string | null;
    avatar_url: string | null;
    theme: Theme;
    is_premium: boolean;
}

interface SeoData {
    title: string;
    description: string;
    image: string;
}

interface Item extends LinkType {
    type: 'link' | 'divider';
}

interface ShowProps {
    user: ProfileUser;
    links: Item[];
    seo: SeoData;
}

export default function Show({ user, links, seo }: ShowProps) {
    if (!user) {
        return null;
    }

    const currentTheme = user.theme;
    const pageUrl = `https://2myl.ink/${user.username}`;
    const hasGradient = currentTheme.gradient_from && currentTheme.gradient_to;

    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:image" content={seo.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={pageUrl} />
                <meta name="twitter:title" content={seo.title} />
                <meta name="twitter:description" content={seo.description} />
                <meta name="twitter:image" content={seo.image} />
            </Head>

            <div
                className={cn(
                    'min-h-screen flex flex-col items-center pt-10 sm:pt-16 transition-colors pb-8',
                    currentTheme.text_color,
                    hasGradient
                        ? `bg-gradient-to-br ${currentTheme.gradient_from} ${currentTheme.gradient_to}`
                        : currentTheme.bg_color,
                )}
            >
                <div className="size-24 rounded-full bg-gray-300 dark:bg-gray-700 mb-4 flex items-center justify-center overflow-hidden">
                    <img
                        src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                        alt={user.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">{user.name}</h1>
                    {user.is_premium && (
                        <Crown className="h-5 w-5 text-yellow-500" />
                    )}
                </div>

                <p className="text-md text-muted-foreground mb-4">@{user.username}</p>
                {user.bio && <p className="max-w-md text-center mb-8 px-4">{user.bio}</p>}

                <div className="w-full max-w-md px-4 space-y-4">
                    {links.map((item) =>
                        item.type === 'divider' ? (
                            <div key={`divider-${item.id}`} className="pt-2">
                                <h2 className={cn('text-center font-semibold', currentTheme.divider_text_color)}>
                                    {item.title}
                                </h2>
                            </div>
                        ) : (
                            <a
                                key={`link-${item.id}`}
                                href={route('links.visit', item.id)}
                                className={cn(
                                    'block w-full text-center font-bold py-4 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1',
                                    currentTheme.link_bg_color,
                                    currentTheme.link_text_color,
                                )}
                            >
                                {item.title}
                            </a>
                        ),
                    )}
                </div>

                {!user.is_premium && (
                    <footer className="mt-12 text-center text-sm text-muted-foreground">
                        <p>
                            Powered by{' '}
                            <InertiaLink href={route('home')} className="hover:underline font-semibold">
                                2myLink
                            </InertiaLink>
                        </p>
                    </footer>
                )}
            </div>
        </>
    );
}
