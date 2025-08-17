<?php

namespace App\Http\Controllers;

use Laravel\Cashier\Http\Controllers\WebhookController as CashierWebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Laravel\Cashier\Subscription;
use Carbon\Carbon; // Importar Carbon para mejor legibilidad

class StripeWebhookController extends CashierWebhookController
{
    /**
     * Handle customer subscription created.
     * Se ejecuta cuando se crea una nueva suscripción.
     */
    public function handleCustomerSubscriptionCreated($payload)
    {
        $stripeSubscription = $payload['data']['object'];
        
        Log::info('New subscription created', [
            'subscription_id' => $stripeSubscription['id'],
            'customer_id' => $stripeSubscription['customer'],
            'status' => $stripeSubscription['status']
        ]);

        // Buscar el usuario por customer_id de Stripe
        $user = User::where('stripe_id', $stripeSubscription['customer'])->first();
        
        if (!$user) {
            Log::warning('User not found for customer', [
                'customer_id' => $stripeSubscription['customer']
            ]);
            return $this->successMethod();
        }

        // Verificar si la suscripción ya existe en la base de datos
        $existingSubscription = $user->subscriptions()
            ->where('stripe_id', $stripeSubscription['id'])
            ->first();

        if (!$existingSubscription) {
            // Extraer la fecha de finalización del período actual desde el primer item de la suscripción
            $currentPeriodEnd = null;
            if (isset($stripeSubscription['items']['data'][0]['current_period_end'])) {
                $currentPeriodEnd = Carbon::createFromTimestamp($stripeSubscription['items']['data'][0]['current_period_end']);
            }

            // Crear la suscripción con la estructura específica de tu tabla
            $subscription = $user->subscriptions()->create([
                'type' => 'default',
                'stripe_id' => $stripeSubscription['id'],
                'stripe_status' => $stripeSubscription['status'],
                'stripe_price' => isset($stripeSubscription['items']['data'][0]['price']['id']) 
                    ? $stripeSubscription['items']['data'][0]['price']['id'] 
                    : null,
                'quantity' => isset($stripeSubscription['items']['data'][0]['quantity']) 
                    ? $stripeSubscription['items']['data'][0]['quantity'] 
                    : 1,
                'trial_ends_at' => isset($stripeSubscription['trial_end']) && $stripeSubscription['trial_end']
                    ? Carbon::createFromTimestamp($stripeSubscription['trial_end']) 
                    : null,
                'ends_at' => $currentPeriodEnd, // <-- ¡Aquí está el cambio clave!
            ]);

            Log::info('Local subscription created', [
                'local_id' => $subscription->id,
                'stripe_id' => $stripeSubscription['id'],
                'user_id' => $user->id,
                'ends_at' => $subscription->ends_at?->format('Y-m-d H:i:s')
            ]);
        } else {
            // Si existe, actualizar los datos
            $updateData = [
                'stripe_status' => $stripeSubscription['status'],
                // Para actualización, también buscamos 'current_period_end' en la misma ruta
                'ends_at' => isset($stripeSubscription['items']['data'][0]['current_period_end']) 
                    ? Carbon::createFromTimestamp($stripeSubscription['items']['data'][0]['current_period_end'])
                    : $existingSubscription->ends_at, // Mantener el valor existente si no hay nuevo
            ];

            // Actualizar stripe_price si está disponible
            if (isset($stripeSubscription['items']['data'][0]['price']['id'])) {
                $updateData['stripe_price'] = $stripeSubscription['items']['data'][0]['price']['id'];
            }

            // Actualizar quantity si está disponible
            if (isset($stripeSubscription['items']['data'][0]['quantity'])) {
                $updateData['quantity'] = $stripeSubscription['items']['data'][0]['quantity'];
            }

            $existingSubscription->update($updateData);

            Log::info('Existing subscription updated', [
                'local_id' => $existingSubscription->id,
                'stripe_id' => $stripeSubscription['id']
            ]);
        }

        return $this->successMethod();
    }

