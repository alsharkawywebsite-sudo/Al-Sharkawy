export * from "./database.types";

export type SiteSetting = {
  key: string;
  value: string | null;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  sort_order: number | null;
};

export type ProductSize = {
  id: string;
  product_id: string;
  name: string;
  price: number;
  is_active: boolean | null;
};

export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  is_active: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  image_url: string | null;
  base_price: number | null;
  discount_type: "none" | "percentage" | "fixed" | null;
  discount_value: number | null;
  is_active: boolean | null;
  tag?: string | null;
  spicy?: boolean | null;
  product_sizes?: ProductSize[];
};

export type Offer = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  discount_type: "percentage" | "fixed" | null;
  discount_value: number | null;
  is_active: boolean | null;
  is_featured?: boolean | null;
  product_id?: string | null;
  old_price?: number | null;
  new_price?: number | null;
  expires_in?: string | null;
  savings?: string | null;
};

export type MenuCategory = Pick<Category, "id" | "slug" | "name">;

// Cart line item stored client-side (localStorage).
export type CartLine = {
  key: string; // productId + optional sizeId (uniqueness key)
  productId: string;
  sizeId: string | null;
  sizeName: string | null;
  title: string;
  description: string | null;
  imageUrl: string | null;
  unitPrice: number;
  quantity: number;
};

export type OrderStatus = "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";

export type Order = {
  id: string;
  user_id: string | null;
  branch_id: string | null;
  status: OrderStatus | string;
  subtotal: number;
  discount_total: number;
  final_total: number;
  notes: string | null;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_size_id: string | null;
  quantity: number;
  unit_price: number;
  discount_applied: number;
};

export type CheckoutCustomer = {
  name: string;
  phone: string;
  address: string;
  notes?: string;
};

export type CreateOrderPayload = {
  customer: CheckoutCustomer;
  branchId: string;
  branchName: string;
  items: Array<{
    productId: string;
    sizeId: string | null;
    quantity: number;
    unitPrice: number;
    title?: string;
    sizeName?: string | null;
  }>;
  subtotal: number;
  deliveryFee: number;
  discountTotal?: number;
};
