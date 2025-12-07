import { toast as sonnerToast } from 'sonner';

/**
 * Custom hook for displaying toast notifications
 * Provides a simple API for success, error, warning, and info toasts
 */
export function useToast() {
    return {
        toast: {
            success: (message: string, options?: Parameters<typeof sonnerToast.success>[1]) =>
                sonnerToast.success(message, options),
            error: (message: string, options?: Parameters<typeof sonnerToast.error>[1]) =>
                sonnerToast.error(message, options),
            warning: (message: string, options?: Parameters<typeof sonnerToast.warning>[1]) =>
                sonnerToast.warning(message, options),
            info: (message: string, options?: Parameters<typeof sonnerToast.info>[1]) =>
                sonnerToast.info(message, options),
            message: (message: string, options?: Parameters<typeof sonnerToast>[1]) =>
                sonnerToast(message, options),
            promise: sonnerToast.promise,
            loading: sonnerToast.loading,
            dismiss: sonnerToast.dismiss,
        },
    };
}
