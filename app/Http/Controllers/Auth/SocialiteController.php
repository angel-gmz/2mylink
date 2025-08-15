<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request; // 1. Importa Request
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    public function redirectToGoogle(Request $request) // 2. Pide el Request
    {
        // 3. Si hay un username en la URL, guárdalo en la sesión
        if ($request->has('username')) {
            $request->session()->put('onboarding_username', $request->username);
        }

        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $user = User::where('google_id', $googleUser->id)->first();

            if ($user) {
                Auth::login($user);
                return redirect()->intended(route('dashboard', absolute: false));
            }

            $user = User::where('email', $googleUser->email)->first();

            if ($user) {
                $user->update(['google_id' => $googleUser->id]);
            } else {
                $user = User::create([
                    'google_id' => $googleUser->id,
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'password' => Hash::make(Str::random(24)),
                    'onboarded' => false,
                ]);
            }

            Auth::login($user);
            return redirect()->intended(route('dashboard', absolute: false));

        } catch (\Exception $e) {
            return redirect(route('login'))->with('error', 'Something went wrong with the Google login.');
        }
    }
}
