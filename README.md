
# ZenoCart: Advanced E-Commerce Web App

![ZenoCart Hero Section](https://github.com/user-attachments/assets/52d8b272-ce26-4cbd-ac7a-67544ff05ef4)

 <h1 align="center">
  <a href="https://zeno-cart.vercel.app/"><strong>Live Demo</strong></a>  
  </h1>


ZenoCart is a modern, full-featured e-commerce web application built with a focus on a clean user experience, featuring a sleek **Glassmorphism** UI and smooth **Parallax Scrolling Effects**. It provides a robust platform for both customers and administrators.

## ✨ Key Features

### General
- **Glassmorphism UI**: A beautiful, modern interface using translucent cards, soft shadows, and blurred backgrounds for an elegant, frosted-glass look.
- **Parallax Effects**: The hero section features a subtle, scroll-driven parallax effect for a more dynamic and immersive feel.
- **Role-Based Access Control**: A clear distinction between `Customer` and `Admin` roles, with protected routes for each.
- **Fully Responsive**: Designed to work seamlessly on desktops, tablets, and mobile devices.

### 🛍️ Customer Features
- **Dynamic Product Catalog**: Browse products with real-time search and category filtering.
- **Detailed Product Pages**: View comprehensive product details, descriptions, and ratings.
- **Functional Shopping Cart**: Add, remove, and update item quantities in a persistent cart.
- **Secure User Authentication**: Sign up, log in, and manage accounts securely via Supabase Auth.
- **Profile Management**: Users can update their personal and shipping information.
- **Streamlined Checkout**: A multi-step checkout process to place orders.
- **Order History**: Customers can view a list of their past orders and check their status and details.

### 🧑‍💼 Admin Features
- **Admin Dashboard**: A central hub for managing the e-commerce store.
- **Product Management (CRUD)**: Admins can create, read, update, and delete products in the store.
- **Order Management**: View all customer orders, check details, and update their status (e.g., "Mark as Shipped").
- **Protected Admin Routes**: All admin panels are secured and accessible only to users with the 'admin' role.

## 💻 Tech Stack

This project was built using a modern, scalable, and efficient tech stack, replacing a traditional MERN setup with the power of Supabase for a more integrated backend experience.

| Layer                  | Technology                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| **Frontend**           | [**React.js**](https://reactjs.org/) ([Vite](https://vitejs.dev/)), [**TypeScript**](https://www.typescriptlang.org/) |
| **Styling**            | [**Tailwind CSS**](https://tailwindcss.com/)                                                            |
| **UI Components**      | [**shadcn/ui**](https://ui.shadcn.com/)                                                                |
| **Animations**         | [**Framer Motion**](https://www.framer.com/motion/)                                                    |
| **Backend-as-a-Service** | [**Supabase**](https://supabase.io/) (PostgreSQL Database, Auth, Storage)                              |
| **Form Handling**      | [**React Hook Form**](https://react-hook-form.com/) + [**Zod**](https://zod.dev/) for validation         |
| **State Management**   | React Context API                                                                                      |
| **Icons**              | [**Lucide React**](https://lucide.dev/)                                                                |

## Screenshot of ZenoCart

### Homepage
![Screenshot 2025-07-06 181631](https://github.com/user-attachments/assets/90aae995-8c8d-456b-a648-7969649750f8)


## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A free [Supabase](https://supabase.com/) account

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/er-abinesh-21/ZenoCart.git
   cd ZenoCart
   ```

2. **Install NPM packages:**
   ```sh
   npm install
   ```

3. **Set up your Supabase project:**
   - Go to [Supabase](https://supabase.com/) and create a new project.
   - Navigate to the **SQL Editor** and run the SQL queries from the project's database schema to create the `products`, `profiles`, `orders`, and other necessary tables.
   - Set up the required Row Level Security (RLS) policies for each table to ensure data is secure.

4. **Set up environment variables:**
   - In your Supabase project, go to **Project Settings > API**.
   - Create a `.env` file in the root of your project.
   - Copy your **Project URL** and **anon (public) key** into the `.env` file:
     ```
     VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
     VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
     ```

5. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## 🛣️ Future Roadmap / Enhancements

While ZenoCart is already a powerful application, here are some features planned for the future:

- [ ] **Payment Gateway Integration** (Stripe or Razorpay)
- [ ] **User-Submitted Product Reviews**
- [ ] **Admin User Management Panel**
- [ ] **Advanced Sales Analytics Charts** for the admin dashboard
- [ ] **Wishlist / Save for Later** functionality
- [ ] **Third-Party OAuth** (e.g., Google, GitHub) for login
- [ ] **Automated Email Notifications** for order confirmation

## ©️ License

Distributed under the MIT License. See `LICENSE` for more information.
