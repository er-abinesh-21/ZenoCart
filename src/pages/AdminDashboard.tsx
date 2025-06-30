import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
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
              <p className="text-lg">Welcome, Admin!</p>
              <p className="mt-4 text-gray-600">The product management interface will be built here next.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;