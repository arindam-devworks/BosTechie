import React from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * Can Component — Preparatory structure for RBAC (Role-Based Access Control)
 * Usage: <Can perform="campaign:create"> <button>Create</button> </Can>
 */
export default function Can({ perform, children, fallback = null }) {
    const { user } = useAuth();
    
    // Mock permission check (Preparatory structure)
    // In a real scenario, this would check user.permissions or user.role
    const isAllowed = (permission) => {
        if (!user) return false;
        
        // Admin has all permissions in this mock
        if (user.role === 'admin') return true;
        
        // Example logic: if permission starts with 'admin:', only admins can do it
        if (permission.startsWith('admin:') && user.role !== 'admin') return false;
        
        return true;
    };

    if (isAllowed(perform)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
}
