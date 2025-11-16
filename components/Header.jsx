'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Droplet, Bell, Menu, X } from "lucide-react"  
import useCurrentUser from "@/hooks/useCurrentUser"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter() 
  const pathname = usePathname()  
const { userData, loadingUser,refetchUser } = useCurrentUser()

  const goToDashboard = () => {
    router.push("/donor/dashboard")
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Find Donor", href: "/find-donar" },
    { name: "Request For Blood", href: userData ? "/request-blood" : "/login" },
    { name: "Profile", href: userData ? "/donor/dashboard" : "/login" },
  ];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Droplet className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Nearby Blood</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-colors ${
                pathname === link.href
                  ? "text-red-500" // Active link
                  : link.name === "Home"
                    ? "text-foreground hover:text-primary"
                    : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>

          <div className="relative hidden md:inline-block">
            {userData == null ? (
              <Link href='/login'>Login</Link>
            ) : (
              <button
                onClick={goToDashboard}
                className="h-10 w-10 bg-primary/20 text-primary flex items-center justify-center rounded-full"
              >
                <img className="h-12 w-16 cursor-pointer object-cover rounded-full" src={userData?.profile} alt="profile" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-card/95 backdrop-blur-lg border-t border-border overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <nav className="flex flex-col gap-3 px-4">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-2 rounded-md font-medium transition-colors ${
                pathname === link.href
                  ? "text-red-500 bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/20"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
