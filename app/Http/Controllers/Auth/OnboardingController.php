<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function create(Request $request) // Pide el Request
    {
        return Inertia::render('auth/onboarding', [
            'prefilledUsername' => $request->session()->pull('onboarding_username', ''),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'lowercase', 'max:255', Rule::unique(User::class)],
            'link_title' => ['nullable', 'string', 'max:255'],
            'link_url' => ['nullable', 'url', 'max:255', 'required_with:link_title'],
        ]);

        $user = $request->user();

        $user->update([
            'username' => $validated['username'],
            'onboarded' => true,
        ]);

        if ($request->filled('link_title') && $request->filled('link_url')) {
            $user->links()->create([
                'title' => $validated['link_title'],
                'url' => $validated['link_url'],
                'type' => 'link',
            ]);
        }

        return Redirect::route('dashboard');
    }
}
