<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Support\Facades\Log; // Importar para depuración si es necesario

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();

        // Inicializar valores para el usuario autenticado
        $premiumExpiresAt = null;
        $isSubscribedViaCashier = false;

        if ($user) {
            // --- Lógica para determinar el estado premium con Cashier ---
            // Solo intenta acceder a la suscripción de Cashier si el usuario tiene un Stripe ID.
            // Esto previene errores para usuarios recién creados o que no han interactuado con Stripe.
            if ($user->stripe_id) {
                $isSubscribedViaCashier = $user->subscribed('default');

                if ($isSubscribedViaCashier) {
                    $subscription = $user->subscription('default');

                    // Si hay un objeto de suscripción y tiene una fecha de fin
                    if ($subscription && $subscription->ends_at) {
                        $premiumExpiresAt = $subscription->ends_at->format('Y-m-d H:i:s');
                    }
                }
            }

            // Si no está suscrito vía Cashier (o no tiene stripe_id),
            // usa el campo original 'premium_expires_at' como fallback.
            if (!$isSubscribedViaCashier) {
                $premiumExpiresAt = $user->premium_expires_at ? $user->premium_expires_at->format('Y-m-d H:i:s') : null;
            }
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                 'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'username' => $user->username,
                    'bio' => $user->bio,
                    'avatar_path' => $user->avatar_path,
                    'avatar_url' => $user->avatar_path
                                    ? rtrim(config('app.url'), '/') . Storage::url($user->avatar_path)
                                    : null,
                    'theme' => $user->theme,
                    'is_premium' => (bool) $user->is_premium, // Mantener tu campo original
                    'premium_expires_at' => $premiumExpiresAt, // Usar el valor determinado dinámicamente
                    'is_subscribed_via_cashier' => $isSubscribedViaCashier, // Usar el valor determinado dinámicamente
                ] : null,
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
