
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "@/db"; //  mongodb client
import { jwt } from "better-auth/plugins";
import { stripe } from "@better-auth/stripe";

const db = client.db("life-lessons");
export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    baseURL: process.env.BETTER_AUTH_URL,
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