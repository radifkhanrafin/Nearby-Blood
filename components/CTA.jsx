'use client'
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import useCurrentUser from '@/hooks/useCurrentUser';



const CTA = () => {

    const { userData } = useCurrentUser();

    return (
        <div>
            <section className="container mx-auto px-4 py-20">
                <Card className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20 p-12 text-center">
                    <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Ready to Make a Difference?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of donors and patients using BloodSync to save lives every day. Your contribution matters.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={userData ? '/donor/dashboard' : '/signup'}>
                            <Button
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4"
                            >
                                {userData ? 'Go to Dashboard' : 'Become a Donor'}
                            </Button>
                        </Link>
                        <Link href="/find-donar">
                            <Button size="lg" variant="outline" className="text-lg px-8 border-border text-foreground hover:bg-secondary bg-transparent">
                                Find Donors
                            </Button>
                        </Link>
                    </div>
                </Card>
            </section>
        </div>
    );
};

export default CTA;