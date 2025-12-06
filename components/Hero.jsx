'use client'  
import Link from 'next/link';
import { Button } from './ui/button';

const Hero = () => {
    return (
        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
            <div className="max-w-4xl mx-auto">
                <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-sm text-primary font-medium">AI-Powered Blood Matching</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                    Save Lives in Real-Time with BloodSync
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    Connect blood and plasma donors with patients instantly. Our AI-powered platform matches donors based on
                    location, blood type, and availability—reducing emergency response time when every second counts.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/find-donar">
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4">
                            Find Donors Now
                        </Button>
                    </Link>
                    <Link href="/#">
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 py-4 border-border text-foreground hover:bg-secondary bg-transparent"
                        >
                            View Donor Map
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;