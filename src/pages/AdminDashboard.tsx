import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, ShoppingBag, ListOrdered } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="h-10 w-10 text-gray-800" />
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/admin/products" className="block outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg">
              <Card className="bg-white/80 hover:bg-white transition-colors h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <ShoppingBag className="h-6 w-6" />
                    Product Management
                  </CardTitle>
                  <CardDescription>Add, edit, and delete products from the store.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-600 font-semibold">Go to Products &rarr;</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/admin/orders" className="block outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg">
              <Card className="bg-white/80 hover:bg-white transition-colors h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <ListOrdered className="h-6 w-6" />
                    Order Management
                  </CardTitle>
                  <CardDescription>View and manage all customer orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-600 font-semibold">Go to Orders &rarr;</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;