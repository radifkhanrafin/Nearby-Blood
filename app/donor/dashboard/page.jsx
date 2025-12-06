"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/lib/firebaseAuth";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import RecentBloodRequests from "@/components/bloodRequestList";
import MyBloodRequestList from "@/components/myBloodRequestList";
import { useBloodRequest } from "@/hooks/useBloodRequest";
import { toast } from "react-toastify";
import { statsData } from "../../fakeData";
import useAxiosSecure from "@/lib/axios";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function DonorDashboard() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const router = useRouter();
  const { userData, loadingUser, refetchUser } = useCurrentUser();
  const { bloodRequest, error, refetch } = useBloodRequest();
  const axiosSecure = useAxiosSecure();

const [isAvailable, setIsAvailable] = useState(false);  

useEffect(() => {
  if (userData) {
    setIsAvailable(userData?.availability);  
  }
}, [userData]);
  const [myRequest, setMyRequest] = useState([]);
  const [requestForBlood, setRequestForBlood] = useState([]);

  const [editForm, setEditForm] = useState({
    name: "",
    profile: "",
    weightKg: "",
    gender: "",
    presentAddress: { street: "", city: "", district: "" },
    emergencyContact: { name: "", phone: "" },
  });

  // Load edit form when opening modal
  const openEditModal = () => {
    setEditForm({
      name: userData?.name || "",
      profile: userData?.profile || "/default-profile.png",
      weightKg: userData?.weightKg || "",
      age: userData?.age || null,
      gender: userData?.gender || "",
      presentAddress: {
        street: userData?.presentAddress?.street || "",
        city: userData?.presentAddress?.city || "",
        district: userData?.presentAddress?.district || "",
      },
      emergencyContact: {
        name: userData?.emergencyContact?.name || "",
        phone: userData?.emergencyContact?.phone || "",
      },
    });

    setShowEditModal(true);
  };

  // Change handler
  const updateField = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const updateNestedField = (main, field, value) => {
    setEditForm({
      ...editForm,
      [main]: { ...editForm[main], [field]: value },
    });
  };

  // Save profile
  const handleSaveProfile = async () => {

    const finalUpdatedData = {
      ...userData,
      ...editForm,
      presentAddress: {
        ...userData.presentAddress,
        ...editForm.presentAddress
      },
      emergencyContact: {
        ...userData.emergencyContact,
        ...editForm.emergencyContact
      }
    };

    console.log("FINAL DATA TO SEND →", finalUpdatedData._id);


    const res = await axiosSecure.patch(`/users/id/${finalUpdatedData._id}`, finalUpdatedData)
    console.log("Updated profile:", res);
    console.log("FINAL DATA TO SEND →", finalUpdatedData._id);
    toast("Profile updated successfully (You add API)");
    setShowEditModal(false);
    refetchUser();
  };

  // Profile completeness
  const requiredFields = [
    "name",
    "weightKg",
    "gender",
    "presentAddress.street",
    "presentAddress.city",
    "presentAddress.district",
    "emergencyContact.name",
    "emergencyContact.phone",
  ];

  const isProfileComplete = (user) => {
    for (let field of requiredFields) {
      const value = field.split(".").reduce((obj, key) => obj && obj[key], user);
      if (!value) return false;
    }
    return true;
  };

  useEffect(() => {
    if (bloodRequest && userData) {
      setRequestForBlood(
        bloodRequest.filter(
          (blood) =>
            blood?.requestReceiver?.email === userData.email &&
            blood?.requestReceiver?._id === userData._id
        )
      );

      setMyRequest(
        bloodRequest.filter(
          (blood) =>
            blood?.requestSender?.email === userData.email &&
            blood?.requestSender?._id === userData._id
        )
      );
    }
  }, [bloodRequest, userData]);

  useEffect(() => {
    if (userData && !isProfileComplete(userData)) {
      setShowProfileModal(true);
    }
  }, [userData]);

  const name = userData?.name || "";
  const profile = userData?.profile || "/default-profile.png";
  const bloodGroup = userData?.bloodGroup || "";
  const lastDonationDate = userData?.lastDonationDate || null;
  const presentAddress = userData?.presentAddress || {
    street: "",
    city: "",
    district: "",
  };

  const nextDonationDate = lastDonationDate
    ? moment(lastDonationDate).add(90, "days")
    : null;

  if (loadingUser) return <Loading />;

  const handleLogout = async () => {
    await logoutUser();
    toast("Logout Successful");
    router.push("/");
  };

  console.log( userData)

  const actionToAbility = async (id, availability) => {

    const updatedData = {
      ...userData,
      availability,
    };
    console.log(updatedData?.availability)
    console.log(updatedData)
    const res = await axiosSecure.patch(`/users/id/${id}`, updatedData);


    if (res.status == 200) {
      console.log("data then update " , res.data.user.availability)
      console.log("data then update " , res.data.user )
      setIsAvailable(res.data.user.availability);
      refetchUser();
      toast("Availability Updated");
    }

  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Overlay if profile incomplete */}
      {!isProfileComplete(userData) && (
        <div className="absolute inset-0 bg-black/30 z-40 flex items-center justify-center pointer-events-none"></div>
      )}

      <div className="container mx-auto px-4 py-8 pointer-events-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {name}!
          </h1>
          <p className="text-muted-foreground">
            Your contribution is making a difference in your community
          </p>
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
              <span className="text-foreground">
                {presentAddress.street}, {presentAddress.city},{" "}
                {presentAddress.district}
              </span>
            </div>

            {lastDonationDate && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Donation:</span>
                  <div className="flex flex-col">
                    <span className="text-foreground">
                      {moment(lastDonationDate).format("MMM Do YY")}
                    </span>
                    <span className="text-foreground">
                      {moment(lastDonationDate).endOf("day").fromNow()}
                    </span>
                  </div>
                </div>

                {nextDonationDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Eligible:</span>
                    <span className="text-foreground">
                      {nextDonationDate.format("MMM Do YY")}
                    </span>
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
          onClick={openEditModal}
        >
          Edit Profile
        </Button>

        {/* Availability */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                Donation Availability
              </h3>
              <p className="text-sm text-muted-foreground">
                {isAvailable
                  ? "You are currently available for donations"
                  : "You are currently unavailable"}
              </p>
            </div>
            <Button
              onClick={() => actionToAbility(userData._id, !isAvailable)}
              className={`${isAvailable
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
                }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid mask-conic-1 md:grid-cols-4 gap-6 mb-8">
          {statsData.map((Data, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border flex items-center justify-center"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`h-12 w-12 rounded-lg ${Data.bg} flex items-center justify-center`}
                >
                  <Data.icon />
                </div>
                {Data.extraIcon && <Data.extraIcon />}
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {Data.value}
              </div>
              <div className="text-sm text-muted-foreground">{Data.label}</div>
            </Card>
          ))}
        </div>

        {/* Requests */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-1/2">
            <RecentBloodRequests bloodRequests={requestForBlood} refetch={refetch} />
          </div>
          <div className="w-1/2">
            <MyBloodRequestList bloodRequests={myRequest} refetch={refetch} />
          </div>

        </div>

        {/* Logout */}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full my-6 border-border text-foreground hover:bg-secondary bg-transparent"
        >
          Logout <LogOut />
        </Button>
      </div>

      {/* Profile Incomplete */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Your profile is incomplete. Please fill in all required information to
            access full features.
          </p>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowProfileModal(false);
                openEditModal();
              }}
            >
              Complete Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Your Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Profile URL */}
            <div>
              <label className="text-sm font-medium">Profile Photo URL</label>
              <input
                type="text"
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.profile}
                onChange={(e) => updateField("profile", e.target.value)}
              />
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>

            {/* Weight */}
            <div>
              <label className="text-sm font-medium">Weight (kg)</label>
              <input
                type="number"
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.weightKg}
                onChange={(e) => updateField("weightKg", e.target.value)}
              />
            </div>
            {/* Weight */}
            <div>
              <label className="text-sm font-medium">Age</label>
              <input
                type="number"
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.age}
                onChange={(e) => updateField("age", e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.gender}
                onChange={(e) => updateField("gender", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Present Address</label>

              <input
                type="text"
                placeholder="Street"
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.presentAddress.street}
                onChange={(e) =>
                  updateNestedField("presentAddress", "street", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="City"
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.presentAddress.city}
                onChange={(e) =>
                  updateNestedField("presentAddress", "city", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="District"
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.presentAddress.district}
                onChange={(e) =>
                  updateNestedField("presentAddress", "district", e.target.value)
                }
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="text-sm font-medium">Emergency Contact Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.emergencyContact.name}
                onChange={(e) =>
                  updateNestedField("emergencyContact", "name", e.target.value)
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Emergency Contact Phone</label>
              <input
                type="text"
                className="w-full border p-2 rounded-md bg-background"
                value={editForm.emergencyContact.phone}
                onChange={(e) =>
                  updateNestedField("emergencyContact", "phone", e.target.value)
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
