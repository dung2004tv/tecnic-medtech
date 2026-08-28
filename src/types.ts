export type CategoryId = 
  | 'ALL'
  | 'TAP_VLTL_PHCN'
  | 'TRI_LIEU_XUNG_DIEN'
  | 'THIET_BI_DONG_Y'
  | 'GIUONG_Y_TE'
  | 'DAI_NEP_KHOP'
  | 'XE_LAN'
  | 'KHUNG_TAP_DI'
  | 'GHE_BO_TAM'
  | 'DEM_HOI_CHONG_LOET'
  | 'ROBOT_NANG_HA'
  | 'GAY_NANG'
  | 'SAN_PHAM_HO_TRO'
  | 'TAY_VIN_CAI_TAO';


export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  slug: string;
  icon: string;
  count: number;
  description: string;
  bannerImage?: string;
  popularKeywords?: string[];
}

export interface ProductSpecification {
  brand: string;
  origin: string; // Xuất xứ: Nhật Bản, Thụy Sĩ, Đức, v.v.
  warrantyMonths: number; // 12, 24, 36, 60 tháng
  model?: string;
  dimensions?: string;
  weight?: string;
  material?: string;
  application?: string;
  powerSource?: string; // Pin AAA, sạc Type-C, nguồn 220V
  connectivity?: string; // Bluetooth, App Omron Connect, v.v.
  features?: string[];
  certifications?: string[]; // FDA, CE, Bộ Y Tế VN
  targetUsers?: string; // Người già, mẹ bầu, trẻ nhỏ, bệnh nhân xương khớp
  color?: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  marketPrice: number;
  tecnicPrice: number;
  discountPercent: number;
  stock: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  image: string;
  galleryImages?: string[];
  shortDescription: string;
  fullDescription: string;
  specifications: ProductSpecification;
  usageInstructions?: string;
  tags?: string[];
  isBulky?: boolean;
}

export type UserRole = 'ADMIN' | 'STAFF' | 'CA_NHAN' | 'DAI_LY' | 'BAC_SI' | 'PHONG_KHAM';

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  district?: string;
  accountType: UserRole;
  clinicName?: string; // Company / Organization / Agency Name
  taxCode?: string;
  avatar?: string;
  permissions?: string[];
  status?: 'ACTIVE' | 'LOCKED';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethodType = 'COD' | 'BANK_TRANSFER' | 'STORE_PAYMENT';

export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  marketPrice: number;
  quantity: number;
  subtotal: number;
  isBulky?: boolean;
}

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  items: OrderItem[];
  totalMarketPrice: number;
  totalTecnicPrice: number;
  totalSaved: number;
  shippingFee: number;
  finalTotal: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'UNPAID' | 'PAID';
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PACKING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';
  needsInvoice: boolean;
  invoiceInfo?: {
    companyName: string;
    taxCode: string;
    companyAddress: string;
    invoiceEmail: string;
  };
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  productRecommendations?: number[]; // list of product IDs
  isAiThinking?: boolean;
}

export interface EstimateItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface Estimate {
  id: string;
  estimateCode: string;
  title: string;
  clientName: string;
  clientPhone: string;
  clientOrg?: string;
  items: EstimateItem[];
  totalMarket: number;
  totalTecnic: number;
  totalDiscount: number;
  vatAmount: number;
  grandTotal: number;
  createdAt: string;
}

export interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  linkText: string;
  targetCategory?: CategoryId;
  bgGradient: string;
}

export type ArticleCategory = 
  | 'KIEN_THUC_PHCN' 
  | 'CHAM_SOC_NGUOI_BENH' 
  | 'TU_VAN_THIET_BI' 
  | 'TIN_TUC_Y_TE';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  categoryName: string;
  excerpt: string;
  content: string; // Markdown / HTML
  coverImage: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string; // e.g. "5 phút đọc"
  views: number;
  tags: string[];
  isFeatured?: boolean;
  relatedProductIds?: number[];
}

export interface Partner {
  id: string | number;
  name: string;
  logo: string;
  website?: string;
  order?: number;
  status: boolean;
}

