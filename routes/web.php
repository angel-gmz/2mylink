<?php

use App\Http\Controllers\LinkController;
use App\Http\Controllers\PublicProfileController;
use App\Http\Controllers\Settings\AppearanceController;
use App\Http\Controllers\LinkClickController;
use App\Http\Controllers\Auth\OnboardingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Public landing page
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// All authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function (Request $request) {
        return Inertia::render('dashboard', [
            'links' => $request->user()->links()->orderBy('order', 'asc')->get(),
        ]);
    })->name('dashboard');

    Route::get('/onboarding', [OnboardingController::class, 'create'])->name('onboarding.create');
    Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');

    // Link Management
    Route::post('links', [LinkController::class, 'store'])->name('links.store');
    Route::patch('links/{link}', [LinkController::class, 'update'])->name('links.update');
    Route::delete('links/{link}', [LinkController::class, 'destroy'])->name('links.destroy');
    // MODIFIED: Changed URL to avoid conflict
    Route::patch('/update-link-order', [LinkController::class, 'updateOrder'])->name('links.order.update');
    Route::patch('links/{link}/toggle', [LinkController::class, 'toggle'])->name('links.toggle');

    // Settings
    Route::patch('/settings/appearance', [AppearanceController::class, 'update'])->name('appearance.update');
});

// Include separate route files for auth and settings
require __DIR__.'/auth.php';
require __DIR__.'/settings.php';

// Temporary route for running migrations in production.
// IMPORTANT: REMOVE THIS ROUTE AFTER YOU HAVE USED IT.
Route::get('/rtdavbfbgij12345', function () {
    Artisan::call('migrate', ['--force' => true]);
    return 'Migrations executed successfully!';
    });
    
    /*
Route::get('/rtdasadsgij1234sb', function () {
    // Borra el enlace viejo si existe, para evitar errores
    if (file_exists(public_path('storage'))) {
        unlink(public_path('storage'));
    }

    // Crea el nuevo enlace simbólico
    Artisan::call('storage:link');

    return '¡Enlace simbólico creado!';
});
*/

Route::get('/visit/{link}', [LinkClickController::class, '__invoke'])->name('links.visit');

// Public user profile route - MUST BE THE LAST ROUTE
Route::get('/{user:username}', [PublicProfileController::class, 'show'])->name('profile.show');
