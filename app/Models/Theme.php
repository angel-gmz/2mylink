<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    // CAMBIADO: Se ajusta a las columnas reales de la base de datos
    protected $fillable = [
        'name',
        'is_premium',
        'text_color',
        'link_bg_color',
        'link_text_color',
        'properties', // <-- AÑADIDO: para el campo JSON
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    // AÑADIDO: Para que Laravel maneje el JSON como array y el premium como booleano
    protected $casts = [
        'is_premium' => 'boolean',
        'properties' => 'array',
    ];
}