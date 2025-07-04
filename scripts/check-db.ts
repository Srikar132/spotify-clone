import { db } from "@/drizzle/db";
import { sql } from "drizzle-orm";

async function checkDatabase() {
    try {
        console.log('🔍 Checking database connection...');
        
        // Test basic connection
        const result = await db.execute(sql`SELECT 1 as test`);
        console.log('✅ Database connection successful');
        
        // Check if user table exists
        const userTableExists = await db.execute(sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'user'
            ) as exists;
        `);
        
        console.log('User table exists:', userTableExists[0]?.exists);
        
        if (userTableExists[0]?.exists) {
            // Check user table structure
            const userTableStructure = await db.execute(sql`
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_name = 'user'
                ORDER BY ordinal_position;
            `);
            
            console.log('User table structure:');
            console.table(userTableStructure);
        }
        
        // List all tables
        const allTables = await db.execute(sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        
        console.log('All tables in database:');
        console.table(allTables);
        
    } catch (error) {
        console.error('❌ Database check failed:', error);
    }
}

checkDatabase();