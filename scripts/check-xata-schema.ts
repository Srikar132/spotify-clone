import { getXataClient } from "@/xata";

async function checkXataSchema() {
    try {
        console.log('🔍 Checking Xata database schema...');
        
        const xata = getXataClient();
        
        // Test basic connection
        console.log('Testing Xata connection...');
        
        // Try to query the user table to see if it exists
        try {
            const users = await xata.sql`SELECT * FROM "user" LIMIT 1`;
            console.log('✅ User table exists and is accessible');
            console.log('Sample query result:', users);
        } catch (error) {
            console.log('❌ User table query failed:', error);
            
            // Check what tables exist
            try {
                const tables = await xata.sql`
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                    ORDER BY table_name;
                `;
                console.log('Available tables:', tables);
            } catch (tableError) {
                console.log('Could not list tables:', tableError);
            }
        }
        
        // Check user table structure if it exists
        try {
            const columns = await xata.sql`
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_name = 'user'
                ORDER BY ordinal_position;
            `;
            console.log('User table structure:', columns);
        } catch (error) {
            console.log('Could not get table structure:', error);
        }
        
    } catch (error) {
        console.error('❌ Xata schema check failed:', error);
    }
}

checkXataSchema();