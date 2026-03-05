import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check token and fetch user on load
        const token = localStorage.getItem('token');
        if (token) {
            // In a real app, verify token or fetch user profile from API here
            // For now, fake user info if token exists
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({ email: payload.email || 'admin@demo.com', name: payload.name || 'Admin', ...payload });
            } catch (e) {
                setUser({ email: 'admin@demo.com', name: 'Admin User' });
            }
        }
        setLoading(false);
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
