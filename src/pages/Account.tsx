import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "@/utils/toast";
import { Skeleton } from "@/components/ui/skeleton";

const profileFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Account = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email || "");
      setIsLoading(true);
      supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", user.id)
        .single()
        .then(({ data, error }) => {
          if (error && error.code !== 'PGRST116') { // PGRST116: single row not found, which is fine
            console.error("Error fetching profile", error);
            showError("Could not load your profile.");
          }
          if (data) {
            form.reset({
              ...form.getValues(),
              first_name: data.first_name || "",
              last_name: data.last_name || "",
            });
          }
          setIsLoading(false);
        });
    }
  }, [user, form]);

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
      console.error(error);
    } else {
      showSuccess("Profile updated successfully!");
    }
  };

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
            <CardDescription>Manage your account details and profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your first name" {...field} />
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
                          <Input placeholder="Your last name" {...field} />
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
            )}
            <Button variant="outline" onClick={handleSignOut} className="w-full">
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