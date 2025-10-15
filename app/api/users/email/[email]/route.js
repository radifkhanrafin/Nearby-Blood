import { NextResponse } from "next/server";
import User  from "../../../../../models/Users";
import { connectDB } from "../../../../../lib/mongoose"; 



export const GET = async (req, { params }) => {
  try {
    await connectDB();

    // get email from the dynamic route
   const Params = await params;  
    const email = Params.email;
    console.log("email param:", email);

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch user", details: err.message },
      { status: 500 }
    );
  }
};