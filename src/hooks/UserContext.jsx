import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [username, setUsername] = useState(() => localStorage.getItem('username') || '');

    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}
