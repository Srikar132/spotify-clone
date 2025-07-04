import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { config } from 'dotenv';

config({ path: './.env' });

const connectionString = process.env.DATABASE_URL_POSTGRES!;

async function main() {
    console.log('🚀 Starting database migration...');
    
    try {
        // Create a connection for migrations
        const migrationClient = postgres(connectionString, { max: 1 });
        const db = drizzle(migrationClient);
        
        console.log('📦 Running migrations...');
        await migrate(db, { migrationsFolder: './drizzle/migrations' });
        
        console.log('✅ Migrations completed successfully!');
        await migrationClient.end();
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

main();