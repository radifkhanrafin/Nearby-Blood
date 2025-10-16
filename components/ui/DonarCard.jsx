

import { Badge, Droplet, Mail, MapPin, Phone, User } from "lucide-react";
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
            className="flex items-center w-[500px] gap-4 p-4 bg-background border border-border rounded-2xl hover:shadow-md hover:border-primary/50 transition-all cursor-pointer"
        >
            {/* Profile Image */}
            <div className="w-16 h-16 rounded-full overflow-hidden border border-primary/20">
                <img
                    src={profile || "/default-avatar.png"}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Donor Info */}
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{name}</h3>
                    {availability ? (
                        <Badge className="bg-green-500 text-white text-xs">Available</Badge>
                    ) : (
                        <Badge className="bg-gray-400 text-white text-xs">Unavailable</Badge>
                    )}
                </div>

                <div className="text-sm text-muted-foreground mt-1 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                        <User className="w-4 h-4" /> {gender}, {age} yrs
                    </div>
                    <div className="flex items-center gap-1">
                        {/* <MapPin className="w-4 h-4" /> {presentAddress || "Not provided"} */}
                    </div>
                    <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" /> {phone}
                    </div>
                    <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" /> {email}
                    </div>
                </div>
            </div>

            {/* Blood Group */}
            <div className="flex flex-col items-center justify-center">
                <Badge variant="outline" className="border-primary text-primary text-lg px-3 py-1">
                    <Droplet className="w-4 h-4 inline-block mr-1" />
                    {bloodGroup}
                </Badge>
                {lastDonationDate && (
                    <span className="text-xs text-muted-foreground mt-1">
                        Last: {moment(lastDonationDate).format("MMM Do YY")}  
                    </span>
                )}
            </div>
        </Card>
    );
};

export default DonarCard;