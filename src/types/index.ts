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

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}