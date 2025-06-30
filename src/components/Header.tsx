import { ShoppingCart, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { CartSheet } from "./CartSheet";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  const { totalItems } = useCart();
  const { session, profile } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getInitials = () => {
    if (!profile) return "?";
    const firstNameInitial = profile.first_name ? profile.first_name[0] : "";
    const lastNameInitial = profile.last_name ? profile.last_name[0] : "";
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 bg-white/30 backdrop-blur-lg rounded-b-2xl shadow-lg border border-white/20 px-6">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              ZenoCart
            </Link>
            <div className="flex items-center space-x-4">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt="User avatar" />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {profile?.first_name} {profile?.last_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/account">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>My Account</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/login">
                    <User className="h-6 w-6 text-gray-700" />
                  </Link>
                </Button>
              )}
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