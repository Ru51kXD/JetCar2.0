export interface Car {
  id: number;
  brand: string;
  model: string;
  generation: string;
  year: number;
  price: number;
  images: string[];
  mainImage: string;
  mileage: number;
  engine: {
    type: string;
    power: number;
    volume: number;
  };
  transmission: string;
  drive: string;
  color: string;
  interiorColor: string;
  features: string[];
  description: string;
  isNew: boolean;
  inStock: boolean;
  specifications: Record<string, any>;
}

export interface CarFilters {
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  yearRange?: {
    min: number;
    max: number;
  };
  engineTypes?: string[];
  transmissions?: string[];
  drives?: string[];
  isNew?: boolean;
  inStock?: boolean;
}

export interface TestDriveRequest {
  id: number;
  carId: number;
  name: string;
  phone: string;
  email: string;
  preferredDate: Date;
  preferredTime: string;
  message?: string;
  status: 'pending' | 'approved' | 'completed' | 'canceled';
  createdAt: Date;
}

export interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: Date;
}

export interface AdminUser {
  id: number;
  username: string;
  password: string;
  fullName: string;
  role: 'admin' | 'manager';
}

export interface Brand {
  id: number;
  name: string;
  logo: string;
  models: string[];
  count: number;
}

export type SortOption = 
  | 'price-asc' 
  | 'price-desc' 
  | 'year-asc' 
  | 'year-desc' 
  | 'mileage-asc' 
  | 'mileage-desc'; 