    /**
     * Handle customer subscription updated.
     * Se ejecuta cuando cambia el estado de la suscripción.
     */
    public function handleCustomerSubscriptionUpdated($payload)
    {
        $stripeSubscription = $payload['data']['object'];
        
        Log::info('Subscription updated', [
            'subscription_id' => $stripeSubscription['id'],
            'status' => $stripeSubscription['status']
        ]);

        // Buscar la suscripción en la base de datos
        $subscription = Subscription::where('stripe_id', $stripeSubscription['id'])->first();

        if ($subscription) {
            // Extraer la fecha de finalización del período actual desde el primer item de la suscripción
            $currentPeriodEnd = null;
            if (isset($stripeSubscription['items']['data'][0]['current_period_end'])) {
                $currentPeriodEnd = Carbon::createFromTimestamp($stripeSubscription['items']['data'][0]['current_period_end']);
            }

            $updateData = [
                'stripe_status' => $stripeSubscription['status'],
                'ends_at' => $currentPeriodEnd ?? $subscription->ends_at, // <-- ¡Aquí está el cambio clave!
                'trial_ends_at' => isset($stripeSubscription['trial_end']) && $stripeSubscription['trial_end']
                    ? Carbon::createFromTimestamp($stripeSubscription['trial_end'])
                    : $subscription->trial_ends_at,
            ];

            // Actualizar stripe_price y quantity si están disponibles
            if (isset($stripeSubscription['items']['data'][0]['price']['id'])) {
                $updateData['stripe_price'] = $stripeSubscription['items']['data'][0]['price']['id'];
            }

            if (isset($stripeSubscription['items']['data'][0]['quantity'])) {
                $updateData['quantity'] = $stripeSubscription['items']['data'][0]['quantity'];
            }

            $subscription->update($updateData);

            Log::info('Local subscription status updated', [
                'subscription_id' => $stripeSubscription['id'],
                'new_status' => $stripeSubscription['status'],
                'current_period_end' => $subscription->ends_at?->format('Y-m-d H:i:s')
            ]);
        } else {
            Log::warning('Local subscription not found for update, attempting to create...', [
                'stripe_subscription_id' => $stripeSubscription['id']
            ]);
            
            // Si no existe la suscripción local, la creamos (este es tu fallback)
            $this->handleCustomerSubscriptionCreated($payload);
        }

        return $this->successMethod();
    }

    /**
     * Handle invoice payment succeeded.
     * Se ejecuta cada vez que se procesa un pago exitoso (inicial y renovaciones).
     */
    public function handleInvoicePaymentSucceeded($payload)
    {
        $invoice = $payload['data']['object'];
        
        Log::info('Invoice payment succeeded', [
            'invoice_id' => $invoice['id'],
            'customer_id' => $invoice['customer'],
            'amount' => $invoice['amount_paid']
        ]);

        // Si la factura tiene una suscripción, actualizar la fecha de expiración
        if (isset($invoice['subscription'])) {
            $subscription = Subscription::where('stripe_id', $invoice['subscription'])->first();

            if ($subscription) {
                try {
                    // Obtener la suscripción de Stripe para conseguir current_period_end
                    // Aquí usamos asStripeSubscription() que ya trae el objeto completo de Stripe
                    $stripeSubscription = $subscription->asStripeSubscription();
                    
                    // Verificamos si current_period_end está directamente en el objeto Stripe Subscription
                    // o en el primer item, como en los webhooks. Priorizamos el objeto directo de Stripe
                    $periodEnd = null;
                    if (isset($stripeSubscription->current_period_end)) {
                         $periodEnd = $stripeSubscription->current_period_end;
                    } elseif (isset($stripeSubscription->items->data[0]->current_period_end)) {
                        $periodEnd = $stripeSubscription->items->data[0]->current_period_end;
                    }

                    if ($periodEnd) {
                        $subscription->update([
                            'ends_at' => Carbon::createFromTimestamp($periodEnd),
                            'stripe_status' => $stripeSubscription->status
                        ]);

                        Log::info('Updated subscription expiry from invoice payment', [
                            'subscription_id' => $invoice['subscription'],
                            'expires_at' => $subscription->ends_at?->format('Y-m-d H:i:s')
                        ]);
                    }
                } catch (\Exception $e) {
                    Log::warning('Failed to update subscription expiry', [
                        'subscription_id' => $invoice['subscription'],
                        'error' => $e->getMessage()
                    ]);
                }
            } else {
                Log::warning('Subscription not found for invoice payment', [
                    'subscription_id' => $invoice['subscription']
                ]);
            }
        }

        return $this->successMethod();
    }

