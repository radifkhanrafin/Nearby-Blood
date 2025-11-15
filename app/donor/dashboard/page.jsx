"use client"

import { useEffect, useState } from "react"
import moment from 'moment';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Droplet, MapPin, Award, Bell, Calendar, Heart, TrendingUp, Users, LogOutIcon } from "lucide-react"
import { logoutUser } from "@/lib/firebaseAuth" 
import { useRouter } from "next/navigation"
import Loading from "@/components/ui/loading"; 
import { useUser } from "@/hooks/UserContext";



export default function DonorDashboard() {
  const [isAvailable, setIsAvailable] = useState(true)
 const router = useRouter()
const { userData, loading } = useUser();

  if (!userData || userData == null) {
    return <Loading />
  }
  console.log(" user from dashboard userData", userData)


  const {
    name,
    email,
    phone,
    gender,
    profile,
    dateOfBirth,
    age,
    bloodGroup,
    weightKg,
    lastDonationDate,
    isDonor,
    availability,
    medicalHistory,
    registrationId,
    emergencyContact,
    presentAddress,
    permanentAddress,
  } = userData;

  const handleLogout = async () => {
    try {
      await logoutUser()
      router.push("/")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  const nextDonationDate = moment(lastDonationDate).add(90, "days").format("YYYY-MM-DD");



  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">


        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {name} !</h1>
          <p className="text-muted-foreground">Your contribution is making a difference in your community</p>
        </div>

        <Card className="p-10 bg-card border-2  grid grid-cols-1 md:grid-cols-2 justify-center items-center ">

          {/* Profile and Name */}
          <div className="text-center mb-4">
            <Avatar className="h-80 w-60 bg-primary/20 text-primary flex items-center justify-center mx-auto mb-3">
              {/* <span className="text-2xl font-semibold">JD</span> */}
              <img src={profile} alt="Images" />
            </Avatar>
            <h3 className="font-semibold text-foreground text-2xl">{name}</h3>
            <p className="text-xl text-muted-foreground">Blood Group: {bloodGroup}</p>
            <Badge className="mt-2 bg-chart-3 text-card">Verified Donor</Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address:</span>
              <div >
                <span className="text-foreground"> {presentAddress.street} ,</span>
                <span className="text-foreground"> {presentAddress.city} ,</span>
                <span className="text-foreground"> {presentAddress.district}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">   Last Donation:  </span>
              <div className="flex flex-col">
                <span className="text-foreground"> {moment(lastDonationDate).format("MMM Do YY")} </span>
                <span className="text-foreground">  {moment(lastDonationDate).endOf('day').fromNow()} </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Eligible:</span>
              <span className="text-foreground">{moment(nextDonationDate).format("MMM Do YY")}</span>
            </div>
          </div>



        </Card>
        <Button
          variant="outline"
          className="w-full my-6 border-border text-foreground hover:bg-secondary bg-transparent"
        >
          Edit Profile
        </Button>


        {/* Availability Toggle */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">Donation Availability</h3>
              <p className="text-sm text-muted-foreground">
                {isAvailable ? "You are currently available for donations" : "You are currently unavailable"}
              </p>
            </div>
            <Button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`${isAvailable ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplet className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-5 w-5 text-chart-3" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">12</div>
            <div className="text-sm text-muted-foreground">Total Donations</div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">36</div>
            <div className="text-sm text-muted-foreground">Lives Impacted</div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-chart-4" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">2,450</div>
            <div className="text-sm text-muted-foreground">Reward Points</div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-chart-3" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">#24</div>
            <div className="text-sm text-muted-foreground">Leaderboard Rank</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Requests */}
          <Card className="lg:col-span-2 p-6 bg-card border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Recent Blood Requests</h3>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", bloodType: "O+", distance: "2.3 mi", urgency: "High", time: "15 min ago" },
                { name: "Michael Chen", bloodType: "O+", distance: "4.1 mi", urgency: "Medium", time: "1 hour ago" },
                { name: "City Hospital", bloodType: "O+", distance: "5.8 mi", urgency: "Low", time: "3 hours ago" },
              ].map((request, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 bg-primary/20 text-primary flex items-center justify-center">
                      <span className="text-sm font-semibold">
                        {request.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{request.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {request.distance} away • {request.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={request.urgency === "High" ? "destructive" : "secondary"}
                      className={
                        request.urgency === "High"
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }
                    >
                      {request.urgency}
                    </Badge>
                    <Badge variant="outline" className="border-primary text-primary">
                      {request.bloodType}
                    </Badge>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Respond
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}


            {/* Achievements */}
            <Card className="p-6 bg-card border-border">
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
            </Card>

            {/* Next Appointment */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Upcoming Appointment</h3>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Blood Drive Event</div>
                  <div className="text-xs text-muted-foreground">March 25, 2025 at 10:00 AM</div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
              >
                View Details
              </Button>
            </Card>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full my-6 border-border text-foreground hover:bg-secondary bg-transparent"
        >
          Logout <LogOutIcon />
        </Button>

      </div>
    </div>
  )
}
