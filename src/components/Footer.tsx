export const Footer = () => {
  return (
    <footer className="w-full mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8 bg-white/10 backdrop-blur-lg rounded-t-2xl border-t border-white/20">
          <p className="text-gray-600">
            © {new Date().getFullYear()} ZenoCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};