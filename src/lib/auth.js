
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "@/db"; //  mongodb client
import { jwt } from "better-auth/plugins";
import { stripe } from "@better-auth/stripe";

const db = client.db("life-lessons");

const getBetterAuthURL = () => {
    if (process.env.VERCEL) {
        if (process.env.BETTER_AUTH_URL && !process.env.BETTER_AUTH_URL.includes("localhost")) {
            return process.env.BETTER_AUTH_URL;
        }
        if (process.env.NEXT_PUBLIC_BASE_URL && !process.env.NEXT_PUBLIC_BASE_URL.includes("localhost")) {
            return process.env.NEXT_PUBLIC_BASE_URL;
        }
        if (process.env.VERCEL_URL) {
            return `https://${process.env.VERCEL_URL}`;
        }
    }
    return process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    baseURL: getBetterAuthURL(),
    trustedOrigins: [
        "https://assignment10-client-side.vercel.app",
        "http://localhost:3000",
        "http://localhost:5000"
    ],
    advanced: {
        disableOriginCheck: true
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                required: true,
            },
            isBanned: {
                type: "boolean",
                defaultValue: false,
                required: true,
            },
            isPremium: {
                type: "boolean",
                defaultValue: false,
                required: true,
            },
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"],
            requireLocalEmailVerified: false,
            updateUserInfoOnLink: true
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            options: {
                strategy: "jwt",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            }
        },
        schema: {
            // This ensures the properties are explicitly recognized during session lookups
            role: "string",
            isBanned: "boolean",
            isPremium: "boolean"
        }
    },
    plugins: [
        jwt({
            // Add this to map the user's role into the JWT
            jwt: {
                payload: ({ user }) => ({
                    role: user.role,
                    isBanned: user.isBanned,
                    isPremium: user.isPremium,
                }),
            },
        }),
        stripe({
            stripeSecretKey: process.env.STRIPE_SECRET_KEY,
            webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            createCustomerOnSignUp: true, // magic!
        }),
    ]
});