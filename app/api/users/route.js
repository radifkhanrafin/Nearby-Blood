import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongoose";  
import User from "../../../models/Users";
 


// GET all users
export const GET = async () => {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
};

// POST new user
export const POST = async (req) => {
  // console.log("api hit")
  try {
    await connectDB();
    const body = await req.json();
    //  console.log('body',body)
    const newUser = await User.create(body);
    // console.log("newUser",newUser)
    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create user" , err }, { status: 500 });
  }
};
