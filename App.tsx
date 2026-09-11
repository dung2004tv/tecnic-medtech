import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bone, Baby, HeartPulse, Droplet, Scale, Ear, Sparkles, 
  Layers, Filter, ArrowUpDown, CheckCircle2, ChevronRight, ChevronDown, ChevronUp,
  SlidersHorizontal, RefreshCcw, Tag, ShieldCheck, Flame, ShoppingCart, Eye,
  ArrowUp, TrendingUp, X
} from 'lucide-react';
import { Header } from './components/Header';
import { Navigation, AppView } from './components/Navigation';
import { HeroSlider } from './components/HeroSlider';
import { HomePage } from './components/HomePage';
import { TecnicMedtechBanner } from './components/TecnicMedtechBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartModal } from './components/CartModal';
import { CartPage } from './components/CartPage';
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
import { MetaCategoryHeader } from './components/MetaCategoryHeader';
import { MetaSidebarFilter } from './components/MetaSidebarFilter';
import { PWAInstallModal } from './components/PWAInstallModal';
import { FloatingInstallPrompt } from './components/FloatingInstallPrompt';

import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES } from './data/productsData';
import { Product, CartItem, User, CategoryId, Order, Doctor } from './types';
import { signOutFirebase } from './firebase';

export default function App() {
  // 1. STATE: Trang chủ mặc định là HOME (Banner + Sản phẩm bán chạy dưới banner + Danh mục + Bài báo)
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('ALL');
  const [selectedFeature, setSelectedFeature] = useState<string>('ALL');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000000]);
  const [showLeftFilter, setShowLeftFilter] = useState<boolean>(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isCatalogFilterView, setIsCatalogFilterView] = useState<boolean>(false);
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
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [prefilledDoctor, setPrefilledDoctor] = useState<Doctor | null>(null);

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
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot' | 'admin'>('login');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminPath, setIsAdminPath] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/admin') || 
             window.location.search.includes('admin=true') || 
             window.location.hash === '#admin';
    }
    return false;
  });

  useEffect(() => {
    const checkAdminRoute = () => {
      if (typeof window !== 'undefined') {
        const isAdm = window.location.pathname.startsWith('/admin') || 
                      window.location.search.includes('admin=true') || 
                      window.location.hash === '#admin';
        setIsAdminPath(isAdm);
      }
    };

    // Kiểm tra nếu người dùng bấm link khôi phục mật khẩu từ email
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('mode') === 'resetPassword' || urlParams.get('oobCode')) {
        setIsAuthOpen(true);
        setAuthMode('forgot');
      }
    }

    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
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

  // Helper: Reset all search and filter conditions (trở về trang chủ mặc định)
  const handleResetFilters = () => {
    setActiveCategory('ALL');
    setSelectedTag('ALL');
    setSelectedBrand('ALL');
    setSelectedOrigin('ALL');
    setSelectedFeature('ALL');
    setPriceRange([0, 500000000]);
    setSearchKeyword('');
    setSelectedSort('featured');
    setIsCatalogFilterView(false);
  };

  // Helper: Open Best Sellers Filter & scroll
  const handleOpenBestSellersFilter = () => {
    setSelectedSort('sold');
    setIsCatalogFilterView(true);
    setTimeout(() => {
      document.getElementById('product-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Helper: Open Catalog Filter View
  const handleOpenCatalogFilterView = () => {
    setIsCatalogFilterView(true);
    setTimeout(() => {
      document.getElementById('product-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Helper: Click on a Best Seller product card to open detail & activate left sidebar filter with all products
  const handleBestSellerCardClick = (prod: Product) => {
    setIsCatalogFilterView(true);
    setActiveCategory(prod.category);
    setSelectedProduct(prod);
    setTimeout(() => {
      document.getElementById('product-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Helper: Navigate to specific view and sync URL
  const handleSelectView = (view: AppView, push: boolean = true) => {
    setSelectedProduct(null);
    setCurrentView(view);
    if (view === 'HOME' || view === 'PRODUCTS') {
      handleResetFilters();
    }
    if (push) {
      try {
        let path = '/';
        if (view === 'HOME') path = '/';
        else if (view === 'ABOUT') path = '/gioi-thieu.html';
        else if (view === 'ARTICLES') path = '/tin-tuc.html';
        else if (view === 'CONTACT') path = '/lien-he.html';
        else if (view === 'PRODUCTS') path = '/san-pham.html';
        else if (view === 'CART') path = '/gio-hang.html';
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
    setSelectedTag('ALL');
    setSelectedBrand('ALL');
    setSelectedOrigin('ALL');
    setSelectedFeature('ALL');
    setPriceRange([0, 500000000]);
    setSearchKeyword('');
    setCurrentView('PRODUCTS');
    if (catId !== 'ALL') {
      setIsCatalogFilterView(true);
    } else {
      setIsCatalogFilterView(false);
    }

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

  // Helper: Select brand with smart category auto-switch if empty
  const handleSelectBrand = (brand: string) => {
    setSelectedProduct(null);
    setSelectedBrand(brand);
    if (brand !== 'ALL') {
      const prodsInCat = products.filter(p => p.specifications.brand === brand && (activeCategory === 'ALL' || p.category === activeCategory));
      if (prodsInCat.length === 0) {
        setActiveCategory('ALL');
      }
    }
    setCurrentView('PRODUCTS');
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

        if (!cleanPath || cleanPath === '' || cleanPath === 'trang-chu' || cleanPath === 'index.html') {
          setCurrentView('HOME');
          setSelectedProduct(null);
          return;
        }

        if (cleanPath === 'gioi-thieu' || cleanPath === 'gioi-thieu.html' || cleanPath === 've-chung-toi') {
          setCurrentView('ABOUT');
          setSelectedProduct(null);
          return;
        }

        if (cleanPath === 'san-pham' || cleanPath === 'san-pham.html' || cleanPath === 'danh-muc' || cleanPath === 'tat-ca-san-pham') {
          setCurrentView('PRODUCTS');
          setActiveCategory('ALL');
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

        if (cleanPath === 'gio-hang' || cleanPath === 'gio-hang.html') {
          setCurrentView('CART');
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

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tecnic_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn("Save cart error:", e);
    }
  }, [cart]);

  // Save currentUser to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('tecnic_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('tecnic_user');
      }
    } catch (e) {
      console.warn("Save user error:", e);
    }
  }, [currentUser]);

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
    setCheckoutItems([{ product, quantity }]);
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
    try {
      localStorage.removeItem('tecnic_user');
      sessionStorage.removeItem('tecnic_user');
    } catch (e) {
      console.warn("Storage wipe error:", e);
    }
    signOutFirebase();
    setCurrentUser(null);
    showToast('Đã đăng xuất tài khoản thành công.');
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

      // Feature Tag / Subcategory filter
      if (selectedTag !== 'ALL') {
        const t = selectedTag.toLowerCase();
        const matchesTag = p.tags?.some(tag => tag.toLowerCase().includes(t));
        const matchesName = p.name.toLowerCase().includes(t);
        const matchesDesc = p.shortDescription.toLowerCase().includes(t);
        const matchesCategory = p.categoryName.toLowerCase().includes(t);
        if (!matchesTag && !matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== 'ALL' && p.specifications.brand !== selectedBrand) {
        return false;
      }

      // Origin filter - chuẩn hóa duy nhất 1 Nhật Bản
      if (selectedOrigin !== 'ALL') {
        const prodOrigin = (p.specifications.origin || '').trim().toLowerCase();
        const selOrigin = selectedOrigin.trim().toLowerCase();
        
        if (selOrigin.includes('nhật') || selOrigin.includes('japan')) {
          if (!prodOrigin.includes('nhật') && !prodOrigin.includes('japan')) return false;
        } else if (selOrigin.includes('trung') || selOrigin.includes('china')) {
          if (!prodOrigin.includes('trung') && !prodOrigin.includes('china')) return false;
        } else if (selOrigin.includes('mỹ') || selOrigin.includes('usa')) {
          if (!prodOrigin.includes('mỹ') && !prodOrigin.includes('usa')) return false;
        } else if (selOrigin.includes('đức') || selOrigin.includes('germany')) {
          if (!prodOrigin.includes('đức') && !prodOrigin.includes('germany')) return false;
        } else if (selOrigin.includes('đài loan') || selOrigin.includes('taiwan')) {
          if (!prodOrigin.includes('đài loan') && !prodOrigin.includes('taiwan')) return false;
        } else if (selOrigin.includes('việt nam') || selOrigin.includes('vietnam')) {
          if (!prodOrigin.includes('việt nam') && !prodOrigin.includes('vietnam')) return false;
        } else if (selOrigin.includes('hàn') || selOrigin.includes('korea')) {
          if (!prodOrigin.includes('hàn') && !prodOrigin.includes('korea')) return false;
        } else if (prodOrigin !== selOrigin) {
          return false;
        }
      }

      // Special feature filter
      if (selectedFeature !== 'ALL') {
        let keyword = selectedFeature.toLowerCase();
        if (selectedFeature === 'DienTuDong') keyword = 'điện';
        else if (selectedFeature === 'TayQuay') keyword = 'tay quay';
        else if (selectedFeature === 'BoVeSinh') keyword = 'bô';
        else if (selectedFeature === 'NangHa') keyword = 'nâng';
        else if (selectedFeature === 'ChuanCoCq') keyword = 'co/cq';

        const matchesTag = p.tags?.some(tag => tag.toLowerCase().includes(keyword));
        const matchesName = p.name.toLowerCase().includes(keyword);
        const matchesDesc = p.shortDescription.toLowerCase().includes(keyword);
        const matchesSpec = p.specifications.features?.some(f => f.toLowerCase().includes(keyword));
        if (!matchesTag && !matchesName && !matchesDesc && !matchesSpec) {
          return false;
        }
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
  }, [products, activeCategory, searchKeyword, selectedBrand, selectedOrigin, selectedFeature, selectedTag, selectedSort, priceRange]);

  // SẢN PHẨM BÁN CHẠY (Thay thế Thiết Bị PHCN Tiêu Biểu theo yêu cầu - Ảnh 3)
  // Các sản phẩm khi được tích "isBestSeller" hoặc có giảm giá được đẩy lên trang đầu
  const bestSellerProducts = useMemo(() => {
    const featured = products.filter(p => p.isBestSeller || p.discountPercent > 0);
    if (featured.length > 0) return featured.slice(0, 6);
    return products.slice(0, 6);
  }, [products]);

  // Check if viewing default homepage (form cũ: từng danh mục theo khối + bán chạy)
  const isHomeDefault = useMemo(() => {
    return (
      activeCategory === 'ALL' &&
      !searchKeyword &&
      selectedBrand === 'ALL' &&
      selectedTag === 'ALL' &&
      selectedOrigin === 'ALL' &&
      selectedFeature === 'ALL' &&
      priceRange[0] === 0 &&
      priceRange[1] >= 500000000 &&
      selectedSort !== 'sold' &&
      !isCatalogFilterView
    );
  }, [activeCategory, searchKeyword, selectedBrand, selectedTag, selectedOrigin, selectedFeature, priceRange, selectedSort, isCatalogFilterView]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#f4f7fb] text-slate-800 flex flex-col font-sans antialiased selection:bg-[#0071ba] selection:text-white relative">
      
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
        onOpenCart={() => handleSelectView('CART')}
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
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
        onQuickSearchTag={(tag) => {
          setSearchKeyword(tag);
          setActiveCategory('ALL');
          setSelectedProduct(null);
          if (currentView !== 'PRODUCTS') setCurrentView('PRODUCTS');
        }}
        currentSearchKeyword={searchKeyword}
        onLogoClick={() => handleSelectView('HOME')}
        onOpenInstallApp={() => setIsInstallModalOpen(true)}
      />

      {/* 3. NAVIGATION (Mega Menu, View Tabs & Category Tabs) */}
      <Navigation
        activeCategory={activeCategory}
        onSelectCategory={(catId) => handleSelectCategory(catId)}
        currentView={currentView}
        onSelectView={(view) => handleSelectView(view)}
        currentUser={currentUser}
      />

      {/* 4. HERO BANNER SLIDER (Thanh trượt TECNIC MEDTECH trên Trang Chủ) */}
      {currentView === 'HOME' && !selectedProduct && (
        <HeroSlider
          onSelectCategory={(catId) => handleSelectCategory(catId)}
          onContactClick={() => handleSelectView('CONTACT')}
        />
      )}

      {/* 5. MAIN BODY CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-4 py-4 sm:py-6 space-y-6 sm:space-y-8">
        
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
            {/* VIEW 1: HOME PAGE (TRANG CHỦ MẶC ĐỊNH: BANNER + SẢN PHẨM BÁN CHẠY DƯỚI BANNER + GỢI Ý DANH MỤC + BÀI BÁO Y KHOA) */}
            {currentView === 'HOME' && (
              <HomePage
                bestSellerProducts={bestSellerProducts}
                allProducts={products}
                onSelectProduct={(p) => handleSelectProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onSelectCategory={(catId) => handleSelectCategory(catId)}
                onOpenArticles={(articleId) => {
                  if (articleId) {
                    setSelectedArticleId(articleId);
                  }
                  handleSelectView('ARTICLES');
                }}
                onOpenAbout={() => handleSelectView('ABOUT')}
                onViewAllProducts={() => handleSelectView('PRODUCTS')}
              />
            )}

            {/* VIEW 2: DEDICATED ABOUT PAGE (KHI NÀO CẦN XEM PHẦN GIỚI THIỆU THÌ NHẤN VÀO MỚI XEM ĐƯỢC) */}
            {currentView === 'ABOUT' && (
              <div className="space-y-6">
                {/* Breadcrumbs for About */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <button onClick={() => handleSelectView('HOME')} className="text-[#0071ba] hover:underline font-bold cursor-pointer">
                    Trang chủ
                  </button>
                  <span>/</span>
                  <span className="text-slate-800 font-semibold">Giới thiệu TECNIC MEDTECH</span>
                </div>
                <AboutPage
                  onSelectCategory={(catId) => handleSelectCategory(catId)}
                  onOpenArticles={(articleId) => {
                    if (articleId) {
                      setSelectedArticleId(articleId);
                    }
                    handleSelectView('ARTICLES');
                  }}
                  onSelectProduct={(p) => handleSelectProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onViewAllProducts={() => handleSelectView('PRODUCTS')}
                  bestSellerProducts={bestSellerProducts}
                />
              </div>
            )}

            {/* VIEW 3: ARTICLES & MEDICAL KNOWLEDGE PAGE */}
            {currentView === 'ARTICLES' && (
              <div className="space-y-6">
                {/* Breadcrumbs for Articles */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <button onClick={() => handleSelectView('HOME')} className="text-[#0071ba] hover:underline font-bold cursor-pointer">
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

            {/* VIEW 4: CONTACT PAGE */}
            {currentView === 'CONTACT' && (
              <div className="space-y-6">
                {/* Breadcrumbs for Contact */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <button onClick={() => handleSelectView('HOME')} className="text-slate-700 hover:text-slate-900 hover:underline font-bold cursor-pointer">
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

            {/* VIEW: TRANG GIỎ HÀNG ĐẦY ĐỦ (FULL PAGE, THAY VÌ CHỈ POPUP) */}
            {currentView === 'CART' && (
              <CartPage
                items={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onProceedCheckout={(doctor) => {
                  setCheckoutItems(cart);
                  setPrefilledDoctor(doctor || null);
                  setIsCheckoutOpen(true);
                }}
                onContinueShopping={() => handleSelectView('PRODUCTS')}
                onGoHome={() => handleSelectView('HOME')}
              />
            )}

             {/* VIEW 5: PRODUCT CATALOG (KHI NHẤN VÀO SẢN PHẨM HOẶC DANH MỤC MỚI HIỆN RA) */}
            {currentView === 'PRODUCTS' && (
              <div id="product-catalog-grid" className="space-y-4 w-full">
                
                {/* 2-COLUMN LAYOUT: BÊN TRÁI LÀ CỘT BỘ LỌC, BÊN PHẢI LÀ NỘI DUNG SẢN PHẨM TRÊN CẢ MOBILE & DESKTOP */}
                <div className="flex flex-row items-start gap-2 sm:gap-4 md:gap-5 w-full">
                  
                  {/* CỘT BÊN TRÁI: BỘ LỌC HIỂN THỊ CỐ ĐỊNH TRÊN CẢ MOBILE VÀ DESKTOP (KHÔNG BỊ MẤT TRÊN MOBILE) */}
                  {showLeftFilter && (
                    <div className="w-[120px] xs:w-[138px] sm:w-56 md:w-64 lg:w-72 shrink-0 sticky top-20 z-20 self-start max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain pr-0.5 sm:pr-1 custom-scrollbar">
                      <MetaSidebarFilter
                        activeCategory={activeCategory}
                        onSelectCategory={(catId) => handleSelectCategory(catId)}
                        selectedTag={selectedTag}
                        onSelectTag={setSelectedTag}
                        selectedBrand={selectedBrand}
                        onSelectBrand={handleSelectBrand}
                        selectedPriceRange={priceRange}
                        onSelectPriceRange={setPriceRange}
                        selectedOrigin={selectedOrigin}
                        onSelectOrigin={setSelectedOrigin}
                        selectedFeature={selectedFeature}
                        onSelectFeature={setSelectedFeature}
                        allProducts={products}
                        onResetAll={handleResetFilters}
                      />
                    </div>
                  )}

                  {/* CỘT BÊN PHẢI: NỘI DUNG SẢN PHẨM RỘNG RÃI TRÊN CẢ MOBILE & DESKTOP */}
                  <div className="flex-1 min-w-0 space-y-4 sm:space-y-6 w-full">
                    
                    {/* THANH ĐIỀU HƯỚNG BỘ LỌC (CHỈ HIỆN KHI NGƯỜI DÙNG TÌM KIẾM HOẶC LỌC, KHÔNG ĐÈ TRÊN SẢN PHẨM BÁN CHẠY) */}
                    {!isHomeDefault && (
                      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            {/* Nút Ẩn/Hiện cột lọc bên trái (hoạt động trên cả Mobile và Desktop) */}
                            <button
                              type="button"
                              onClick={() => setShowLeftFilter(!showLeftFilter)}
                              className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold text-[#0071ba] bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-xl transition cursor-pointer border border-blue-200"
                              title={showLeftFilter ? 'Thu gọn cột lọc bên trái' : 'Mở cột lọc bên trái'}
                            >
                              <SlidersHorizontal className="w-3.5 h-3.5" />
                              <span>{showLeftFilter ? 'Ẩn lọc' : 'Hiện lọc'}</span>
                            </button>

                            <span className="text-[11px] sm:text-xs font-bold text-slate-700 truncate">
                              {filteredProducts.length} sản phẩm
                            </span>
                          </div>

                          {(selectedOrigin !== 'ALL' || selectedBrand !== 'ALL' || activeCategory !== 'ALL' || priceRange[0] > 0 || priceRange[1] < 500000000) && (
                            <button
                              type="button"
                              onClick={handleResetFilters}
                              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Bỏ lọc</span>
                            </button>
                          )}
                        </div>

                        {/* CÁC TIÊU CHÍ ĐANG LỌC */}
                        {(selectedOrigin !== 'ALL' || selectedBrand !== 'ALL' || activeCategory !== 'ALL' || priceRange[0] > 0 || priceRange[1] < 500000000) && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-100 text-[11px]">
                            <span className="text-slate-500 font-semibold">Đang lọc:</span>
                            {selectedOrigin !== 'ALL' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#0071ba] font-bold border border-blue-200">
                                Xuất xứ: {selectedOrigin}
                                <button onClick={() => setSelectedOrigin('ALL')} className="hover:text-red-500 cursor-pointer">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            )}
                            {selectedBrand !== 'ALL' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#0071ba] font-bold border border-blue-200">
                                Hãng: {selectedBrand}
                                <button onClick={() => handleSelectBrand('ALL')} className="hover:text-red-500 cursor-pointer">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            )}
                            {activeCategory !== 'ALL' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#0071ba] font-bold border border-blue-200">
                                {CATEGORIES.find(c => c.id === activeCategory)?.name}
                                <button onClick={() => handleSelectCategory('ALL')} className="hover:text-red-500 cursor-pointer">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {isHomeDefault ? (
                      /* 1. MẶC ĐỊNH TRANG CHỦ: SẢN PHẨM BÁN CHẠY + TỪNG KHỐI DANH MỤC CHUẨN FORM CŨ THEO ẢNH USER */
                      <div className="space-y-6">
                        
                        {/* MỤC SẢN PHẨM BÁN CHẠY */}
                        <section className="bg-gradient-to-r from-[#143472] to-[#0071ba] rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
                          <div className="flex flex-wrap justify-between items-center gap-3 mb-5 border-b border-blue-400/40 pb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-sm">
                                <TrendingUp className="w-5 h-5 text-blue-950" />
                              </div>
                              <div>
                                <h3 className="text-base sm:text-lg font-black uppercase tracking-wide">
                                  SẢN PHẨM BÁN CHẠY
                                </h3>
                              </div>
                            </div>

                            <button
                              onClick={handleOpenBestSellersFilter}
                              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs px-4 py-2 rounded-full shadow transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                            >
                              <span>Xem tất cả</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                            {bestSellerProducts.slice(0, 4).map((prod) => (
                              <div 
                                key={prod.id} 
                                onClick={() => handleSelectProduct(prod)}
                                className="bg-white text-slate-800 rounded-2xl p-2.5 flex flex-col justify-between hover:shadow-xl transition cursor-pointer group relative border border-slate-100 transform hover:-translate-y-1"
                              >
                                <div className="relative flex items-center justify-center h-32 rounded-xl overflow-hidden mb-1.5 bg-slate-50">
                                  <ProductImage product={prod} size="sm" showBadge={false} />
                                </div>
                                
                                <div>
                                  <h5 className="font-bold text-xs text-slate-900 line-clamp-2 min-h-[32px] leading-snug group-hover:text-[#0071ba]">
                                    {prod.name}
                                  </h5>
                                  <div className="mt-2 flex items-center justify-between">
                                    <span className="font-black text-xs sm:text-sm text-red-600 whitespace-nowrap">
                                      {prod.tecnicPrice.toLocaleString('vi-VN')}&nbsp;đ
                                    </span>
                                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                                      Bán chạy
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* TỪNG KHỐI DANH MỤC SẢN PHẨM CHUẨN FORM CŨ THEO ẢNH USER */}
                        <div className="space-y-6">
                          {CATEGORIES.filter(c => c.id !== 'ALL').map((category) => {
                            const catProducts = products.filter(p => p.category === category.id);
                            if (catProducts.length === 0) return null;

                            return (
                              <section 
                                key={category.id} 
                                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4"
                              >
                                {/* HEADER KHỐI: VẠCH XANH DỌC + TÊN DANH MỤC + NÚT XANH BO TRÒN XEM TẤT CẢ CHUẨN ẢNH */}
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                  <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-6 bg-[#0071ba] rounded-full"></span>
                                    <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                                      {category.name}
                                    </h4>
                                  </div>
                                  <button
                                    onClick={() => handleSelectCategory(category.id)}
                                    className="bg-[#0071ba] hover:bg-[#0e387a] text-white font-bold text-xs px-4 py-1.5 rounded-full transition shadow-xs flex items-center gap-1 cursor-pointer active:scale-95"
                                  >
                                    <span>Xem tất cả ({catProducts.length})</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                {/* LƯỚI SẢN PHẨM FORM CŨ */}
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
                                  {catProducts.slice(0, 4).map((prod) => (
                                    <ProductCard
                                      key={prod.id}
                                      product={prod}
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

                      </div>
                    ) : (
                      /* 2. KHI ĐANG LỌC HOẶC CHỌN 1 DANH MỤC CỤ THỂ */
                      <div className="space-y-4">
                        {/* BREADCRUMB & NÚT QUAY LẠI TRANG CHỦ */}
                        <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-3 rounded-2xl border border-slate-200/90 shadow-2xs text-xs">
                          <div className="flex items-center gap-2 text-slate-500">
                            <button 
                              onClick={handleResetFilters} 
                              className="text-[#0071ba] hover:underline font-bold cursor-pointer"
                            >
                              Trang chủ
                            </button>
                            <span>/</span>
                            <span className="text-slate-900 font-bold">
                              {activeCategory === 'ALL'
                                ? (searchKeyword ? `Tìm kiếm: "${searchKeyword}"` : 'Tất cả sản phẩm phân loại')
                                : (CATEGORIES.find(c => c.id === activeCategory)?.name || 'Phân loại')}
                            </span>
                          </div>
                          <button
                            onClick={handleResetFilters}
                            className="text-[11px] font-bold text-slate-700 hover:text-[#0071ba] flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-slate-200 transition cursor-pointer"
                          >
                            <RefreshCcw className="w-3 h-3" />
                            <span>Quay lại trang chủ (Xem theo khối)</span>
                          </button>
                        </div>

                        {/* HEADER ROW: TIÊU ĐỀ + ƯU TIÊN XEM */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">
                              {activeCategory === 'ALL'
                                ? (searchKeyword ? `TÌM KIẾM: "${searchKeyword}"` : 'TẤT CẢ SẢN PHẨM')
                                : (CATEGORIES.find(c => c.id === activeCategory)?.name?.toUpperCase() || 'DANH MỤC SẢN PHẨM')}
                            </h2>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Hiển thị <b className="text-slate-800">{filteredProducts.length}</b> sản phẩm chính hãng
                            </p>
                          </div>

                          {/* Ưu tiên xem: Nổi bật | Bán chạy | Giá thấp | Giá cao */}
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-slate-500 font-medium mr-1 hidden sm:inline">Ưu tiên xem:</span>
                            {[
                              { id: 'featured', label: 'Nổi bật' },
                              { id: 'sold', label: 'Bán chạy' },
                              { id: 'price-asc', label: 'Giá thấp' },
                              { id: 'price-desc', label: 'Giá cao' },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => setSelectedSort(item.id as any)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                  selectedSort === item.id
                                    ? 'bg-blue-50 text-[#0071ba] border border-blue-200'
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-transparent'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* PRODUCT GRID CỦA KẾT QUẢ LỌC */}
                        {filteredProducts.length === 0 ? (
                          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                            <div className="w-16 h-16 bg-blue-50 text-[#0071ba] rounded-full flex items-center justify-center mx-auto">
                              <Filter className="w-8 h-8" />
                            </div>
                            <h4 className="text-base font-bold text-slate-800">Không tìm thấy sản phẩm phù hợp</h4>
                            <p className="text-xs text-slate-500 max-w-md mx-auto">
                              Vui lòng thử điều chỉnh lại mức giá, thương hiệu hoặc từ khóa tìm kiếm để xem thêm sản phẩm.
                            </p>
                            <button
                              onClick={handleResetFilters}
                              className="px-4 py-2 bg-[#0071ba] text-white text-xs font-bold rounded-xl hover:bg-[#0e387a] transition shadow cursor-pointer"
                            >
                              Xóa tất cả bộ lọc
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
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
                      </div>
                    )}

                  </div>
                </div>

              </div>
            )}
          </>
        )}

      </main>

      {/* 6. BOTTOM PARTNERS */}
      <PartnersSection className="bg-slate-50 border-t border-slate-200/80" />

      {/* 7. CONSULTATION BANNER FORM (TECNIC Brand Blue #0071ba) */}
      <ConsultationBanner onSuccess={(em) => showToast(`Đã nhận thông tin đăng ký tư vấn cho ${em}!`)} />

      {/* 8. FOOTER */}
      <Footer
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setSelectedProduct(null);
          setCurrentView('PRODUCTS');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHome={() => {
          setSelectedProduct(null);
          handleSelectView('HOME');
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
        onOpenAdmin={() => {
          setIsAdminOpen(true);
        }}
        onOpenInstallApp={() => setIsInstallModalOpen(true)}
      />

      {/* 8. FLOATING CHATBOT */}
      <ChatBot
        onSelectProduct={(p) => handleSelectProduct(p)}
        onSelectCategory={(catId) => handleSelectCategory(catId)}
        onOpenHome={() => handleSelectView('HOME')}
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
        onProceedCheckout={(doctor) => {
          setCheckoutItems(cart);
          setPrefilledDoctor(doctor || null);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setCheckoutItems([]);
          setPrefilledDoctor(null);
        }}
        items={checkoutItems.length > 0 ? checkoutItems : cart}
        currentUser={currentUser}
        prefilledDoctor={prefilledDoctor}
        onOrderSuccess={(order) => {
          // If we checked out the full cart, clear main cart
          if (checkoutItems.length === 0 || checkoutItems === cart) {
            setCart([]);
          }
          setCheckoutItems([]);
          setPrefilledDoctor(null);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Xin chào, ${user.fullName}!`);
        }}
      />

      <CompanyAbout
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <AdminPortal
        isOpen={isAdminOpen || isAdminPath}
        onClose={() => {
          setIsAdminOpen(false);
          setIsAdminPath(false);
          if (typeof window !== 'undefined') {
            window.history.pushState(null, '', '/');
          }
          loadProducts(); // Reload products when admin closes
        }}
        allProducts={products}
        onProductsChange={(newProducts) => {
          setProducts(newProducts);
        }}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Đăng nhập Admin thành công: ${user.fullName}`);
        }}
        onLogout={handleLogout}
        onSelectProduct={(p) => {
          setIsAdminOpen(false);
          setIsAdminPath(false);
          if (typeof window !== 'undefined') {
            window.history.pushState(null, '', '/');
          }
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

      {/* PWA INSTALL MODAL */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* MOBILE FILTER DRAWER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div 
            className="flex-1 w-full"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border-t border-slate-200 animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0071ba]" />
                <h3 className="font-bold text-sm text-slate-800">Bộ lọc sản phẩm</h3>
                <span className="text-xs text-slate-500 font-semibold">({filteredProducts.length} kết quả)</span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto overscroll-contain flex-1">
              <MetaSidebarFilter
                activeCategory={activeCategory}
                onSelectCategory={(catId) => {
                  handleSelectCategory(catId);
                }}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
                selectedBrand={selectedBrand}
                onSelectBrand={handleSelectBrand}
                selectedPriceRange={priceRange}
                onSelectPriceRange={setPriceRange}
                selectedOrigin={selectedOrigin}
                onSelectOrigin={setSelectedOrigin}
                selectedFeature={selectedFeature}
                onSelectFeature={setSelectedFeature}
                allProducts={products}
                onResetAll={handleResetFilters}
              />
            </div>

            <div className="p-3.5 border-t border-slate-100 bg-white flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition text-center"
              >
                Thiết lập lại
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#0071ba] text-white text-xs font-bold hover:bg-[#0e387a] transition shadow-xs text-center"
              >
                Xem {filteredProducts.length} sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
