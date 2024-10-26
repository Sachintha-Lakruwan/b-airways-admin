// src/cache/index.ts
import { createClient } from "redis";

// Set up a Redis client
const client = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});

client.on("error", (err) => console.error("Redis Client Error", err));

async function connect() {
    if (!client.isOpen) {
        await client.connect();
    }
}

// Function to get data from the cache
export async function get(key: string) {
    await connect();
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
}

// Function to set data in the cache with an expiration time (in seconds)
export async function set(key: string, value: any, options: { expireIn: number }) {
    await connect();
    await client.set(key, JSON.stringify(value), { EX: options.expireIn });
}

// Export client for any advanced use
export { client };
