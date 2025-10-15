"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Droplet, MapPin, Bell, AlertCircle, Search, Filter, Phone, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function PatientDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

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
            <Link href="/patient/dashboard" className="text-foreground font-medium">
              Dashboard
            </Link>
            <Link href="/donor-map" className="text-muted-foreground hover:text-foreground transition-colors">
              Find Donors
            </Link>
            <Link href="/patient/requests" className="text-muted-foreground hover:text-foreground transition-colors">
              My Requests
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
            <Avatar className="h-10 w-10 bg-accent/20 text-accent flex items-center justify-center">
              <span className="text-sm font-semibold">EM</span>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Blood Donors</h1>
          <p className="text-muted-foreground">Connect with compatible donors in your area</p>
        </div>

        {/* Emergency SOS Button */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-destructive/20 to-primary/20 border-destructive/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">Emergency Blood Request</h3>
                <p className="text-sm text-muted-foreground">Send urgent alerts to all nearby compatible donors</p>
              </div>
            </div>
            <Button size="lg" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Send SOS Alert
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Available Donors */}
          <Card className="lg:col-span-2 p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Available Donors Near You</h3>
              <Button
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-secondary bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by blood type, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "David Martinez",
                  bloodType: "A+",
                  distance: "1.2 mi",
                  donations: 15,
                  rating: 4.9,
                  available: true,
                },
                {
                  name: "Lisa Anderson",
                  bloodType: "A+",
                  distance: "2.8 mi",
                  donations: 8,
                  rating: 5.0,
                  available: true,
                },
                {
                  name: "Robert Kim",
                  bloodType: "A+",
                  distance: "3.5 mi",
                  donations: 22,
                  rating: 4.8,
                  available: true,
                },
                {
                  name: "Jennifer Lee",
                  bloodType: "A+",
                  distance: "4.2 mi",
                  donations: 12,
                  rating: 4.9,
                  available: false,
                },
              ].map((donor, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 bg-accent/20 text-accent flex items-center justify-center">
                      <span className="text-lg font-semibold">
                        {donor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{donor.name}</span>
                        {donor.available && <Badge className="bg-chart-3 text-card text-xs">Available</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {donor.distance}
                        </span>
                        <span>•</span>
                        <span>{donor.donations} donations</span>
                        <span>•</span>
                        <span>⭐ {donor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-primary text-primary font-semibold">
                      {donor.bloodType}
                    </Badge>
                    {donor.available ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border text-foreground hover:bg-secondary bg-transparent"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Request
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="ghost" disabled className="text-muted-foreground">
                        Unavailable
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-6 border-border text-foreground hover:bg-secondary bg-transparent"
            >
              Load More Donors
            </Button>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Patient Info */}
            <Card className="p-6 bg-card border-border">
              <div className="text-center mb-4">
                <Avatar className="h-20 w-20 bg-accent/20 text-accent flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-semibold">EM</span>
                </Avatar>
                <h3 className="font-semibold text-foreground">Emily Martinez</h3>
                <p className="text-sm text-muted-foreground">Blood Type: A+</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">San Francisco, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Requests:</span>
                  <span className="text-foreground">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Responses:</span>
                  <span className="text-foreground">3 donors</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                Edit Profile
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Nearby Donors</span>
                    <span className="text-foreground font-semibold">47</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: "78%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Available Now</span>
                    <span className="text-foreground font-semibold">32</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-3" style={{ width: "68%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="text-foreground font-semibold">94%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "94%" }}></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Blood Type Compatibility */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Compatible Blood Types</h3>
              <p className="text-sm text-muted-foreground mb-3">As A+, you can receive from:</p>
              <div className="flex flex-wrap gap-2">
                {["A+", "A-", "O+", "O-"].map((type) => (
                  <Badge key={type} variant="outline" className="border-primary text-primary">
                    {type}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Help Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is available 24/7 for emergency assistance
              </p>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Contact Support</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
