import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { CartItem } from "./CartItem";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

interface CartSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const CartSheet = ({ isOpen, onOpenChange }: CartSheetProps) => {
  const { cartItems, totalPrice, totalItems, isLoading } = useCart();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex-grow p-4 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-md" />
            <div className="space-y-2 flex-grow">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-md" />
            <div className="space-y-2 flex-grow">
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
      );
    }

    if (cartItems.length > 0) {
      return (
        <>
          <ScrollArea className="flex-grow pr-6 -mr-6">
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="mt-auto">
            <div className="w-full space-y-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button size="lg" className="w-full">
                Checkout
              </Button>
            </div>
          </SheetFooter>
        </>
      );
    }

    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="text-sm text-gray-500 mt-2">
          Add some products to get started!
        </p>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>My Cart ({!isLoading ? totalItems : "..."})</SheetTitle>
        </SheetHeader>
        {renderContent()}
      </SheetContent>
    </Sheet>
  );
};