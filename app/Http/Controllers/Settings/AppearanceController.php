<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AppearanceController extends Controller
{
    /**
     * Update the user's appearance settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'theme' => ['required', 'string', Rule::in(['default', 'dark', 'mint', 'sunset'])],
        ]);

        $request->user()->update($validated);

        return back();
    }
}
