import { CartItem, Product } from "@/types";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDbCart = async (userId: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        quantity,
        products (*)
      `,
      )
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching cart:", error);
      showError("Could not load your cart.");
      setCartItems([]);
    } else {
      const loadedItems = data
        .filter((item) => item.products)
        .map((item) => ({
          ...(item.products as Product),
          quantity: item.quantity,
        }));
      setCartItems(loadedItems);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const handleAuthChange = async () => {
      if (isAuthLoading) {
        setIsLoading(true);
        return;
      }

      if (user) {
        setIsLoading(true);
        const localCartRaw = localStorage.getItem("zenocart_guest_cart");
        const localCart: CartItem[] = localCartRaw
          ? JSON.parse(localCartRaw)
          : [];

        if (localCart.length > 0) {
          const itemsToUpsert = localCart.map((item) => ({
            user_id: user.id,
            product_id: item.id,
            quantity: item.quantity,
          }));

          const { error: upsertError } = await supabase
            .from("cart_items")
            .upsert(itemsToUpsert, { onConflict: "user_id, product_id" });

          if (upsertError) {
            console.error("Error merging local cart to DB:", upsertError);
            showError("There was an issue merging your cart.");
          } else {
            localStorage.removeItem("zenocart_guest_cart");
          }
        }
        await fetchDbCart(user.id);
      } else {
        const localCart = localStorage.getItem("zenocart_guest_cart");
        setCartItems(localCart ? JSON.parse(localCart) : []);
        setIsLoading(false);
      }
    };

    handleAuthChange();
  }, [user, isAuthLoading]);

  useEffect(() => {
    if (!user && !isAuthLoading) {
      localStorage.setItem("zenocart_guest_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user, isAuthLoading]);

  const addToCart = async (product: Product, quantity = 1) => {
    if (user) {
      const existingItem = cartItems.find((item) => item.id === product.id);
      const newQuantity = (existingItem?.quantity || 0) + quantity;
      
      const { error } = await supabase
        .from("cart_items")
        .upsert(
          {
            user_id: user.id,
            product_id: product.id,
            quantity: newQuantity,
          },
          { onConflict: "user_id, product_id" },
        );

      if (error) {
        showError("Failed to add item to cart.");
        console.error(error);
      } else {
        await fetchDbCart(user.id);
        showSuccess(`${product.name} added to cart!`);
      }
    } else {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...prevItems, { ...product, quantity }];
      });
      showSuccess(`${product.name} added to cart!`);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (user) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .match({ user_id: user.id, product_id: productId });

      if (error) showError("Failed to remove item.");
      else await fetchDbCart(user.id);
    } else {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId),
      );
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    if (user) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .match({ user_id: user.id, product_id: productId });

      if (error) showError("Failed to update quantity.");
      else await fetchDbCart(user.id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .match({ user_id: user.id });

      if (error) showError("Failed to clear cart.");
      else setCartItems([]);
    } else {
      setCartItems([]);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isLoading: isLoading || isAuthLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};