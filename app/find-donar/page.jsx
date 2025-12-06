"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDonar } from "@/hooks/useDonar";
import DonarCard from "../../components/DonarCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { bangladeshDistricts } from "../fakeData/index";


export default function DonorMapPage() {
  const { donars, refetch } = useDonar();
  const { userData } = useCurrentUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedBloods, setSelectedBloods] = useState([]);
  const [isMobile, setIsMobile] = useState(false);



  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Check mobile device
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile search filter (district + blood group)
  const mobileFilteredDonors = donars?.filter((donar) => {
    if (!donar) return false;
    if (userData && donar.registrationId === userData.registrationId) return false;

    const district = donar?.presentAddress?.district?.toLowerCase() || "";
    const blood = donar?.bloodGroup?.toLowerCase() || "";

    return (
      district.includes(searchQuery.toLowerCase()) ||
      blood.includes(searchQuery.toLowerCase())
    );
  });

  // Desktop filters
  const filteredDonors = donars?.filter((donar) => {
    if (!donar) return false;
    if (userData && donar.registrationId === userData.registrationId) return false;

    const matchDistrict = selectedDistricts.length
      ? selectedDistricts.includes(donar?.presentAddress?.district)
      : true;

    const matchBlood = selectedBloods.length
      ? selectedBloods.includes(donar.bloodGroup)
      : true;

    return matchDistrict && matchBlood;
  });

  const toggleSelection = (value, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((v) => v !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className=" flex flex-col md:flex-row">

        {/* Sidebar */}
        <div className="w-full  md:w-96 border-r border-border bg-card p-6 overflow-y-auto">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Find Donors</h2>
            <p className="text-sm text-muted-foreground">Locate blood donors easily</p>
          </div>

          {/* ---------------- MOBILE ONLY SEARCH ---------------- */}
          {isMobile && (
            <div className="mb-5">
              <input
                type="text"
                placeholder="Search by district or blood group..."
                className="w-full px-4 py-2 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Example: Dhaka, A+, B-, Sylhet etc.
              </p>
            </div>
          )}

          {/* ---------------- DESKTOP FILTERS ---------------- */}
          {!isMobile && (
            <div className="space-y-5">

              {/* Blood Groups */}
              <div>
                <label className="text-sm font-medium mb-2 block">Blood Type</label>
                <div className="flex flex-wrap gap-2">
                  {bloodTypes.map((type) => {
                    const isSelected = selectedBloods.includes(type);
                    return (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          toggleSelection(type, selectedBloods, setSelectedBloods)
                        }
                        className={
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground"
                        }
                      >
                        {type}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Districts */}
              <div>
                <h3 className="my-2 font-medium">Districts</h3>
                <div className="flex flex-wrap gap-2">
                  {bangladeshDistricts.map((district) => {
                    const isSelected = selectedDistricts.includes(district);

                    return (
                      <Button
                        key={district}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          toggleSelection(
                            district,
                            selectedDistricts,
                            setSelectedDistricts
                          )
                        }
                        className={
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground"
                        }
                      >
                        {district}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedBloods.length || selectedDistricts.length) > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedBloods([]);
                    setSelectedDistricts([]);
                  }}
                >
                  Clear Filters
                </Button>
              )}

            </div>
          )}

        </div>

        {/* Donor List */}
        <div className="flex-1 p-8">
          <h3 className="font-semibold text-foreground mb-4">
            Donors{" "}
            <span className="text-muted-foreground font-normal">
              ({isMobile ? mobileFilteredDonors?.length : filteredDonors?.length})
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(isMobile ? mobileFilteredDonors : filteredDonors)?.map((donar) => (
              <DonarCard key={donar.registrationId} donar={donar} refetch={refetch} />
            ))}

            {!(isMobile ? mobileFilteredDonors : filteredDonors)?.length && (
              <p>No donors found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
