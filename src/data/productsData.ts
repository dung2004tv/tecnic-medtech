import { Product } from '../types';
import { CATALOG_PRODUCTS } from './catalogs';

export { CATEGORIES, HERO_BANNERS } from './categoriesData';

export const PRODUCTS: Product[] = [...CATALOG_PRODUCTS];

export const getProductById = (id: number): Product | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === 'ALL') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return PRODUCTS.filter(p => p.isFeatured);
};

export const getBestSellerProducts = (): Product[] => {
  return PRODUCTS.filter(p => p.isBestSeller);
};

export const searchProducts = (query: string): Product[] => {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return PRODUCTS;
  return PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(normalized) ||
    p.code.toLowerCase().includes(normalized) ||
    p.categoryName.toLowerCase().includes(normalized) ||
    p.shortDescription.toLowerCase().includes(normalized) ||
    (p.specifications.brand && p.specifications.brand.toLowerCase().includes(normalized)) ||
    (p.specifications.model && p.specifications.model.toLowerCase().includes(normalized))
  );
};
