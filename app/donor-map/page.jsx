"use client"

import { useState } from "react" 
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input"
import {  Search, Filter, Layers } from "lucide-react"
import { useDonar } from "@/hooks/useDonar";
import DonarCard from "../../components/ui/DonarCard";

export default function DonorMapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const bangladeshDistricts = [
    "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga",
    "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj",
    "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia",
    "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon",
    "Narail", "Narsingdi", "Natore", "Nawabganj", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
    "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj",
    "Sylhet", "Tangail", "Thakurgaon"
  ];

  const { donars, loading, error } = useDonar();

  console.log("donar", donars)


  // Filter districts based on search query
  const filteredDistricts = bangladeshDistricts.filter((district) =>
    district.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}


      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-96 border-r border-border bg-card p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Find Donors</h2>
            <p className="text-sm text-muted-foreground">Locate available blood donors in real-time</p>
          </div>

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
            {/* Display filtered districts */}
            <div>
              <h3 className=" my-2">Search by Districts</h3>
              <div className="flex flex-wrap gap-2">
                {filteredDistricts.map((district) => (
                  <Button
                    key={district}
                    variant="outline"
                    size="sm"
                    className="border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                  >
                    {district}
                  </Button>
                ))}
              </div>
            </div>


          </div>


        </div>

        {/* Donor List */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">
            Nearby Donors <span className="text-muted-foreground font-normal">(24)</span>
          </h3>
          <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 justify-between  gap-8 p-8 border-2 border-white">
            {donars?.map((donar) => (
              <DonarCard key={donar.registrationId} donar={donar} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
