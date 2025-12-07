import { type BreadcrumbItem, type PageProps, type User } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { useToast } from '@/hooks/use-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

// 1. Update the form type
type ProfileForm = {
    name: string;
    email: string;
    bio: string;
    avatar: File | null;
};



export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<PageProps>().props;
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    // 2. Update useForm hook
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: auth.user.name,
        email: auth.user.email,
        bio: auth.user.bio ?? '', // Use nullish coalescing for safety
        avatar: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // 3. Use post for file uploads
        post(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profile updated', {
                    description: 'Your profile information has been saved successfully',
                });
            },
            onError: () => {
                toast.error('Failed to update profile', {
                    description: 'Please check your information and try again',
                });
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('avatar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your profile photo, name, and bio." />

                    <form onSubmit={submit} className="space-y-8">
                        {/* --- AVATAR UPLOAD SECTION --- */}
                        <div className="grid gap-2">
                            <Label>Profile Photo</Label>
                            <div className="flex items-center gap-4 mt-1">
                                <div className="size-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                    <img
                                        src={preview || (auth.user.avatar_path ? `/storage/${auth.user.avatar_path}` : `https://ui-avatars.com/api/?name=${auth.user.name}&background=random`)}
                                        alt="Avatar preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                    Change
                                </Button>
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                            <InputError className="mt-2" message={errors.avatar} />
                        </div>

                        {/* --- NAME INPUT --- */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        {/* --- BIO TEXTAREA --- */}
                        <div className="grid gap-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                value={data.bio}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('bio', e.target.value)}
                                placeholder="Tell us a little about yourself"
                                className="min-h-[100px]"
                            />
                            <InputError className="mt-2" message={errors.bio} />
                        </div>

                        {/* --- EMAIL INPUT --- */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                readOnly={true}
                                value={data.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>
                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-muted-foreground">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
