import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShieldCheck } from "lucide-react";

const GrantAdmin = () => {
  const handleGrantAdmin = async () => {
    const toastId = showLoading("Granting admin privileges...");
    const { error } = await supabase.rpc('grant_admin_privileges');
    dismissToast(toastId);

    if (error) {
      showError("Failed to grant admin privileges. Please contact support.");
      console.error("RPC error:", error);
    } else {
      showSuccess("Admin privileges granted! You should now have access to admin features.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4">
        <Card className="w-full max-w-lg text-center bg-white/80">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <ShieldCheck className="h-8 w-8 text-green-600" />
              Grant Administrator Privileges
            </CardTitle>
            <CardDescription>
              This is a one-time fix to ensure your account has the correct admin permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-600">
              If you've been unable to access admin features like adding or editing products, clicking this button should resolve the issue by setting your account role to 'admin' in the database.
            </p>
            <Button onClick={handleGrantAdmin} size="lg">
              Grant Admin Privileges
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default GrantAdmin;