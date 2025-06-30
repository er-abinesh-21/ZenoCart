import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductManager } from "@/components/ProductManager";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <ProductManager />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;