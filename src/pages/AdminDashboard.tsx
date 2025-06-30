import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const isRootAdmin = location.pathname === '/admin' || location.pathname === '/admin/';

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/50 backdrop-blur-lg border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
              <CardDescription>Manage your store's products, orders, and users.</CardDescription>
            </CardHeader>
            <CardContent>
              {isRootAdmin ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manage Products</CardTitle>
                      <CardDescription>Add, edit, and delete products from your store.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <Link to="/admin/products">Go to Products</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>View Orders</CardTitle>
                      <CardDescription>Review and manage customer orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Button asChild>
                        <Link to="/admin/orders">Go to Orders</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Outlet />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;