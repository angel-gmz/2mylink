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
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'url' => ['required', 'url', 'max:255'],
        ]);

        $request->user()->links()->create($validated);

        return Redirect::route('dashboard');
    }

    /**
     * Update the specified link.
     */
    public function update(Request $request, Link $link)
    {
        // Autoriza la acción usando la LinkPolicy
        $this->authorize('update', $link);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'url' => ['required', 'url', 'max:255'],
        ]);

        $link->update($validated);

        return Redirect::route('dashboard');
    }

    public function destroy(Link $link)
    {
        // Llama a la Policy para verificar si el usuario puede borrar este enlace
        $this->authorize('delete', $link);

        $link->delete();

        return Redirect::route('dashboard');
    }

        /**
     * Update the order of the links.
     */
    public function updateOrder(Request $request)
    {
        $request->validate([
            'links' => ['required', 'array'],
            // Ensure every ID in the array exists and belongs to the authenticated user
            'links.*' => ['integer', Rule::exists('links', 'id')->where('user_id', $request->user()->id)],
        ]);

        // Loop through the received link IDs and update their order based on their position in the array
        foreach ($request->links as $index => $linkId) {
            Link::where('id', $linkId)
                ->where('user_id', $request->user()->id)
                ->update(['order' => $index]);
        }

        // We can return a 204 No Content response as we don't need to reload the page
        return back();
    }
}
