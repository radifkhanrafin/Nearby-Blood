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
console.log(id)
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get new request data from request body
    const { newRequest } = await req.json();
    console.log(newRequest)
    if (!newRequest) {
      return NextResponse.json({ error: "No request data provided" }, { status: 400 });
    }

    // Push the new request into the bloodRequest array
    user.bloodRequest.push(newRequest);

    // Save the updated user
    await user.save();

    return NextResponse.json({ message: "Blood request added successfully", user }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
};