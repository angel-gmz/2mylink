<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UsernameValidationController extends Controller
{
    public function __invoke(Request $request)
        {
            $validated = $request->validate([
                'username' => ['required', 'string', 'alpha_dash', 'max:255'],
            ]);

            $isAvailable = !User::where('username', $validated['username'])->exists();

            return response()->json(['isAvailable' => $isAvailable]);
        }
}
