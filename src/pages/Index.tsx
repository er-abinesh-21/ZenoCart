import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { sampleProducts } from "@/data/products";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Discover Your Next Favorite Thing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of high-quality products designed to
            elevate your lifestyle.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-left">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;