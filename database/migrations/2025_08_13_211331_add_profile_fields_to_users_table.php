<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // La ruta a la imagen del avatar
            $table->string('avatar_path')->nullable()->after('email');
            // La biografía del usuario
            $table->text('bio')->nullable()->after('avatar_path');
            // El tema de color seleccionado
            $table->string('theme')->default('default')->after('bio');
        });
    }

    // Asegúrate de que el método down() pueda revertir los cambios
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['avatar_path', 'bio', 'theme']);
        });
    }
};
