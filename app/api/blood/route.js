import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import NewBloodRequest from "../../../models/BloodRequest";



export const POST = async (req) => {
  try {
    console.log("api hit");
    await connectDB();

    const body = await req.json();
    console.log("body", body);

    // extract the actual object
    const newBloodRequest = await NewBloodRequest.create(body.newRequest);

    return NextResponse.json(newBloodRequest, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create request", details: err.message },
      { status: 500 }
    );
  }
};

// GET all BloodRequest
export const GET = async () => {
  try {
    await connectDB();
    const bloodRequest = await NewBloodRequest.find({});
    return NextResponse.json(bloodRequest, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch bloodRequest" }, { status: 500 });
  }
};