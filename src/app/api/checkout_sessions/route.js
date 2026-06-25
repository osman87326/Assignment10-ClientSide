import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json({ error: "Stripe price not configured" }, { status: 500 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}