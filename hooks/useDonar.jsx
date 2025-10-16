'use client'

import { useEffect, useState } from "react";
import useAxiosSecure from "../lib/axios";
export function useDonar() {
    const axiosSecure = useAxiosSecure();
    const [donars, setDonars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchDonar = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get("/users");  
                // Extract only names
                const donar = response.data;
                setDonars(donar);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDonar();
    }, []);

    return { donars, loading, error };
}
