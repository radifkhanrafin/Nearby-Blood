import { Badge, Droplet, Mail, MapPin, Phone, User, Heart, Clipboard, Calendar } from "lucide-react";
import { Card } from "../ui/card";
import moment from "moment";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/lib/axios";
import { useUser } from "@/hooks/UserContext";
import { toast } from "react-toastify";
import { useBloodRequest } from "@/hooks/useBloodRequest";

const DonarCard = ({ donar, refetch, requestSent }) => {

  const { userData } = useUser();

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
    availability,
    medicalHistory,
    registrationId,
    emergencyContact,
    presentAddress,
    _id
  } = donar;

  const axiosSecure = useAxiosSecure();

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("disabledDonors")) || {};
    const expiry = saved[_id];

    if (expiry && Date.now() < expiry) {
      setDisabled(true);
    } else if (expiry && Date.now() > expiry) {
      // clear expired
      delete saved[_id];
      localStorage.setItem("disabledDonors", JSON.stringify(saved));
    }
  }, [_id]);

  const disableFor10Minutes = () => {
    const expiry = Date.now() + 600000; // 10 min
    const saved = JSON.parse(localStorage.getItem("disabledDonors")) || {};

    saved[_id] = expiry;

    localStorage.setItem("disabledDonors", JSON.stringify(saved));
    setDisabled(true);
  };

  // ========= MODAL STATES =========
  const [patientProblem, setPatientProblem] = useState("");
  const [needDate, setNeedDate] = useState("");
  const [needTime, setNeedTime] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState("");

  // ========= SEND REQUEST FUNCTION =========
  const handleSendRequest = async () => {
    const newRequest = {
      requestReceiver: donar,
      patientProblem,
      needDate,
      needTime,
      location,
      contactNumber,
      message,
      requestStatus: "pending",
      requestSender: userData
    };

    const result = await axiosSecure.post('/blood', { newRequest });

    if (result.status == 201) {
      refetch();
      toast.success("Your Request Sent Successfully", {
        autoClose: 1500,
      });

      // disable for 10 minutes
      disableFor10Minutes();
    }
  };

  return (
    <Card
      key={registrationId}
      className="flex flex-col w-full gap-4 p-4 bg-background border border-border rounded-2xl hover:shadow-md hover:border-primary/50 transition-all"
    >
      {/* Top section */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border border-primary/20">
          <img
            src={profile || "/default-avatar.png"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground">
            {name} <sup className="text-sm">{bloodGroup}</sup>
          </h3>
          <div className="flex gap-2 mt-1">
            {availability ? (
              <Badge className="bg-green-500 text-white text-xs">Available</Badge>
            ) : (
              <Badge className="bg-gray-400 text-white text-xs">Unavailable</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" /> {gender}, {age} yrs
        </div>
        <div className="flex items-center gap-1">
          <Clipboard className="w-4 h-4" /> ID: {registrationId}
        </div>
        <div className="flex items-center gap-1">
          <Phone className="w-4 h-4" /> {phone}
        </div>
        <div className="flex items-center gap-1">
          <Mail className="w-4 h-4" /> {email}
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4" /> Weight: {weightKg} kg
        </div>
        {lastDonationDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Last Donation:{" "}
            {moment(lastDonationDate).format("MMM Do YY")}
          </div>
        )}
      </div>

      {/* Address */}
      <div className="text-sm text-muted-foreground">
        <div className="flex items-start gap-1">
          <MapPin className="w-4 h-4 mt-1" />
          <div>
            <strong>Present Address:</strong> {presentAddress?.street},{" "}
            {presentAddress?.city}, {presentAddress?.district},{" "}
            {presentAddress?.postalCode}, {presentAddress?.country}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      {emergencyContact && (
        <div className="text-sm text-muted-foreground">
          <strong>Emergency Contact:</strong> {emergencyContact.name} (
          {emergencyContact.relation}) - {emergencyContact.phone}
        </div>
      )}

      {/* Blood Group Badge + Send Request Button */}
      <div className="flex items-center justify-between mt-2">
        <Badge
          variant="outline"
          className="border-primary text-primary text-lg px-3 py-1 flex items-center gap-1"
        >
          <Droplet className="w-4 h-4" /> {bloodGroup}
        </Badge>

        {/* Send Request Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={disabled}
              className={`text-white ${disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
                }`}
            >
              {disabled ? "Already Request" : "Send Request"}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send a Request to {name}</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-3">

              <input
                type="text"
                placeholder="Patient problem "
                className="border p-2 rounded-md"
                value={patientProblem}
                onChange={(e) => setPatientProblem(e.target.value)}
              />

              <div className="flex flex-col">
                <label className="text-sm text-muted-foreground">Date needed (তারিখ)</label>
                <input
                  type="date"
                  className="border p-2 rounded-md"
                  value={needDate}
                  onChange={(e) => setNeedDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-muted-foreground">Time needed  </label>
                <input
                  type="time"
                  className="border p-2 rounded-md"
                  value={needTime}
                  onChange={(e) => setNeedTime(e.target.value)}
                />
              </div>
              <label className="text-sm text-muted-foreground" htmlFor="location"> Blood Donation Location or Hospital</label>
              <input
                type="text"
                id="location"
                placeholder="Hospital / Location "
                className="border p-2 rounded-md"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label className="text-sm text-muted-foreground" htmlFor="number">Patient / Relative Phone Number</label>
              <input
                id="number"
                type="number"
                placeholder="+88 01000 000000"
                className="border p-2 rounded-md"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />

              <Textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

            </div>

            <DialogFooter>

              <Button
                onClick={handleSendRequest}
                disabled={disabled}
                className={`text-white ${disabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
                  }`}
              >
                {disabled ? "Already Request" : "Send Request"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default DonarCard;
