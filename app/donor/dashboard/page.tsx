"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Droplet, MapPin, Award, Bell, Calendar, Heart, TrendingUp, Users } from "lucide-react"

export default function DonorDashboard() {
  const [isAvailable, setIsAvailable] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BloodSync</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/donor/dashboard" className="text-foreground font-medium">
              Dashboard
            </Link>
            <Link href="/donor-map" className="text-muted-foreground hover:text-foreground transition-colors">
              Map
            </Link>
            <Link href="/donor/history" className="text-muted-foreground hover:text-foreground transition-colors">
              History
            </Link>
            <Link href="/donor/rewards" className="text-muted-foreground hover:text-foreground transition-colors">
              Rewards
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
            <Avatar className="h-10 w-10 bg-primary/20 text-primary flex items-center justify-center">
              <span className="text-sm font-semibold">JD</span>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Your contribution is making a difference in your community</p>
        </div>

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
            <Card className="p-6 bg-card border-border">
              <div className="text-center mb-4">
                <Avatar className="h-20 w-20 bg-primary/20 text-primary flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-semibold">JD</span>
                </Avatar>
                <h3 className="font-semibold text-foreground">John Doe</h3>
                <p className="text-sm text-muted-foreground">Blood Type: O+</p>
                <Badge className="mt-2 bg-chart-3 text-card">Verified Donor</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">San Francisco, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Donation:</span>
                  <span className="text-foreground">45 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Eligible:</span>
                  <span className="text-foreground">11 days</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                Edit Profile
              </Button>
            </Card>

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
      </div>
    </div>
  )
}
