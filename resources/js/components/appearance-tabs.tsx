import { type PageProps, type Theme } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Crown, LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { type HTMLAttributes, useEffect } from 'react';

import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import HeadingSmall from './heading-small';
import { Separator } from './ui/separator';

// --- Component for the Admin Dashboard Theme ---
function AdminThemeToggle({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        appearance === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}

// --- Component for the Public Profile Theme ---
function PublicProfileThemeSelector({ themes }: { themes: Theme[] }) {
    const { auth } = usePage<PageProps>().props;
    const isUserPremium = auth.user.is_premium;

    const { data, setData, patch, processing } = useForm({
        theme: auth.user.theme || 'default',
    });

    useEffect(() => {
        if (data.theme !== auth.user.theme) {
            patch(route('appearance.update'), { preserveScroll: true });
        }
    }, [data.theme]);

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {themes.map((theme) => {
                // --- CAMBIO 1: Leer todas las propiedades opcionales desde `theme.properties` ---
                const {
                    gradient_from,
                    gradient_to,
                    bg_color,
                    link_animation,
                    // Agrega aquí futuras propiedades como button_style, font_family, etc.
                } = theme.properties || {}; // Usamos un objeto vacío como fallback

                // Lógica para determinar el fondo (gradiente tiene prioridad)
                const backgroundClass = gradient_from && gradient_to
                    ? `bg-gradient-to-br ${gradient_from} ${gradient_to}`
                    : bg_color;

                const isLocked = theme.is_premium && !isUserPremium;

                return (
                    <div key={theme.name}>
                        <button
                            type="button"
                            onClick={() => {
                                if (!isLocked) {
                                    setData('theme', theme.name);
                                }
                            }}
                            className={cn(
                                'relative w-full rounded-md border-2 p-1 transition-all duration-200',
                                data.theme === theme.name ? 'border-primary' : 'border-transparent hover:border-muted',
                                isLocked && 'cursor-not-allowed'
                            )}
                            disabled={processing}
                        >
                            {/* --- CAMBIO 2: Aplicar la clase de fondo correcta --- */}
                            <div className={cn(
                                'flex flex-col gap-2 rounded-md p-4 transition-all',
                                backgroundClass, // Se aplica el fondo (sólido o gradiente)
                                isLocked && 'filter grayscale opacity-60'
                            )}>
                                <p className={cn('text-xs font-semibold', theme.text_color)}>@username</p>

                                {/* --- CAMBIO 3: Aplicar la animación a los links --- */}
                                <div className={cn(
                                    'w-full rounded-md p-2 text-center text-xs font-bold',
                                    theme.link_bg_color,
                                    theme.link_text_color,
                                    link_animation // Se aplica la animación si existe
                                )}>
                                    Link
                                </div>
                                <div className={cn(
                                    'w-full rounded-md p-2 text-center text-xs font-bold',
                                    theme.link_bg_color,
                                    theme.link_text_color,
                                    link_animation // Se aplica la animación si existe
                                )}>
                                    Link
                                </div>
                            </div>

                            {theme.is_premium ? (
                                <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 p-1 shadow-md">
                                    <Crown className="h-4 w-4 text-white" />
                                </div>
                            ) : null}
                        </button>
                        <p className="mt-2 text-center text-sm font-medium capitalize text-muted-foreground">
                            {theme.name}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}


// --- Main Component that combines both selectors ---
export default function AppearanceTabs({ themes }: { themes: Theme[] }) {
    return (
        <div className="space-y-8">
            <div>
                <HeadingSmall title="Dashboard Theme" description="Choose how your admin dashboard looks." />
                <div className="mt-4">
                    <AdminThemeToggle />
                </div>
            </div>

            <Separator />

            <div>
                <HeadingSmall title="Public Profile Theme" description="Select a color palette for your public page." />
                <div className="mt-4">
                    <PublicProfileThemeSelector themes={themes} />
                </div>
            </div>
        </div>
    );
}