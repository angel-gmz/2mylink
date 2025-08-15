<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsOnboarded
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
public function handle(Request $request, Closure $next): Response
        {
            // If user is authenticated, not yet onboarded, and not already on the onboarding path...
            if ($request->user() &&
                !$request->user()->onboarded &&
                !$request->routeIs('onboarding.*') &&
                !$request->routeIs('logout')) {
                // ...redirect them to the onboarding page.
                return redirect()->route('onboarding.create');
            }

            return $next($request);
        }
}