    /**
     * Handle checkout session completed.
     * Se ejecuta cuando se completa una sesión de checkout.
     */
    public function handleCheckoutSessionCompleted($payload)
    {
        $session = $payload['data']['object'];
        
        Log::info('Checkout session completed', [
            'session_id' => $session['id'],
            'customer_id' => $session['customer'],
            'subscription_id' => $session['subscription'] ?? null
        ]);

        // Si hay una suscripción en la sesión, asegurarse de que se cree localmente
        if (isset($session['subscription'])) {
            $user = User::where('stripe_id', $session['customer'])->first();
            
            if ($user) {
                $existingSubscription = $user->subscriptions()
                    ->where('stripe_id', $session['subscription'])
                    ->first();

                if (!$existingSubscription) {
                    Log::info('Creating subscription from checkout session (via subsequent webhook)', [
                        'stripe_subscription_id' => $session['subscription'],
                        'user_id' => $user->id
                    ]);
                    
                    // La suscripción se creará en el webhook customer.subscription.created
                    // que se ejecutará después de este webhook
                }
            }
        }

        return $this->successMethod();
    }

    /**
     * Handle invoice payment failed.
     * Se ejecuta cuando falla un pago (renovación fallida).
     */
    public function handleInvoicePaymentFailed($payload)
    {
        $invoice = $payload['data']['object'];
        
        Log::warning('Invoice payment failed', [
            'invoice_id' => $invoice['id'],
            'customer_id' => $invoice['customer'],
            'amount' => $invoice['amount_due'],
            'attempt_count' => $invoice['attempt_count']
        ]);

        if (isset($invoice['subscription'])) {
            $subscription = Subscription::where('stripe_id', $invoice['subscription'])->first();
            
            if ($subscription) {
                $user = $subscription->user;
                
                Log::info('User notified of failed payment', [
                    'user_id' => $user->id,
                    'subscription_id' => $invoice['subscription']
                ]);
                
                // Aquí puedes enviar notificaciones al usuario
            }
        }

        return $this->successMethod();
    }

    /**
     * Handle customer subscription trial will end.
     */
    public function handleCustomerSubscriptionTrialWillEnd($payload)
    {
        $stripeSubscription = $payload['data']['object'];
        
        Log::info('Subscription trial ending soon', [
            'subscription_id' => $stripeSubscription['id'],
            'trial_end' => $stripeSubscription['trial_end']
        ]);

        $subscription = Subscription::where('stripe_id', $stripeSubscription['id'])->first();
        
        if ($subscription) {
            Log::info('Trial ending notification sent', [
                'user_id' => $subscription->user_id,
                'trial_ends_at' => Carbon::createFromTimestamp($stripeSubscription['trial_end'])->format('Y-m-d H:i:s')
            ]);
        }

        return $this->successMethod();
    }

    /**
     * Handle setup intent succeeded.
     */
    public function handleSetupIntentSucceeded($payload)
    {
        $setupIntent = $payload['data']['object'];
        
        Log::info('Payment method setup succeeded', [
            'setup_intent_id' => $setupIntent['id'],
            'customer_id' => $setupIntent['customer']
        ]);

        return $this->successMethod();
    }

    /**
     * Handle payment method attached.
     */
    public function handlePaymentMethodAttached($payload)
    {
        $paymentMethod = $payload['data']['object'];
        
        Log::info('Payment method attached', [
            'payment_method_id' => $paymentMethod['id'],
            'customer_id' => $paymentMethod['customer'],
            'type' => $paymentMethod['type']
        ]);

        return $this->successMethod();
    }

    /**
     * Handle customer subscription deleted.
     */
    public function handleCustomerSubscriptionDeleted($payload)
    {
        $stripeSubscription = $payload['data']['object'];
        
        Log::info('Subscription deleted', [
            'subscription_id' => $stripeSubscription['id'],
            'customer_id' => $stripeSubscription['customer']
        ]);

        // Actualizar el registro local
        $subscription = Subscription::where('stripe_id', $stripeSubscription['id'])->first();
        
        if ($subscription) {
            $subscription->update([
                'stripe_status' => 'canceled',
                'ends_at' => Carbon::now() // Marcar como terminada ahora
            ]);
            
            Log::info('Local subscription marked as canceled', [
                'local_id' => $subscription->id
            ]);
        }

        return $this->successMethod();
    }
}
