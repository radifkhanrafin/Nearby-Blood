"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Layers } from "lucide-react"
import { useDonar } from "@/hooks/useDonar";
import DonarCard from "../../components/ui/DonarCard";

export default function DonorMapPage() {

  const { donars, loading, error } = useDonar();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedBloods, setSelectedBloods] = useState([]);

  const bangladeshDistricts = [
    "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga",
    "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj",
    "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia",
    "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon",
    "Narail", "Narsingdi", "Natore", "Nawabganj", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
    "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj",
    "Sylhet", "Tangail", "Thakurgaon"
  ];

  // Filter districts based on search query
  const filteredDistricts = bangladeshDistricts.filter(district =>
    district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter donors dynamically: if no selection, show all
  const filteredDonors = donars?.filter(donar => {
    const matchDistrict = selectedDistricts.length
      ? selectedDistricts.includes(donar?.presentAddress?.district)
      : true;
    const matchBlood = selectedBloods.length
      ? selectedBloods.includes(donar.bloodGroup)
      : true;
    return matchDistrict && matchBlood;
  });

  // Toggle selection helper
  const toggleSelection = (value, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter(v => v !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-96 border-r border-border bg-card p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Find Donors</h2>
            <p className="text-sm text-muted-foreground">Locate available blood donors in real-time</p>
          </div>

          <div className="space-y-4 mb-6">
            {/* Search */}
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div> */}

            {/* Blood Type Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Blood Type</label>
              <div className="flex flex-wrap gap-2">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => {
                  const isSelected = selectedBloods.includes(type);

                  return (
                    <Button
                      key={type}
                      variant={isSelected ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleSelection(type, selectedBloods, setSelectedBloods)}
                      className={
                        `border-border  ${isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                        }`
                      }
                    >
                      {type}
                    </Button>
                  );
                })}
              </div>

            </div>

            {/* District Filter */}
            <div>
              <h3 className="my-2">Search by Districts</h3>
              <div className="flex flex-wrap gap-2">
                {filteredDistricts.map((district) => {
                  const isSelected = selectedDistricts.includes(district);

                  return (
                    <Button
                      key={district}
                      variant={isSelected ? "outline" : "default"}
                      size="sm"
                      onClick={() =>
                        toggleSelection(district, selectedDistricts, setSelectedDistricts)
                      }
                      className={
                        `border-border ${isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                        }`
                      }
                    >
                      {district}
                    </Button>
                  );
                })}
              </div>

            </div>

            {/* Clear Filters */}
            {(selectedDistricts.length || selectedBloods.length) && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setSelectedDistricts([]);
                  setSelectedBloods([]);
                }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Donor List */}
        <div className="flex-1 p-8">
          <h3 className="font-semibold text-foreground mb-4">
            Nearby Donors <span className="text-muted-foreground font-normal">({filteredDonors?.length || 0})</span>
          </h3>
          <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredDonors?.map((donar) => (
              <DonarCard key={donar.registrationId} donar={donar} />
            ))}
            {!filteredDonors?.length && <p>No donors found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
