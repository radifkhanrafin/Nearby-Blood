'use client'

import { createContext, useContext } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";   // ✅ FIXED PATH

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const userState = useCurrentUser();  // shared global state
  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
