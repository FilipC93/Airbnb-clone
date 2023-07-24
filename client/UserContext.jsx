import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
export const UserContextProvider = ({ children }) => {
    const [ready, setReady] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
                setReady(true);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}