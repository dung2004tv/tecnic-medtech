import { Product } from '../types';
import { generateProductDetailMarkdown } from './productDescriptions';

/**
 * Generates natural, Google e-commerce style, practical, and product-specific descriptions
 * tailored specifically for each medical and healthcare equipment model, detailing its
 * specific design, practical step-by-step usage guide, technical specifications, and safety precautions.
 * 
 * Completely removes rigid repetitive boilerplate ("chuẩn y khoa", company consultation/commitment footers)
 * as requested by the user.
 */
export function getRealProductDescription(product: Product): string {
  // If product already has a custom markdown description (not the default short placeholder)
  // and does not contain the old repetitive boilerplate, return it cleanly.
  if (
    product.fullDescription && 
    product.fullDescription.length > 500 && 
    !product.fullDescription.includes('Sản phẩm ' + product.name + ' được phân phối chính hãng bởi TECNIC') &&
    !product.fullDescription.includes('### 8. Thông tin tư vấn & Cam kết')
  ) {
    return product.fullDescription.trim();
  }

  return generateProductDetailMarkdown(product);
}
