"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Droplet, MapPin, Award, Bell, Users, Heart, Zap, Shield } from "lucide-react"
import CTA from "../components/CTA";
import Hero from "../components/Hero";
import States from "../components/States";
import Features from "../components/Features";
import Donar_Tips from "../components/Donar_Tips";
import Blood_Type from "../components/Blood_Type";
import Testimonials from "../components/Testimonials";
import BenefitsBloodDonation from "../components/BenefitsBloodDonation";
import WhyDonateBlood from "../components/WhyDonateBlood";
import MotivationalQuotes from "../components/MotivationalQuotes";
import BloodDonationRules from "../components/BloodDonationRules";



export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />
      {/* New Section: Donor Tips */}

      <Donar_Tips />
      <BloodDonationRules />
      {/* New Section: Blood Types */}
      <Blood_Type />

      <BenefitsBloodDonation />

      <WhyDonateBlood />
      <MotivationalQuotes />
      {/* Stats Section */}
      <States />




      {/* New Section: Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />

    </div>
  )
}

// Step Component for How It Works
function Step({ number, color, title, description }) {
  return (
    <div className="text-center">
      <div className={`h-16 w-16 rounded-full ${color} flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
        {number}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
