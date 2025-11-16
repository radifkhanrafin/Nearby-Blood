"use client"

import { useEffect, useState } from "react"
import moment from "moment"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Droplet, MapPin, Award, Calendar, Heart, TrendingUp, Users, LogOut
} from "lucide-react"
import { logoutUser } from "@/lib/firebaseAuth"
import { useRouter } from "next/navigation"
import Loading from "@/components/ui/loading" 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import RecentBloodRequests from "@/components/bloodRequestList";
import MyBloodRequestList from "@/components/myBloodRequestList";
import { useBloodRequest } from "@/hooks/useBloodRequest";
import { toast } from "react-toastify"
import { statsData } from "../../fakeData/index";
import useAxiosSecure from "@/lib/axios"
import useCurrentUser from "@/hooks/useCurrentUser"

export default function DonorDashboard() {
 
  const [showProfileModal, setShowProfileModal] = useState(false)
  const router = useRouter()
  const { userData, loadingUser,refetchUser } = useCurrentUser()
  const { bloodRequest, error, refetch } = useBloodRequest();
 const [isAvailable, setIsAvailable] = useState(userData?.availability)
  const [myRequest, setMyRequest] = useState([]);
  const [requestForBlood, setRequestForBlood] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (bloodRequest && userData) {
      setRequestForBlood(
        bloodRequest.filter(
          blood =>
            blood?.requestReceiver?.email === userData.email &&
            blood?.requestReceiver?._id === userData._id
        )
      );

      setMyRequest(
        bloodRequest.filter(
          blood =>
            blood?.requestSender?.email === userData.email &&
            blood?.requestSender?._id === userData._id
        )
      );
    }
  }, [bloodRequest, userData]);


  // console.log(myRequest, requestForBlood)

  // --- Required fields for profile completeness
  const requiredFields = [
    "name",
    "email",
    "phone",
    "bloodGroup",
    "presentAddress.street",
    "presentAddress.city",
    "presentAddress.district",
    "emergencyContact.name",
    "emergencyContact.phone"
  ]

  // --- Check profile completeness
  const isProfileComplete = (user) => {
    for (let field of requiredFields) {
      const value = field.split(".").reduce((obj, key) => obj && obj[key], user)
      if (!value) return false
    }
    return true
  }

  // --- Show modal if profile incomplete
  useEffect(() => {
    if (userData && !isProfileComplete(userData)) {
      setShowProfileModal(true)
    }
  }, [userData])


  const name = userData?.name || ""
  const profile = userData?.profile || "/default-profile.png"
  const bloodGroup = userData?.bloodGroup || ""
  const lastDonationDate = userData?.lastDonationDate || null
  const presentAddress = userData?.presentAddress || { street: "", city: "", district: "" }

  const nextDonationDate = lastDonationDate ? moment(lastDonationDate).add(90, "days") : null

  const profileIncomplete = userData ? !isProfileComplete(userData) : false

  const handleLogout = async () => {
    try {
      await logoutUser()
      toast("Logout Successful")
      router.push("/")
    } catch (err) {
      // console.error("Logout failed:", err)
    }
  }
