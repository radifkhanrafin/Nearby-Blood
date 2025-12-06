'use client'

import { Card } from "./ui/card";

const Donar_Tips = () => {
    return (
        <section id="donor-tips" className="container mx-auto px-4 py-20 bg-card/10 rounded-xl border border-border">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Tips for Blood Donors</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Ensure a safe and effective donation experience with these simple guidelines.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Stay Hydrated</h3>
                    <p>Drink plenty of water before and after donating blood to maintain healthy circulation.</p>
                </Card>
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Eat Well</h3>
                    <p>Have a light meal rich in iron and avoid fatty foods before donation.</p>
                </Card>
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Rest & Relax</h3>
                    <p>Take some rest after donating to ensure your body recovers quickly.</p>
                </Card>
            </div>
        </section>
    );
};

export default Donar_Tips;