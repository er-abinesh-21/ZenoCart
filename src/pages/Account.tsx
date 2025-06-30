import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { showSuccess, showError } from "@/utils/toast";
import { useEffect } from "react";

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(50),
  last_name: z.string().min(1, "Last name is required").max(50),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Account = () => {
  const { user, profile, refreshProfile } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      });
    }
  }, [profile, form]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: values.first_name,
        last_name: values.last_name,
      })
      .eq("id", user.id);

    if (error) {
      showError("Failed to update profile.");
      console.error("Error updating profile:", error);
    } else {
      showSuccess("Profile updated successfully!");
      await refreshProfile();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle>My Account</CardTitle>
            <CardDescription>Manage your account and profile details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Email</Label>
              <p className="text-gray-700 mt-1">{user?.email}</p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </Form>
            <Button onClick={handleSignOut} variant="outline" className="w-full">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Account;