import { Product } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i <= fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return stars;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showSuccess(`${product.name} added to cart!`);
  };

  return (
    <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
      <CardHeader className="p-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4 text-left flex-grow">
        <p className="text-sm text-gray-600">{product.category}</p>
        <CardTitle className="text-lg font-semibold text-gray-800 mt-1 truncate">
          {product.name}
        </CardTitle>
        <div className="flex items-center mt-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center mt-auto">
        <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
        <Button size="sm" className="bg-gray-800 hover:bg-gray-900 text-white rounded-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};