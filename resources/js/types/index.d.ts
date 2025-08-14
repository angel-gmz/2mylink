import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    // --- UPDATED PROPERTIES ---
    username: string;
    bio: string | null;
    avatar_url: string | null;
    theme: string | null;
    // --------------------------
    [key: string]: unknown;
}

export type Link = {
    id: number;
    user_id: number;
    title: string;
    url: string;
    created_at: string;
    updated_at: string;
    // --- ADDED PROPERTIES ---
    order: number;
    clicks: number;
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
