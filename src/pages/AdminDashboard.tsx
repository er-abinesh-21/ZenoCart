import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Welcome to the admin dashboard. Product management features will be added here soon.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;