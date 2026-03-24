import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Higher-Order Component/Wrapper to guard routes or UI blocks by user role
 * @param {Object} props
 * @param {Array<string>} props.allowedRoles e.g. ['owner', 'admin']
 * @param {boolean} [props.redirect=false] whether to redirect if unathorized
 * @param {string} [props.fallbackPath='/'] where to redirect to 
 */
export default function RoleGuard({ 
    children, 
    allowedRoles = [], 
    redirect = false, 
    fallbackPath = '/' 
}) {
    const { user, loading } = useAuth();
    
    if (loading) return null; // Avoid flashing unauthorized states

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
        if (redirect) {
            return <Navigate to={fallbackPath} replace />;
        }
        return null; // Don't render component at all
    }

    return <>{children}</>;
}
