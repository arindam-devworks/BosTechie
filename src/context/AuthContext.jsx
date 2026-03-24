import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [activeTenant, setActiveTenant] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(async () => {
        setUser(null);
        setActiveTenant(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    }, []);

    const login = useCallback(async (email, password) => {
        const mockAccessToken = 'mock_access_token';
        localStorage.setItem('access_token', mockAccessToken);
        const mockUser = { id: 'usr_mock', email: email || 'admin@demo.com', name: 'Admin', role: 'owner' };
        setUser(mockUser);
        setActiveTenant({ name: 'BosTechie Orbit', plan: 'Enterprise' });
    }, []);

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('access_token');
            const oldToken = localStorage.getItem('orbit_access_token') || localStorage.getItem('token');
            if (oldToken && !token) {
                localStorage.setItem('access_token', oldToken);
                localStorage.removeItem('orbit_access_token');
            }

            const activeToken = localStorage.getItem('access_token');

            if (activeToken) {
                setUser({ id: 'usr_mock', email: 'admin@demo.com', name: 'Admin', role: 'owner' });
                setActiveTenant({ name: 'BosTechie Orbit', plan: 'Enterprise' });
            }
            setLoading(false);
        };

        checkSession();
    }, [logout]);

    const verifySession = useCallback(() => {
        return !!localStorage.getItem('access_token');
    }, []);

    return (
        <AuthContext.Provider value={{ user, activeTenant, login, logout, isAuthenticated: !!user, loading, verifySession }}>
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
