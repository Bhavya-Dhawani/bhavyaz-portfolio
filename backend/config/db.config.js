import { connect } from "mongoose";

export async function connectDB() {
    const url = process.env.DB_URL;

    if(!url) {
        console.error("❌ Error Connecting database invalid connection stirng");
        process.exit(1);
    }

    try {
        await connect(url);
        console.log("✅ Mongo DB connected successfully");
    } catch (err) {
        console.error(`❌ Error Connecting MongoDB: ${err}`);
        process.exit(1);
    }
}