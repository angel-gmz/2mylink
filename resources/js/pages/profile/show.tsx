import { Head, Link as InertiaLink } from '@inertiajs/react';
import { type Link as LinkType, type Theme } from '@/types';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

// --- Interfaces para el tipado de las props ---

// Extender la interfaz ProfileUser para incluir el nuevo prop de Cashier
interface ProfileUser {
    name: string;
    username: string;
    bio: string | null;
    avatar_url: string | null;
    theme: Theme; // Usa la interfaz de Theme actualizada
    is_premium: boolean; // Mantener si todavía lo usas para props o visualización
    is_subscribed_via_cashier?: boolean; // Nuevo prop desde el middleware (no usado directamente aquí)
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

/**
 * Componente que renderiza la página de perfil público de un usuario.
 * Muestra la información del usuario, sus enlaces y aplica el tema seleccionado.
 */
export default function Show({ user, links, seo }: ShowProps) {
    // Si no hay datos de usuario, no renderizar nada para evitar errores.
    if (!user) {
        return null;
    }

    const currentTheme = user.theme;
    const pageUrl = `https://2myl.ink/${user.username}`;

    // --- LÓGICA DE ESTILOS ---
    // 1. Desestructuramos todas las propiedades de estilo desde `theme.properties`.
    // 2. Asignamos valores por defecto para asegurar que la página siempre tenga un estilo base
    //    y no se rompa si alguna propiedad no está definida en un tema.
    const {
        gradient_from,
        gradient_to,
        bg_color,
        divider_text_color,
        font_family = 'font-sans',       // Valor por defecto
        avatar_style = 'rounded-full',  // Valor por defecto
        button_style = 'rounded-lg',    // Valor por defecto
        button_shadow = 'shadow-md',    // Valor por defecto
        link_animation,
    } = currentTheme.properties || {}; // Usamos un objeto vacío como fallback por seguridad.

    // 3. Determinamos la clase de fondo a aplicar. El gradiente tiene prioridad sobre el color sólido.
    const backgroundClass = gradient_from && gradient_to
        ? `bg-gradient-to-br ${gradient_from} ${gradient_to}`
        : bg_color;

    // --- CAMBIO CLAVE: Usamos user.is_premium que es el prop que viene del controlador ---
    const isUserPremium = user.is_premium;

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

            {/* Contenedor principal de la página */}
            <div
                className={cn(
                    'min-h-screen flex flex-col items-center pt-10 sm:pt-16 pb-8 transition-colors',
                    currentTheme.text_color, // Color de texto esencial
                    backgroundClass,         // Fondo dinámico (sólido o gradiente)
                    font_family,             // Fuente dinámica
                )}
            >
                {/* Avatar del usuario */}
                <div className={cn(
                    "size-24 bg-gray-300 dark:bg-gray-700 mb-4 flex items-center justify-center overflow-hidden",
                    avatar_style // Estilo de avatar dinámico
                )}>
                    <img
                        src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                        alt={user.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Información del usuario */}
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">{user.name}</h1>
                    {/* CAMBIO CLAVE: Usamos is_premium para la insignia Premium */}
                    {isUserPremium && (
                        <Crown className="h-5 w-5 text-yellow-500" />
                    )}
                </div>

                <p className="text-md text-muted-foreground mb-4">@{user.username}</p>
                {user.bio && <p className="max-w-md text-center mb-8 px-4">{user.bio}</p>}

                {/* Lista de enlaces y divisores */}
                <div className="w-full max-w-md px-4 space-y-4">
                    {links.map((item) =>
                        item.type === 'divider' ? (
                            <div key={`divider-${item.id}`} className="pt-2">
                                <h2 className={cn('text-center font-semibold', divider_text_color)}>
                                    {item.title}
                                </h2>
                            </div>
                        ) : (
                            <a
                                key={`link-${item.id}`}
                                href={route('links.visit', item.id)}
                                className={cn(
                                    'block w-full text-center font-bold py-4 px-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1',
                                    currentTheme.link_bg_color,   // Color de fondo del link (esencial)
                                    currentTheme.link_text_color, // Color de texto del link (esencial)
                                    button_style,                 // Estilo de bordes del botón
                                    button_shadow,                // Sombra del botón
                                    link_animation,               // Animación del botón
                                )}
                            >
                                {item.title}
                            </a>
                        ),
                    )}
                </div>

                {/* Pie de página con branding (solo para usuarios no premium) */}
                {/* CAMBIO CLAVE: Usamos is_premium para ocultar el branding */}
                {!isUserPremium && (
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
