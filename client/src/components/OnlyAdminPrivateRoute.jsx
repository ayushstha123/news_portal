import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const OnlyAdminPrivateRoute = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const isAdmin = currentUser && currentUser.role === 'admin';

    return (
        <div>
            {isAdmin ? <Outlet /> : <Navigate to='/signin' />}
        </div>
    );
}

export default OnlyAdminPrivateRoute;
