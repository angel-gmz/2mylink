<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException; 

class AppearanceController extends Controller
{
    /**
     * Update the user's appearance settings.
     */
    public function update(Request $request)
    {
        // 2. Validar que el tema exista en la base de datos
        $validated = $request->validate([
            'theme' => ['required', 'string', Rule::in(Theme::pluck('name')->all())],
        ]);

        $selectedTheme = Theme::where('name', $validated['theme'])->first();
        $user = $request->user();

        // 3. Lógica de validación para usuarios Premium
        // Si el tema tiene degradado Y el usuario NO es premium
        if ($selectedTheme->gradient_from && !$user->is_premium) {
            // Lanzar un error de validación
            throw ValidationException::withMessages([
                'theme' => 'You must be a premium user to select a gradient theme.',
            ]);
        }

        // Si la validación pasa, se actualiza el tema del usuario
        $user->update($validated);

        return back();
    }
}