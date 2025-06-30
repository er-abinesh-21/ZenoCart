import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NotFound from "../NotFound";

const AdminOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(quantity, price, products(*))")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching order details:", error);
        setOrder(null);
      } else {
        setOrder(data as Order);
      }
      setLoading(false);
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-48 mb-4" />
            <Card className="bg-white/80">
              <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-1/3 mt-2" />
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-8">
                <div>
                  <Skeleton className="h-6 w-1/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div>
                  <Skeleton className="h-6 w-1/4 mb-4" />
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/admin/orders" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Order Management
            </Link>
          </Button>
          <Card className="bg-white/80">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
                  <CardDescription>
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant={order.status === 'pending' ? 'secondary' : 'default'} className="text-base">
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                  <div className="text-gray-700">
                    <p>{order.shipping_name}</p>
                    <p>{order.shipping_address}</p>
                    <p>{order.shipping_city}, {order.shipping_postal_code}</p>
                    <p>{order.shipping_country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Order Total</h3>
                  <p className="text-2xl font-bold">${order.total_price.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Items</h3>
                <div className="space-y-4">
                  {order.order_items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 rounded-md bg-white">
                      <img src={item.products.imageUrl} alt={item.products.name} className="w-16 h-16 rounded-md object-cover" />
                      <div className="flex-grow">
                        <p className="font-semibold">{item.products.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrderDetails;