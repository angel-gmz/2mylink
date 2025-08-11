<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class PublicProfileController extends Controller
{
    public function show(User $user)
    {
        // Carga los enlaces asociados a este usuario para pasarlos a la vista
        $user->load('links');

        return Inertia::render('profile/show', [
            'user' => $user,
            'links' => $user->links,
        ]);
    }
}