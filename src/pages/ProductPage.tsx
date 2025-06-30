import { useParams, Link } from "react-router-dom";
import { sampleProducts } from "@/data/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import NotFound from "./NotFound";
import { showSuccess } from "@/utils/toast";

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-5 w-5 ${
          i <= fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return stars;
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = sampleProducts.find((p) => p.id === id);

  if (!product) {
    return <NotFound />;
  }
  
  const handleAddToCart = () => {
    showSuccess(`${product.name} added to cart!`);
  };

  const description = "Experience the best in class with this premium product. Designed for excellence and crafted with care, it delivers unparalleled performance and style. Perfect for those who demand quality and appreciate fine details. Elevate your everyday with this exceptional item.";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to products
            </Link>
          </Button>
        </div>
        <div className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex items-center justify-center">
              <img src={product.imageUrl} alt={product.name} className="w-full max-w-md rounded-xl shadow-lg object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm text-gray-600 uppercase tracking-wider">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">{product.name}</h1>
              <div className="flex items-center mt-4">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-500 ml-3">({product.rating} rating)</span>
              </div>
              <p className="text-gray-700 mt-6 leading-relaxed">{description}</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-8 gap-6">
                <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                <Button size="lg" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white rounded-full text-lg px-8 py-6" onClick={handleAddToCart}>
                  <ShoppingCart className="h-6 w-6 mr-3" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;