import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const AdminRoute = () => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4 pt-28">
          <Skeleton className="h-12 w-1/3 mb-4" />
          <Skeleton className="h-8 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};