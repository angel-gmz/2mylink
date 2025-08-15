<?php

namespace App\Http\Controllers;

use App\Models\User;
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

        // Prepara los datos para SEO y Open Graph
        $seoData = [
            'title' => $user->name . ' (@' . $user->username . ') | 2myLink',
            'description' => $user->bio ?: 'Encuentra todos mis enlaces en un solo lugar.',
            'image' => $user->avatar_path ? Storage::url($user->avatar_path) : asset('logo_social.png'),
        ];

        return Inertia::render('profile/show', [
            'user' => [
                'name' => $user->name,
                'username' => $user->username,
                'bio' => $user->bio,
                'avatar_path' => $user->avatar_path,
                'theme' => $user->theme,
            ],
            'links' => $links,
            'seo' => $seoData, // Pasa los datos de SEO a la vista
        ]);
    }
}
