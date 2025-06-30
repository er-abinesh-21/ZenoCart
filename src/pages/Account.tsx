import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Account = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle>My Account</CardTitle>
            <CardDescription>Manage your account details and view your orders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-700">{user?.email}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <Link to="/order-history">View Order History</Link>
              </Button>
              <Button onClick={handleSignOut} variant="secondary">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Account;