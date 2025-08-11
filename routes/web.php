<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LinkController; 
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // MODIFICA ESTA RUTA
   Route::get('/dashboard', function (Request $request) { // <-- Pide el Request
        return Inertia::render('dashboard', [
            'links' => $request->user()->links()->latest()->get(), // Usa $request->user()
        ]);
    })->name('dashboard');

    // RUTAS PARA LAS ACCIONES DE LOS ENLACES
    Route::post('links', [LinkController::class, 'store'])->name('links.store');
    Route::delete('links/{link}', [LinkController::class, 'destroy'])->name('links.destroy');
});

Route::middleware('auth')->group(function () {
    Route::post('/links', [LinkController::class, 'store'])->name('links.store');
    Route::put('/links/{link}', [LinkController::class, 'update'])->name('links.update');
    Route::delete('/links/{link}', [LinkController::class, 'destroy'])->name('links.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/{user:username}', [\App\Http\Controllers\PublicProfileController::class, 'show'])->name('profile.show');