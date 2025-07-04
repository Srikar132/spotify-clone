import { getXataClient } from "@/xata";

async function createUserTable() {
    try {
        console.log('🚀 Creating user table in Xata...');
        
        const xata = getXataClient();
        
        // Create user table with all required fields for Better Auth
        await xata.sql`
            CREATE TABLE IF NOT EXISTS "user" (
                "id" text PRIMARY KEY NOT NULL,
                "name" text NOT NULL,
                "email" text NOT NULL UNIQUE,
                "email_verified" boolean DEFAULT false NOT NULL,
                "image" text,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "role" text DEFAULT 'user',
                "banned" boolean DEFAULT false,
                "ban_reason" text,
                "ban_expires" timestamp,
                "gender" text,
                "date_of_birth" timestamp,
                "marketing_emails" boolean,
                "data_sharing" boolean,
                "is_premium" boolean DEFAULT false
            );
        `;
        
        // Create session table
        await xata.sql`
            CREATE TABLE IF NOT EXISTS "session" (
                "id" text PRIMARY KEY NOT NULL,
                "expires_at" timestamp NOT NULL,
                "token" text NOT NULL UNIQUE,
                "created_at" timestamp NOT NULL,
                "updated_at" timestamp NOT NULL,
                "ip_address" text,
                "user_agent" text,
                "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
                "impersonated_by" text
            );
        `;
        
        // Create account table
        await xata.sql`
            CREATE TABLE IF NOT EXISTS "account" (
                "id" text PRIMARY KEY NOT NULL,
                "account_id" text NOT NULL,
                "provider_id" text NOT NULL,
                "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
                "access_token" text,
                "refresh_token" text,
                "id_token" text,
                "access_token_expires_at" timestamp,
                "refresh_token_expires_at" timestamp,
                "scope" text,
                "password" text,
                "created_at" timestamp NOT NULL,
                "updated_at" timestamp NOT NULL
            );
        `;
        
        // Create verification table
        await xata.sql`
            CREATE TABLE IF NOT EXISTS "verification" (
                "id" text PRIMARY KEY NOT NULL,
                "identifier" text NOT NULL,
                "value" text NOT NULL,
                "expires_at" timestamp NOT NULL,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now()
            );
        `;
        
        console.log('✅ Tables created successfully!');
        
        // Verify tables were created
        const tables = await xata.sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `;
        
        console.log('Available tables:', tables);
        
    } catch (error) {
        console.error('❌ Table creation failed:', error);
    }
}

createUserTable();