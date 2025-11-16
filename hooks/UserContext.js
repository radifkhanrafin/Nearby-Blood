'use client'

import { createContext, useContext } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";   
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const userState = useCurrentUser();   
  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
