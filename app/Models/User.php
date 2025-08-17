<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Cashier\Billable; // <-- Asegúrate de que esta línea esté presente

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, Billable; // <-- Asegúrate de que 'Billable' esté aquí

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'avatar_path',
        'bio',
        'theme',
        'google_id',
        'onboarded',
        'is_premium',
        'premium_expires_at',
        // Cashier añadirá automáticamente 'stripe_id', 'pm_type', 'pm_last_four', 'trial_ends_at'
        // a la tabla si ejecutas las migraciones de Cashier.
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_premium' => 'boolean',
            'premium_expires_at' => 'datetime',
        ];
    }

    public function links(): HasMany
    {
        return $this->hasMany(Link::class);
    }

    /**
     * Determina si el usuario es premium.
     * Utiliza el método 'subscribed' de Cashier para una verificación más precisa con Stripe.
     */
    public function isPremium(): bool
    {
        // 'default' es el nombre del plan de suscripción en Cashier
        // Esto verifica si el usuario tiene una suscripción activa y válida con Stripe
        return $this->subscribed('default');
    }
}
