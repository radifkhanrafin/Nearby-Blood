import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Droplet, MapPin, Award, Bell, Users, Heart, Zap, Shield } from "lucide-react" 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
  <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BloodSync</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-foreground">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-sm text-primary font-medium">AI-Powered Blood Matching</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Save Lives in Real-Time with BloodSync
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Connect blood and plasma donors with patients instantly. Our AI-powered platform matches donors based on
            location, blood type, and availability—reducing emergency response time when every second counts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                Find Donors Now
              </Button>
            </Link>
            <Link href="/donor-map">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                View Donor Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Active Donors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{"<"}5min</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Lives Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Match Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Powerful Features for Life-Saving Connections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our AI-driven platform provides everything you need to connect donors with patients efficiently and safely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-chart-3" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Rewards System</h3>
            <p className="text-muted-foreground leading-relaxed">
              Earn points and badges for donations. Compete on leaderboards and get recognized for saving lives.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-chart-4" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Hospital Integration</h3>
            <p className="text-muted-foreground leading-relaxed">
              Seamless integration with hospitals and blood banks for verified requests and coordinated care.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-chart-5/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-chart-5" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Verified Profiles</h3>
            <p className="text-muted-foreground leading-relaxed">
              All donors and patients are verified with complete donation history and health screening records.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-card/30 border-y border-border py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">How BloodSync Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Three simple steps to connect donors with patients in emergencies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Create Profile</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sign up as a donor or patient. Add your blood type, location, and availability preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">AI Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our AI instantly finds the best donor matches based on compatibility, distance, and availability.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-chart-3 text-card flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Connect & Save</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get instant notifications, coordinate with donors, and save lives in your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20 p-12 text-center">
          <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of donors and patients using BloodSync to save lives every day. Your contribution matters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup?type=donor">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                Become a Donor
              </Button>
            </Link>
            <Link href="/signup?type=patient">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                Find Donors
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
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
    </div>
  )
}
