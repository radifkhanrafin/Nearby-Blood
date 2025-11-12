import { Badge, Droplet, Mail, MapPin, Phone, User, Heart, Clipboard, Calendar, Users } from "lucide-react";
import { Card } from "../ui/card";
import moment from "moment";

const DonarCard = ({ donar }) => {
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
  } = donar;

  return (
    <Card
      key={registrationId}
      className="flex flex-col w-full gap-4 p-4 bg-background border border-border rounded-2xl hover:shadow-md hover:border-primary/50 transition-all"
    >
      {/* Top section: profile + name + availability */}
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
            {/* {isDonor && (
              <Badge className="bg-red-500 text-white text-xs">Donor</Badge>
            )} */}
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
            <Calendar className="w-4 h-4" /> Last Donation: {moment(lastDonationDate).format("MMM Do YY")}
          </div>
        )}
      </div>

      {/* Addresses */}
      <div className="text-sm text-muted-foreground">
        <div className="flex items-start gap-1">
          <MapPin className="w-4 h-4 mt-1" />
          <div>
            <strong>Present Address:</strong> {presentAddress?.street}, {presentAddress?.city}, {presentAddress?.district}, {presentAddress?.postalCode}, {presentAddress?.country}
          </div>
        </div>
        {/* <div className="flex items-start gap-1 mt-1">
          <MapPin className="w-4 h-4 mt-1" />
          <div>
            <strong>Permanent Address:</strong> {permanentAddress?.street}, {permanentAddress?.city}, {permanentAddress?.district}, {permanentAddress?.postalCode}, {permanentAddress?.country}
          </div>
        </div> */}
      </div>

      {/* Medical History */}
      {medicalHistory && (
        <div className="text-sm text-muted-foreground">
          <strong>Medical History:</strong> {medicalHistory}
        </div>
      )}

      {/* Emergency Contact */}
      {emergencyContact && (
        <div className="text-sm text-muted-foreground">
          <strong>Emergency Contact:</strong> {emergencyContact.name} ({emergencyContact.relation}) - {emergencyContact.phone}
        </div>
      )}

      {/* Blood Group Badge */}
      <div className="flex items-center justify-end mt-2">
        <Badge variant="outline" className="border-primary text-primary text-lg px-3 py-1 flex items-center gap-1">
          <Droplet className="w-4 h-4" /> {bloodGroup}
        </Badge>
      </div>
    </Card>
  );
};

export default DonarCard;
