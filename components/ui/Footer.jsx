import { Droplet } from 'lucide-react';
import React from 'react';
import Link from "next/link"
const Footer = () => {
    return (
        <footer className="border-t border-border bg-card/50">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Droplet className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold text-foreground">BloodSync</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            AI-powered platform connecting blood donors with patients in real-time.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#features" className="hover:text-foreground transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/donor-map" className="hover:text-foreground transition-colors">
                                    Donor Map
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#about" className="hover:text-foreground transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Security
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    <p>© 2025 BloodSync. All rights reserved. Saving lives through technology.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;