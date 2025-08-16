<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();

            // --- Colores originales ---
            $table->string('bg_color')->nullable(); // Ahora es nullable por si solo se usa degradado
            $table->string('text_color');
            $table->string('link_bg_color');
            $table->string('link_text_color');
            $table->string('divider_text_color');
            
            // --- NUEVOS: Campos para el degradado ---
            $table->string('gradient_from')->nullable();
            $table->string('gradient_to')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};