import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getUsersCollection } from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    if (userId) {
      const usersCol = await getUsersCollection();
      await usersCol.updateOne({ id: userId }, { $set: { isPremium: true } });
    }
  }

  return NextResponse.json({ received: true });
}
