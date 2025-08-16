import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Theme } from '@/types/theme';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance({ themes }: { themes: Theme[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    {/* Pass the themes to the component */}
                    <AppearanceTabs themes={themes} />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
