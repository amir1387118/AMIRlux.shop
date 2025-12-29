
export type AppView = 'home' | 'product-detail' | 'cart' | 'ai-assistant' | 'admin' | 'user-panel';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  specs?: Specification[];
  // فیلدهای مخصوص طلا برای محاسبات سیستمی
  weight?: number; // گرم
  wagesPercent?: number; // درصد اجرت
  profitPercent?: number; // درصد سود
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
