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
        // Validate the type first
        $validatedType = $request->validate([
            'type' => ['required', Rule::in(['link', 'divider'])]
        ]);

        $rules = [
            'title' => ['required', 'string', 'max:255'],
        ];

        // Add URL validation only if it's a link
        if ($validatedType['type'] === 'link') {
            $rules['url'] = ['required', 'url', 'max:255'];
        }

        $validatedData = $request->validate($rules);

        $request->user()->links()->create([
            'title' => $validatedData['title'],
            'url' => $validatedData['url'] ?? null, // Set URL to null for dividers
            'type' => $validatedType['type'],
        ]);

        return Redirect::route('dashboard');
    }

 /**
     * Update the specified link.
     */
    public function update(Request $request, Link $link)
    {
        // Autoriza la acción usando la LinkPolicy
        $this->authorize('update', $link);

        $rules = [
            'title' => ['required', 'string', 'max:255'],
        ];

        // Only validate URL if it's a link
        if ($link->type === 'link') {
            $rules['url'] = ['required', 'url', 'max:255'];
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
}
