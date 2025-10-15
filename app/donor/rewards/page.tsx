"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Droplet, Award, Trophy, Star, Gift, TrendingUp, Crown, Medal } from "lucide-react"

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BloodSync</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/donor/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/donor-map" className="text-muted-foreground hover:text-foreground transition-colors">
              Map
            </Link>
            <Link href="/donor/history" className="text-muted-foreground hover:text-foreground transition-colors">
              History
            </Link>
            <Link href="/donor/rewards" className="text-foreground font-medium">
              Rewards
            </Link>
          </nav>
          <Avatar className="h-10 w-10 bg-primary/20 text-primary flex items-center justify-center">
            <span className="text-sm font-semibold">JD</span>
          </Avatar>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Rewards & Achievements</h1>
          <p className="text-muted-foreground">Track your progress and earn rewards for saving lives</p>
        </div>

        {/* Points Overview */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">2,450 Points</h2>
              <p className="text-muted-foreground">550 points until next reward tier</p>
            </div>
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
          </div>
          <Progress value={82} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Gold Tier</span>
            <span>Platinum Tier (3,000 pts)</span>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <Card className="lg:col-span-2 p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Community Leaderboard</h3>
              <Button
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-secondary bg-transparent"
              >
                This Month
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { rank: 1, name: "Sarah Johnson", points: 4850, donations: 28, badge: "platinum" },
                { rank: 2, name: "Michael Chen", points: 4120, donations: 24, badge: "platinum" },
                { rank: 3, name: "Emily Davis", points: 3890, donations: 22, badge: "gold" },
                { rank: 4, name: "You (John Doe)", points: 2450, donations: 12, badge: "gold", isUser: true },
                { rank: 5, name: "David Martinez", points: 2180, donations: 11, badge: "gold" },
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    user.isUser ? "bg-primary/10 border-primary/30" : "bg-background border-border"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1
                          ? "bg-chart-4 text-card"
                          : user.rank === 2
                            ? "bg-muted text-foreground"
                            : user.rank === 3
                              ? "bg-chart-5/30 text-chart-5"
                              : "bg-secondary text-foreground"
                      }`}
                    >
                      {user.rank === 1 ? (
                        <Crown className="h-5 w-5" />
                      ) : user.rank === 2 ? (
                        <Medal className="h-5 w-5" />
                      ) : user.rank === 3 ? (
                        <Award className="h-5 w-5" />
                      ) : (
                        `#${user.rank}`
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.donations} donations</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">{user.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Award,
                    name: "10 Donations",
                    desc: "Completed 10 donations",
                    color: "text-chart-4",
                    bg: "bg-chart-4/20",
                  },
                  {
                    icon: Star,
                    name: "Quick Responder",
                    desc: "Responded in under 5 min",
                    color: "text-accent",
                    bg: "bg-accent/20",
                  },
                  {
                    icon: TrendingUp,
                    name: "Consistent Donor",
                    desc: "3 months streak",
                    color: "text-chart-3",
                    bg: "bg-chart-3/20",
                  },
                ].map((achievement, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-lg ${achievement.bg} flex items-center justify-center`}>
                      <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground">{achievement.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Available Rewards</h3>
              <div className="space-y-3">
                {[
                  { name: "$10 Gift Card", points: 1000, available: true },
                  { name: "Premium Badge", points: 2000, available: true },
                  { name: "$25 Gift Card", points: 3000, available: false },
                ].map((reward, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-foreground">{reward.name}</div>
                        <div className="text-xs text-muted-foreground">{reward.points} points</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={reward.available ? "default" : "ghost"}
                      disabled={!reward.available}
                      className={
                        reward.available
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "text-muted-foreground"
                      }
                    >
                      {reward.available ? "Claim" : "Locked"}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Earn More Points</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Complete donations and respond quickly to earn bonus points
              </p>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                View Opportunities
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
