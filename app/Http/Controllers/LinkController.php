<?php

// app/Http/Controllers/LinkController.php
namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class LinkController extends Controller
{
    use AuthorizesRequests; 
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'url' => ['required', 'url', 'max:255'],
        ]);

        $request->user()->links()->create($validated);

        return Redirect::route('dashboard');
    }

    public function destroy(Link $link)
    {
        // Llama a la Policy para verificar si el usuario puede borrar este enlace
        $this->authorize('delete', $link);

        $link->delete();

        return Redirect::route('dashboard');
    }
}