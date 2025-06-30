import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Product } from "@/types";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { state, dispatch } = context;
  const { user } = useAuth();

  const addToCart = async (product: Product, quantity = 1) => {
    if (!user) {
      showError("Please log in to add items to your cart.");
      return;
    }

    const existingItem = state.items.find((item) => item.id === product.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .match({ user_id: user.id, product_id: product.id });

      if (error) {
        showError("Failed to update cart.");
        console.error(error);
      } else {
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { id: product.id, quantity: newQuantity },
        });
        showSuccess("Cart updated!");
      }
    } else {
      const { error } = await supabase
        .from("cart_items")
        .insert({ user_id: user.id, product_id: product.id, quantity });

      if (error) {
        showError("Failed to add to cart.");
        console.error(error);
      } else {
        dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });
        showSuccess(`${product.name} added to cart!`);
      }
    }
  };

  const removeFromCart = async (id: number) => {
    if (!user) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .match({ user_id: user.id, product_id: id });

    if (error) {
      showError("Failed to remove item.");
      console.error(error);
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: { id } });
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .match({ user_id: user.id, product_id: id });

    if (error) {
      showError("Failed to update quantity.");
      console.error(error);
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .match({ user_id: user.id });

    if (error) {
      showError("Failed to clear cart.");
      console.error(error);
    } else {
      dispatch({ type: "CLEAR_CART" });
      showSuccess("Cart cleared!");
    }
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    cartItems: state.items,
    isLoading: state.isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
};