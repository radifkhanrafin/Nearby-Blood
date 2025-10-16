'use client'

import { useState, useEffect } from "react";
import { onAuthUserChanged } from "../lib/firebaseAuth.ts";
import useAxiosSecure from "../lib/axios.js";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // MongoDB data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const unsubscribe = onAuthUserChanged(async (user) => {
      setCurrentUser(user);

      if (user?.email) {
        setLoading(true);
        try {
          const res = await axiosSecure.get(`/users/email/${user.email}`);
          setUserData(res.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, userData, loading, error };
};

export default useCurrentUser;
