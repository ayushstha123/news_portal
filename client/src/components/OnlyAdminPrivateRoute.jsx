import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin=currentUser&& currentUser.role==='admin';
  const isJournalist=currentUser&& currentUser.role==='journalist'
  return (isAdmin || isJournalist) ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  );
}
