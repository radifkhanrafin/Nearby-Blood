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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get data sent from frontend
    const body = await req.json();
    console.log("PATCH payload:", body);

    // Update full user document
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body }, // Updates all fields sent from frontend
      { new: true }   // Returns the updated document
    );

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
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