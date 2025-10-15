import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User"; // Make sure you have a User model

// GET all users
export const getAllUsers = async () => {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
};

// GET user by ID
export const getUserById = async (id) => {
  try {
    await connectDB();
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
};

// POST new user
export const createUser = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    console.log(body)
    const newUser = await User.create(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
};

// Default Next.js API route handlers using arrow functions
export const GET = async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    return await getUserById(id);
  }
  return await getAllUsers();
};

export const POST = async (req) => await createUser(req);
