export interface ProductItemType {
  title: string;
  price: number;
  image: string;
  onSelect: () => void;
  onAddToCart?: () => void;
  children: any;
}

export interface CartItemType {
  onRemove?: () => void;
  quantity: number;
  title: string;
  price: number;
  deletable?: boolean;
}

export interface OrderItemType {
  totalAmount?: number;
  date?: string;
  cartItems: any;
}
