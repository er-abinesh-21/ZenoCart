import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Product } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  price: z.coerce.number().min(0.01, "Price must be positive"),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
  image_url: z.string().url("Must be a valid URL"),
});

interface ProductFormProps {
  product?: Product;
}

export const ProductForm = ({ product }: ProductFormProps) => {
  const navigate = useNavigate();
  const isEditMode = !!product;

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      category: product?.category || "",
      price: product?.price || 0,
      rating: product?.rating || 0,
      image_url: product?.image_url || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const toastId = showLoading(isEditMode ? "Updating product..." : "Adding product...");
    
    let error;
    if (isEditMode) {
      ({ error } = await supabase.from("products").update(values).eq("id", product.id));
    } else {
      ({ error } = await supabase.from("products").insert(values));
    }

    dismissToast(toastId);
    if (error) {
      showError(`Failed to ${isEditMode ? 'update' : 'add'} product.`);
      console.error(error);
    } else {
      showSuccess(`Product ${isEditMode ? 'updated' : 'added'} successfully!`);
      navigate("/admin/products");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl><Textarea {...field} rows={5} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="image_url" render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : (isEditMode ? "Save Changes" : "Add Product")}
        </Button>
      </form>
    </Form>
  );
};