import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import NewBloodRequest from "../../../../../models/BloodRequest";



export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const { id } = params;
        const bloodRequest = await NewBloodRequest.findById(id);
        if (!bloodRequest) return NextResponse.json({ error: "blood request not found" }, { status: 404 });
        return NextResponse.json(bloodRequest, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch bloodRequest" }, { status: 500 });
    }
};

 
export const PATCH = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;

    // Find the blood request by ID
    const bloodRequest = await NewBloodRequest.findById(id);
    if (!bloodRequest) {
      return NextResponse.json({ error: "Blood request not found" }, { status: 404 });
    }

    // Get new status from request body
    const { requestStatus } = await req.json();
    if (!requestStatus) {
      return NextResponse.json({ error: "No status provided" }, { status: 400 });
    }

    // Update only the requestStatus
    bloodRequest.requestStatus = requestStatus;

    // Save the updated blood request
    await bloodRequest.save();

    return NextResponse.json({
      message: "Request status updated successfully",
      bloodRequest
    }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update request status" }, { status: 500 });
  }
};


export const DELETE = async (req, context) => {
  try {
    await connectDB();
 
    const { params } = await context;
    const id = params?.id;

    // console.log(id);

    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    // Find and delete
    const bloodRequest = await NewBloodRequest.findByIdAndDelete(id);
    if (!bloodRequest) {
      return NextResponse.json({ error: "Blood request not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blood request deleted successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete blood request" },
      { status: 500 }
    );
  }
};
