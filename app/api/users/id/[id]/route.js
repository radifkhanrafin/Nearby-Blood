import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

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
