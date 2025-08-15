<?php

// app/Http/Controllers/LinkController.php
namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Validation\Rule;

class LinkController extends Controller
{
    use AuthorizesRequests;

    public function store(Request $request)
    {
        // SOLUCIÓN: Validar todo en una sola llamada
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['link', 'divider'])]
        ];

        // Solo agregar validación de URL si el tipo es 'link'
        if ($request->input('type') === 'link') {
            $rules['url'] = ['required', 'url', 'max:255'];
        } else {
            // Para dividers, URL es opcional
            $rules['url'] = ['nullable', 'url', 'max:255'];
        }

        $validatedData = $request->validate($rules);

        // Obtener el último valor de 'order' para el usuario actual
        $lastOrder = $request->user()->links()->max('order');
        $newOrder = is_null($lastOrder) ? 0 : $lastOrder + 1;

        $request->user()->links()->create([
            'title' => $validatedData['title'],
            'url' => $validatedData['url'] ?? null,
            'type' => $validatedData['type'],
            'order' => $newOrder,
        ]);

        return Redirect::route('dashboard');
    }

    /**
     * Update the specified link.
     */
    public function update(Request $request, Link $link)
    {
        $this->authorize('update', $link);
        
        $rules = [
            'title' => ['required', 'string', 'max:255']
        ];
        
        if ($link->type === 'link') {
            $rules['url'] = ['required', 'url', 'max:255'];
        } else {
            $rules['url'] = ['nullable', 'url', 'max:255'];
        }
        
        $validated = $request->validate($rules);
        $link->update($validated);
        return Redirect::route('dashboard');
    }

    public function destroy(Link $link)
    {
        $this->authorize('delete', $link);
        $link->delete();
        return back();
    }

    /**
     * Update the order of the links.
     */
    public function updateOrder(Request $request)
    {
        $request->validate([
            'links' => ['required', 'array'],
            'links.*' => ['integer', Rule::exists('links', 'id')->where('user_id', $request->user()->id)],
        ]);

        foreach ($request->links as $index => $linkId) {
            Link::where('id', $linkId)
                ->where('user_id', $request->user()->id)
                ->update(['order' => $index]);
        }

        return back();
    }

    /**
     * Toggle the active state of a link.
     */
    public function toggle(Request $request, Link $link)
    {
        $this->authorize('update', $link);

        $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $link->update(['is_active' => $request->is_active]);

        return back(303); 
    }
}