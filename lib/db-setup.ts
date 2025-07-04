import { db } from "@/drizzle/db";
import { sql } from "drizzle-orm";

export async function setupDatabase() {
    try {
        // Test the connection
        await db.execute(sql`SELECT 1`);
        console.log("✅ Database connection successful");
        
        // Check if user table exists
        const tableExists = await db.execute(sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'user'
            );
        `);
        
        console.log("User table exists:", tableExists);
        return true;
    } catch (error) {
        console.error("❌ Database setup failed:", error);
        return false;
    }
}

export async function checkUserTable() {
    try {
        const result = await db.execute(sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = 'user'
            ORDER BY ordinal_position;
        `);
        
        console.log("User table structure:", result);
        return result;
    } catch (error) {
        console.error("Error checking user table:", error);
        return null;
    }
}