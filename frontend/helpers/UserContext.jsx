"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ url, children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!url) {
            console.log("No server URL provided");
            return;
        }
        axios
            .get(`/api/auth/status`,{}, { withCredentials: true })
            .then((res) => {
                setUser(res.data.data.user);
            })
            .catch((err) => {
                setUser(null);
            });
    }, [url]);

    const logout = async (onSuccess) => {
        try {
            await axios.post(
                `${url}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
        } catch (err) {
            console.error(err);
        } finally {
            setUser(null);
            onSuccess();
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, url, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// 🔥 Custom hook
export const useUser = () => {
    return useContext(UserContext);
};
