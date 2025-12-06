'use client'

import { Bell, MapPin, Zap } from "lucide-react";
import { Card } from "./ui/card";

 
const Features = () => {
    return (
        <section id="features" className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Powerful Features for Life-Saving Connections</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Our AI-driven platform provides everything you need to connect donors with patients efficiently and safely.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature Cards */}
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Matching</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Smart algorithm matches patients with the nearest compatible donors based on blood type, location, and
                        availability.
                    </p>
                </Card>

                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Real-Time Donor Map</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Interactive map showing available donors in your area with live updates and distance calculations.
                    </p>
                </Card>

                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                        <Bell className="h-6 w-6 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Emergency SOS</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        One-click emergency button instantly alerts nearby donors and hospitals for urgent blood requests.
                    </p>
                </Card>
            </div>
        </section>
    );
};

export default Features;