import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Sparkles, Headphones, Eye, ShoppingCart, 
  PhoneCall, ShieldCheck, CheckCircle2, ChevronRight, MessageSquare, UserCheck,
  Stethoscope, Info, Phone, BookOpen, ExternalLink, MapPin, Building2, 
  Activity, ArrowUpRight, Compass, Layers, Globe, Landmark, Search
} from 'lucide-react';
import { ChatMessage, Product, CategoryId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { ProductImage } from './ProductImage';
import Markdown from 'react-markdown';

export interface TopicLink {
  id: string;
  title: string;
  subtitle?: string;
  type: 'CATEGORY' | 'ARTICLE' | 'PRODUCT' | 'PAGE' | 'PHONE' | 'ZALO' | 'EXTERNAL_WEB';
  url?: string;
  categoryId?: CategoryId;
  articleId?: string;
  product?: Product;
  page?: 'ABOUT' | 'CONTACT' | 'ARTICLES' | 'PRODUCTS';
  badge?: string;
  iconType?: 'bed' | 'wheelchair' | 'robot' | 'cushion' | 'brace' | 'wave' | 'walker' | 'toilet' | 'article' | 'about' | 'contact' | 'phone' | 'zalo' | 'globe' | 'hospital' | 'insurance' | 'gov' | 'search';
}

interface ChatBotProps {
  onSelectProduct?: (product: Product) => void;
  onSelectCategory?: (categoryId: CategoryId) => void;
  onSelectArticle?: (articleId: string) => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
  onOpenArticles?: () => void;
  onOpenProducts?: () => void;
  allProducts: Product[];
}

interface ExtendedChatMessage extends ChatMessage {
  recommendedProducts?: Product[];
  relatedTopicLinks?: TopicLink[];
}

// Initial quick greeting topic links
const INITIAL_TOPIC_LINKS: TopicLink[] = [
  {
    id: 'tl-init-1',
    title: 'Giường Y Tế & Giường Kéo Giãn',
    subtitle: 'Nâng hạ đầu lưng, có bô vệ sinh tự động, điều khiển điện',
    type: 'CATEGORY',
    categoryId: 'GIUONG_Y_TE',
    badge: 'Danh mục',
    iconType: 'bed'
  },
  {
    id: 'tl-init-2',
    title: 'Xe Lăn Ngả Nằm & Xe Siêu Nhẹ',
    subtitle: 'Xe lăn ngả 180°, xe nhôm gấp gọn 7.5kg, xe có bô',
    type: 'CATEGORY',
    categoryId: 'XE_LAN',
    badge: 'Danh mục',
    iconType: 'wheelchair'
  },
  {
    id: 'tl-init-3',
    title: 'Găng Tay Robot PHCN Sau Tai Biến',
    subtitle: 'Công nghệ khí nén sinh học & cơ chế tập gương não bộ',
    type: 'CATEGORY',
    categoryId: 'ROBOT_NANG_HA',
    badge: 'Danh mục',
    iconType: 'robot'
  },
  {
    id: 'tl-init-4',
    title: 'Cổng Thông Tin Bộ Y Tế Việt Nam',
    subtitle: 'Tra cứu quy định, chính sách và tiêu chuẩn trang thiết bị y tế',
    type: 'EXTERNAL_WEB',
    url: 'https://moh.gov.vn',
    badge: 'Website Ngoài',
    iconType: 'gov'
  },
  {
    id: 'tl-init-5',
    title: 'Cẩm Nang Y Khoa & Chăm Sóc Người Bệnh',
    subtitle: 'Tài liệu hướng dẫn phục hồi chức năng và phòng ngừa loét',
    type: 'PAGE',
    page: 'ARTICLES',
    badge: 'Cẩm nang',
    iconType: 'article'
  }
];

const INITIAL_MESSAGES: ExtendedChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: `Dạ kính chào Quý khách! Chuyên viên Tư vấn Thiết Bị & Vật Tư Y Tế TECNIC MEDTECH sẵn sàng hỗ trợ Quý khách 24/7.
    
Quý khách có thể hỏi về các dòng thiết bị y tế của TECNIC hoặc bất kỳ chủ đề y khoa, bệnh viện, bảo hiểm hay tra cứu thông tin khác (hệ thống sẽ cung cấp lời khuyên kèm đường link dẫn ra trang web liên quan):
1. 🛏️ **Giường y tế dưỡng bệnh**: Giường 2-4 tay quay có bô, giường điện tự động, giường kéo giãn.
2. 🦽 **Xe lăn**: Xe lăn ngả nằm 180°, xe lăn siêu nhẹ 7.5kg, xe lăn có bô vệ sinh.
3. 🤖 **Phục hồi chức năng tai biến**: Găng tay Robot tập bàn tay, ghế nâng chuyển thủy lực.
4. 🩺 **Đai nẹp Bonbone Nhật Bản**: Đai trợ lực khớp gối, đai thắt lưng, đai cổ.
5. 🌐 **Chủ đề khác / Bên ngoài**: Tra cứu BHYT, bệnh viện (Bạch Mai, 108, Vinmec), Cổng thông tin Bộ Y Tế, tra cứu thông tin mở rộng.`,
    relatedTopicLinks: INITIAL_TOPIC_LINKS,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const SUGGESTIONS = [
  "Tư vấn giường y tế 4 tay quay có bô",
  "Găng tay Robot PHCN sau tai biến",
  "Xe lăn ngả nằm 180° có bô vệ sinh",
  "Tra cứu BHYT & Bảo hiểm xã hội",
  "Cổng thông tin Bộ Y Tế Việt Nam",
  "Bệnh viện Bạch Mai / Bệnh viện 108",
  "Địa chỉ showroom & chính sách bảo hành"
];

// Smart Matcher to find relevant pages, articles, categories or EXTERNAL websites
function findMatchingTopicLinks(query: string): TopicLink[] {
  const q = query.toLowerCase().trim();
  const links: TopicLink[] = [];

  // 0. CHECK FOR EXTERNAL TOPICS (Bảo hiểm, Bệnh viện, Bộ Y Tế, Tra cứu thuốc, Tìm kiếm ngoài)
  if (q.includes('bảo hiểm') || q.includes('bhyt') || q.includes('bhxh') || q.includes('chế độ')) {
    links.push({
      id: 'tl-ext-bhxh',
      title: 'Cổng Thông Tin Bảo Hiểm Xã Hội Việt Nam',
      subtitle: 'Tra cứu thẻ BHYT, mức hưởng bảo hiểm và cơ sở KCB',
      type: 'EXTERNAL_WEB',
      url: 'https://baohiemxahoi.gov.vn',
      badge: 'Website Ngoài',
      iconType: 'insurance'
    });
    links.push({
      id: 'tl-ext-dvc',
      title: 'Cổng Dịch Vụ Công Quốc Gia',
      subtitle: 'Thủ tục hành chính y tế & chính sách hỗ trợ người khuyết tật',
      type: 'EXTERNAL_WEB',
      url: 'https://dichvucong.gov.vn',
      badge: 'Website Ngoài',
      iconType: 'gov'
    });
  }

  if (q.includes('bạch mai') || q.includes('bach mai')) {
    links.push({
      id: 'tl-ext-bachmai',
      title: 'Cổng Thông Tin Bệnh Viện Bạch Mai',
      subtitle: 'Khoa Phục hồi chức năng & Đặt lịch khám chuyên khoa',
      type: 'EXTERNAL_WEB',
      url: 'http://bachmai.gov.vn',
      badge: 'Website Ngoài',
      iconType: 'hospital'
    });
  }

  if (q.includes('108') || q.includes('quân y 108') || q.includes('vien 108')) {
    links.push({
      id: 'tl-ext-108',
      title: 'Bệnh Viện Trung Ương Quân Đội 108',
      subtitle: 'Viện Chấn thương Chỉnh hình & Trung tâm Đột quỵ Não',
      type: 'EXTERNAL_WEB',
      url: 'https://benhvien108.vn',
      badge: 'Website Ngoài',
      iconType: 'hospital'
    });
  }

  if (q.includes('bệnh viện') || q.includes('khám bệnh') || q.includes('bác sĩ') || q.includes('vinmec') || q.includes('chợ rẫy') || q.includes('việt đức')) {
    if (!links.some(l => l.id === 'tl-ext-bachmai' || l.id === 'tl-ext-108')) {
      links.push({
        id: 'tl-ext-vinmec',
        title: 'Hệ Thống Y Tế Quốc Tế Vinmec',
        subtitle: 'Tra cứu cẩm nang bệnh học, phác đồ điều trị và đặt lịch khám',
        type: 'EXTERNAL_WEB',
        url: 'https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/',
        badge: 'Website Ngoài',
        iconType: 'hospital'
      });
      links.push({
        id: 'tl-ext-bachmai-gen',
        title: 'Bệnh Viện Bạch Mai Hà Nội',
        subtitle: 'Bệnh viện tuyến cuối đầu ngành Phục hồi chức năng & Đột quỵ',
        type: 'EXTERNAL_WEB',
        url: 'http://bachmai.gov.vn',
        badge: 'Website Ngoài',
        iconType: 'hospital'
      });
    }
  }

  if (q.includes('bộ y tế') || q.includes('bo y te') || q.includes('cục quản lý') || q.includes('công văn') || q.includes('nghị định')) {
    links.push({
      id: 'tl-ext-moh',
      title: 'Cổng Thông Tin Điện Tử Bộ Y Tế (MOH)',
      subtitle: 'Văn bản quy phạm pháp luật & Quản lý Trang thiết bị y tế',
      type: 'EXTERNAL_WEB',
      url: 'https://moh.gov.vn',
      badge: 'Website Ngoài',
      iconType: 'gov'
    });
  }

  if (q.includes('thuốc') || q.includes('dược') || q.includes('toa thuốc') || q.includes('uống thuốc')) {
    links.push({
      id: 'tl-ext-dav',
      title: 'Cục Quản Lý Dược Việt Nam (DAV)',
      subtitle: 'Tra cứu danh mục thuốc được cấp phép và giá thuốc kê khai',
      type: 'EXTERNAL_WEB',
      url: 'https://dav.gov.vn',
      badge: 'Website Ngoài',
      iconType: 'gov'
    });
  }

  // 1. Giường y tế & Kéo giãn
  if (q.includes('giường') || q.includes('tay quay') || q.includes('kéo giãn') || q.includes('nằm liệt') || q.includes('giuong')) {
    links.push({
      id: 'tl-cat-giuong',
      title: 'Mở Danh Mục: Giường Y Tế & Kéo Giãn Cột Sống',
      subtitle: 'Xem toàn bộ giường 2-4 tay quay, giường điện, giường kéo giãn',
      type: 'CATEGORY',
      categoryId: 'GIUONG_Y_TE',
      badge: 'Danh mục',
      iconType: 'bed'
    });
    links.push({
      id: 'tl-art-003',
      title: 'Đọc Bài Viết: So Sánh Giường Tay Quay & Giường Điện',
      subtitle: 'Phân tích ưu nhược điểm và hướng dẫn chọn mua cho gia đình',
      type: 'ARTICLE',
      articleId: 'art-003',
      badge: 'Cẩm nang Y khoa',
      iconType: 'article'
    });
  }

  // 2. Xe lăn
  if (q.includes('xe lăn') || q.includes('xe ngả') || q.includes('lăn tay') || q.includes('xe bô') || q.includes('xe lan')) {
    links.push({
      id: 'tl-cat-xelan',
      title: 'Mở Danh Mục: Xe Lăn Tay & Xe Lăn Đa Năng',
      subtitle: 'Xem các dòng xe ngả nằm 180°, xe nhôm siêu nhẹ, xe có bô vệ sinh',
      type: 'CATEGORY',
      categoryId: 'XE_LAN',
      badge: 'Danh mục',
      iconType: 'wheelchair'
    });
    links.push({
      id: 'tl-contact-xelan',
      title: 'Liên Hệ Trực Tiếp Xem & Thử Xe Lăn Tại Showroom',
      subtitle: 'Địa chỉ: Tầng 2 Tòa New Skyline, Văn Quán, Hà Đông, Hà Nội',
      type: 'PAGE',
      page: 'CONTACT',
      badge: 'Showroom',
      iconType: 'contact'
    });
  }

  // 3. Robot PHCN & Tai biến & Phục hồi bàn tay
  if (q.includes('robot') || q.includes('găng') || q.includes('tai biến') || q.includes('đột quỵ') || q.includes('bàn tay') || q.includes('liệt') || q.includes('phục hồi')) {
    links.push({
      id: 'tl-cat-robot',
      title: 'Mở Danh Mục: Robot & Thiết Bị Phục Hồi Chức Năng',
      subtitle: 'Găng tay Robot khí nén Oromi, ghế nâng chuyển thủy lực',
      type: 'CATEGORY',
      categoryId: 'ROBOT_NANG_HA',
      badge: 'Danh mục',
      iconType: 'robot'
    });
    links.push({
      id: 'tl-art-001',
      title: 'Đọc Bài Viết: PHCN Vận Động Bàn Tay Bằng Găng Tay Robot',
      subtitle: 'Nguyên lý khí nén sinh học mềm & cơ chế tập gương não bộ',
      type: 'ARTICLE',
      articleId: 'art-001',
      badge: 'Cẩm nang Y khoa',
      iconType: 'article'
    });
  }

  // 4. Đệm hơi chống loét & Chăm sóc tì đè
  if (q.includes('đệm') || q.includes('loét') || q.includes('tì đè') || q.includes('thông tiểu') || q.includes('cliny') || q.includes('dem')) {
    links.push({
      id: 'tl-cat-dem',
      title: 'Mở Danh Mục: Đệm Hơi Chống Loét Tì Đè & Đệm Nâng Lưng',
      subtitle: 'Đệm hơi tự động đảo khí 6-8 phút/lần, có lỗ bô, chống thấm nước',
      type: 'CATEGORY',
      categoryId: 'DEM_HOI_CHONG_LOET',
      badge: 'Danh mục',
      iconType: 'cushion'
    });
    links.push({
      id: 'tl-art-002',
      title: 'Đọc Bài Viết: Cẩm Nang Chọn Đệm Hơi & Chăm Sóc Người Nằm Liệt',
      subtitle: 'Phòng ngừa hoại tử vùng da tì đè và quy trình lăn trở chuẩn y tế',
      type: 'ARTICLE',
      articleId: 'art-002',
      badge: 'Cẩm nang Y khoa',
      iconType: 'article'
    });
  }

  // 5. Đai nẹp Bonbone & Khớp gối & Thắt lưng
  if (q.includes('bonbone') || q.includes('đai') || q.includes('nẹp') || q.includes('gối') || q.includes('khớp') || q.includes('thắt lưng') || q.includes('cổ') || q.includes('dai') || q.includes('nep')) {
    links.push({
      id: 'tl-cat-dai',
      title: 'Mở Danh Mục: Đai Nẹp Khớp Bonbone Nhật Bản',
      subtitle: 'Đai trợ lực khớp gối, đai thắt lưng Pro Hard Slim, đai cổ',
      type: 'CATEGORY',
      categoryId: 'DAI_NEP_KHOP',
      badge: 'Danh mục',
      iconType: 'brace'
    });
  }

  // 6. Xung điện & Vật lý trị liệu
  if (q.includes('xung điện') || q.includes('omron') || q.includes('suy giãn') || q.includes('tĩnh mạch') || q.includes('massage') || q.includes('trị liệu') || q.includes('tri lieu')) {
    links.push({
      id: 'tl-cat-xungdien',
      title: 'Mở Danh Mục: Máy Xung Điện & Vật Lý Trị Liệu',
      subtitle: 'Máy xung điện Omron TENS/EMS, máy nén ép suy giãn tĩnh mạch',
      type: 'CATEGORY',
      categoryId: 'TRI_LIEU_XUNG_DIEN',
      badge: 'Danh mục',
      iconType: 'wave'
    });
  }

  // 7. Khung tập đi & Gậy nạng
  if (q.includes('khung') || q.includes('tập đi') || q.includes('nạng') || q.includes('gậy') || q.includes('tap di')) {
    links.push({
      id: 'tl-cat-khung',
      title: 'Mở Danh Mục: Khung Tập Đi & Dụng Cụ Hỗ Trợ',
      subtitle: 'Khung tập đi có ghế ngồi, bánh xe chống trượt, nạng khuỷu tay',
      type: 'CATEGORY',
      categoryId: 'KHUNG_TAP_DI',
      badge: 'Danh mục',
      iconType: 'walker'
    });
  }

  // 8. Ghế bô & Ghế tắm
  if (q.includes('ghế bô') || q.includes('ghế tắm') || q.includes('vệ sinh') || q.includes('bô')) {
    links.push({
      id: 'tl-cat-ghebo',
      title: 'Mở Danh Mục: Ghế Bô & Thiết Bị Vệ Sinh Y Tế',
      subtitle: 'Ghế bô tắm chống gỉ, bô có bánh xe đẩy, chậu gội đầu',
      type: 'CATEGORY',
      categoryId: 'GHE_BO_TAM',
      badge: 'Danh mục',
      iconType: 'toilet'
    });
  }

  // 9. Công ty / Pháp lý / Giới thiệu
  if (q.includes('công ty') || q.includes('giới thiệu') || q.includes('tecnic') || q.includes('năng lực') || q.includes('pháp lý')) {
    links.push({
      id: 'tl-page-about',
      title: 'Mở Trang: Giới Thiệu & Pháp Lý TECNIC MEDTECH',
      subtitle: 'Hồ sơ năng lực, giấy phép Bộ Y Tế, tài khoản ngân hàng MB Bank',
      type: 'PAGE',
      page: 'ABOUT',
      badge: 'Giới thiệu',
      iconType: 'about'
    });
  }

  // 10. Địa chỉ / Showroom / Hotline / Liên hệ
  if (q.includes('địa chỉ') || q.includes('liên hệ') || q.includes('showroom') || q.includes('hotline') || q.includes('mua') || q.includes('tư vấn')) {
    links.push({
      id: 'tl-page-contact',
      title: 'Mở Trang: Liên Hệ & Bản Đồ Showroom TECNIC',
      subtitle: 'Tầng 2, Tòa nhà New Skyline, KĐT Văn Quán, Hà Đông, TP. Hà Nội',
      type: 'PAGE',
      page: 'CONTACT',
      badge: 'Liên hệ',
      iconType: 'contact'
    });
  }

  // If asked about "trang web khác" or "ngoài" or "tìm kiếm"
  if (q.includes('web khác') || q.includes('trang web') || q.includes('đường link') || q.includes('link') || q.includes('bên ngoài') || q.includes('ngoài')) {
    if (!links.some(l => l.type === 'EXTERNAL_WEB')) {
      links.push({
        id: 'tl-ext-google',
        title: `Tra Cứu Mở Rộng Trên Google: "${query.slice(0, 30)}"`,
        subtitle: 'Tìm kiếm thêm tài liệu khoa học và bài viết y khoa bên ngoài',
        type: 'EXTERNAL_WEB',
        url: `https://www.google.com/search?q=${encodeURIComponent(query + ' y tế sức khỏe')}`,
        badge: 'Google Search',
        iconType: 'search'
      });
      links.push({
        id: 'tl-ext-moh-gen',
        title: 'Cổng Thông Tin Bộ Y Tế Việt Nam',
        subtitle: 'Truy cập cổng thông tin chính thức của Bộ Y Tế',
        type: 'EXTERNAL_WEB',
        url: 'https://moh.gov.vn',
        badge: 'Website Ngoài',
        iconType: 'gov'
      });
    }
  }

  // Fallback default links if nothing specific matched
  if (links.length === 0) {
    links.push({
      id: 'tl-page-articles-default',
      title: 'Mở Trang: Cẩm Nang Y Khoa & Tin Tức Sức Khỏe',
      subtitle: 'Tổng hợp các bài viết chuyên sâu về phục hồi chức năng và chăm sóc',
      type: 'PAGE',
      page: 'ARTICLES',
      badge: 'Cẩm nang',
      iconType: 'article'
    });
    links.push({
      id: 'tl-ext-google-fallback',
      title: `Tra Cứu Google: "${query.slice(0, 25)}"`,
      subtitle: 'Mở trang tìm kiếm Google cho chủ đề câu hỏi này',
      type: 'EXTERNAL_WEB',
      url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      badge: 'Website Ngoài',
      iconType: 'search'
    });
    links.push({
      id: 'tl-page-contact-default',
      title: 'Mở Trang: Liên Hệ Tư Vấn & Báo Giá Trực Tiếp',
      subtitle: 'Hotline 24/7: 034 84 02466 / 038 988 0369',
      type: 'PAGE',
      page: 'CONTACT',
      badge: 'Liên hệ',
      iconType: 'contact'
    });
  }

  return links.slice(0, 3);
}

// Helper to find matching products
function findMatchingProducts(query: string, products: Product[]): Product[] {
  const q = query.toLowerCase();

  const byModel = products.filter(p => 
    (p.specifications.model && q.includes(p.specifications.model.toLowerCase())) ||
    (p.code && q.includes(p.code.toLowerCase())) ||
    p.name.toLowerCase().includes(q)
  );
  if (byModel.length > 0) {
    return byModel.slice(0, 3);
  }

  let matches: Product[] = [];

  if (q.includes('giường') || q.includes('tay quay') || q.includes('kéo giãn')) {
    matches = products.filter(p => p.category === 'GIUONG_Y_TE').slice(0, 3);
  } else if (q.includes('xe lăn') || q.includes('ngả nằm') || q.includes('lăn tay')) {
    matches = products.filter(p => p.category === 'XE_LAN').slice(0, 3);
  } else if (q.includes('robot') || q.includes('găng') || q.includes('nâng chuyển') || q.includes('thủy lực') || q.includes('tai biến')) {
    matches = products.filter(p => p.category === 'ROBOT_NANG_HA').slice(0, 3);
  } else if (q.includes('đệm hơi') || q.includes('loét') || q.includes('thông tiểu') || q.includes('cliny')) {
    matches = products.filter(p => p.category === 'DEM_HOI_CHONG_LOET').slice(0, 3);
  } else if (q.includes('bonbone') || q.includes('đai') || q.includes('nẹp') || q.includes('khớp')) {
    matches = products.filter(p => p.category === 'DAI_NEP_KHOP').slice(0, 3);
  } else if (q.includes('xung điện') || q.includes('omron') || q.includes('đạp chân') || q.includes('suy giãn') || q.includes('massage')) {
    matches = products.filter(p => p.category === 'TRI_LIEU_XUNG_DIEN').slice(0, 3);
  } else if (q.includes('khung') || q.includes('nạng') || q.includes('gậy') || q.includes('tập đi')) {
    matches = products.filter(p => p.category === 'KHUNG_TAP_DI' || p.category === 'GAY_NANG').slice(0, 3);
  } else if (q.includes('ghế bô') || q.includes('ghế tắm') || q.includes('vệ sinh')) {
    matches = products.filter(p => p.category === 'GHE_BO_TAM').slice(0, 3);
  }

  if (matches.length === 0 && q.length > 2) {
    matches = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.specifications.brand.toLowerCase().includes(q)
    ).slice(0, 3);
  }

  return matches;
}

