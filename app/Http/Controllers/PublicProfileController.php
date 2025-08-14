<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class PublicProfileController extends Controller
{
    public function show(User $user)
    {
        // This correctly fetches the links in the desired order.
        $links = $user->links()->orderBy('order', 'asc')->get();

        return Inertia::render('profile/show', [
            'user' => [
                'name' => $user->name,
                'username' => $user->username,
                'bio' => $user->bio,
                'avatar_path' => $user->avatar_path,
                'theme' => $user->theme,
            ],
            // CORRECTED: Pass the ordered $links variable, not the unordered relationship.
            'links' => $links,
        ]);
    }
}
