export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  quantity: number;
  price: number;
  products: Product; // Supabase returns the nested product object
}

export interface Order {
  id: number;
  created_at: string;
  total_price: number;
  status: string;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  order_items: OrderItem[];
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
}