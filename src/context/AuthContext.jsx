import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
    }, []);

    const login = useCallback((token, userData) => {
        localStorage.setItem('token', token);
        setUser(userData);
    }, []);

    useEffect(() => {
        // Check token and fetch user on load
        const checkSession = () => {
            console.log('Auth: Initializing session check...');
            const token = localStorage.getItem('token');
            if (token) {
                console.log('Auth: Token discovered, attempting decode...');
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    console.log('Auth: Token payload:', payload);
                    // Check if expired
                    if (payload.exp && Date.now() >= payload.exp * 1000) {
                        console.warn('Auth: Session expired. Logging out...');
                        logout();
                        setLoading(false);
                        const isLoginPage = window.location.pathname === '/login';
                        if (!isLoginPage) {
                            window.location.href = '/login?expired=true';
                        }
                        return;
                    }
                    setUser({ email: payload.email || 'admin@demo.com', name: payload.name || 'Admin', ...payload });
                } catch (e) {
                    console.error('Auth: Token decode failed:', e);
                    setUser({ email: 'admin@demo.com', name: 'Admin User' });
                }
            }
            console.log('Auth: Loading complete.');
            setLoading(false);
        };

        checkSession();
        // Periodical check every minute
        const interval = setInterval(checkSession, 60000);
        return () => clearInterval(interval);
    }, [logout]);

    const verifySession = useCallback(() => {
        const token = localStorage.getItem('token');
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp && Date.now() >= payload.exp * 1000) {
                logout();
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading, verifySession }}>
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
