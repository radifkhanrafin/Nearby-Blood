"use client";

import { useEffect, useState } from "react";
import { onAuthUserChanged } from "../lib/firebaseAuth.ts";
import useAxiosSecure from "../lib/axios.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useCurrentUser = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [currentUser, setCurrentUser] = useState(null);

  // 🔥 Listen to Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthUserChanged((user) => {
      setCurrentUser(user);

      // Auto-refetch when auth state changes
      queryClient.invalidateQueries(["currentUserData"]);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Fetch user info using React Query
  const {
    data: userData,
    error,
    isLoading,
    isFetching,
    refetch, // ⭐ REFETCH ADDED HERE
  } = useQuery({
    queryKey: ["currentUserData", currentUser?.email],
    enabled: !!currentUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${currentUser.email}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    currentUser,
    userData,
    loadingUser: isLoading || isFetching,
    error,
    refetchUser:refetch,  
  };
};

export default useCurrentUser;
