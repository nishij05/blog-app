import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    // Create a new connection if no cached connection
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI);
  }
  try {
    cached.conn = await cached.promise;
    console.log("Database connected successfully!");
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Database connection failed");
  }
}

export default dbConnect;
