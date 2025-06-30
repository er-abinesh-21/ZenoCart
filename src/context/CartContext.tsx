import { CartItem } from "@/types";
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";

type CartState = {
  items: CartItem[];
  isLoading: boolean;
};

type CartAction =
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "SET_IS_LOADING"; payload: boolean }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  isLoading: true,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_CART":
      return { ...state, items: action.payload, isLoading: false };
    case "ADD_ITEM": {
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      return;
    }

    if (user) {
      const fetchCart = async () => {
        dispatch({ type: "SET_IS_LOADING", payload: true });

        const { data, error } = await supabase
          .from("cart_items")
          .select("quantity, products(*)")
          .eq("user_id", user.id);

        if (error) {
          showError("Could not fetch your cart.");
          console.error("Error fetching cart:", error);
          dispatch({ type: "SET_IS_LOADING", payload: false });
        } else {
          const cartItems: CartItem[] = data.map((item: any) => ({
            ...item.products,
            quantity: item.quantity,
          }));
          dispatch({ type: "SET_CART", payload: cartItems });
        }
      };
      fetchCart();
    } else {
      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  }, [user, isAuthLoading]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};