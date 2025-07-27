import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const useAuth = () => {
    const user = { loggedIn: localStorage.getItem('token') };
    return user && user.loggedIn;
};

export const ProtectedRoutes = () => {
    return useAuth() ? <Outlet /> : <Navigate to={'/auth'} />;
};