// Client-side medical rule response generator (100% guarantee no code snippets)
function generateClientMedicalReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("bảo hiểm") || q.includes("bhyt") || q.includes("bhxh")) {
    return `Dạ chào Quý khách! Về chính sách **Bảo hiểm y tế (BHYT) & Bảo hiểm xã hội**:
- Các thiết bị y tế dùng tại gia đình (như giường y tế, xe lăn, găng tay robot) hiện là thiết bị hỗ trợ tự túc do gia đình trang bị.
- Quý khách có thể tra cứu thông tin quyền lợi và cơ sở khám chữa bệnh tại [Cổng Thông Tin Bảo Hiểm Xã Hội Việt Nam](https://baohiemxahoi.gov.vn) hoặc [Cổng Dịch Vụ Công Quốc Gia](https://dichvucong.gov.vn).
- TECNIC hỗ trợ xuất **Hóa đơn VAT điện tử** đầy đủ để Quý khách làm thủ tục thanh toán thanh toán bảo hiểm tư nhân hoặc cơ quan công tác nếu có chính sách hỗ trợ.`;
  }

  if (q.includes("bạch mai") || q.includes("108") || q.includes("bệnh viện") || q.includes("khám")) {
    return `Dạ chào Quý khách! Đối với việc thăm khám chuyên sâu và phục hồi chức năng:
- **Bệnh viện Bạch Mai** (Khoa Thần kinh & Trung tâm PHCN): Quý khách có thể xem thông tin tại [Website Bệnh Viện Bạch Mai](http://bachmai.gov.vn).
- **Bệnh viện Trung ương Quân đội 108** (Trung tâm Đột quỵ & Viện Chấn thương Chỉnh hình): Xem tại [Website Bệnh Viện 108](https://benhvien108.vn).
- **Hệ thống Y tế Vinmec**: Xem tại [Cẩm Nang Y Khoa Vinmec](https://www.vinmec.com).
👉 Sau khi xuất viện hoặc trong quá trình điều trị ngoại trú, TECNIC cung cấp trọn gói thiết bị tập luyện và chăm sóc tại nhà đạt chuẩn y tế.`;
  }

  if (q.includes("bộ y tế") || q.includes("quy định") || q.includes("giấy phép")) {
    return `Dạ chào Quý khách! Toàn bộ thông tin tiêu chuẩn trang thiết bị y tế và giấy phép lưu hành loại A, B, C đều được đăng tải công khai trên [Cổng Thông Tin Điện Tử Bộ Y Tế Việt Nam](https://moh.gov.vn).
Tại TECNIC MEDTECH, 100% sản phẩm phân phối đều có hồ sơ công bố hợp chuẩn, nguồn gốc xuất xứ CO/CQ rõ ràng và chứng nhận ISO 13485.`;
  }

  if (q.includes("giường") || q.includes("tay quay") || q.includes("kéo giãn") || q.includes("nằm")) {
    return `Dạ chào Quý khách! Về **Giường y tế dưỡng bệnh & PHCN** tại TECNIC MEDTECH:
1. **Giường y tế 4 tay quay có bô vệ sinh Hueloi JYC01 / GBM-092A**: Nâng hạ đầu lưng 0-85°, nâng hạ chân, nghiêng trái/phải và có cần gạt bô vệ sinh tự động tại giường, vô cùng tiện lợi cho người nhà chăm sóc.
2. **Giường điện tự động OSADA SD-33E / SD-57C**: Điều khiển remote nhẹ nhàng, tích hợp chậu gội đầu và bàn ăn.
3. **Giường kéo giãn cột sống điện SD-41GK**: Giúp giải phóng chèn ép rễ thần kinh do thoát vị đĩa đệm.
👉 TECNIC hỗ trợ giao hàng, lắp đặt tận nơi, bảo hành chính hãng 24 - 36 tháng. Hotline/Zalo: **034 84 02466**!`;
  }

  if (q.includes("xe lăn") || q.includes("ngả nằm") || q.includes("lăn tay")) {
    return `Dạ chào Quý khách! Về dòng **Xe lăn tay & Xe lăn đa năng** tại TECNIC:
1. **Xe lăn ngả nằm 180° Lucass X-72 / GBM-061C**: Tựa lưng ngả thẳng thành giường nằm, có gác chân nâng hạ và bô vệ sinh đi kèm.
2. **Xe lăn siêu nhẹ GBM-065B**: Khung hợp kim nhôm siêu nhẹ chỉ 7.5kg, gấp gọn bỏ cốp ô tô tiện lợi khi đi khám hoặc dạo phố.
3. **Xe lăn ghế bô Lucass X-8 / X-9**: Chống nước, tắm và vệ sinh trực tiếp trên bồn cầu.`;
  }

  if (q.includes("robot") || q.includes("găng") || q.includes("tai biến") || q.includes("liệt") || q.includes("bàn tay")) {
    return `Dạ chào Quý khách! Đối với phục hồi chức năng vận động bàn tay sau tai biến / đột quỵ:
1. **Găng tay Robot PHCN Oromi 962 / Hueloi**:
   - Sử dụng áp lực khí nén tập gập/duỗi từng ngón tay theo phác đồ y khoa.
   - Chế độ tập gương (Mirror Therapy): Tay lành tập dẫn dắt tay liệt cử động theo, kích thích tái tạo đường dẫn truyền thần kinh.
2. **Ghế nâng hạ chuyển bệnh nhân thủy lực OSADA XDC-01 / GBM-053**: Hỗ trợ di chuyển người bệnh từ giường sang xe lăn hoặc bồn cầu nhẹ nhàng, an toàn tuyệt đối.
👉 Quý khách có thể gọi ngay **034 84 02466** để Chuyên viên kỹ thuật tư vấn chọn kích cỡ (size S, M, L, XL) vừa vặn nhất!`;
  }

  if (q.includes("đệm") || q.includes("loét") || q.includes("chống loét") || q.includes("tì đè")) {
    return `Dạ chào Quý khách! Để chống loét tì đè cho người nằm lâu:
1. **Đệm hơi chống loét tự động đảo khí GBM-095B / GBM-096B (có lỗ bô)**: Máy bơm tự động đảo khí luân phiên 6-8 phút/lần, giúp các vùng mông, lưng luôn được thông thoáng máu.
2. **Đệm hơi nâng lưng 45° GBM-073B**: Nâng người bệnh ngồi dậy ăn uống và thở dễ dàng.
3. **Đệm hơi OSADA SD-AM05**: Chất liệu PVC y tế kháng khuẩn, máy bơm chạy siêu êm.`;
  }

  if (q.includes("đai") || q.includes("nẹp") || q.includes("bonbone") || q.includes("gối") || q.includes("cổ") || q.includes("vai") || q.includes("thắt lưng")) {
    return `Dạ chào Quý khách! Về hệ thống **Đai nẹp định hình Bonbone Nhật Bản & Famedi**:
- **Đai cố định & trợ lực khớp gối Bonbone**: Dành cho người thoái hóa khớp gối, đứt dây chằng chéo, viêm đau khớp khi đứng lên ngồi xuống.
- **Đai nẹp cổ thoáng khí Bonbone**: Cố định đốt sống cổ, giảm đau mỏi vai gáy và thoái hóa cột sống cổ.
- **Đai định hình thắt lưng Bonbone Pro Hard Slim**: Cố định vững chắc vùng thắt lưng L1-L5, giảm đau thoát vị đĩa đệm.
- **Đai di chuyển bệnh nhân Famedi / Orbe**: Thiết kế quai trợ lực giúp người nhà đỡ bệnh nhân tập đi an toàn, chống trượt ngã.`;
  }

  if (q.includes("xung điện") || q.includes("omron") || q.includes("đạp chân") || q.includes("suy giãn") || q.includes("massage")) {
    return `Dạ chào Quý khách! Về vật lý trị liệu & kích thích thần kinh cơ:
1. **Máy xung điện Omron HV-F013 / HV-F028 / HV-F230 (không dây)**: Kích thích dòng xung TENS & EMS giảm đau nhức và phục hồi cơ teo liệt.
2. **Máy nén khí trị liệu suy giãn tĩnh mạch GBM-034**: Tạo áp lực ép tuần hoàn bắp chân giúp máu hồi lưu về tim.
3. **Máy đạp chân điện có nẹp gối**: Tự động quay hỗ trợ cả tay và chân cho người yếu liệt.`;
  }

  if (q.includes("thanh toán") || q.includes("giao hàng") || q.includes("địa chỉ") || q.includes("hotline") || q.includes("tài khoản") || q.includes("công ty")) {
    return `Dạ thông tin liên hệ và đặt hàng tại **TECNIC Medtech**:
- 🏢 **Địa chỉ**: Tầng 2, Tòa nhà New Skyline, KĐT mới Văn Quán - Yên Phúc, Phường Hà Đông, TP. Hà Nội, Việt Nam.
- 📋 **Mã số thuế**: 0110887948
- 📞 **Điện thoại / Hotline**: 034 84 02466 / 038 988 0369
- 💬 **Zalo hỗ trợ**: [Nhắn tin Zalo 034 84 02466](https://zalo.me/0348402466)
- 📧 **Email**: tecnic.medtech@gmail.com
- 💳 **Tài khoản doanh nghiệp**: Ngân hàng Quân Đội (MB Bank) | STK: **787216666** | Chủ TK: CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC.
- 🚚 **Giao hàng**: Hỗ trợ giao hàng toàn quốc, kiểm tra thiết bị trước khi thanh toán COD!`;
  }

  return `Dạ xin chào Quý khách! Chuyên viên Tư vấn Thiết Bị & Vật Tư Y Tế TECNIC MEDTECH hân hạnh được hỗ trợ.
Quý khách có thể hỏi bất kỳ câu hỏi nào (về sản phẩm TECNIC, bài viết y khoa, hoặc chủ đề ngoài như bệnh viện, bảo hiểm xã hội, cổng thông tin y tế). Em sẽ cung cấp hướng dẫn và đường dẫn trực tiếp đến trang web tương ứng ạ!`;
}

