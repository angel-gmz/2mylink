import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type PageProps, type User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Coffee, Cog, ExternalLink, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Settings',
        href: '/settings/profile',
        icon: Cog,
    },
];

// Define a more specific user type for this component
interface SidebarUser extends User {
    username: string;
}

export function AppSidebar() {
    // Get the authenticated user from the shared props
    const { auth } = usePage<PageProps<{ auth: { user: SidebarUser } }>>().props;

    // Dynamically create the footer navigation items
    const footerNavItems: NavItem[] = [
        {
            title: 'My Public Profile',
            // Construct the full URL to ensure it opens in a new tab
            href: `https://2myl.ink/${auth.user.username}`,
            icon: ExternalLink,
        },
        {
            title: 'Support this project',
            href: '',
            icon: Coffee,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
