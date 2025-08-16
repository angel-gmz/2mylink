<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Models\Theme;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance', [
            'themes' => Theme::all(),
        ]);
    })->name('appearance');

    Route::get('settings/subscription', function () {
        return Inertia::render('settings/subscription');
    })->name('subscription');
});
