import { Head, useForm, usePage } from '@inertiajs/react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageProps } from '@/types';
import InputError from '@/components/input-error';

// 1. The component now accepts the prefilledUsername prop
export default function Onboarding({ prefilledUsername }: { prefilledUsername?: string }) {
    const { auth } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        // 2. Use the prop to set the initial value of the username
        username: prefilledUsername || '',
        link_title: '',
        link_url: '',
    });

    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    const checkUsername = useCallback(
        debounce(async (username: string) => {
            if (username.length < 3) {
                setIsAvailable(null);
                setIsChecking(false);
                return;
            }
            try {
                const response = await axios.post('/api/check-username', { username });
                setIsAvailable(response.data.isAvailable);
            } catch (error) {
                setIsAvailable(false);
            } finally {
                setIsChecking(false);
            }
        }, 500),
        [],
    );

    useEffect(() => {
        if (data.username) {
            setIsChecking(true);
            checkUsername(data.username);
        } else {
            setIsAvailable(null);
        }
    }, [data.username, checkUsername]);


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('onboarding.store'));
    };

    return (
        <>
            <Head title="Welcome!" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-slate-200">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white">Welcome to 2myLink, {auth.user.name}!</h1>
                        <p className="mt-2 text-slate-400">Let's set up your profile.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6 rounded-lg bg-slate-800 p-8">
                        <div>
                            <Label htmlFor="username" className="text-lg font-semibold">Choose your username</Label>
                            <div className="relative mt-2">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">2myl.ink/</span>
                                <Input
                                    id="username"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                    className="bg-slate-700 border-slate-600 pl-[85px] pr-10"
                                    placeholder="your-name"
                                    required
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {isChecking && <LoaderCircle className="h-4 w-4 animate-spin text-slate-500" />}
                                    {!isChecking && isAvailable === true && <Check className="h-4 w-4 text-green-500" />}
                                    {!isChecking && isAvailable === false && <span className="text-red-500 font-bold">!</span>}
                                </div>
                            </div>
                            <InputError message={errors.username} className="mt-2" />
                        </div>

                        <div className="border-t border-slate-700 pt-6">
                             <Label className="text-lg font-semibold">Add your first link (optional)</Label>
                             <div className="mt-4 space-y-4">
                                <div>
                                    <Label htmlFor="link_title">Title</Label>
                                    <Input id="link_title" value={data.link_title} onChange={(e) => setData('link_title', e.target.value)} placeholder="My Website" className="bg-slate-700 border-slate-600" />
                                    <InputError message={errors.link_title} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="link_url">URL</Label>
                                    <Input id="link_url" type="url" value={data.link_url} onChange={(e) => setData('link_url', e.target.value)} placeholder="https://..." className="bg-slate-700 border-slate-600" />
                                    <InputError message={errors.link_url} className="mt-2" />
                                </div>
                             </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={processing || isAvailable === false}>
                            Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
