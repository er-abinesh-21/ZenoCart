import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, PlusCircle } from "lucide-react";

const ProductManagement = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Link>
          </Button>
          <Card className="bg-white/80">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Product Management</CardTitle>
                <CardDescription>Here you can manage all products in the store.</CardDescription>
              </div>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-12">Product table will be displayed here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductManagement;