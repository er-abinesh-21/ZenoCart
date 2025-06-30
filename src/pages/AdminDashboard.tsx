import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProductDataTable } from "@/components/ProductDataTable";
import { ProductForm } from "@/components/ProductForm";
import { showError, showSuccess } from "@/utils/toast";

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching products:", error);
      showError("Failed to fetch products.");
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", productId);
    if (error) {
      showError("Failed to delete product.");
      console.error(error);
    } else {
      showSuccess("Product deleted successfully.");
      fetchProducts();
    }
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    fetchProducts();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <Button onClick={handleAddProduct}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <ProductDataTable
            products={products}
            isLoading={loading}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>
      </main>
      <ProductForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={selectedProduct}
        onSubmitSuccess={handleFormSubmit}
      />
      <Footer />
    </div>
  );
};

export default AdminDashboard;