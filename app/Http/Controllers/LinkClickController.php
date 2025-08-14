<?php

namespace App\Http\Controllers;

use App\Models\Link;

class LinkClickController extends Controller
{
    /**
     * Handle the incoming request.
     * Increment the click count for the link and redirect to its URL.
     */
    public function __invoke(Link $link)
    {
        $link->increment('clicks');

        return redirect()->away($link->url);
    }
}
