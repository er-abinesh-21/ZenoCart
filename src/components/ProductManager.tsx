import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Trash2, Edit } from "lucide-react";
import { ProductForm, ProductFormValues } from "./ProductForm";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";
import { Skeleton } from "./ui/skeleton";

export const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: true });
    if (error) {
      showError("Failed to fetch products.");
      console.error(error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    const toastId = showLoading(selectedProduct ? "Updating product..." : "Creating product...");

    let error;
    if (selectedProduct) {
      ({ error } = await supabase.from("products").update(values).eq("id", selectedProduct.id));
    } else {
      ({ error } = await supabase.from("products").insert(values));
    }

    dismissToast(toastId);
    setIsSubmitting(false);

    if (error) {
      showError(`Failed to ${selectedProduct ? 'update' : 'create'} product.`);
      console.error(error);
    } else {
      showSuccess(`Product ${selectedProduct ? 'updated' : 'created'}!`);
      setIsSheetOpen(false);
      setSelectedProduct(undefined);
      fetchProducts();
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    const toastId = showLoading("Deleting product...");
    const { error } = await supabase.from("products").delete().eq("id", productToDelete.id);
    
    dismissToast(toastId);
    if (error) {
      showError("Failed to delete product.");
      console.error(error);
    } else {
      showSuccess("Product deleted.");
      fetchProducts();
    }
    setIsAlertOpen(false);
    setProductToDelete(null);
  };

  const openDeleteConfirm = (product: Product) => {
    setProductToDelete(product);
    setIsAlertOpen(true);
  };

  const openEditSheet = (product: Product) => {
    setSelectedProduct(product);
    setIsSheetOpen(true);
  };
  
  const openCreateSheet = () => {
    setSelectedProduct(undefined);
    setIsSheetOpen(true);
  };

  return (
    <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Create, edit, and delete products.</CardDescription>
          </div>
          <Button onClick={openCreateSheet}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) setSelectedProduct(undefined); }}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{selectedProduct ? "Edit Product" : "Create New Product"}</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <ProductForm 
                onSubmit={handleFormSubmit} 
                initialData={selectedProduct}
                isSubmitting={isSubmitting}
              />
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product "{productToDelete?.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditSheet(product)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDeleteConfirm(product)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};