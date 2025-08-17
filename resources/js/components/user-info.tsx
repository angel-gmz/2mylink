import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type PageProps, type User } from '@/types';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Extender el tipo User para incluir el nuevo prop de Cashier
interface UserWithSubscriptionStatus extends User {
    is_subscribed_via_cashier?: boolean;
}

export function UserInfo({ user, showEmail = false }: { user: UserWithSubscriptionStatus; showEmail?: boolean }) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar_url ?? undefined} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="flex items-center gap-1.5">
                    <span className="truncate font-medium">{user.name}</span>

                    {/* Usamos user.is_subscribed_via_cashier para la insignia Premium */}
                    {user.is_subscribed_via_cashier && (
                        <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    )}
                </div>
                {showEmail && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
            </div>
        </>
    );
}