console.log("userData.availability",userData)

  const actionToAbility = async (id, availability) => {
    console.log(id)
    console.log(availability)

    const res = await axiosSecure.patch(`users/id/${id}`, {
      availability: availability
    })

    console.log(res)

    if (res.status == 200) {
      setIsAvailable(!isAvailable)
      refetchUser()
      toast("Update Ability")
    }

  }
  if (loadingUser  ) return <Loading />

  return (
    <div className="min-h-screen bg-background relative">
      {/* Overlay if profile incomplete */}
      {profileIncomplete && (
        <div className="absolute inset-0 bg-black/30 z-40 flex items-center justify-center pointer-events-none"></div>
      )}

      <div className="container mx-auto px-4 py-8 pointer-events-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {name}!</h1>
          <p className="text-muted-foreground">Your contribution is making a difference in your community</p>
        </div>

        {/* Profile Card */}
        <Card className="p-10 bg-card border-2 grid grid-cols-1 md:grid-cols-2 justify-center items-center">
          <div className="text-center mb-4">
            <Avatar className="h-80 w-60 bg-primary/20 text-primary flex items-center justify-center mx-auto mb-3">
              <img src={profile} alt="Profile Image" />
            </Avatar>
            <h3 className="font-semibold text-foreground text-2xl">{name}</h3>
            <p className="text-xl text-muted-foreground">Blood Group: {bloodGroup}</p>
            <Badge className="mt-2 bg-chart-3 text-card">Verified Donor</Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address:</span>
              <div>
                <span className="text-foreground">{presentAddress.street}, </span>
                <span className="text-foreground">{presentAddress.city}, </span>
                <span className="text-foreground">{presentAddress.district}</span>
              </div>
            </div>

            {lastDonationDate && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Donation:</span>
                  <div className="flex flex-col">
                    <span className="text-foreground">{moment(lastDonationDate).format("MMM Do YY")}</span>
                    <span className="text-foreground">{moment(lastDonationDate).endOf("day").fromNow()}</span>
                  </div>
                </div>

                {nextDonationDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Eligible:</span>
                    <span className="text-foreground">{nextDonationDate.format("MMM Do YY")}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>

        {/* Edit Profile Button */}
        <Button
          variant="outline"
          className="w-full my-6 border-border text-foreground hover:bg-secondary bg-transparent"
          onClick={() => router.push("/edit-profile")}
        >
          Edit Profile
        </Button>

        {/* Availability Toggle */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20  ">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">Donation Availability</h3>
              <p className="text-sm text-muted-foreground">
                {isAvailable
                  ? "You are currently available for donations"
                  : "You are currently unavailable"}
              </p>
            </div>
               <Button
              onClick={() => actionToAbility(userData._id, !isAvailable)}
              className={`${isAvailable ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </Button>

          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid mask-conic-1 md:grid-cols-4 gap-6 mb-8">
          {statsData.map((Data, index) => (
            <Card key={index} className="p-6 bg-card border-border flex items-center justify-center">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-lg ${Data.bg} flex items-center justify-center`}>
                  {Data.icon && <Data.icon />}  {/* Render component correctly */}
                </div>
                {Data.extraIcon && <Data.extraIcon />}  {/* Render component correctly */}
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{Data.value}</div>
              <div className="text-sm text-muted-foreground">{Data.label}</div>
            </Card>
          ))}
        </div>


        {/* Blood request section */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Requests */}
          <div className="col-span-1">
            <RecentBloodRequests bloodRequests={requestForBlood} refetch={refetch} />
          </div>

          {/* Recent Requests */}
          <div className="col-span-1">
            <MyBloodRequestList bloodRequests={myRequest} refetch={refetch} />
          </div>


          {/* Sidebar */}
          {/* <div className="space-y-6">  */}
          {/* Achievements */}
          {/* <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-chart-4/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-chart-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">10 Donations</div>
                    <div className="text-xs text-muted-foreground">Earned 2 days ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Life Saver</div>
                    <div className="text-xs text-muted-foreground">Earned 1 week ago</div>
                  </div>
                </div>
              </div>
            </Card> */}

          {/* Next Appointment */}

          {/* </div> */}
        </div>



        {/* Logout */}
        <Button

          variant="outline"
          onClick={handleLogout}
          className="w-full my-6 border-border text-foreground hover:bg-secondary bg-transparent cursor-pointer hover:border-white"
        >
          Logout <LogOut />
        </Button>
      </div>

      {/* Profile Incomplete Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Your profile is incomplete. Please fill in all required information to access full features.
          </p>
          <DialogFooter>
            <Button
              onClick={() => {
                router.push("/edit-profile")
                setShowProfileModal(false)
              }}
            >
              Complete Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
