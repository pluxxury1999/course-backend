import "dotenv/config";

import app from "./app";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI!;

async function start() {
    if (!MONGO_URI) {
        console.error("Missing MONGO_URI in .env");
        process.exit(1);
    }

    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
}

start().catch((err) => console.error("Server error:", err));