<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\Theme;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Añadir la nueva columna JSON
        Schema::table('themes', function (Blueprint $table) {
            $table->json('properties')->nullable()->after('is_premium');
        });

        // 2. Migrar los datos existentes de las columnas viejas al JSON
        // Usamos un cursor para no agotar la memoria si hay muchos temas
        Theme::all()->each(function ($theme) {
            $theme->properties = [
                'bg_color' => $theme->bg_color,
                'gradient_from' => $theme->gradient_from,
                'gradient_to' => $theme->gradient_to,
                'divider_text_color' => $theme->divider_text_color,
            ];
            $theme->save();
        });

        // 3. Eliminar las columnas viejas que ya no necesitamos
        Schema::table('themes', function (Blueprint $table) {
            $table->dropColumn(['bg_color', 'gradient_from', 'gradient_to', 'divider_text_color']);
        });
    }

    public function down(): void
    {
        // Lógica para revertir: 1. Re-añadir columnas, 2. Mover datos, 3. Eliminar JSON
        Schema::table('themes', function (Blueprint $table) {
            $table->string('bg_color')->nullable();
            $table->string('gradient_from')->nullable();
            $table->string('gradient_to')->nullable();
            $table->string('divider_text_color')->nullable();
        });

        Theme::all()->each(function ($theme) {
            $properties = $theme->properties;
            $theme->bg_color = $properties['bg_color'] ?? null;
            $theme->gradient_from = $properties['gradient_from'] ?? null;
            $theme->gradient_to = $properties['gradient_to'] ?? null;
            $theme->divider_text_color = $properties['divider_text_color'] ?? null;
            $theme->save();
        });

        Schema::table('themes', function (Blueprint $table) {
            $table->dropColumn('properties');
        });
    }
};