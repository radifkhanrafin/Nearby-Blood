'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Droplet, Bell } from "lucide-react" 
import { useUser } from "@/hooks/UserContext"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter() 
  const { userData, loading } = useUser();

  // console.log("userData from header",userData)
  // Profile click handler
  const goToDashboard = () => {
    router.push("/donor/dashboard")
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Droplet className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Nearby Blood</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-foreground font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          {/* <Link href="/donate-blood" className="text-muted-foreground hover:text-primary transition-colors">
            Donate Blood
          </Link> */}
          <Link href="/find-donar" className="text-muted-foreground hover:text-primary transition-colors">
            Find Donor
          </Link>
          <Link
            href={userData ? "/request-blood" : "/login"}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Request For Blood
          </Link>
          {
            !userData && <Link href="/become-donor" className="text-muted-foreground hover:text-primary transition-colors">
              Become a Donor
            </Link>
          }
          <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>

          {/* Profile Button   */}


          <div className="relative inline-block">
            {
              userData == null ? <Link href='/login' > Login</Link> : <button
                onClick={goToDashboard}
                className="h-10 w-10 bg-primary/20 text-primary flex items-center justify-center rounded-full"
              >
                <img className="h-12 w-16 object-cover rounded-full" src={userData?.profile} alt="profile" />
              </button>
            }


          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
