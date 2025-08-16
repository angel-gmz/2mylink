<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Theme;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicProfileController extends Controller
{
    public function show(User $user)
    {
        $links = $user->links()
            ->where('is_active', true)
            ->orderBy('order', 'asc')
            ->get();

        // Fetch the full theme object, falling back to 'default' if the user's theme is not found
        $selectedTheme = Theme::where('name', $user->theme)->first() ?? Theme::where('name', 'default')->first();

        $seoData = [
            'title' => $user->name . ' (@' . $user->username . ') | 2myLink',
            'description' => $user->bio ?: 'Find all my links in one place.',
            'image' => $user->avatar_path ? Storage::url($user->avatar_path) : asset('logo_social.png'),
        ];

        Inertia::share('seo', $seoData);

        return Inertia::render('profile/show', [
            'user' => [
                'name' => $user->name,
                'username' => $user->username,
                'bio' => $user->bio,
                'avatar_path' => $user->avatar_path,
                'theme' => $selectedTheme,
                'avatar_url' => $user->avatar_path ? Storage::url($user->avatar_path) : null,
                'is_premium' => $user->is_premium, 
            ],
            'links' => $links,
            'seo' => $seoData,
        ]);
    }
}
