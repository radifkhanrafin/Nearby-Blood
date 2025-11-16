'use client'
 
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import useCurrentUser from "@/hooks/useCurrentUser"

 

const ProfileUpdateModal = () => {
  const { userData } = useCurrentUser()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (userData) {
      const modalKey = `profileModalShown_${userData.id}`

      const alreadyShown = localStorage.getItem(modalKey)

      if (!alreadyShown) { 
        setShowModal(true)
        localStorage.setItem(modalKey, "true")
      }
    }
  }, [userData])

  useEffect(() => {
    if (showModal) { 
      const timer = setTimeout(() => setShowModal(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showModal])

  if (!showModal) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Update Your Profile</h2>
        <p className="mb-4">Please complete your profile information to continue using our services.</p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => window.location.href = "/profile/update"}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Update Now
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowModal(false)}
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdateModal
