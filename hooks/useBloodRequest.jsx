'use client'

import { useEffect, useState } from "react";
import useAxiosSecure from "../lib/axios";
export function useBloodRequest() {
    const axiosSecure = useAxiosSecure();
    const [bloodRequest, setBloodRequest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchBloodRequest = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get("/blood");  
                // Extract only names
                const Request = response.data;
                setBloodRequest(Request);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBloodRequest();
    }, []);

    return { bloodRequest, loading, error };
}