// Sub-component to render clean message text with clickable Markdown links
const ChatMessageRenderer: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="space-y-1 text-[13px] leading-relaxed markdown-body">
      <Markdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#0071ba] font-bold underline hover:text-blue-800 bg-blue-50/90 px-1.5 py-0.5 rounded transition mx-0.5"
            >
              <span>{children}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ),
          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-1.5">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 my-1.5">{children}</ol>,
          strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>
        }}
      >
        {text}
      </Markdown>
    </div>
  );
};

export const ChatBot: React.FC<ChatBotProps> = ({ 
  onSelectProduct, 
  onSelectCategory,
  onSelectArticle,
  onOpenAbout,
  onOpenContact,
  onOpenArticles,
  onOpenProducts,
  allProducts 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ExtendedChatMessage[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [navNotice, setNavNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Handle clicking a topic link (Support both In-App Navigation and External Web Link Navigation)
  const handleTopicLinkClick = (link: TopicLink) => {
    if (link.type === 'EXTERNAL_WEB' && link.url) {
      setNavNotice(`Đang mở website ngoài: ${link.title}...`);
      setTimeout(() => setNavNotice(null), 3000);
      window.open(link.url, '_blank', 'noopener,noreferrer');
      return;
    }

    setNavNotice(`Đang chuyển đến ${link.title}...`);
    setTimeout(() => setNavNotice(null), 2500);

    if (link.type === 'CATEGORY' && link.categoryId && onSelectCategory) {
      onSelectCategory(link.categoryId);
    } else if (link.type === 'ARTICLE' && link.articleId && onSelectArticle) {
      onSelectArticle(link.articleId);
    } else if (link.type === 'PAGE') {
      if (link.page === 'ABOUT' && onOpenAbout) onOpenAbout();
      else if (link.page === 'CONTACT' && onOpenContact) onOpenContact();
      else if (link.page === 'ARTICLES' && onOpenArticles) onOpenArticles();
      else if (link.page === 'PRODUCTS' && onOpenProducts) onOpenProducts();
    } else if (link.type === 'PRODUCT' && link.product && onSelectProduct) {
      onSelectProduct(link.product);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ExtendedChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const matchedProducts = findMatchingProducts(text, allProducts);
    const matchedTopics = findMatchingTopicLinks(text);

    try {
      let botReply = '';
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4).map(m => ({ 
            role: m.sender === 'user' ? 'user' : 'model', 
            text: m.text 
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply && data.reply.trim()) {
          botReply = data.reply.trim();
        }
      }

      if (!botReply) {
        botReply = generateClientMedicalReply(text);
      }

      const botMsg: ExtendedChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botReply,
        recommendedProducts: matchedProducts.length > 0 ? matchedProducts : undefined,
        relatedTopicLinks: matchedTopics.length > 0 ? matchedTopics : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn("Chat API error (using local medical response):", err);
      const fallbackReply = generateClientMedicalReply(text);
      const botMsg: ExtendedChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        recommendedProducts: matchedProducts.length > 0 ? matchedProducts : undefined,
        relatedTopicLinks: matchedTopics.length > 0 ? matchedTopics : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <aside aria-label="Hỗ trợ trực tuyến" className="fixed bottom-4 sm:bottom-4 right-4 sm:right-6 z-50 flex flex-col items-end">
      
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="bg-white w-[92vw] sm:w-[460px] h-[80vh] max-h-[620px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-fadeIn">
          
          {/* CHAT HEADER */}
          <div className="bg-[#143472] text-white p-3.5 sm:p-4 flex justify-between items-center shrink-0 border-b-2 border-sky-400">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white text-[#0071ba] flex items-center justify-center font-black shadow-md">
                  <Stethoscope className="w-5 h-5 text-[#0071ba]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-black text-[13px] sm:text-sm flex items-center gap-1.5 text-white">
                  Tư Vấn Thiết Bị Y Tế TECNIC
                </h4>
                <p className="text-[10px] text-sky-200 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-sky-300" />
                  Hỏi đáp y khoa & Dẫn liên kết trang liên quan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-200 hover:text-white rounded-full hover:bg-white/10 transition"
                title="Đóng cửa sổ chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* NOTIFICATION BANNER (When user clicks a link) */}
          {navNotice && (
            <div className="bg-emerald-600 text-white text-[11px] font-bold py-1.5 px-3 flex items-center justify-between shrink-0 shadow-inner animate-pulse">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {navNotice}
              </span>
              <button onClick={() => setNavNotice(null)} className="text-white/80 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* CHAT MESSAGES BODY */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-slate-50 text-[13px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#0071ba] text-white flex items-center justify-center shrink-0 text-[13px] font-bold mt-1 shadow-xs">
                    T
                  </div>
                )}

                <div
                  className={`max-w-[92%] p-3 rounded-2xl leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0071ba] text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <ChatMessageRenderer text={msg.text} />

                  {/* 1. TOPIC & PAGE & EXTERNAL WEB NAVIGATION CARDS */}
                  {msg.relatedTopicLinks && msg.relatedTopicLinks.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-[#143472] uppercase tracking-wide flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-[#0071ba]" />
                          Trang & Chủ đề liên quan đến câu hỏi:
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {msg.relatedTopicLinks.map((link) => {
                          const isExternal = link.type === 'EXTERNAL_WEB';

                          return (
                            <button
                              key={link.id}
                              type="button"
                              onClick={() => handleTopicLinkClick(link)}
                              className={`w-full text-left p-2.5 rounded-xl transition group flex items-start justify-between gap-2 shadow-2xs border ${
                                isExternal 
                                  ? 'bg-gradient-to-r from-sky-50 to-indigo-50/60 border-sky-200 hover:border-sky-500 hover:from-sky-100 hover:to-indigo-100/70' 
                                  : 'bg-gradient-to-r from-blue-50/90 to-slate-50 hover:from-blue-100/90 hover:to-blue-50 border-blue-200/80 hover:border-[#0071ba]'
                              }`}
                            >
                              <div className="flex items-start gap-2.5 overflow-hidden flex-1">
                                <div className={`w-7 h-7 rounded-lg text-white flex items-center justify-center shrink-0 text-xs mt-0.5 shadow-xs ${
                                  isExternal ? 'bg-sky-600' : 'bg-[#0071ba]'
                                }`}>
                                  {isExternal ? (
                                    link.iconType === 'gov' ? (
                                      <Landmark className="w-3.5 h-3.5" />
                                    ) : link.iconType === 'search' ? (
                                      <Search className="w-3.5 h-3.5" />
                                    ) : (
                                      <Globe className="w-3.5 h-3.5" />
                                    )
                                  ) : link.type === 'ARTICLE' ? (
                                    <BookOpen className="w-3.5 h-3.5" />
                                  ) : link.type === 'PAGE' && link.page === 'CONTACT' ? (
                                    <MapPin className="w-3.5 h-3.5" />
                                  ) : link.type === 'PAGE' && link.page === 'ABOUT' ? (
                                    <Building2 className="w-3.5 h-3.5" />
                                  ) : (
                                    <Layers className="w-3.5 h-3.5" />
                                  )}
                                </div>
                                <div className="overflow-hidden">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className={`font-bold text-[12px] transition-colors leading-tight ${
                                      isExternal 
                                        ? 'text-slate-900 group-hover:text-sky-700' 
                                        : 'text-slate-900 group-hover:text-[#0071ba]'
                                    }`}>
                                      {link.title}
                                    </span>
                                    {link.badge && (
                                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md border ${
                                        isExternal
                                          ? 'bg-sky-100 text-sky-800 border-sky-300'
                                          : 'bg-white text-[#0071ba] border-blue-200'
                                      }`}>
                                        {link.badge}
                                      </span>
                                    )}
                                  </div>
                                  {link.subtitle && (
                                    <p className="text-[10.5px] text-slate-500 line-clamp-1 mt-0.5">
                                      {link.subtitle}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className={`shrink-0 flex items-center group-hover:translate-x-0.5 transition-transform mt-1 ${
                                isExternal ? 'text-sky-700' : 'text-[#0071ba]'
                              }`}>
                                {isExternal ? (
                                  <ExternalLink className="w-4 h-4" />
                                ) : (
                                  <ArrowUpRight className="w-4 h-4" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* 2. RECOMMENDED PRODUCTS CARDS */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                      <p className="text-[11px] font-bold text-[#143472] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#0071ba]" />
                          Sản phẩm tiêu biểu đề xuất:
                        </span>
                      </p>
                      <div className="space-y-1.5">
                        {msg.recommendedProducts.map((p) => (
                          <div 
                            key={p.id}
                            className="bg-slate-50 hover:bg-blue-50 border border-slate-200 p-2 rounded-xl flex items-center justify-between gap-2 transition"
                          >
                            <div 
                              onClick={() => onSelectProduct && onSelectProduct(p)}
                              className="flex items-center gap-2 overflow-hidden cursor-pointer flex-1"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                                <ProductImage product={p} size="sm" showBadge={false} />
                              </div>
                              <div className="overflow-hidden">
                                <p className="font-bold text-[11px] text-slate-900 truncate">{p.name}</p>
                                <span className="text-[10px] text-red-600 font-black">
                                  {p.tecnicPrice.toLocaleString('vi-VN')} đ
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button 
                                type="button"
                                onClick={() => onSelectProduct && onSelectProduct(p)}
                                className="text-[10px] bg-[#0071ba] text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 hover:bg-blue-800"
                              >
                                <Eye className="w-2.5 h-2.5" />
                                Xem
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className={`text-[11px] block mt-1.5 ${
                      msg.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-[13px]">
                <div className="w-7 h-7 rounded-full bg-[#0071ba] text-white flex items-center justify-center shrink-0 shadow-xs">
                  T
                </div>
                <div className="bg-white border p-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-slate-400 ml-1">Đang tra cứu dữ liệu y khoa & chuẩn bị trang trả lời...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Hỏi về giường, xe lăn, robot, bảo hiểm y tế, bệnh viện..."
              className="flex-1 bg-slate-100 text-slate-800 text-[13px] px-3.5 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-[#0071ba]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 bg-[#0071ba] hover:bg-blue-800 text-white rounded-full transition disabled:opacity-40 shadow-xs flex items-center justify-center shrink-0"
              title="Gửi câu hỏi"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 bg-[#0061b0] hover:bg-[#004f8f] text-white pl-1.5 pr-3 py-1.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 border-2 border-white cursor-pointer"
        title="Tư Vấn Thiết Bị Y Tế TECNIC"
      >
        <div className="w-7 h-7 rounded-full bg-white text-[#0061b0] flex items-center justify-center shadow-xs relative">
          <Stethoscope className="w-4 h-4 text-[#0061b0]" strokeWidth={2.5} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 border border-white rounded-full"></span>
        </div>

        <div className="text-left pr-1">
          <p className="text-[11px] font-black leading-none uppercase tracking-wider text-white flex items-center gap-1">
            TƯ VẤN THIẾT BỊ
          </p>
        </div>
      </button>

    </aside>
  );
};
