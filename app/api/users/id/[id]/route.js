import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/Users";

// GET user by ID
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
};
export const PATCH = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;

    console.log("User ID:", id);

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get data sent from frontend
    const body = await req.json();
    console.log("PATCH payload:", body);

    // --- 1. Update Availability ---
    if (body.hasOwnProperty("availability")) {
      user.availability = body.availability;
    }

    // --- 2. Add new blood request (push into array) ---
    if (body.newRequest) {
      user.bloodRequest.push(body.newRequest);
    }

    // --- 3. Update other fields dynamically (optional) ---
    // Example: name, phone, role, etc.
    for (const key in body) {
      if (key !== "newRequest" && key !== "availability") {
        user[key] = body[key];
      }
    }

    // Save the modified user
    await user.save();

    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
};
