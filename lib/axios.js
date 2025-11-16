import { useEffect } from "react";
import axios from "axios";

// Create a singleton Axios instance
const axiosSecure = axios.create({
    baseURL: "http://localhost:3000/api",
    // baseURL: "https://nearby-blood.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to attach interceptors
const setupInterceptors = () => {
    // Request interceptor to add token
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor for handling errors globally
    axiosSecure.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                console.warn("Unauthorized! Token may have expired.");
            }
            return Promise.reject(error);
        }
    );
};

// Custom hook
const useAxiosSecure = () => {
    useEffect(() => {
        setupInterceptors();
    }, []);

    return axiosSecure;
};

export default useAxiosSecure;
