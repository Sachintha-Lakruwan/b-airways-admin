// src/app/api/admin/login/route.ts
import { executeQuery } from "../../database/database";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    const { username, password } = await request.json();

    if (typeof username !== "string" || typeof password !== "string") {
        return new Response("Invalid form data", { status: 400 });
    }

    try {
        // Query to check if the user exists with the given username and is an admin
        const res = await executeQuery(
            `SELECT id, password FROM registered_user WHERE username = ? AND role_id = 2`,
            [username]
        );

        // Check if the query returned exactly one result (meaning the admin exists)
        if (res.length !== 1) {
            return new Response("Invalid credentials", { status: 400 });
        }

        // Verify the password
        const isValidPassword = await compare(password, res[0].password);
        if (!isValidPassword) {
            return new Response("Invalid credentials", { status: 400 });
        }

        // Generate JWT token for the admin
        const secretKey = process.env.JWT_SECRET || "your_jwt_secret"; // Ensure a secure key in .env
        const token = jwt.sign(
            { adminId: res[0].id, role: "admin" },
            secretKey,
            { expiresIn: "1h" }
        );

        // Set the token in an HTTP-only cookie for secure admin sessions
        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set({
            name: "admin_token",
            value: token,
            httpOnly: true, // HTTP-only cookie for security
            secure: process.env.NODE_ENV === "production", // Secure cookie in production
            maxAge: 60 * 60, // Token expiration: 1 hour in seconds
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error logging in:", error);
        return new Response("An error occurred", { status: 500 });
    }
}