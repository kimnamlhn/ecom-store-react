import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdminRightNeeded?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdminRightNeeded = false }) => {
  const { user } = useUserContext(); 
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setRedirectTo('/login');
    }
     else if (isAdminRightNeeded && !user.isAdmin) {
      setRedirectTo('/');
    }
  }, [user, isAdminRightNeeded]);

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  // Return children if everything is okay
  return <>{children}</>;
};

export default ProtectedRoute;
