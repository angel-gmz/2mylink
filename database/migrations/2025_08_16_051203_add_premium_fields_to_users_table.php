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
        Schema::table('users', function (Blueprint $table) {
            // Adds the boolean flag to quickly check for premium status
            $table->boolean('is_premium')->default(false)->after('onboarded');
            
            // Adds the timestamp to manage subscription end dates
            $table->timestamp('premium_expires_at')->nullable()->after('is_premium');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop columns in reverse order of creation
            $table->dropColumn(['premium_expires_at', 'is_premium']);
        });
    }
};
