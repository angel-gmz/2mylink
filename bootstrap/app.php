<?php

use App\Models\User; 
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\EnsureUserIsOnboarded::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
                $exceptions->render(function (NotFoundHttpException $e, $request) {
            // 2. Lógica para capturar el username
            $username = $request->segment(1); // Obtiene el primer segmento de la URL (ej. 'username' de /username)
            $isAvailable = !User::where('username', $username)->exists();

            return Inertia::render('errors/404', [
                'username' => $username,
                'isAvailable' => $isAvailable,
            ])
                ->toResponse($request)
                ->setStatusCode($e->getStatusCode());
        });
    })->create();
