import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@/drizzle/db";
import {schema} from "@/drizzle/schema";
import {nextCookies} from "better-auth/next-js";
import {admin} from "better-auth/plugins";

export const auth = betterAuth({
    database : drizzleAdapter(db , {
        provider : "pg" ,
        schema,
    }),
    user : {
        additionalFields: {
            gender: {
                type: "string",
                required: false,
            },
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
            },
            dateOfBirth: {
                type: "date",
                required: false,
            },
            marketingEmails: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
            dataSharing: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
            isPremium : {
                type : "boolean",
                required : false,
                defaultValue : false,
            }
        },
    },
    socialProviders : {
        google : {
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!,
        }
    },
    emailAndPassword: {
        enabled : true,
    },
    plugins: [nextCookies(),admin()],
    baseURL : process.env.NEXT_PUBLIC_BASE_URL!,
})