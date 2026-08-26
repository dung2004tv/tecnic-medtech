import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bone, Baby, HeartPulse, Droplet, Scale, Ear, Sparkles, 
  Layers, Filter, ArrowUpDown, CheckCircle2, ChevronRight, 
  SlidersHorizontal, RefreshCcw, Tag, ShieldCheck, Flame, ShoppingCart, Eye
} from 'lucide-react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HeroSlider } from './components/HeroSlider';
import { TecnicMedtechBanner } from './components/TecnicMedtechBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
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

import { PRODUCTS, CATEGORIES } from './data/productsData';
import { Product, CartItem, User, CategoryId, Order } from './types';

export default function App() {
  // 1. STATE
  const [currentView, setCurrentView] = useState<'PRODUCTS' | 'ABOUT' | 'ARTICLES' | 'CONTACT'>('PRODUCTS');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);

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

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper: Open product & synchronize URL
  const handleSelectProduct = (product: Product | null) => {
    setSelectedProduct(product);
    try {
      const url = new URL(window.location.href);
      if (product) {
        url.searchParams.set('p', product.code);
        window.history.pushState({ productCode: product.code }, '', url.toString());
      } else {
        url.searchParams.delete('p');
        url.searchParams.delete('product');
        url.searchParams.delete('sp');
        url.searchParams.delete('id');
        url.searchParams.delete('code');
        const cleanUrl = url.pathname + (url.search ? url.search : '');
        window.history.pushState({}, '', cleanUrl);
      }
    } catch (e) {
      console.warn('Could not update history state:', e);
    }
  };

  // Helper: Copy direct product URL to clipboard
  const handleCopyProductLink = (product: Product) => {
    try {
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      const directUrl = `${origin}${pathname}?p=${encodeURIComponent(product.code)}`;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(directUrl).then(() => {
          showToast(`Đã sao chép link "${product.name}"! Bạn có thể gửi link này cho khách xem.`);
        }).catch(() => {
          prompt('Sao chép liên kết sản phẩm bên dưới để gửi cho khách hàng:', directUrl);
        });
      } else {
        prompt('Sao chép liên kết sản phẩm bên dưới để gửi cho khách hàng:', directUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Deep-linking: Check URL params on initial load and handle browser back/forward buttons
  useEffect(() => {
    const parseUrlProduct = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const target = params.get('p') || params.get('product') || params.get('sp') || params.get('id') || params.get('code');
        
        if (target) {
          const cleanTarget = target.trim().toLowerCase();
          const found = PRODUCTS.find(p => 
            p.code.toLowerCase() === cleanTarget ||
            p.id.toString() === cleanTarget ||
            p.code.toLowerCase().replace('tec-', '') === cleanTarget ||
            p.name.toLowerCase().includes(cleanTarget)
          );

          if (found) {
            setSelectedProduct(found);
            setCurrentView('PRODUCTS');
          }
        }
      } catch (err) {
        console.warn('Error reading URL params for product deep link:', err);
      }
    };

    // Run on initial mount
    parseUrlProduct();

    // Listen to browser Back / Forward buttons
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const target = params.get('p') || params.get('product') || params.get('sp') || params.get('id') || params.get('code');
        
        if (target) {
          const cleanTarget = target.trim().toLowerCase();
          const found = PRODUCTS.find(p => 
            p.code.toLowerCase() === cleanTarget ||
            p.id.toString() === cleanTarget ||
            p.code.toLowerCase().replace('tec-', '') === cleanTarget
          );
          setSelectedProduct(found || null);
        } else {
          setSelectedProduct(null);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  // Filtered Products
  const brandsList = useMemo(() => {
    const brands = new Set(PRODUCTS.map(p => p.specifications.brand));
    return Array.from(brands);
  }, []);

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

  // Flash Deals items
  const flashDealProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.discountPercent >= 20).slice(0, 6);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex flex-col font-sans antialiased selection:bg-[#0071ba] selection:text-white">
      
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
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSearchChange={(kw) => {
          setSearchKeyword(kw);
          if (currentView !== 'PRODUCTS') setCurrentView('PRODUCTS');
        }}
        allProducts={PRODUCTS}
        onOpenAbout={() => {
          setCurrentView('ABOUT');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => {
          setCurrentView('CONTACT');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
        onQuickSearchTag={(tag) => {
          setSearchKeyword(tag);
          setActiveCategory('ALL');
          if (currentView !== 'PRODUCTS') setCurrentView('PRODUCTS');
        }}
        currentSearchKeyword={searchKeyword}
      />

      {/* 3. NAVIGATION (Mega Menu, View Tabs & Category Tabs) */}
      <Navigation
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setSearchKeyword('');
          setCurrentView('PRODUCTS');
        }}
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        currentUser={currentUser}
      />

      {/* 4. HERO BANNER & SLIDER (Shown when on Products view, Category ALL & no search) */}
      {currentView === 'PRODUCTS' && activeCategory === 'ALL' && !searchKeyword && (
        <>
          {/* Main Panorama Tecnic Medtech Banner (Matching user's uploaded banner) */}
          <TecnicMedtechBanner
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              setCurrentView('PRODUCTS');
            }}
            onContactClick={() => {
              setCurrentView('CONTACT');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Featured Category Carousel */}
          <HeroSlider
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              setCurrentView('PRODUCTS');
            }}
            onOpenAbout={() => {
              setCurrentView('ABOUT');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      )}

      {/* 5. MAIN BODY CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-8">
        
        {/* VIEW 1: DEDICATED ABOUT PAGE (PhaNa Model) */}
        {currentView === 'ABOUT' && (
          <AboutPage
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              setCurrentView('PRODUCTS');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenArticles={() => setCurrentView('ARTICLES')}
          />
        )}

        {/* VIEW 2: ARTICLES & MEDICAL KNOWLEDGE PAGE */}
        {currentView === 'ARTICLES' && (
          <ArticlesPage
            allProducts={PRODUCTS}
            onSelectProduct={(p) => handleSelectProduct(p)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            currentUser={currentUser}
          />
        )}

        {/* VIEW 3: CONTACT PAGE */}
        {currentView === 'CONTACT' && (
          <ContactPage
            onOpenAbout={() => {
              setCurrentView('ABOUT');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenArticles={() => {
              setCurrentView('ARTICLES');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 4: PRODUCT CATALOG (110 Sản phẩm) */}
        {currentView === 'PRODUCTS' && (
          <>
            {/* FEATURED PRODUCTS SECTION (Thiết Bị Y Tế & PHCN Tiêu Biểu) */}
            {activeCategory === 'ALL' && !searchKeyword && (
              <section className="bg-gradient-to-r from-[#143472] to-[#0071ba] rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-5 border-b border-blue-400/40 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black">
                      <Flame className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl font-black uppercase tracking-wide flex items-center gap-2">
                        THIẾT BỊ Y TẾ & PHCN TIÊU BIỂU
                      </h3>
                      <p className="text-xs text-blue-100">Các dòng thiết bị tiêu chuẩn chất lượng cao được tin dùng tại bệnh viện & gia đình</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-400/40">
                    <span className="text-amber-300">CHÍNH HÃNG 100%</span>
                    <span className="bg-white text-[#143472] px-2 py-0.5 rounded font-bold">TECNIC</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {flashDealProducts.map((prod) => (
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
                            Sẵn hàng
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* VIEW MODE: CATEGORY-BY-CATEGORY SECTIONS (Khi xem Tất Cả & không tìm kiếm) HOẶC FILTERED GRID */}
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
                      {/* CATEGORY SECTION HEADER (Khớp form ảnh người dùng cung cấp) */}
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

                        {/* NÚT XEM THÊM (Khớp ảnh mẫu màu xanh dương đậm đẹp mắt) */}
                        <button
                          onClick={() => {
                            setActiveCategory(category.id);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className="bg-[#0071ba] hover:bg-[#0e387a] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow transition flex items-center gap-1.5 active:scale-95"
                        >
                          <span>Xem thêm</span>
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
              /* SEARCH / CATEGORY TITLE & FILTER TOOLBAR (Khi lọc theo danh mục cụ thể hoặc tìm kiếm) */
              <section className="space-y-4">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  
                  {/* Title & Count */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => {
                          setActiveCategory('ALL');
                          setSearchKeyword('');
                          setSelectedBrand('ALL');
                        }}
                        className="text-xs font-bold text-[#0071ba] hover:underline flex items-center gap-1"
                      >
                        ← Xem tất cả danh mục
                      </button>
                    </div>
                    <h2 className="text-base sm:text-xl font-black text-[#143472] uppercase flex items-center gap-2">
                      {searchKeyword ? (
                        <>Kết quả tìm kiếm: <span className="text-[#0071ba]">"{searchKeyword}"</span></>
                      ) : activeCategory === 'ALL' ? (
                        'Tất Cả Thiết Bị Y Tế & Phục Hồi Chức Năng TECNIC'
                      ) : (
                        CATEGORIES.find(c => c.id === activeCategory)?.name
                      )}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Hiển thị <b>{filteredProducts.length}</b> thiết bị chính hãng tiêu chuẩn Bộ Y Tế
                    </p>
                  </div>

                  {/* Filter controls */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    
                    {/* Brand select */}
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

                    {/* Sort select */}
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5">
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#0071ba]" />
                      <select
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                        className="bg-transparent font-medium outline-none text-slate-700 text-xs"
                      >
                        <option value="featured">Nổi bật nhất</option>
                        <option value="price-asc">Giá: Thấp đến Cao</option>
                        <option value="price-desc">Giá: Cao đến Thấp</option>
                        <option value="discount">Giảm giá nhiều nhất</option>
                        <option value="sold">Bán chạy nhất</option>
                        <option value="rating">Đánh giá cao nhất</option>
                      </select>
                    </div>

                    {/* Reset filter button */}
                    {(selectedBrand !== 'ALL' || selectedSort !== 'featured' || searchKeyword || activeCategory !== 'ALL') && (
                      <button
                        onClick={() => {
                          setSelectedBrand('ALL');
                          setSelectedSort('featured');
                          setSearchKeyword('');
                          setActiveCategory('ALL');
                        }}
                        className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 transition"
                        title="Đặt lại bộ lọc"
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                    )}

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

      </main>

      {/* 6. FOOTER */}
      <Footer
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setCurrentView('PRODUCTS');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => {
          setCurrentView('ABOUT');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => {
          setCurrentView('CONTACT');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArticles={() => {
          setCurrentView('ARTICLES');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenProducts={() => {
          setCurrentView('PRODUCTS');
          setActiveCategory('ALL');
          setSearchKeyword('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 7. FLOATING CHATBOT (Dược Sĩ / Bác Sĩ Tư Vấn FPT Long Châu) */}
      <ChatBot
        onSelectProduct={(p) => handleSelectProduct(p)}
        allProducts={PRODUCTS}
      />

      {/* 8. MODALS */}
      <ProductModal
        product={selectedProduct}
        onClose={() => handleSelectProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onCopyLink={handleCopyProductLink}
      />

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
        onClose={() => setIsAdminOpen(false)}
        allProducts={PRODUCTS}
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
