<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Theme;

class ThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- Solid Color Themes ---
    Theme::create([
        'name' => 'default',
        'bg_color' => 'bg-gray-900',
        'text_color' => 'text-gray-100',
        'link_bg_color' => 'bg-teal-500',
        'link_text_color' => 'text-white',
        'divider_text_color' => 'text-gray-400',
    ]);

        Theme::create([
            'name' => 'dark',
            'bg_color' => 'bg-gray-900',
            'text_color' => 'text-gray-100',
            'link_bg_color' => 'bg-teal-500',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-gray-400',
        ]);

        Theme::create([
            'name' => 'mint',
            'bg_color' => 'bg-green-50',
            'text_color' => 'text-green-900',
            'link_bg_color' => 'bg-green-600',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-green-700',
        ]);

        Theme::create([
            'name' => 'sunset',
            'bg_color' => 'bg-orange-100',
            'text_color' => 'text-orange-900',
            'link_bg_color' => 'bg-red-500',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-orange-700',
        ]);

        Theme::create([
            'name' => 'monochrome',
            'bg_color' => 'bg-white',
            'text_color' => 'text-black',
            'link_bg_color' => 'bg-black',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-gray-500',
        ]);

        Theme::create([
            'name' => 'bubblegum',
            'bg_color' => 'bg-pink-100',
            'text_color' => 'text-pink-800',
            'link_bg_color' => 'bg-pink-400',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-pink-600',
        ]);

        Theme::create([
            'name' => 'ocean',
            'bg_color' => 'bg-blue-50',
            'text_color' => 'text-blue-900',
            'link_bg_color' => 'bg-blue-700',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-blue-800',
        ]);

        Theme::create([
            'name' => 'forest',
            'bg_color' => 'bg-gray-800',
            'text_color' => 'text-white',
            'link_bg_color' => 'bg-emerald-500',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-emerald-300',
        ]);

        Theme::create([
            'name' => 'slate',
            'bg_color' => 'bg-slate-800',
            'text_color' => 'text-white',
            'link_bg_color' => 'bg-sky-500',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-sky-400',
        ]);

        Theme::create([
            'name' => 'rose quartz',
            'bg_color' => 'bg-rose-50',
            'text_color' => 'text-rose-900',
            'link_bg_color' => 'bg-rose-400',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-rose-700',
        ]);

        Theme::create([
            'name' => 'coffee',
            'bg_color' => 'bg-stone-200',
            'text_color' => 'text-stone-800',
            'link_bg_color' => 'bg-stone-700',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-stone-600',
        ]);

        Theme::create([
            'name' => 'latte',
            'bg_color' => 'bg-amber-100',
            'text_color' => 'text-amber-900',
            'link_bg_color' => 'bg-amber-800',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-amber-700',
        ]);

        Theme::create([
            'name' => 'emerald',
            'bg_color' => 'bg-emerald-900',
            'text_color' => 'text-emerald-50',
            'link_bg_color' => 'bg-yellow-500',
            'link_text_color' => 'text-emerald-900',
            'divider_text_color' => 'text-yellow-400',
        ]);

        // --- Gradient Themes ---
        Theme::create([
            'name' => 'galaxy',
            'text_color' => 'text-white',
            'link_bg_color' => 'bg-indigo-500',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-indigo-300',
            'gradient_from' => 'from-gray-900',
            'gradient_to' => 'to-slate-800',
        ]);

        Theme::create([
            'name' => 'sakura',
            'text_color' => 'text-gray-800',
            'link_bg_color' => 'bg-pink-400',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-pink-600',
            'gradient_from' => 'from-pink-200',
            'gradient_to' => 'to-purple-200',
        ]);

        Theme::create([
            'name' => 'cyberpunk',
            'text_color' => 'text-cyan-300',
            'link_bg_color' => 'bg-cyan-400',
            'link_text_color' => 'text-black',
            'divider_text_color' => 'text-fuchsia-500',
            'gradient_from' => 'from-black',
            'gradient_to' => 'to-purple-900',
        ]);

        Theme::create([
            'name' => 'royal gold',
            'text_color' => 'text-white',
            'link_bg_color' => 'bg-yellow-500',
            'link_text_color' => 'text-purple-900',
            'divider_text_color' => 'text-yellow-400',
            'gradient_from' => 'from-purple-800',
            'gradient_to' => 'to-indigo-900',
        ]);

        Theme::create([
            'name' => 'midnight bloom',
            'text_color' => 'text-pink-200',
            'link_bg_color' => 'bg-pink-500',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-pink-400',
            'gradient_from' => 'from-slate-900',
            'gradient_to' => 'to-fuchsia-900',
        ]);

        Theme::create([
            'name' => 'arctic ice',
            'text_color' => 'text-slate-800',
            'link_bg_color' => 'bg-slate-700',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-slate-600',
            'gradient_from' => 'from-white',
            'gradient_to' => 'to-cyan-200',
        ]);

        Theme::create([
            'name' => 'beach',
            'text_color' => 'text-sky-900',
            'link_bg_color' => 'bg-white',
            'link_text_color' => 'text-sky-800',
            'divider_text_color' => 'text-sky-700',
            'gradient_from' => 'from-sky-300',
            'gradient_to' => 'to-yellow-200',
        ]);

        Theme::create([
            'name' => 'lime twist',
            'text_color' => 'text-gray-800',
            'link_bg_color' => 'bg-lime-500',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-lime-700',
            'gradient_from' => 'from-lime-200',
            'gradient_to' => 'to-green-300',
        ]);

        Theme::create([
            'name' => 'desert mirage',
            'text_color' => 'text-amber-900',
            'link_bg_color' => 'bg-white',
            'link_text_color' => 'text-amber-800',
            'divider_text_color' => 'text-orange-800',
            'gradient_from' => 'from-orange-300',
            'gradient_to' => 'to-yellow-200',
        ]);

        Theme::create([
            'name' => 'strawberry kiwi',
            'text_color' => 'text-red-900',
            'link_bg_color' => 'bg-red-500',
            'link_text_color' => 'text-white',
            'divider_text_color' => 'text-green-700',
            'gradient_from' => 'from-green-200',
            'gradient_to' => 'to-red-300',
        ]);
    }
}
