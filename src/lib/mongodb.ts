import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is required");
}

let isConnected = false;

export async function connectMongoDB(): Promise<void> {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI!);
    isConnected = true;
    console.log("[Bot] Connected to MongoDB");
  } catch (err) {
    console.error("[Bot] Failed to connect to MongoDB:", err);
    throw err;
  }
}

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.warn("[Bot] MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  isConnected = true;
  console.log("[Bot] MongoDB reconnected");
});

export default mongoose;
