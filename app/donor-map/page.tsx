"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Droplet, MapPin, Search, Filter, Navigation, Layers } from "lucide-react"

export default function DonorMapPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BloodSync</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/donor-map" className="text-foreground font-medium">
              Donor Map
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
          </nav>
          <Link href="/signup">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-96 border-r border-border bg-card p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Find Donors</h2>
            <p className="text-sm text-muted-foreground">Locate available blood donors in real-time</p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                <Layers className="h-4 w-4 mr-2" />
                Layers
              </Button>
            </div>

            {/* Blood Type Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Blood Type</label>
              <div className="flex flex-wrap gap-2">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    className="border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Donor List */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Nearby Donors <span className="text-muted-foreground font-normal">(24)</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: "John Smith", bloodType: "O+", distance: "0.8 mi", available: true },
                { name: "Sarah Williams", bloodType: "A+", distance: "1.2 mi", available: true },
                { name: "Michael Brown", bloodType: "B+", distance: "1.5 mi", available: true },
                { name: "Emily Davis", bloodType: "AB+", distance: "2.1 mi", available: false },
                { name: "David Wilson", bloodType: "O-", distance: "2.4 mi", available: true },
                { name: "Lisa Garcia", bloodType: "A-", distance: "2.8 mi", available: true },
              ].map((donor, i) => (
                <Card
                  key={i}
                  className="p-4 bg-background border-border hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{donor.name}</span>
                    {donor.available && <Badge className="bg-chart-3 text-card text-xs">Available</Badge>}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {donor.distance}
                    </span>
                    <Badge variant="outline" className="border-primary text-primary">
                      {donor.bloodType}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-secondary/20">
          {/* Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map</h3>
              <p className="text-muted-foreground max-w-md">
                Real-time donor locations would be displayed here using Google Maps API or similar mapping service
              </p>
              <div className="mt-6 flex gap-3 justify-center">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Navigation className="h-4 w-4 mr-2" />
                  Use My Location
                </Button>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="bg-card border border-border text-foreground">
              +
            </Button>
            <Button size="icon" variant="secondary" className="bg-card border border-border text-foreground">
              -
            </Button>
          </div>

          {/* Legend */}
          <Card className="absolute bottom-4 left-4 p-4 bg-card border-border">
            <h4 className="font-semibold text-foreground mb-3 text-sm">Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-3"></div>
                <span className="text-muted-foreground">Available Donor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted"></div>
                <span className="text-muted-foreground">Unavailable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Your Location</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
