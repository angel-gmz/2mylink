import { type Link as LinkType } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import InputError from './input-error';

// Define a more specific type for the item being edited
type EditableItem = LinkType & { type: 'link' | 'divider' };

interface EditLinkModalProps {
    link: EditableItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditLinkModal({ link, isOpen, onClose }: EditLinkModalProps) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        title: '',
        url: '',
    });

    // Pre-fill the form when a link is selected
    useEffect(() => {
        if (link) {
            setData({
                title: link.title,
                url: link.url || '',
            });
        }
    }, [link]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!link) return;

        patch(route('links.update', link.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    // Determine if the item is a divider
    const isDivider = link?.type === 'divider';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    {/* Change title based on item type */}
                    <DialogTitle>{isDivider ? 'Edit Divider' : 'Edit Link'}</DialogTitle>
                    <DialogDescription>
                        {isDivider
                            ? "Make changes to your divider's text here."
                            : "Make changes to your link here. Click save when you're done."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="title">{isDivider ? 'Divider Text' : 'Title'}</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1"
                        />
                        <InputError message={errors.title} className="mt-1" />
                    </div>
                    {/* Only show the URL field if it's a link */}
                    {!isDivider && (
                        <div>
                            <Label htmlFor="url">URL</Label>
                            <Input
                                id="url"
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                className="mt-1"
                            />
                            <InputError message={errors.url} className="mt-1" />
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
