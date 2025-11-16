"use client"

import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import useAxiosSecure from "@/lib/axios"
import { toast } from "react-toastify"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function RecentBloodRequests({ bloodRequests, refetch }) {
  const axiosSecure = useAxiosSecure()



  if (!bloodRequests || bloodRequests.length === 0) {
    return (
      <Card className="lg:col-span-2 p-6 bg-card border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">My  Requests</h3>
        <p className="text-sm text-muted-foreground">No recent requests available.</p>
      </Card>
    )
  }



  const handleStatusAction = async (requestId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/blood/id/${requestId}`, {
        requestStatus: newStatus,
      });

      console.log(res)

      if (res.status == 200) {

        toast(`Blood Request : ${newStatus}`)
        refetch()

      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to update request status");
    }
  };





  return (
    <Card className="lg:col-span-2 p-6 bg-card border-border">
      <h3 className="text-xl font-semibold text-foreground mb-4">Recent Blood Requests</h3>
      <div className="space-y-4 ">
        {bloodRequests.map((request, i) => (
          <div
            key={i}
            className="flex flex-col p-4 bg-background rounded-lg border border-border"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
              <Avatar className="h-20 w-20 bg-primary/20 text-primary flex items-center justify-center">

                <img className="h-20 w-20" src={request?.requestSender?.profile} alt="" />
              </Avatar>


              <div className=" space-y-1 ">
                <div className="font-semibold text-foreground">{request.requestSender?.name || "Unknown Donor"}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  {request.location || "Unknown"} • {request.needTime || "Unknown time"}
                </div>
                <div className="text-sm text-muted-foreground space-y-1  ">
                  <p><span className="font-semibold text-foreground">Patient Problem:</span> {request.patientProblem || "-"}</p>
                  <p><span className="font-semibold text-foreground">Donation Date:</span> {request.needDate || "-"}</p>
                  <p><span className="font-semibold text-foreground">Contact Number:</span> {request.contactNumber || "-"}</p>
                  <p><span className="font-semibold text-foreground">Message:</span> {request.message || "-"}</p>

                  {/* Status Select */}

                  {/* <div className="mt-2  flex items-center justify-center flex-col md:items-start   gap-2 ">
                    <p className="font-semibold text-foreground capitalize">Request Status: {request.requestStatus}</ p>
                    <div className="flex items-center justify-center flex-col md:flex-row gap-4 ">
                      <span className="font-semibold text-foreground">Do You want to </span>
                      <div className="flex items-center gap-4">
                        <button
                          className={`px-3 py-1 rounded text-white ${request.requestStatus === "approved"
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                            }`}
                          onClick={() => handleStatusAction(request._id, "approved")}
                          disabled={request.requestStatus === "approved"}
                        >
                          Accept
                        </button>

                        <button
                          className={`px-3 py-1 rounded text-white ${request.requestStatus === "rejected"
                            ? "bg-red-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                            }`}
                          onClick={() => handleStatusAction(request._id, "rejected")}
                          disabled={request.requestStatus === "rejected"}
                        >
                          Reject
                        </button>
                      </div>

                    </div>



                  </div> */}
                   <div className="flex items-center gap-2  ">
                <span className="font-semibold text-foreground ">Request Status:</span>

                <Select

                  defaultValue={request.requestStatus}
                  onValueChange={(value) => handleStatusAction(request._id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="pending" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

                </div>
              </div>
            </div>


          </div>
        ))}
      </div>
    </Card>
  )
}
