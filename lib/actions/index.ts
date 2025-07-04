"use server";
import {db} from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import type {User} from "@/drizzle/schema"
import { auth } from "@/lib/auth"; // adjust import if needed
import { headers } from "next/headers";

//HELPER FUNCTIONS

export async function getUserRole(userId: string): Promise<string | null> {
    const result = await db
        .select({ role: user.role })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

    if (result.length === 0) {
        return null; // user not found
    }

    return result[0].role;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const result = await db
        .select()
        .from(user)
        .where(eq(user.email , email))
        .limit(1);
    return result[0];
}



//SERVER ACTIONS
export async function updateUserDetails(userId: string, details: ExtraUserDetails) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session) {
        throw new Error("Session not found!.");
    }

    await db.update(user)
        .set({
            gender: details.gender,
            dateOfBirth: details.dateOfBirth ? new Date(details.dateOfBirth) : undefined,
            marketingEmails: details.marketingEmails,
            dataSharing: details.dataSharing,
        })
        .where(eq(user.id, userId));

    await auth.api.updateUser({
        body : {
            ...details as any
        }
    });

    return {success : true};
};