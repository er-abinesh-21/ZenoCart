import { ShoppingCart, User, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { CartSheet } from "./CartSheet";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useAdmin } from "@/hooks/useAdmin";

export const Header = () => {
  const { totalItems } = useCart();
  const { session } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAdmin } = useAdmin();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 bg-white/30 backdrop-blur-lg rounded-b-2xl shadow-lg border border-white/20 px-6">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              ZenoCart
            </Link>

            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/" className={navigationMenuTriggerStyle()}>
                      Home
                    </Link>
                  </NavigationMenuItem>
                  {session && (
                    <NavigationMenuItem>
                      <Link to="/order-history" className={navigationMenuTriggerStyle()}>
                        My Orders
                      </Link>
                    </NavigationMenuItem>
                  )}
                  {isAdmin && (
                     <NavigationMenuItem>
                      <Link to="/admin" className={navigationMenuTriggerStyle()}>
                        <Shield className="h-4 w-4 mr-1" />
                        Admin
                      </Link>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to={session ? "/account" : "/login"}>
                  <User className="h-6 w-6 text-gray-700" />
                </Link>
              </Button>
              <div className="relative">
                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)}>
                  <ShoppingCart className="h-6 w-6 text-gray-700" />
                </Button>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
};