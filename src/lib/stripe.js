import 'server-only'

import Stripe from 'stripe'

let _stripe = null

/**
 * Lazily initialize Stripe so it only throws at runtime (when the route is
 * actually called), NOT at build time when env vars may be absent.
 */
export function getStripe() {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Missing environment variable: STRIPE_SECRET_KEY')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return _stripe
}