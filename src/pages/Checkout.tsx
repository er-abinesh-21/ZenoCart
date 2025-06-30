import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate, Link } from "react-router-dom";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const shippingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

const Checkout = () => {
  const { cartItems, totalPrice, clearCart, isLoading: isCartLoading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { name: "", address: "", city: "", postalCode: "", country: "" },
  });

  useEffect(() => {
    const fetchProfileForCheckout = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        form.reset({
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          address: data.address || "",
          city: data.city || "",
          postalCode: data.postal_code || "",
          country: data.country || "",
        });
      }
    };
    fetchProfileForCheckout();
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof shippingSchema>) => {
    if (!user || cartItems.length === 0) {
      showError("An error occurred. Please try again.");
      return;
    }

    const toastId = showLoading("Placing your order...");

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_price: totalPrice,
        shipping_name: values.name,
        shipping_address: values.address,
        shipping_city: values.city,
        shipping_postal_code: values.postalCode,
        shipping_country: values.country,
      })
      .select()
      .single();

    if (orderError || !orderData) {
      dismissToast(toastId);
      showError("Could not create your order. Please try again.");
      console.error("Order creation error:", orderError);
      return;
    }

    const orderItems = cartItems.map(item => ({
      order_id: orderData.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      dismissToast(toastId);
      showError("Could not save order items. Please contact support.");
      console.error("Order items creation error:", itemsError);
      return;
    }

    await clearCart();

    dismissToast(toastId);
    showSuccess("Order placed successfully!");
    navigate("/");
  };

  if (isCartLoading) {
    return <div>Loading...</div>;
  }

  if (!isCartLoading && cartItems.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center container mx-auto px-4">
          <Card className="text-center p-8 bg-white/30 backdrop-blur-lg">
            <CardTitle className="text-2xl font-bold mb-4">Your cart is empty</CardTitle>
            <CardContent>
              <p className="text-gray-600 mb-6">You can't checkout without any items!</p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl><Input placeholder="New York" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl><Input placeholder="10001" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl><Input placeholder="United States" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" size="lg" className="w-full mt-6" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Placing Order..." : `Place Order ($${totalPrice.toFixed(2)})`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 pt-4 border-t">
                <div className="flex justify-between w-full font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;