import { Product } from '../types';

export interface ExportProductItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  description: string;
  application: string[];
  specifications: {
    width?: string;
    height?: string;
    weight?: string;
    dimensions?: string;
    material?: string;
    origin?: string;
    warrantyMonths?: number;
    [key: string]: any;
  };
  features: string[];
  price: number;
  image: string;
  slug: string;
  tags: string[];
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function transformProductToExportItem(p: Product): ExportProductItem {
  const model = p.specifications.model || p.code.replace('TEC-', '');
  const brand = p.specifications.brand || 'TECNIC';
  
  // Format slug-like id e.g. "gbm-021" or "w-47" or "osada-sd-33e"
  const cleanId = generateSlug(model.toLowerCase().startsWith(brand.toLowerCase()) ? model : `${brand}-${model}`);

  // Parse width / height / weight from dimensions
  const dims = p.specifications.dimensions || '';
  let width = '';
  let height = '';
  
  const widthMatch = dims.match(/rộng\s*([0-9\.\-\s]+(cm|mm|m))/i) || dims.match(/([0-9\.\-\s]+)\s*x\s*([0-9\.\-\s]+)/i);
  if (widthMatch) {
    width = widthMatch[1].trim();
  }
  const heightMatch = dims.match(/cao\s*([0-9\.\-\s]+(cm|mm|m))/i);
  if (heightMatch) {
    height = heightMatch[1].trim();
  }

  // Application
  const appList: string[] = [];
  if (p.specifications.application) {
    appList.push(p.specifications.application);
  }
  if (p.categoryName) {
    appList.push(`Hỗ trợ chăm sóc và ${p.categoryName.toLowerCase()} chuẩn y khoa`);
  }
  if (appList.length === 0) {
    appList.push("Thiết bị hỗ trợ phục hồi chức năng và chăm sóc người bệnh");
  }

  // Features
  const featuresList: string[] = [];
  if (p.specifications.features && p.specifications.features.length > 0) {
    featuresList.push(...p.specifications.features);
  } else {
    featuresList.push(`Chất liệu ${p.specifications.material || 'cao cấp bền bỉ, an toàn y tế'}`);
    featuresList.push(`Bảo hành chính hãng ${p.specifications.warrantyMonths || 12} tháng`);
    featuresList.push("Thiết kế tối ưu cho người bệnh và người cao tuổi sử dụng tại nhà");
  }

  // Tags
  const tagsList: string[] = [
    p.categoryName.toLowerCase(),
    "phục hồi chức năng",
    brand.toLowerCase()
  ];
  if (model) tagsList.push(model.toLowerCase());
  if (p.tags) {
    p.tags.forEach(t => {
      if (!tagsList.includes(t.toLowerCase())) tagsList.push(t.toLowerCase());
    });
  }

  const specObj: any = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    weight: p.specifications.weight || "Tiêu chuẩn y tế",
    material: p.specifications.material || "Hợp kim chịu lực cao cấp",
    origin: p.specifications.origin || "Chính hãng",
    warrantyMonths: p.specifications.warrantyMonths || 12
  };
  if (p.specifications.dimensions && !width) {
    specObj.dimensions = p.specifications.dimensions;
  }

  return {
    id: cleanId,
    name: p.name,
    category: p.categoryName || "Phục hồi chức năng",
    brand: brand,
    model: model,
    description: p.shortDescription || p.fullDescription || `${p.name} chính hãng ${brand}`,
    application: appList,
    specifications: specObj,
    features: featuresList,
    price: p.tecnicPrice,
    image: p.image,
    slug: generateSlug(p.name),
    tags: tagsList
  };
}

export function formatProductsToExportCode(products: Product[]): string {
  const exportItems = products.map(transformProductToExportItem);
  return `export const products = ${JSON.stringify(exportItems, null, 2)};`;
}
