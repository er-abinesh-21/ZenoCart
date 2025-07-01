import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center gap-4">
        <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
          <Input type="number" value={item.quantity} readOnly className="w-12 h-8 text-center" />
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
        </div>
        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};