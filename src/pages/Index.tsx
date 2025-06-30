import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { sampleProducts } from "@/data/products";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Header />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-left">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="block outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-4 rounded-2xl"
                  aria-label={`View details for ${product.name}`}
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;