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
        // ============================================
        // TEMAS GRATUITOS (20 temas)
        // ============================================

        // 1. Default
        Theme::create([
            'name' => 'default',
            'is_premium' => false,
            'text_color' => 'text-gray-100',
            'link_bg_color' => 'bg-teal-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-gray-900',
                'divider_text_color' => 'text-gray-400',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-md',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 2. Dark
        Theme::create([
            'name' => 'dark',
            'is_premium' => false,
            'text_color' => 'text-gray-100',
            'link_bg_color' => 'bg-gray-700',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-black',
                'divider_text_color' => 'text-gray-500',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-lg',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 3. Mint
        Theme::create([
            'name' => 'mint',
            'is_premium' => false,
            'text_color' => 'text-green-900',
            'link_bg_color' => 'bg-green-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-green-50',
                'divider_text_color' => 'text-green-700',
                'button_style' => 'rounded-md',
                'button_shadow' => 'shadow-sm',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 4. Sunset
        Theme::create([
            'name' => 'sunset',
            'is_premium' => false,
            'text_color' => 'text-orange-900',
            'link_bg_color' => 'bg-red-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-orange-100',
                'divider_text_color' => 'text-orange-700',
                'button_style' => 'rounded-full',
                'button_shadow' => 'shadow-md',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 5. Monochrome
        Theme::create([
            'name' => 'monochrome',
            'is_premium' => false,
            'text_color' => 'text-black',
            'link_bg_color' => 'bg-black',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-white',
                'divider_text_color' => 'text-gray-500',
                'button_style' => 'rounded-none',
                'button_shadow' => 'shadow-none',
                'font_family' => 'font-mono',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 6. Ocean
        Theme::create([
            'name' => 'ocean',
            'is_premium' => false,
            'text_color' => 'text-blue-900',
            'link_bg_color' => 'bg-blue-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-blue-50',
                'divider_text_color' => 'text-blue-700',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-md',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 7. Forest
        Theme::create([
            'name' => 'forest',
            'is_premium' => false,
            'text_color' => 'text-emerald-100',
            'link_bg_color' => 'bg-emerald-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-emerald-900',
                'divider_text_color' => 'text-emerald-400',
                'button_style' => 'rounded-md',
                'button_shadow' => 'shadow-lg',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 8. Lavender
        Theme::create([
            'name' => 'lavender',
            'is_premium' => false,
            'text_color' => 'text-purple-900',
            'link_bg_color' => 'bg-purple-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-purple-100',
                'divider_text_color' => 'text-purple-700',
                'button_style' => 'rounded-xl',
                'button_shadow' => 'shadow-sm',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 9. Coral
        Theme::create([
            'name' => 'coral',
            'is_premium' => false,
            'text_color' => 'text-rose-900',
            'link_bg_color' => 'bg-rose-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-rose-50',
                'divider_text_color' => 'text-rose-600',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-md',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 10. Slate
        Theme::create([
            'name' => 'slate',
            'is_premium' => false,
            'text_color' => 'text-slate-100',
            'link_bg_color' => 'bg-slate-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-slate-800',
                'divider_text_color' => 'text-slate-400',
                'button_style' => 'rounded-md',
                'button_shadow' => 'shadow-lg',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 11. Cream
        Theme::create([
            'name' => 'cream',
            'is_premium' => false,
            'text_color' => 'text-amber-900',
            'link_bg_color' => 'bg-amber-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-amber-50',
                'divider_text_color' => 'text-amber-700',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-sm',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 12. Midnight
        Theme::create([
            'name' => 'midnight',
            'is_premium' => false,
            'text_color' => 'text-indigo-100',
            'link_bg_color' => 'bg-indigo-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-indigo-950',
                'divider_text_color' => 'text-indigo-400',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-xl',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 13. Sand
        Theme::create([
            'name' => 'sand',
            'is_premium' => false,
            'text_color' => 'text-yellow-900',
            'link_bg_color' => 'bg-yellow-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-yellow-50',
                'divider_text_color' => 'text-yellow-700',
                'button_style' => 'rounded-md',
                'button_shadow' => 'shadow-md',
                'font_family' => 'font-mono',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 14. Ruby
        Theme::create([
            'name' => 'ruby',
            'is_premium' => false,
            'text_color' => 'text-red-100',
            'link_bg_color' => 'bg-red-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-red-900',
                'divider_text_color' => 'text-red-400',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-lg',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 15. Sky
        Theme::create([
            'name' => 'sky',
            'is_premium' => false,
            'text_color' => 'text-sky-900',
            'link_bg_color' => 'bg-sky-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-sky-100',
                'divider_text_color' => 'text-sky-700',
                'button_style' => 'rounded-full',
                'button_shadow' => 'shadow-sm',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 16. Charcoal
        Theme::create([
            'name' => 'charcoal',
            'is_premium' => false,
            'text_color' => 'text-zinc-100',
            'link_bg_color' => 'bg-zinc-700',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-zinc-900',
                'divider_text_color' => 'text-zinc-500',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-md',
                'font_family' => 'font-mono',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 17. Peach
        Theme::create([
            'name' => 'peach',
            'is_premium' => false,
            'text_color' => 'text-orange-900',
            'link_bg_color' => 'bg-orange-400',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-orange-50',
                'divider_text_color' => 'text-orange-600',
                'button_style' => 'rounded-xl',
                'button_shadow' => 'shadow-sm',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 18. Teal
        Theme::create([
            'name' => 'teal',
            'is_premium' => false,
            'text_color' => 'text-teal-100',
            'link_bg_color' => 'bg-teal-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-teal-900',
                'divider_text_color' => 'text-teal-400',
                'button_style' => 'rounded-md',
                'button_shadow' => 'shadow-lg',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 19. Lime
        Theme::create([
            'name' => 'lime',
            'is_premium' => false,
            'text_color' => 'text-lime-900',
            'link_bg_color' => 'bg-lime-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-lime-50',
                'divider_text_color' => 'text-lime-700',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-md',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // 20. Stone
        Theme::create([
            'name' => 'stone',
            'is_premium' => false,
            'text_color' => 'text-stone-900',
            'link_bg_color' => 'bg-stone-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'bg_color' => 'bg-stone-100',
                'divider_text_color' => 'text-stone-700',
                'button_style' => 'rounded-md',
                'button_shadow' => 'shadow-sm',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
            ]
        ]);

        // ============================================
        // TEMAS PREMIUM (20 temas)
        // ============================================

        // 21. Galaxy
        Theme::create([
            'name' => 'galaxy',
            'is_premium' => true,
            'text_color' => 'text-white',
            'link_bg_color' => 'bg-indigo-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-gray-900',
                'gradient_to' => 'to-slate-800',
                'divider_text_color' => 'text-indigo-300',
                'button_style' => 'rounded-full',
                'button_shadow' => 'shadow-lg',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-glow', // Nuevo: Se asemeja al brillo de las estrellas o nebulosas.
            ]
        ]);

        // 22. Sakura
        Theme::create([
            'name' => 'sakura',
            'is_premium' => true,
            'text_color' => 'text-gray-800',
            'link_bg_color' => 'bg-pink-400',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-pink-200',
                'gradient_to' => 'to-purple-200',
                'divider_text_color' => 'text-pink-600',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-md',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-float', // Nuevo: Simula el suave caer de los pétalos.
            ]
        ]);

        // 23. Cyberpunk
        Theme::create([
            'name' => 'cyberpunk',
            'is_premium' => true,
            'text_color' => 'text-cyan-300',
            'link_bg_color' => 'bg-cyan-400',
            'link_text_color' => 'text-black',
            'properties' => [
                'gradient_from' => 'from-black',
                'gradient_to' => 'to-purple-900',
                'divider_text_color' => 'text-fuchsia-500',
                'button_style' => 'rounded-none',
                'button_shadow' => 'shadow-lg shadow-cyan-500/50',
                'font_family' => 'font-mono',
                'avatar_style' => 'rounded-lg',
                'link_animation' => 'animate-pulse-slow', // Se mantiene el pulso que evoca las luces de neón.
            ]
        ]);

        // 24. Royal Gold
        Theme::create([
            'name' => 'royal gold',
            'is_premium' => true,
            'text_color' => 'text-white',
            'link_bg_color' => 'bg-yellow-500',
            'link_text_color' => 'text-purple-900',
            'properties' => [
                'gradient_from' => 'from-purple-800',
                'gradient_to' => 'to-indigo-900',
                'divider_text_color' => 'text-yellow-400',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-xl',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-wobble', // Nuevo: Sugiere la majestuosidad de un estandarte o bandera.
            ]
        ]);

        // 25. Northern Lights
        Theme::create([
            'name' => 'northern lights',
            'is_premium' => true,
            'text_color' => 'text-emerald-100',
            'link_bg_color' => 'bg-emerald-400',
            'link_text_color' => 'text-black',
            'properties' => [
                'gradient_from' => 'from-blue-900',
                'gradient_to' => 'to-green-800',
                'divider_text_color' => 'text-cyan-400',
                'button_style' => 'rounded-xl',
                'button_shadow' => 'shadow-lg shadow-emerald-500/30',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-3xl',
                'link_animation' => 'animate-glow', // Nuevo: Representa el brillo de las auroras.
            ]
        ]);

        // 26. Volcano
        Theme::create([
            'name' => 'volcano',
            'is_premium' => true,
            'text_color' => 'text-orange-100',
            'link_bg_color' => 'bg-orange-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-red-900',
                'gradient_to' => 'to-orange-800',
                'divider_text_color' => 'text-yellow-500',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-xl shadow-orange-600/40',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-wobble', // Nuevo: Evoca el temblor de la tierra o el flujo de la lava.
            ]
        ]);

        // 27. Deep Ocean
        Theme::create([
            'name' => 'deep ocean',
            'is_premium' => true,
            'text_color' => 'text-cyan-100',
            'link_bg_color' => 'bg-blue-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-blue-950',
                'gradient_to' => 'to-cyan-900',
                'divider_text_color' => 'text-blue-400',
                'button_style' => 'rounded-full',
                'button_shadow' => 'shadow-2xl shadow-blue-500/20',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-lg',
                'link_animation' => 'animate-pulse-slow', // Se mantiene el pulso que simula las corrientes marinas.
            ]
        ]);

        // 28. Cotton Candy
        Theme::create([
            'name' => 'cotton candy',
            'is_premium' => true,
            'text_color' => 'text-purple-900',
            'link_bg_color' => 'bg-purple-400',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-pink-300',
                'gradient_to' => 'to-blue-300',
                'divider_text_color' => 'text-purple-600',
                'button_style' => 'rounded-3xl',
                'button_shadow' => 'shadow-lg',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-float', // Nuevo: Un movimiento suave y ligero como el algodón de azúcar.
            ]
        ]);

        // 29. Neon Nights
        Theme::create([
            'name' => 'neon nights',
            'is_premium' => true,
            'text_color' => 'text-pink-300',
            'link_bg_color' => 'bg-pink-500',
            'link_text_color' => 'text-black',
            'properties' => [
                'gradient_from' => 'from-gray-900',
                'gradient_to' => 'to-black',
                'divider_text_color' => 'text-fuchsia-400',
                'button_style' => 'rounded-md',
                'button_shadow' => 'shadow-lg shadow-pink-500/50',
                'font_family' => 'font-mono',
                'avatar_style' => 'rounded-none',
                'link_animation' => 'animate-glow', // Nuevo: Ideal para un efecto de luz de neón.
            ]
        ]);

        // 30. Emerald City
        Theme::create([
            'name' => 'emerald city',
            'is_premium' => true,
            'text_color' => 'text-white',
            'link_bg_color' => 'bg-green-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-emerald-700',
                'gradient_to' => 'to-teal-800',
                'divider_text_color' => 'text-green-300',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-xl shadow-green-500/30',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-2xl',
                'link_animation' => 'animate-wobble', // Nuevo: Similar a una joya que centellea.
            ]
        ]);

        // 31. Twilight
        Theme::create([
            'name' => 'twilight',
            'is_premium' => true,
            'text_color' => 'text-purple-100',
            'link_bg_color' => 'bg-purple-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-indigo-900',
                'gradient_to' => 'to-purple-900',
                'divider_text_color' => 'text-purple-400',
                'button_style' => 'rounded-xl',
                'button_shadow' => 'shadow-2xl',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-color-shift', // Nuevo: El degradado cambia de color lentamente, como el atardecer.
            ]
        ]);

        // 32. Solar Flare
        Theme::create([
            'name' => 'solar flare',
            'is_premium' => true,
            'text_color' => 'text-yellow-100',
            'link_bg_color' => 'bg-yellow-400',
            'link_text_color' => 'text-red-900',
            'properties' => [
                'gradient_from' => 'from-red-600',
                'gradient_to' => 'to-yellow-600',
                'divider_text_color' => 'text-orange-300',
                'button_style' => 'rounded-full',
                'button_shadow' => 'shadow-lg shadow-yellow-500/40',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-lg',
                'link_animation' => 'animate-glow', // Nuevo: Perfecto para simular el brillo intenso de una llamarada solar.
            ]
        ]);

        // 33. Arctic
        Theme::create([
            'name' => 'arctic',
            'is_premium' => true,
            'text_color' => 'text-gray-800',
            'link_bg_color' => 'bg-sky-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-white',
                'gradient_to' => 'to-blue-100',
                'divider_text_color' => 'text-blue-600',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-md shadow-blue-300/50',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-pulse-slow', // Se mantiene el pulso, como el latido de un témpano de hielo.
            ]
        ]);

        // 34. Mystic Forest
        Theme::create([
            'name' => 'mystic forest',
            'is_premium' => true,
            'text_color' => 'text-lime-100',
            'link_bg_color' => 'bg-green-600',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-green-900',
                'gradient_to' => 'to-emerald-950',
                'divider_text_color' => 'text-lime-400',
                'button_style' => 'rounded-md',
                'button_shadow' => 'shadow-xl shadow-green-800/50',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-3xl',
                'link_animation' => 'animate-wobble', // Nuevo: Evoca el movimiento de las hojas al viento en un bosque.
            ]
        ]);

        // 35. Retro Wave
        Theme::create([
            'name' => 'retro wave',
            'is_premium' => true,
            'text_color' => 'text-fuchsia-200',
            'link_bg_color' => 'bg-fuchsia-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-purple-800',
                'gradient_to' => 'to-pink-800',
                'divider_text_color' => 'text-cyan-400',
                'button_style' => 'rounded-none',
                'button_shadow' => 'shadow-lg shadow-fuchsia-500/40',
                'font_family' => 'font-mono',
                'avatar_style' => 'rounded-lg',
                'link_animation' => 'animate-color-shift', // Nuevo: Un efecto ideal para el estilo ochentero del "retro wave".
            ]
        ]);

        // 36. Amber Glow
        Theme::create([
            'name' => 'amber glow',
            'is_premium' => true,
            'text_color' => 'text-amber-100',
            'link_bg_color' => 'bg-amber-500',
            'link_text_color' => 'text-amber-900',
            'properties' => [
                'gradient_from' => 'from-amber-700',
                'gradient_to' => 'to-orange-700',
                'divider_text_color' => 'text-yellow-400',
                'button_style' => 'rounded-xl',
                'button_shadow' => 'shadow-xl shadow-amber-500/30',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-glow', // Nuevo: La animación de resplandor está en el nombre mismo.
            ]
        ]);

        // 37. Cosmic Purple
        Theme::create([
            'name' => 'cosmic purple',
            'is_premium' => true,
            'text_color' => 'text-violet-100',
            'link_bg_color' => 'bg-violet-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-violet-900',
                'gradient_to' => 'to-fuchsia-900',
                'divider_text_color' => 'text-violet-400',
                'button_style' => 'rounded-full',
                'button_shadow' => 'shadow-2xl shadow-violet-600/40',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-2xl',
                'link_animation' => 'animate-pulse-slow', // Se mantiene el pulso, como el latido de un agujero negro o una estrella.
            ]
        ]);

        // 38. Rose Gold
        Theme::create([
            'name' => 'rose gold',
            'is_premium' => true,
            'text_color' => 'text-rose-900',
            'link_bg_color' => 'bg-rose-400',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-rose-200',
                'gradient_to' => 'to-amber-200',
                'divider_text_color' => 'text-rose-600',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-lg shadow-rose-300/50',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-float', // Nuevo: Un movimiento elegante y sutil.
            ]
        ]);

        // 39. Midnight Aurora
        Theme::create([
            'name' => 'midnight aurora',
            'is_premium' => true,
            'text_color' => 'text-teal-100',
            'link_bg_color' => 'bg-teal-400',
            'link_text_color' => 'text-black',
            'properties' => [
                'gradient_from' => 'from-slate-900',
                'gradient_to' => 'to-teal-900',
                'divider_text_color' => 'text-cyan-400',
                'button_style' => 'rounded-xl',
                'button_shadow' => 'shadow-2xl shadow-teal-500/30',
                'font_family' => 'font-sans',
                'avatar_style' => 'rounded-lg',
                'link_animation' => 'animate-glow', // Nuevo: Simula el resplandor de una aurora boreal.
            ]
        ]);

        // 40. Crimson Dusk
        Theme::create([
            'name' => 'crimson dusk',
            'is_premium' => true,
            'text_color' => 'text-red-100',
            'link_bg_color' => 'bg-red-500',
            'link_text_color' => 'text-white',
            'properties' => [
                'gradient_from' => 'from-red-950',
                'gradient_to' => 'to-rose-900',
                'divider_text_color' => 'text-red-400',
                'button_style' => 'rounded-lg',
                'button_shadow' => 'shadow-xl shadow-red-600/40',
                'font_family' => 'font-serif',
                'avatar_style' => 'rounded-full',
                'link_animation' => 'animate-color-shift', // Nuevo: Un sutil cambio de color que imita la puesta de sol.
            ]
        ]);
    }
}
