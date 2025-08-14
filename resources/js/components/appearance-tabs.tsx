import { type PageProps, type User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';
import HeadingSmall from './heading-small';
import { Separator } from './ui/separator';

// --- Componente para el tema del Admin Dashboard (el que tú proporcionaste) ---
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

// --- Componente para el tema del Perfil Público (el que creamos nosotros) ---
const publicThemes = [
    { name: 'default', colors: ['bg-slate-100', 'bg-blue-500', 'bg-white'] },
    { name: 'dark', colors: ['bg-gray-900', 'bg-teal-500', 'bg-gray-800'] },
    { name: 'mint', colors: ['bg-green-50', 'bg-green-600', 'bg-white'] },
    { name: 'sunset', colors: ['bg-orange-100', 'bg-red-500', 'bg-white'] },
];

interface AppearanceUser extends User {
    theme?: string;
}

interface AppearancePageProps extends PageProps {
    auth: {
        user: AppearanceUser;
    };
}

function PublicProfileThemeSelector() {
    const { auth } = usePage<AppearancePageProps>().props;

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
            {publicThemes.map((theme) => (
                <div key={theme.name}>
                    <button
                        type="button"
                        onClick={() => setData('theme', theme.name)}
                        className={cn(
                            'w-full rounded-md border-2 p-2 transition-all duration-200',
                            data.theme === theme.name ? 'border-primary' : 'border-transparent hover:border-muted',
                        )}
                        disabled={processing}
                    >
                        <div className="flex items-center justify-center space-x-2 rounded-md bg-muted p-4">
                            {theme.colors.map((color, index) => (
                                <span key={index} className={cn('size-8 rounded-full', color)} />
                            ))}
                        </div>
                    </button>
                    <p className="mt-2 text-center text-sm font-medium capitalize text-muted-foreground">
                        {theme.name}
                    </p>
                </div>
            ))}
        </div>
    );
}

// --- Componente Principal que une ambos ---
export default function AppearanceTabs() {
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
                    <PublicProfileThemeSelector />
                </div>
            </div>
        </div>
    );
}
