<?php

use App\Http\Controllers\LinkController;
use App\Http\Controllers\PublicProfileController;
use App\Http\Controllers\Settings\AppearanceController;
use App\Http\Controllers\LinkClickController;
use App\Http\Controllers\Auth\OnboardingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StripeWebhookController; 

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Public landing page
Route::get('/', function () {
    // Define los datos de SEO para la página de inicio
    $seoData = [
        'title' => "2myLink - The Only Link You'll Ever Need",
        'description' => "Create a single, beautiful page to house all your important links. Perfect for your social media bios, portfolios, and connecting with your audience.",
        'image' => asset('logo_social.png'), // Asegúrate de que esta imagen exista en tu carpeta /public
    ];

    // Comparte los datos de SEO con la plantilla raíz
    Inertia::share('seo', $seoData);

    return Inertia::render('welcome', [
        'seo' => $seoData, // Pasa los datos también al componente de React
    ]);
})->name('home');

// --- RUTAS DE STRIPE CASHIER (PÚBLICAS) ---
// Webhook de Stripe: Debe ser accesible públicamente para que Stripe envíe las notificaciones.
Route::post(
    '/stripe/webhook',
    [StripeWebhookController::class, 'handleWebhook'] 
);
// --- FIN RUTAS DE STRIPE CASHIER (PÚBLICAS) ---


// Todas las rutas autenticadas
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function (Request $request) {
        return Inertia::render('dashboard', [
            'links' => $request->user()->links()->orderBy('order', 'asc')->get(),
        ]);
    })->name('dashboard');

    Route::get('/onboarding', [OnboardingController::class, 'create'])->name('onboarding.create');
    Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');

    // --- RUTAS DE STRIPE CASHIER (AUTENTICADAS) ---
    // Ruta para iniciar el proceso de checkout de suscripción
    Route::get('/subscribe', function (Request $request) {
        // IMPORTANTE: Reemplaza 'YOUR_RECURRING_PRICE_ID' con el ID del PRECIO RECURRENTE
        // que creaste en tu Dashboard de Stripe (debe empezar con 'price_').
        return $request->user()->newSubscription('default', 'price_1RxGwqHHMXVwjbhq5592k1d5')
            ->allowPromotionCodes() // Permite códigos promocionales si los tienes
            ->checkout([
                'success_url' => route('subscription.success'), // Redirige aquí tras un pago exitoso
                'cancel_url' => route('subscription.cancel'),   // Redirige aquí si el pago es cancelado
            ]);
    })->name('subscription.checkout');

    // Página de éxito después de un pago de suscripción
    Route::get('/subscription/success', function (Request $request) {
        // Redirige a la página de suscripción para recargar el estado del usuario
        return redirect()->route('subscription')->with('status', '¡Tu suscripción ha sido activada!');
    })->name('subscription.success');

    // Página de cancelación de un pago de suscripción
    Route::get('/subscription/cancel', function () {
        return Inertia::render('Subscription/Cancel', ['message' => 'El proceso de suscripción fue cancelado.']);
    })->name('subscription.cancel');

    // Ruta para la página principal de suscripción (donde se muestra el estado)
    Route::get('/settings/subscription', function () {
        return Inertia::render('SubscriptionPage'); // Asegúrate de que el nombre del componente sea correcto
    })->name('subscription');

    // Ruta para el Portal de Facturación de Stripe (permite al usuario gestionar su suscripción)
    Route::get('/billing/portal', function (Request $request) {
        return $request->user()->redirectToBillingPortal();
    })->name('billing.portal');
    // --- FIN RUTAS DE STRIPE CASHIER (AUTENTICADAS) ---

    // Link Management
    Route::post('links', [LinkController::class, 'store'])->name('links.store');
    Route::patch('links/{link}', [LinkController::class, 'update'])->name('links.update');
    Route::delete('links/{link}', [LinkController::class, 'destroy'])->name('links.destroy');
    Route::patch('/update-link-order', [LinkController::class, 'updateOrder'])->name('links.order.update');
    Route::patch('links/{link}/toggle', [LinkController::class, 'toggle'])->name('links.toggle');

    // Settings
    Route::patch('/settings/appearance', [AppearanceController::class, 'update'])->name('appearance.update');
});

// Include separate route files for auth and settings
require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';

// Temporary route for running migrations in production.
// IMPORTANT: REMOVE THIS ROUTE AFTER YOU HAVE USED IT.
Route::get('/rtdavbfbgij12345', function () {
    Artisan::call('migrate', ['--force' => true]);
    return 'Migrations executed successfully!';
});

Route::get('/rtthemrtdavbfbgij12345', function () {
    Artisan::call('db:seed', [
        '--class' => 'ThemeSeeder',
        '--force' => true
    ]);
    return 'ThemeSeeder executed successfully!';
});

/*
Route::get('/rtdasadsgij1234sb', function () {
    // Borra el enlace viejo si existe, para evitar errores
    if (file_exists(public_path('storage'))) {
        unlink(public_path('storage'));
    }

    // Crea el nuevo enlace simbólico
    Artisan::call('storage:link');

    return '¡Enlace simbólico creado!';
});
*/

Route::get('/visit/{link}', [LinkClickController::class, '__invoke'])->name('links.visit');

// Public user profile route - MUST BE THE LAST ROUTE
Route::get('/{user:username}', [PublicProfileController::class, 'show'])->name('profile.show');
