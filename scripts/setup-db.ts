import { setupDatabase, checkUserTable } from "@/lib/db-setup";

async function main() {
    console.log("🚀 Setting up database...");
    
    const isConnected = await setupDatabase();
    if (!isConnected) {
        console.error("Failed to connect to database");
        process.exit(1);
    }
    
    console.log("📋 Checking user table structure...");
    await checkUserTable();
    
    console.log("✅ Database setup complete!");
}

main().catch(console.error);