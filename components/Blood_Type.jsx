'use client'
import { Card } from "./ui/card";
const Blood_Type = () => {
    return (
        <section id="blood-types" className="container mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blood Types & Compatibility</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Know which blood types can donate to whom and ensure safe transfusions.
                </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-semibold text-foreground mb-2">O+</h3>
                    <p>Can donate to: O+, A+, B+, AB+ | Can receive from: O+, O-</p>
                </Card>
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-semibold text-foreground mb-2">O-</h3>
                    <p>Universal donor. Can receive from: O- only.</p>
                </Card>
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-semibold text-foreground mb-2">A+</h3>
                    <p>Can donate to: A+, AB+ | Can receive from: A+, A-, O+, O-</p>
                </Card>
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-semibold text-foreground mb-2">B+</h3>
                    <p>Can donate to: B+, AB+ | Can receive from: B+, B-, O+, O-</p>
                </Card>
            </div>
        </section>
    );
};

export default Blood_Type;