import { auth } from "@/lib/auth";
import { client } from "@/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check the raw MongoDB to see if the Express Webhook updated their status
    const db = client.db("life-lessons");
    const userDoc = await db.collection("user").findOne({ 
      // Better auth sometimes stores IDs as strings in the DB depending on adapter, 
      // but let's try ObjectId or string
      $or: [
        { _id: new ObjectId(session.user.id) },
        { _id: session.user.id }
      ]
    });

    if (userDoc && userDoc.isPremium) {
      // Because Better Auth caches the session as a JWT in the cookie,
      // we need to force it to re-mint the token by calling an update.
      // Passing isPremium: true will update the DB (again, safely) and send a new Set-Cookie header.
      await auth.api.updateUser({
        headers: await headers(),
        body: {
          isPremium: true
        }
      });
      
      return NextResponse.json({ success: true, revalidated: true });
    }

    return NextResponse.json({ success: true, revalidated: false });
  } catch (error) {
    console.error("Session refresh error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}