import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

export const AdminRoute = () => {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-8 w-1/4 mb-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};