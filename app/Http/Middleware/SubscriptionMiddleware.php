<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubscriptionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        // Si no está autenticado, redirigir al login
        if (!$user) {
            return redirect()->route('login');
        }
        
        // Verificar si tiene suscripción activa
        if (!$user->subscribed('default')) {
            // Si es una petición JSON (API), devolver error
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Se requiere suscripción premium para acceder a esta función.',
                    'upgrade_url' => route('subscription.checkout')
                ], 402); // 402 Payment Required
            }
            
            // Si es petición web, redirigir con mensaje
            return redirect()->route('subscription')->with('error', 'Se requiere suscripción premium para acceder a esta función.');
        }
        
        return $next($request);
    }
}