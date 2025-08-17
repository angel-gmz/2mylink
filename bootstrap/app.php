<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Models\User; // Asegúrate de importar User si lo usas en excepciones
use Inertia\Inertia; // Asegúrate de importar Inertia si lo usas en excepciones
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException; // Asegúrate de importar

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            \App\Http\Middleware\HandleAppearance::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\EnsureUserIsOnboarded::class, // Re-habilitar si es necesario, o mantener comentado para depurar login
        ]);

        // Excluye la ruta del webhook de Stripe de la verificación CSRF
        $middleware->validateCsrfTokens(except: [
            'stripe/webhook', // <-- ¡Añade esta línea aquí!
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (NotFoundHttpException $e, $request) {
            // Lógica para capturar el username y mostrar 404 personalizado
            $username = $request->segment(1);
            $isAvailable = !User::where('username', $username)->exists();

            return Inertia::render('errors/404', [
                'username' => $username,
                'isAvailable' => $isAvailable,
            ])
                ->toResponse($request)
                ->setStatusCode($e->getStatusCode());
        });
    })->create();
