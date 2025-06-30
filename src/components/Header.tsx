import { ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 bg-white/30 backdrop-blur-lg rounded-b-2xl shadow-lg border border-white/20 px-6">
          <a href="/" className="text-2xl font-bold text-gray-800">
            ZenoCart
          </a>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6 text-gray-700" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};