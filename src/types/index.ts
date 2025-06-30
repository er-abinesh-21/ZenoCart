export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}