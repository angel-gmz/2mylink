import { Head, Link } from '@inertiajs/react';
import { SearchX, Sparkles } from 'lucide-react';

interface NotFoundProps {
    username: string;
    isAvailable: boolean;
}

export default function NotFound({ username, isAvailable }: NotFoundProps) {
    return (
        <>
            <Head title="Profile Not Found" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-center text-slate-200">
                <SearchX className="size-16 text-teal-400" />
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Profile Not Found
                </h1>
                <p className="mt-4 text-lg text-slate-400">
                    Sorry, we couldn’t find a profile for{' '}
                    <span className="font-semibold text-white">@{username}</span>.
                </p>

                {/* Conditional button */}
                {isAvailable ? (
                    <div className="mt-8">
                        <p className="mb-4 text-teal-400">But the good news is, this username is available!</p>
                        <Link
                            href={route('register', { username })}
                            className="inline-flex items-center gap-2 rounded-md bg-teal-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-600"
                        >
                            <Sparkles className="size-5" />
                            Claim this username
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8">
                        <Link
                            href={route('home')}
                            className="rounded-md bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm transition hover:bg-slate-200"
                        >
                            Go back home
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
