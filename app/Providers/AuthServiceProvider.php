<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Link;
use App\Policies\LinkPolicy;

class AuthServiceProvider extends ServiceProvider
{
        /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // Aquí se registra manualmente
        Link::class => LinkPolicy::class,
    ];
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
