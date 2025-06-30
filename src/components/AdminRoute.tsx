import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { Skeleton } from './ui/skeleton';

export const AdminRoute = () => {
  const { isAdmin, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-8 w-1/4 mb-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};