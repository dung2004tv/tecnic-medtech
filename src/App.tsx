import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bone, Baby, HeartPulse, Droplet, Scale, Ear, Sparkles, 
  Layers, Filter, ArrowUpDown, CheckCircle2, ChevronRight, 
  SlidersHorizontal, RefreshCcw, Tag, ShieldCheck, Flame, ShoppingCart, Eye,
  ArrowUp, TrendingUp
} from 'lucide-react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HeroSlider } from './components/HeroSlider';
import { TecnicMedtechBanner } from './components/TecnicMedtechBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartModal } from './components/CartModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { ChatBot } from './components/ChatBot';
import { CompanyAbout } from './components/CompanyAbout';
import { AboutPage } from './components/AboutPage';
import { ArticlesPage } from './components/ArticlesPage';
import { ContactPage } from './components/ContactPage';
import { AdminPortal } from './components/AdminPortal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { Footer } from './components/Footer';
import { ProductImage } from './components/ProductImage';
import { PartnersSection } from './components/PartnersSection';
import { ConsultationBanner } from './components/ConsultationBanner';
import { FloatingContactWidgets } from './components/FloatingContactWidgets';

import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES } from './data/productsData';
import { Product, CartItem, User, CategoryId, Order } from './types';

export default function App() {
  // 1. STATE
  const [currentView, setCurrentView] = useState<'PRODUCTS' | 'ABOUT' | 'ARTICLES' | 'CONTACT'>('PRODUCTS');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tecnic_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Current User State (stored in localStorage)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('tecnic_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals & Navigation
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch products from API on load
  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProducts(data.data);
        }
      }
    } catch (e) {
      console.warn("Could not fetch server products, using local dataset", e);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Track scroll position for Scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync Cart to localStorage
  useEffect(() => {
    localStorage.setItem('tecnic_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync User to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('tecnic_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('tecnic_user');
    }
  }, [currentUser]);


  // Helper: SEO-friendly slug
  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD') // remove diacritics
      .replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes
      .trim();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper: Navigate to specific view and sync URL
  const handleSelectView = (view: 'PRODUCTS' | 'ABOUT' | 'ARTICLES' | 'CONTACT', push: boolean = true) => {
    setSelectedProduct(null);
    setCurrentView(view);
    if (view === 'PRODUCTS') {
      setActiveCategory('ALL');
      setSearchKeyword('');
    }
    if (push) {
      try {
        let path = '/';
        if (view === 'ABOUT') path = '/gioi-thieu.html';
        else if (view === 'ARTICLES') path = '/tin-tuc.html';
        else if (view === 'CONTACT') path = '/lien-he.html';
        else if (view === 'PRODUCTS') path = '/san-pham.html';
        window.history.pushState({ view }, '', path);
      } catch (e) {
        console.warn(e);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper: Select category and sync URL
  const handleSelectCategory = (catId: CategoryId, push: boolean = true) => {
    setSelectedProduct(null);
    setActiveCategory(catId);
    setSearchKeyword('');
    setCurrentView('PRODUCTS');

    if (push) {
      try {
        if (catId === 'ALL') {
          window.history.pushState({ catId: 'ALL' }, '', '/');
        } else {
          const cat = CATEGORIES.find(c => c.id === catId);
          const slug = cat ? cat.slug : catId.toLowerCase();
          window.history.pushState({ catId }, '', `/${slug}`);
        }
      } catch (e) {
        console.warn(e);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper: Open product & synchronize URL
  const handleSelectProduct = (product: Product | null, push: boolean = true) => {
    setSelectedProduct(product);
    if (product) {
      setCurrentView('PRODUCTS');
    }
    if (push) {
      try {
        if (product) {
          const slug = generateSlug(product.name);
          window.history.pushState({ productCode: product.code }, '', `/${slug}.html`);
        } else {
          if (activeCategory !== 'ALL') {
            const cat = CATEGORIES.find(c => c.id === activeCategory);
            window.history.pushState({}, '', `/${cat?.slug || ''}`);
          } else {
            window.history.pushState({}, '', '/');
          }
        }
      } catch (e) {
        console.warn('Could not update history state:', e);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper: Copy direct product URL to clipboard
  const handleCopyProductLink = (product: Product) => {
    try {
      const origin = window.location.origin;
      const slug = generateSlug(product.name);
      const directUrl = `${origin}/${slug}.html`;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(directUrl).then(() => {
          showToast(`Đã sao chép link "${product.name}"!`);
        }).catch(() => {
          prompt('Sao chép liên kết sản phẩm bên dưới:', directUrl);
        });
      } else {
        prompt('Sao chép liên kết sản phẩm bên dưới:', directUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Deep-linking: Parse URL and handle browser back/forward buttons
  useEffect(() => {
    const parseUrl = () => {
      try {
        const rawPath = window.location.pathname || '/';
        const cleanPath = rawPath.replace(/^\/+|\/+$/g, '');

        if (cleanPath === 'admin' || cleanPath === 'admin/' || window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
          setIsAdminOpen(true);
          return;
        }

        if (cleanPath === 'gioi-thieu' || cleanPath === 'gioi-thieu.html' || cleanPath === 've-chung-toi') {
          setCurrentView('ABOUT');
          setSelectedProduct(null);
          return;
        }

        if (cleanPath === 'tin-tuc' || cleanPath === 'tin-tuc.html' || cleanPath === 'cam-nang' || cleanPath === 'bai-viet') {
          setCurrentView('ARTICLES');
          setSelectedProduct(null);
          return;
        }

        if (cleanPath === 'lien-he' || cleanPath === 'lien-he.html') {
          setCurrentView('CONTACT');
          setSelectedProduct(null);
          return;
        }

        // Check if path is a product (.html)
        if (cleanPath.endsWith('.html')) {
          const slug = cleanPath.substring(0, cleanPath.length - 5);
          const found = products.find(p => generateSlug(p.name) === slug);
          if (found) {
            setSelectedProduct(found);
            setCurrentView('PRODUCTS');
            return;
          }
        }

        // Check if path is a category slug
        if (cleanPath) {
          const cat = CATEGORIES.find(c => 
            c.slug === cleanPath || 
            cleanPath === `danh-muc/${c.slug}` ||
            generateSlug(c.name) === cleanPath
          );
          if (cat) {
            setActiveCategory(cat.id);
            setCurrentView('PRODUCTS');
            setSelectedProduct(null);
            return;
          }
        }

        // Query parameters fallback (?p=, ?cat=, etc.)
        const params = new URLSearchParams(window.location.search);
        const targetProduct = params.get('p') || params.get('product') || params.get('sp') || params.get('code');
        if (targetProduct) {
          const cleanTarget = targetProduct.trim().toLowerCase();
          const found = products.find(p => 
            p.code.toLowerCase() === cleanTarget ||
            p.id.toString() === cleanTarget ||
            p.code.toLowerCase().replace('tec-', '') === cleanTarget ||
            p.name.toLowerCase().includes(cleanTarget)
          );
          if (found) {
            setSelectedProduct(found);
            setCurrentView('PRODUCTS');
            return;
          }
        }

        const targetCat = params.get('cat') || params.get('category');
        if (targetCat) {
          const foundCat = CATEGORIES.find(c => c.id.toLowerCase() === targetCat.toLowerCase() || c.slug === targetCat.toLowerCase());
          if (foundCat) {
            setActiveCategory(foundCat.id);
            setCurrentView('PRODUCTS');
            setSelectedProduct(null);
            return;
          }
        }
      } catch (err) {
        console.warn('Error parsing URL:', err);
      }
    };

    if (products.length > 0) {
      parseUrl();
    }

    const handlePopState = () => {
      parseUrl();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  // Cart Actions
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Đã đăng xuất tài khoản.');
  };

  // Brands list
  const brandsList = useMemo(() => {
    const brands = new Set(products.map(p => p.specifications.brand));
    return Array.from(brands);
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (activeCategory !== 'ALL' && p.category !== activeCategory) {
        return false;
      }

      // Search keyword
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCode = p.code.toLowerCase().includes(q);
        const matchesBrand = p.specifications.brand.toLowerCase().includes(q);
        const matchesTag = p.tags?.some(t => t.toLowerCase().includes(q));
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);

        if (!matchesName && !matchesCode && !matchesBrand && !matchesTag && !matchesDesc) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== 'ALL' && p.specifications.brand !== selectedBrand) {
        return false;
      }

      // Price filter
      if (p.tecnicPrice < priceRange[0] || p.tecnicPrice > priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.tecnicPrice - b.tecnicPrice;
      if (selectedSort === 'price-desc') return b.tecnicPrice - a.tecnicPrice;
      if (selectedSort === 'discount') return b.discountPercent - a.discountPercent;
      if (selectedSort === 'sold') return b.soldCount - a.soldCount;
      if (selectedSort === 'rating') return b.rating - a.rating;
      return 0; // Default featured
    });
  }, [products, activeCategory, searchKeyword, selectedBrand, selectedSort, priceRange]);

  // SẢN PHẨM BÁN CHẠY (Thay thế Thiết Bị PHCN Tiêu Biểu theo yêu cầu - Ảnh 3)
  // Các sản phẩm khi được tích "isBestSeller" hoặc có giảm giá được đẩy lên trang đầu
  const bestSellerProducts = useMemo(() => {
    const featured = products.filter(p => p.isBestSeller || p.discountPercent > 0);
    if (featured.length > 0) return featured.slice(0, 6);
    return products.slice(0, 6);
  }, [products]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex flex-col font-sans antialiased selection:bg-[#0071ba] selection:text-white relative">
      
      {/* 1. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#143472] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-blue-400/40 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. HEADER */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSelectProduct={(p) => handleSelectProduct(p)}
        onSearchChange={(kw) => {
          setSearchKeyword(kw);
          setSelectedProduct(null);
          if (currentView !== 'PRODUCTS') setCurrentView('PRODUCTS');
        }}
        allProducts={products}
        onOpenAbout={() => handleSelectView('ABOUT')}
        onOpenContact={() => handleSelectView('CONTACT')}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
        onQuickSearchTag={(tag) => {
          setSearchKeyword(tag);
          setActiveCategory('ALL');
          setSelectedProduct(null);
          if (currentView !== 'PRODUCTS') setCurrentView('PRODUCTS');
        }}
        currentSearchKeyword={searchKeyword}
      />

      {/* 3. NAVIGATION (Mega Menu, View Tabs & Category Tabs) */}
      <Navigation
        activeCategory={activeCategory}
        onSelectCategory={(catId) => handleSelectCategory(catId)}
        currentView={currentView}
        onSelectView={(view) => handleSelectView(view)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        currentUser={currentUser}
      />

      {/* 4. HERO BANNER & SLIDER (Shown when on Products view, Category ALL, no search, no product detail) */}
      {currentView === 'PRODUCTS' && !selectedProduct && activeCategory === 'ALL' && !searchKeyword && (
        <>
          {/* Main Panorama Tecnic Medtech Banner */}
          <TecnicMedtechBanner
            onSelectCategory={(catId) => handleSelectCategory(catId)}
            onContactClick={() => handleSelectView('CONTACT')}
          />

          {/* Featured Category Carousel */}
          <HeroSlider
            onSelectCategory={(catId) => handleSelectCategory(catId)}
            onOpenAbout={() => handleSelectView('ABOUT')}
          />
        </>
      )}

      {/* 5. MAIN BODY CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-8">
        
        {/* VIEW: DEDICATED PRODUCT DETAIL PAGE (Khớp yêu cầu: chuyển sang 1 trang khác xem chi tiết sản phẩm) */}
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => handleSelectProduct(null)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={(p) => handleSelectProduct(p)}
            allProducts={products}
          />
        ) : (
          <>
            {/* VIEW 1: DEDICATED ABOUT PAGE */}
            {currentView === 'ABOUT' && (
              <div className="space-y-6">
                {/* Breadcrumbs for About */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <button onClick={() => handleSelectView('PRODUCTS')} className="text-[#0071ba] hover:underline font-bold">
                    Trang chủ
                  </button>
                  <span>/</span>
                  <span className="text-slate-800 font-semibold">Giới thiệu TECNIC MEDTECH</span>
                </div>
                <AboutPage
                  onSelectCategory={(catId) => handleSelectCategory(catId)}
                  onOpenArticles={() => handleSelectView('ARTICLES')}
                />
              </div>
            )}

            {/* VIEW 2: ARTICLES & MEDICAL KNOWLEDGE PAGE */}
            {currentView === 'ARTICLES' && (
              <div className="space-y-6">
                {/* Breadcrumbs for Articles */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <button onClick={() => handleSelectView('PRODUCTS')} className="text-[#0071ba] hover:underline font-bold">
                    Trang chủ
                  </button>
                  <span>/</span>
                  <span className="text-slate-800 font-semibold">Tin Tức & Cẩm Nang Y Khoa</span>
                </div>
                <ArticlesPage
                  allProducts={products}
                  onSelectProduct={(p) => handleSelectProduct(p)}
                  onOpenAdmin={() => setIsAdminOpen(true)}
                  currentUser={currentUser}
                  initialArticleId={selectedArticleId}
                  onClearInitialArticle={() => setSelectedArticleId(null)}
                />
              </div>
            )}

            {/* VIEW 3: CONTACT PAGE */}
            {currentView === 'CONTACT' && (
              <div className="space-y-6">
                {/* Breadcrumbs for Contact */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <button onClick={() => handleSelectView('PRODUCTS')} className="text-[#0071ba] hover:underline font-bold">
                    Trang chủ
                  </button>
                  <span>/</span>
                  <span className="text-slate-800 font-semibold">Liên Hệ & Trụ Sở</span>
                </div>
                <ContactPage
                  onOpenAbout={() => handleSelectView('ABOUT')}
                  onOpenArticles={() => handleSelectView('ARTICLES')}
                />
              </div>
            )}

            {/* VIEW 4: PRODUCT CATALOG */}
            {currentView === 'PRODUCTS' && (
              <>
                {/* SECTION: SẢN PHẨM BÁN CHẠY (Thay cho Thiết bị PHCN tiêu biểu - Ảnh 3) */}
                {activeCategory === 'ALL' && !searchKeyword && (
                  <section className="bg-gradient-to-r from-[#143472] to-[#0071ba] rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
                    <div className="flex flex-wrap justify-between items-center gap-3 mb-5 border-b border-blue-400/40 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-sm">
                          <TrendingUp className="w-5 h-5 text-blue-950" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-xl font-black uppercase tracking-wide flex items-center gap-2">
                            SẢN PHẨM BÁN CHẠY
                          </h3>
                          <p className="text-xs text-blue-100">Các dòng thiết bị tiêu chuẩn Bộ Y Tế được ưu tiên đặt hàng nhiều nhất</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-400/40">
                        <span className="text-amber-300">CHÍNH HÃNG 100%</span>
                        <span className="bg-white text-[#143472] px-2 py-0.5 rounded font-bold">TECNIC MEDTECH</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {bestSellerProducts.map((prod) => (
                        <div 
                          key={prod.id} 
                          onClick={() => handleSelectProduct(prod)}
                          className="bg-white text-slate-800 rounded-2xl p-2.5 flex flex-col justify-between hover:shadow-xl transition cursor-pointer group relative border border-slate-100"
                        >
                          <div className="relative flex items-center justify-center h-32 rounded-xl overflow-hidden mb-1.5 bg-slate-50">
                            <ProductImage product={prod} size="sm" showBadge={false} />
                          </div>
                          
                          <div>
                            <h5 className="font-bold text-xs text-slate-900 line-clamp-2 min-h-[32px] leading-snug group-hover:text-[#0071ba]">
                              {prod.name}
                            </h5>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="font-black text-xs sm:text-sm text-red-600">
                                {prod.tecnicPrice.toLocaleString('vi-VN')} đ
                              </span>
                              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                                Còn hàng
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* VIEW MODE: CATEGORY-BY-CATEGORY SECTIONS HOẶC FILTERED GRID */}
                {activeCategory === 'ALL' && !searchKeyword && selectedBrand === 'ALL' ? (
                  <div className="space-y-8">
                    {CATEGORIES.filter(c => c.id !== 'ALL').map((category) => {
                      const catProducts = products.filter(p => p.category === category.id);
                      if (catProducts.length === 0) return null;

                      return (
                        <section 
                          key={category.id} 
                          className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 hover:border-blue-200 transition-colors"
                        >
                          {/* CATEGORY SECTION HEADER */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-6 bg-[#0071ba] rounded-full hidden sm:block"></div>
                              <div>
                                <h3 className="text-lg sm:text-xl font-black text-[#143472] tracking-tight">
                                  {category.name}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {category.description || `Tổng cộng ${catProducts.length} thiết bị chính hãng`}
                                </p>
                              </div>
                            </div>

                            {/* NÚT XEM THÊM */}
                            <button
                              onClick={() => handleSelectCategory(category.id)}
                              className="bg-[#0071ba] hover:bg-[#0e387a] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow transition flex items-center gap-1.5 active:scale-95"
                            >
                              <span>Xem thêm ({catProducts.length})</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                          {/* CATEGORY PRODUCT GRID */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4">
                            {catProducts.map((product) => (
                              <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={(p) => handleAddToCart(p, 1)}
                                onSelectProduct={(p) => handleSelectProduct(p)}
                                onCopyLink={handleCopyProductLink}
                              />
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                ) : (
                  /* SEARCH / CATEGORY TITLE & FILTER TOOLBAR (Khớp giao diện Ảnh 2) */
                  <section className="space-y-4">
                    
                    {/* BREADCRUMB BAR (Khớp Ảnh 2: Trang chủ / Chăm Sóc Sức Khoẻ Cho Người Khoẻ / [Tên Danh Mục]) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs overflow-x-auto">
                      <button 
                        onClick={() => handleSelectCategory('ALL')} 
                        className="text-[#0071ba] hover:underline font-bold whitespace-nowrap"
                      >
                        Trang chủ
                      </button>
                      <span>/</span>
                      <button 
                        onClick={() => handleSelectCategory('ALL')} 
                        className="hover:underline text-slate-600 whitespace-nowrap"
                      >
                        Chăm Sóc Sức Khoẻ Cho Người Khoẻ
                      </button>
                      <span>/</span>
                      <span className="text-slate-900 font-bold whitespace-nowrap">
                        {searchKeyword ? `Tìm kiếm: "${searchKeyword}"` : (CATEGORIES.find(c => c.id === activeCategory)?.name || 'Sản phẩm')}
                      </span>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      
                      {/* Title & Count (Khớp Ảnh 2: THIẾT BỊ Y TẾ THỂ THAO (19 Sản phẩm)) */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                        <div>
                          <h2 className="text-lg sm:text-2xl font-black text-[#143472] uppercase tracking-tight flex items-center gap-2">
                            {searchKeyword ? (
                              <>Kết quả tìm kiếm: <span className="text-[#0071ba]">"{searchKeyword}"</span></>
                            ) : activeCategory === 'ALL' ? (
                              'Tất Cả Thiết Bị Y Tế & Phục Hồi Chức Năng TECNIC MEDTECH'
                            ) : (
                              `${CATEGORIES.find(c => c.id === activeCategory)?.name} (${filteredProducts.length} Sản phẩm)`
                            )}
                          </h2>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Cung cấp đầy đủ chứng chỉ CO/CQ, hóa đơn VAT điện tử, bảo hành chính hãng
                          </p>
                        </div>

                        {/* Quick category reset if filtered */}
                        {(activeCategory !== 'ALL' || searchKeyword) && (
                          <button
                            onClick={() => handleSelectCategory('ALL')}
                            className="text-xs font-bold text-[#0071ba] hover:underline self-start md:self-auto flex items-center gap-1"
                          >
                            ← Quay lại tất cả danh mục
                          </button>
                        )}
                      </div>

                      {/* Filter controls & Quick Sort Tabs (Khớp Ảnh 2: Sắp xếp theo [Nổi bật] [Mới nhất] [Bán chạy] [Giá ↑] [Giá ↓]) */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                        
                        {/* Quick Sort Tabs */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-slate-500 font-semibold mr-1">Sắp xếp theo:</span>
                          {[
                            { id: 'featured', label: 'Nổi bật' },
                            { id: 'sold', label: 'Bán chạy' },
                            { id: 'price-asc', label: 'Giá thấp' },
                            { id: 'price-desc', label: 'Giá cao' },
                            { id: 'discount', label: '% Giảm giá' }
                          ].map((sortOption) => (
                            <button
                              key={sortOption.id}
                              onClick={() => setSelectedSort(sortOption.id as any)}
                              className={`px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                                selectedSort === sortOption.id
                                  ? 'bg-[#0071ba] text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {sortOption.label}
                            </button>
                          ))}
                        </div>

                        {/* Brand filter & Reset */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5">
                            <Tag className="w-3.5 h-3.5 text-[#0071ba]" />
                            <select
                              value={selectedBrand}
                              onChange={(e) => setSelectedBrand(e.target.value)}
                              className="bg-transparent font-medium outline-none text-slate-700 text-xs"
                            >
                              <option value="ALL">Tất cả thương hiệu</option>
                              {brandsList.map((b) => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </div>

                          {(selectedBrand !== 'ALL' || selectedSort !== 'featured' || searchKeyword) && (
                            <button
                              onClick={() => {
                                setSelectedBrand('ALL');
                                setSelectedSort('featured');
                                setSearchKeyword('');
                              }}
                              className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 transition"
                              title="Đặt lại bộ lọc"
                            >
                              <RefreshCcw className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                      </div>

                    </div>

                    {/* PRODUCT GRID */}
                    {filteredProducts.length === 0 ? (
                      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                        <div className="w-16 h-16 bg-blue-50 text-[#0071ba] rounded-full flex items-center justify-center mx-auto">
                          <Filter className="w-8 h-8" />
                        </div>
                        <p className="font-bold text-slate-800 text-base">Không tìm thấy thiết bị y tế phù hợp</p>
                        <p className="text-xs text-slate-500 max-w-md mx-auto">
                          Hãy thử tìm với từ khóa khác như "Nạng", "Bonbone", "Giường y tế", "Khung tập đi", "Xe lăn"...
                        </p>
                        <button
                          onClick={() => {
                            setSearchKeyword('');
                            setSelectedBrand('ALL');
                            setActiveCategory('ALL');
                          }}
                          className="bg-[#0071ba] hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-full transition"
                        >
                          Xem tất cả sản phẩm
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4">
                        {filteredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={(p) => handleAddToCart(p, 1)}
                            onSelectProduct={(p) => handleSelectProduct(p)}
                            onCopyLink={handleCopyProductLink}
                          />
                        ))}
                      </div>
                    )}

                  </section>
                )}
              </>
            )}
          </>
        )}

      </main>

      {/* 6. BOTTOM FORM & PARTNERS */}
      <PartnersSection className="bg-slate-50 border-t border-slate-200/80" />
      
      {/* Blue Consultation Registration Bar */}
      <ConsultationBanner onSuccess={(em) => showToast(`Đã nhận thông tin đăng ký tư vấn cho ${em}!`)} />

      {/* 7. FOOTER */}
      <Footer
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setSelectedProduct(null);
          setCurrentView('PRODUCTS');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => {
          setSelectedProduct(null);
          setCurrentView('ABOUT');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => {
          setSelectedProduct(null);
          setCurrentView('CONTACT');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArticles={() => {
          setSelectedProduct(null);
          setCurrentView('ARTICLES');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenProducts={() => {
          setSelectedProduct(null);
          setCurrentView('PRODUCTS');
          setActiveCategory('ALL');
          setSearchKeyword('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 8. FLOATING CHATBOT */}
      <ChatBot
        onSelectProduct={(p) => handleSelectProduct(p)}
        onSelectCategory={(catId) => handleSelectCategory(catId)}
        onSelectArticle={(articleId) => {
          setSelectedArticleId(articleId);
          setSelectedProduct(null);
          setCurrentView('ARTICLES');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => handleSelectView('ABOUT')}
        onOpenContact={() => handleSelectView('CONTACT')}
        onOpenArticles={() => {
          setSelectedArticleId(null);
          handleSelectView('ARTICLES');
        }}
        onOpenProducts={() => {
          handleSelectCategory('ALL');
        }}
        allProducts={products}
      />

      {/* 9. FLOATING CONTACT WIDGETS (Hotline rung đỏ 038 988 0369 bên trái + Zalo và nút TOP bên phải) */}
      <FloatingContactWidgets />

      {/* 10. MODALS */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currentUser={currentUser}
        onOrderSuccess={(order) => {
          setCart([]);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Xin chào, ${user.fullName}!`);
          if (user.accountType === 'ADMIN' || user.accountType === 'STAFF') {
            setIsAdminOpen(true);
          }
        }}
      />

      <CompanyAbout
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          loadProducts(); // Reload products when admin closes
        }}
        allProducts={products}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSelectProduct={(p) => {
          setIsAdminOpen(false);
          handleSelectProduct(p);
        }}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
      />

      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        currentUser={currentUser}
      />

    </div>
  );
}
