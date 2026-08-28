import React, { useState, useEffect } from 'react';
import { 
  Menu, Home, Phone, LogOut, Maximize2, 
  LayoutDashboard, Package, ChevronDown, ChevronRight, Newspaper, 
  BookOpen, Sliders, ShoppingCart, PhoneCall, Settings, Users,
  FolderTree, Star, FileText, Code, ShieldCheck, UserCheck, 
  Sparkles, X, Check, Eye, Trash2, Edit, Plus, RefreshCcw, Lock
} from 'lucide-react';
import { Product, Article, Order, User } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/productsData';
import { INITIAL_ARTICLES } from '../data/articlesData';

// Admin Sub-components
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminCategoryProduct } from './admin/AdminCategoryProduct';
import { AdminProductList } from './admin/AdminProductList';
import { AdminProductReviews } from './admin/AdminProductReviews';
import { AdminArticleList } from './admin/AdminArticleList';
import { AdminInfoPages } from './admin/AdminInfoPages';
import { AdminSliderBanner } from './admin/AdminSliderBanner';
import { AdminPartners } from './admin/AdminPartners';
import { AdminOrderList } from './admin/AdminOrderList';
import { AdminContactList } from './admin/AdminContactList';
import { AdminSeoConfig } from './admin/AdminSeoConfig';
import { AdminCodeConfig } from './admin/AdminCodeConfig';
import { AdminRedirectConfig } from './admin/AdminRedirectConfig';
import { AdminUserList } from './admin/AdminUserList';
import { AdminArticleCategories } from './admin/AdminArticleCategories';
import { RichTextEditor } from './admin/RichTextEditor';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: User | null;
  allProducts?: Product[];
  onLogout?: () => void;
  onSelectProduct?: (p: any) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allProducts,
  onLogout,
  onSelectProduct,
  onOpenAuth
}) => {
  // Navigation State
  const [activeMenu, setActiveMenu] = useState<string>('DASHBOARD');
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({
    PRODUCTS_GROUP: true,
    NEWS_GROUP: false,
    CONFIG_GROUP: false,
    USERS_GROUP: false
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Core Data State
  const [products, setProducts] = useState<Product[]>(allProducts || PRODUCTS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [orders, setOrders] = useState<Order[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);

  // Modals & Active Edit State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [productActiveTab, setProductActiveTab] = useState<'basic' | 'specs' | 'content' | 'images'>('basic');

  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCategory, setAiCategory] = useState('KIEN_THUC_PHCN');
  const [aiTarget, setAiTarget] = useState('Bác sĩ, điều dưỡng, người bệnh và gia đình chăm sóc');
  const [aiKeywords, setAiKeywords] = useState('Phục hồi chức năng, TECNIC MEDTECH, thiết bị y tế chuẩn Bộ Y Tế');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Toggle Sub-menu
  const toggleSubMenu = (group: string) => {
    setOpenSubMenus(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // Fetch backend data
  const loadAdminData = async () => {
    try {
      const [ordRes, usrRes, artRes] = await Promise.all([
        fetch('/api/orders').catch(() => null),
        fetch('/api/users').catch(() => null),
        fetch('/api/articles').catch(() => null)
      ]);

      if (ordRes) {
        const ordData = await ordRes.json();
        if (ordData.success && ordData.data) setOrders(ordData.data);
      }
      if (usrRes) {
        const usrData = await usrRes.json();
        if (usrData.success && usrData.data) setUsersList(usrData.data);
      }
      if (artRes) {
        const artData = await artRes.json();
        if (artData.success && artData.data) setArticles(artData.data);
      }
    } catch (e) {
      console.warn("Backend data load failed:", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAdminData();
    }
  }, [isOpen]);

  // Product CRUD
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    if (editingProduct.id) {
      // Update
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct } as Product : p));
      showToast("Đã cập nhật thông tin sản phẩm thành công!");
    } else {
      // Create new
      const newP: Product = {
        id: Date.now(),
        code: `MED-${Date.now().toString().slice(-4)}`,
        name: editingProduct.name,
        category: editingProduct.category || 'GIUONG_Y_TE',
        categoryName: editingProduct.categoryName || 'Giường y tế đa năng',
        marketPrice: editingProduct.marketPrice || 5000000,
        tecnicPrice: editingProduct.tecnicPrice || 4200000,
        discountPercent: editingProduct.discountPercent || 15,
        stock: editingProduct.stock || 20,
        soldCount: 0,
        rating: 5,
        reviewCount: 0,
        isFeatured: editingProduct.isFeatured || false,
        image: editingProduct.image || '/products/GIUONG-Y-TE-4-TAY-QUAY.png',
        shortDescription: editingProduct.shortDescription || '',
        fullDescription: editingProduct.fullDescription || 'Sản phẩm y tế chính hãng chất lượng cao từ TECNIC MEDTECH.',
        specifications: editingProduct.specifications || { brand: 'TECNIC', origin: 'Việt Nam', warrantyMonths: 24 }
      };
      setProducts(prev => [newP, ...prev]);
      showToast("Đã thêm mới sản phẩm thành công!");
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number | string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(prev => prev.filter(p => p.id !== Number(id) && p.id.toString() !== id.toString()));
      showToast("Đã xóa sản phẩm thành công!");
    }
  };

  // Article CRUD
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;

    if (editingArticle.id) {
      setArticles(prev => prev.map(a => a.id === editingArticle.id ? { ...a, ...editingArticle } as Article : a));
      showToast("Đã cập nhật bài viết thành công!");
    } else {
      const newArt: Article = {
        id: `art-${Date.now()}`,
        title: editingArticle.title,
        slug: editingArticle.slug || editingArticle.title.toLowerCase().replace(/\s+/g, '-'),
        category: (editingArticle.category as any) || 'KIEN_THUC_PHCN',
        categoryName: editingArticle.categoryName || 'Kiến thức y khoa',
        excerpt: editingArticle.excerpt || '',
        content: editingArticle.content || '',
        coverImage: editingArticle.coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
        author: editingArticle.author || { name: 'Ban Biên Tập TECNIC', title: 'Chuyên gia Y tế' },
        publishedAt: new Date().toISOString().slice(0, 10),
        readTime: editingArticle.readTime || '5 phút đọc',
        tags: editingArticle.tags || ['Thiết bị y tế', 'TECNIC'],
        views: 150,
        isFeatured: editingArticle.isFeatured || false
      };
      setArticles(prev => [newArt, ...prev]);
      showToast("Đã xuất bản bài viết mới thành công!");
    }

    setIsArticleModalOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      setArticles(prev => prev.filter(a => a.id !== id));
      showToast("Đã xóa bài viết thành công!");
    }
  };

  // AI Article Generation via Server API
  const handleGenerateAiArticle = async () => {
    if (!aiTopic.trim()) {
      alert("Vui lòng nhập chủ đề bài viết!");
      return;
    }
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/articles/generate-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          category: aiCategory,
          targetAudience: aiTarget,
          keywordFocus: aiKeywords
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setEditingArticle(data.data);
        setIsAiModalOpen(false);
        setIsArticleModalOpen(true);
        showToast("Gemini AI đã soạn thảo bài báo y khoa thành công!");
      }
    } catch (e) {
      alert("Lỗi khi kết nối AI");
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Order status
  const handleUpdateOrderStatus = async (orderId: string, status: string, payment?: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status as any, paymentStatus: (payment as any) || o.paymentStatus } : o));
    showToast("Đã cập nhật trạng thái đơn hàng!");
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      showToast("Đã xóa đơn hàng!");
    }
  };

  if (!isOpen) return null;

  // Authorization Check: Admin or Staff
  const isAuthorized = currentUser && (currentUser.accountType === 'ADMIN' || currentUser.accountType === 'STAFF');

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Khu Vực Quản Trị Hệ Thống</h3>
          <p className="text-xs text-slate-600">
            Trang quản trị chỉ dành riêng cho <b>Quản Trị Viên</b> và <b>Nhân Viên TECNIC</b>. Quý khách hàng hoặc người dùng chưa đăng nhập không có quyền truy cập khu vực này.
          </p>
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition">
              Về Trang Mua Sắm
            </button>
            <button 
              onClick={() => {
                onClose();
                if (onOpenAuth) onOpenAuth('login');
              }}
              className="flex-1 px-4 py-2 bg-[#0071ba] hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition shadow-md"
            >
              Đăng Nhập Quản Trị
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#f4f6f9] flex flex-col font-sans overflow-hidden text-slate-800">
      
      {/* 1. TOP HEADER BAR (Chuẩn giao diện hình 1 - 13) */}
      <header className="bg-[#222d32] text-white h-12 px-4 flex items-center justify-between shadow-xs shrink-0 z-30 border-b border-slate-700">
        
        {/* Left: Brand & Hamburger Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white transition"
            title="Đóng / Mở menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <span className="font-bold text-sm text-white tracking-wide hidden sm:inline">
            TECNIC ADMIN
          </span>
        </div>

        {/* Center: Marquee Notice text (chuẩn hình) */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:flex items-center text-xs text-slate-300 overflow-hidden">
          <span className="truncate">
            Với đội ngũ nhân sự năng động luôn sẵn sàng tư vấn và hỗ trợ phục vụ quý khách hàng...
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white px-3 py-1.5 rounded font-bold transition shadow-xs"
            title="Quay lại giao diện mua sắm"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trang chủ</span>
          </button>

          <a
            href="tel:0981784234"
            className="hidden lg:flex items-center gap-1.5 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded font-bold transition shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hỗ trợ 24/7: 0981 784 234</span>
          </a>

          <button
            onClick={() => {
              if (onLogout) onLogout();
              onClose();
            }}
            className="flex items-center gap-1.5 bg-[#dc3545] hover:bg-[#c82333] text-white px-3 py-1.5 rounded font-bold transition shadow-xs"
            title="Đăng xuất"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Thoát</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN LAYOUT (Sidebar + Main View) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR (Dark Navy #222d32 chuẩn hình 1-13) */}
        <aside className={`${sidebarCollapsed ? 'w-14' : 'w-56'} bg-[#222d32] text-slate-300 flex flex-col transition-all duration-200 shrink-0 border-r border-slate-700 overflow-y-auto select-none text-xs`}>
          
          {/* User Profile Box (Avatar tròn + Admin) */}
          <div className="p-3 border-b border-slate-700/80 bg-slate-900/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-slate-800 font-black flex items-center justify-center shrink-0 shadow-xs">
              <UserCheck className="w-5 h-5 text-blue-600" />
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <p className="font-bold text-white text-xs truncate">Admin</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Online</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Menu List */}
          <nav className="flex-1 py-2 space-y-0.5">
            
            {/* 1. BẢNG ĐIỀU KHIỂN */}
            <button
              onClick={() => setActiveMenu('DASHBOARD')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition text-left ${
                activeMenu === 'DASHBOARD' 
                  ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#00c0ef] shrink-0" />
              {!sidebarCollapsed && <span>BẢNG ĐIỀU KHIỂN</span>}
            </button>

            {/* 2. Quản lý modul sản phẩm (Dropdown) */}
            <div>
              <button
                onClick={() => toggleSubMenu('PRODUCTS_GROUP')}
                className={`w-full flex items-center justify-between px-3 py-2.5 transition text-left ${
                  ['CATEGORY_PRODUCT', 'PRODUCTS', 'PRODUCT_REVIEWS'].includes(activeMenu)
                    ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Package className="w-4 h-4 text-[#00c0ef] shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">Quản lý modul sản phẩm</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openSubMenus.PRODUCTS_GROUP ? 'rotate-180' : ''}`} />
                )}
              </button>

              {!sidebarCollapsed && openSubMenus.PRODUCTS_GROUP && (
                <div className="bg-[#2c3b41] text-[11px] py-1 space-y-0.5">
                  <button
                    onClick={() => setActiveMenu('CATEGORY_PRODUCT')}
                    className={`w-full text-left py-1.5 pl-8 pr-3 transition flex items-center gap-1.5 ${
                      activeMenu === 'CATEGORY_PRODUCT' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>» Danh mục sản phẩm</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('PRODUCTS')}
                    className={`w-full text-left py-1.5 pl-8 pr-3 transition flex items-center gap-1.5 ${
                      activeMenu === 'PRODUCTS' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>» Sản phẩm</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('PRODUCT_REVIEWS')}
                    className={`w-full text-left py-1.5 pl-8 pr-3 transition flex items-center gap-1.5 ${
                      activeMenu === 'PRODUCT_REVIEWS' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>» Quản lý đánh giá</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Quản lý modul tin tức (Dropdown) */}
            <div>
              <button
                onClick={() => toggleSubMenu('NEWS_GROUP')}
                className={`w-full flex items-center justify-between px-3 py-2.5 transition text-left ${
                  ['ARTICLES', 'NEWS_CATEGORIES'].includes(activeMenu)
                    ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Newspaper className="w-4 h-4 text-[#00c0ef] shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">Quản lý modul tin tức</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openSubMenus.NEWS_GROUP ? 'rotate-180' : ''}`} />
                )}
              </button>

              {!sidebarCollapsed && openSubMenus.NEWS_GROUP && (
                <div className="bg-[#2c3b41] text-[11px] py-1 space-y-0.5">
                  <button
                    onClick={() => setActiveMenu('NEWS_CATEGORIES')}
                    className={`w-full text-left py-1.5 pl-8 pr-3 transition flex items-center gap-1.5 ${
                      activeMenu === 'NEWS_CATEGORIES' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>» Danh mục</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('ARTICLES')}
                    className={`w-full text-left py-1.5 pl-8 pr-3 transition flex items-center gap-1.5 ${
                      activeMenu === 'ARTICLES' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>» Tin tức</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Trang thông tin */}
            <button
              onClick={() => setActiveMenu('INFO_PAGES')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition text-left ${
                activeMenu === 'INFO_PAGES' 
                  ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#00c0ef] shrink-0" />
              {!sidebarCollapsed && <span>Trang thông tin</span>}
            </button>

            {/* 5. Quản lý slide trang chủ */}
            <button
              onClick={() => setActiveMenu('SLIDES')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition text-left ${
                activeMenu === 'SLIDES' 
                  ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Sliders className="w-4 h-4 text-[#00c0ef] shrink-0" />
              {!sidebarCollapsed && <span>Quản lý slide trang chủ</span>}
            </button>

                        {/* Quản lý Đối tác - Khách hàng */}
            <button
              onClick={() => setActiveMenu('PARTNERS')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition text-left ${
                activeMenu === 'PARTNERS' 
                  ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Users className="w-4 h-4 text-[#00c0ef] shrink-0" />
              {!sidebarCollapsed && <span>Đối tác - Khách hàng</span>}
            </button>
            
            {/* 6. Quản lý đơn hàng */}
            <button
              onClick={() => setActiveMenu('ORDERS')}
              className={`w-full flex items-center justify-between px-3 py-2.5 transition text-left ${
                activeMenu === 'ORDERS' 
                  ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-4 h-4 text-[#00c0ef] shrink-0" />
                {!sidebarCollapsed && <span>Quản lý đơn hàng</span>}
              </div>
              <span className="bg-[#dd4b39] text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                {orders.length || 2}
              </span>
            </button>

            {/* 7. Thông tin liên hệ */}
            <button
              onClick={() => setActiveMenu('CONTACTS')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition text-left ${
                activeMenu === 'CONTACTS' 
                  ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-[#00c0ef] shrink-0" />
              {!sidebarCollapsed && <span>Thông tin liên hệ</span>}
            </button>

            {/* 8. Cấu hình hệ thống (Dropdown) */}
            <div>
              <button
                onClick={() => toggleSubMenu('CONFIG_GROUP')}
                className={`w-full flex items-center justify-between px-3 py-2.5 transition text-left ${
                  ['SEO_CONFIG', 'CODE_CONFIG', 'REDIRECT_CONFIG'].includes(activeMenu)
                    ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Settings className="w-4 h-4 text-[#00c0ef] shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">Cấu hình hệ thống</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openSubMenus.CONFIG_GROUP ? 'rotate-180' : ''}`} />
                )}
              </button>

              {!sidebarCollapsed && openSubMenus.CONFIG_GROUP && (
                <div className="bg-[#2c3b41] text-[11px] py-1 space-y-0.5">
                  <button
                    onClick={() => setActiveMenu('SEO_CONFIG')}
                    className={`w-full text-left py-1.5 pl-8 pr-3 transition flex items-center gap-1.5 ${
                      activeMenu === 'SEO_CONFIG' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>» Cấu hình seo trang chủ</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('CODE_CONFIG')}
                    className={`w-full text-left py-1.5 pl-8 pr-3 transition flex items-center gap-1.5 ${
                      activeMenu === 'CODE_CONFIG' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>» Quản lý mã code quảng cáo</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('REDIRECT_CONFIG')}
                    className={`w-full text-left py-1.5 pl-8 pr-3 transition flex items-center gap-1.5 ${
                      activeMenu === 'REDIRECT_CONFIG' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>» Redirect link</span>
                  </button>
                </div>
              )}
            </div>

            {/* 9. Quản lý quản trị viên (Dropdown) */}
            <div>
              <button
                onClick={() => toggleSubMenu('USERS_GROUP')}
                className={`w-full flex items-center justify-between px-3 py-2.5 transition text-left ${
                  activeMenu === 'USERS' 
                    ? 'bg-[#1e282c] text-white font-bold border-l-4 border-[#00c0ef]' 
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Users className="w-4 h-4 text-[#00c0ef] shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">Quản lý quản trị viên</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openSubMenus.USERS_GROUP ? 'rotate-180' : ''}`} />
                )}
              </button>

              {!sidebarCollapsed && openSubMenus.USERS_GROUP && (
                <div className="bg-[#2c3b41] text-[11px] py-1 space-y-0.5">
                  <button
                    onClick={() => setActiveMenu('USERS')}
                    className={`w-full text-left py-1.5 pl-8 pr-3 transition flex items-center gap-1.5 ${
                      activeMenu === 'USERS' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>» Danh sách quản trị viên</span>
                  </button>
                </div>
              )}
            </div>

          </nav>
        </aside>

        {/* MAIN VIEW CONTAINER */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#f4f6f9] flex flex-col justify-between">
          
          {/* TOAST ALERT */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 bg-[#222d32] text-white px-4 py-2.5 rounded shadow-2xl border border-[#00c0ef] flex items-center gap-2 text-xs font-bold animate-fadeIn">
              <span className="text-[#00c0ef]">✓</span>
              <span>{toastMsg}</span>
            </div>
          )}

          {/* DYNAMIC SUBVIEWS */}
          <div className="max-w-7xl w-full mx-auto">
            {activeMenu === 'DASHBOARD' && (
              <AdminDashboard 
                products={products}
                articles={articles}
                contactCount={2}
                onNavigate={setActiveMenu}
              />
            )}

            {activeMenu === 'CATEGORY_PRODUCT' && (
              <AdminCategoryProduct 
                products={products}
                onEditProduct={(p) => {
                  setEditingProduct(p);
                  setIsProductModalOpen(true);
                }}
                onDeleteProduct={handleDeleteProduct}
                onAddNewProduct={() => {
                  setEditingProduct({
                    name: '',
                    category: 'GIUONG_Y_TE',
                    categoryName: 'Giường y tế đa năng',
                    marketPrice: 5000000,
                    tecnicPrice: 4200000,
                    discountPercent: 16,
                    stock: 20,
                    isFeatured: true,
                    image: '/products/GIUONG-Y-TE-4-TAY-QUAY.png',
                    shortDescription: 'Thiết bị y tế chính hãng TECNIC MEDTECH'
                  });
                  setIsProductModalOpen(true);
                }}
              />
            )}

            {activeMenu === 'PRODUCTS' && (
              <AdminProductList 
                products={products}
                onEditProduct={(p) => {
                  setEditingProduct(p);
                  setIsProductModalOpen(true);
                }}
                onDeleteProduct={handleDeleteProduct}
                onAddNewProduct={() => {
                  setEditingProduct({
                    name: '',
                    category: 'GIUONG_Y_TE',
                    categoryName: 'Giường y tế đa năng',
                    marketPrice: 5000000,
                    tecnicPrice: 4200000,
                    discountPercent: 16,
                    stock: 20,
                    isFeatured: true,
                    image: '/products/GIUONG-Y-TE-4-TAY-QUAY.png',
                    shortDescription: 'Thiết bị y tế chính hãng TECNIC MEDTECH'
                  });
                  setIsProductModalOpen(true);
                }}
              />
            )}

            {activeMenu === 'PRODUCT_REVIEWS' && (
              <AdminProductReviews />
            )}

            {activeMenu === 'ARTICLES' && (
              <AdminArticleList 
                articles={articles}
                onEditArticle={(a) => {
                  setEditingArticle(a);
                  setIsArticleModalOpen(true);
                }}
                onDeleteArticle={handleDeleteArticle}
                onAddNewArticle={() => {
                  setEditingArticle({
                    title: '',
                    category: 'KIEN_THUC_PHCN',
                    categoryName: 'Kiến thức phục hồi chức năng',
                    excerpt: '',
                    content: '',
                    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
                    author: { name: 'BS. CKII Nguyễn Văn Hùng', title: 'Cố vấn Y khoa TECNIC' },
                    isFeatured: true
                  });
                  setIsArticleModalOpen(true);
                }}
                onOpenAiModal={() => setIsAiModalOpen(true)}
              />
            )}

            {activeMenu === 'NEWS_CATEGORIES' && <AdminArticleCategories />}

            {activeMenu === 'INFO_PAGES' && <AdminInfoPages />}

                        {activeMenu === 'SLIDES' && <AdminSliderBanner />}
            {activeMenu === 'PARTNERS' && <AdminPartners />}

            {activeMenu === 'ORDERS' && (
              <AdminOrderList 
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onDeleteOrder={handleDeleteOrder}
                onViewOrderDetails={(o) => setViewingOrder(o)}
              />
            )}

            {activeMenu === 'CONTACTS' && <AdminContactList />}

            {activeMenu === 'SEO_CONFIG' && <AdminSeoConfig />}

            {activeMenu === 'CODE_CONFIG' && <AdminCodeConfig />}

            {activeMenu === 'REDIRECT_CONFIG' && <AdminRedirectConfig />}

            {activeMenu === 'USERS' && <AdminUserList usersList={usersList} />}
          </div>

          {/* Footer (BIVACO © All right reserved. chuẩn hình 1-13) */}
          <footer className="mt-8 pt-3 border-t border-slate-200 text-xs text-slate-500 text-center font-medium">
            BIVACO © All right reserved.
          </footer>

        </main>
      </div>

      {/* ============================================================
          MODAL: THÊM / SỬA SẢN PHẨM (4 TABS)
          ============================================================ */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-[100] bg-[#f4f6f9] overflow-y-auto flex flex-col font-sans">
          {/* Top Bar */}
          <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
            <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <h2 className="text-xl font-normal text-slate-800">
                   {editingProduct.id ? 'Sửa sản phẩm' : 'Thêm mới sản phẩm'}
                 </h2>
                 <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                    <span>Trang chủ</span> <span>/</span>
                    <span>Sản phẩm</span> <span>/</span>
                    <span className="text-[#0071ba]">{editingProduct.id ? 'Sửa sản phẩm' : 'Thêm mới sản phẩm'}</span>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleSaveProduct} className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-2 rounded font-bold text-sm shadow-sm transition">
                  CHẤP NHẬN
                </button>
                <button type="button" onClick={() => setEditingProduct({...editingProduct})} className="bg-[#5bc0de] hover:bg-[#31b0d5] text-white px-4 py-2 rounded font-bold text-sm shadow-sm transition">
                  LÀM LẠI
                </button>
                <button onClick={() => setIsProductModalOpen(false)} className="text-slate-500 hover:text-slate-800 ml-2 sm:ml-4 flex items-center gap-1 text-sm">
                  <LogOut className="w-4 h-4" /> Thoát
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white rounded shadow-xs border-t-[3px] border-t-[#00c0ef]">
                  <div className="border-b border-slate-100 p-3">
                     <h3 className="text-base font-normal text-slate-800">Thông tin Sản phẩm</h3>
                  </div>
                  <div className="p-4 sm:p-5">
                     <div className="flex border-b border-slate-200 mb-6">
                        <button type="button" className="px-6 py-2.5 text-sm text-slate-500 bg-slate-50 border-t border-x border-slate-200 rounded-t mr-1 hover:bg-slate-100 transition">
                           Tổng quan
                        </button>
                        <button type="button" className="px-6 py-2.5 text-sm text-[#0071ba] bg-white font-bold border-t-2 border-t-[#28a745] border-x border-slate-200 rounded-t -mb-px">
                           Việt Nam
                        </button>
                     </div>

                     <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700">Tên sản phẩm</label>
                           <div className="col-span-12 sm:col-span-9">
                             <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:border-[#3c8dbc] outline-none" value={editingProduct.name || ''} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                           </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700">Slug</label>
                           <div className="col-span-12 sm:col-span-9">
                             <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:border-[#3c8dbc] outline-none" value={editingProduct.code || ''} onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })} />
                           </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-start">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700 mt-2">Giới thiệu</label>
                           <div className="col-span-12 sm:col-span-9">
                             <textarea className="w-full border border-slate-300 rounded p-2 text-sm focus:border-[#3c8dbc] outline-none" rows={3} value={editingProduct.shortDescription || ''} onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })} />
                           </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-start">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700 mt-2">Mô tả sản phẩm</label>
                           <div className="col-span-12 sm:col-span-9">
                             <RichTextEditor
                               value={editingProduct.fullDescription || ''}
                               onChange={(val) => setEditingProduct({ ...editingProduct, fullDescription: val })}
                               placeholder="Nhập mô tả chi tiết tính năng, thông số kỹ thuật, hướng dẫn sử dụng sản phẩm..."
                               minHeight="280px"
                               showAiButton={true}
                               onAiGenerate={() => {
                                 const promptDesc = `### 🌟 ĐẶC ĐIỂM NỔI BẬT\n- Thiết kế chuẩn y khoa, an toàn tuyệt đối cho người bệnh và kỹ thuật viên.\n- Khung hợp kim cao cấp chịu lực cao, độ bền vượt trội.\n- Đạt chuẩn chứng nhận lưu hành trang thiết bị y tế của Bộ Y Tế.\n\n### ⚙️ THÔNG SỐ KỸ THUẬT\n- **Model**: ${editingProduct.name || 'TECNIC-PRO'}\n- **Chất liệu**: Hợp kim phủ sơn tĩnh điện nano y tế\n- **Bảo hành**: 24 - 36 Tháng chính hãng TECNIC MEDTECH\n\n### 🩺 HƯỚNG DẪN SỬ DỤNG AN TOÀN\n1. Kiểm tra toàn bộ khóa chốt an toàn trước khi vận hành.\n2. Vệ sinh định kỳ bằng dung dịch sát khuẩn y tế chuyên dụng.\n3. Liên hệ tổng đài kỹ thuật **034 84 02466** khi cần hỗ trợ bảo dưỡng.`;
                                 setEditingProduct(prev => prev ? { ...prev, fullDescription: (prev.fullDescription ? prev.fullDescription + '\n\n' : '') + promptDesc } : null);
                                 showToast('Đã chèn mẫu mô tả sản phẩm chuẩn y khoa!');
                               }}
                             />
                           </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700">Nhập tags</label>
                           <div className="col-span-12 sm:col-span-9">
                             <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:border-[#3c8dbc] outline-none" placeholder="" />
                           </div>
                        </div>

                        {/* Search preview */}
                        <div className="grid grid-cols-12 gap-2 sm:gap-4 mt-6">
                           <div className="col-span-12 sm:col-span-9 sm:col-start-4 border border-slate-200 rounded">
                              <div className="flex justify-between items-center p-2.5 border-b border-slate-200 bg-slate-50">
                                 <span className="text-sm text-slate-700">Xem trước kết quả tìm kiếm</span>
                                 <span className="text-xs text-[#3c8dbc] cursor-pointer">Tùy chỉnh SEO</span>
                              </div>
                              <div className="p-4 space-y-1 bg-white">
                                 <h4 className="text-lg text-[#1a0dab] truncate font-medium hover:underline cursor-pointer">{editingProduct.name || 'Tiêu đề sản phẩm'}</h4>
                                 <p className="text-sm text-[#006621] truncate">https://ytetecnic.vn/{editingProduct.code || 'duong-dan'}.html</p>
                                 <p className="text-sm text-slate-600 line-clamp-2">{editingProduct.shortDescription || 'Mô tả ngắn hiển thị trên kết quả tìm kiếm của Google...'}</p>
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
               <div className="bg-white rounded shadow-xs border-t-[3px] border-t-[#d2d6de]">
                  <div className="border-b border-slate-100 p-3">
                     <h3 className="text-base font-normal text-slate-800">Cấu hình bài viết</h3>
                  </div>
                  
                  <div className="p-4 space-y-5">
                     
                     {/* Category Tree Mockup */}
                     <div>
                        <label className="block text-sm font-bold text-slate-700 bg-slate-100 p-2 border border-slate-300 border-b-0">Lựa chọn chuyên mục</label>
                        <div className="border border-slate-300 p-3 h-48 overflow-y-auto bg-white text-sm space-y-1">
                           {CATEGORIES.map(cat => (
                             <label key={cat.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
                                <input type="radio" name="prodCat" className="w-3.5 h-3.5" checked={editingProduct.category === cat.id} onChange={() => setEditingProduct({...editingProduct, category: cat.id as any, categoryName: cat.name})} />
                                <span className="text-slate-700">{cat.name}</span>
                             </label>
                           ))}
                        </div>
                     </div>

                     {/* Image */}
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Ảnh đại diện</label>
                        <div className="flex items-center gap-2 mb-2">
                           <input 
                             type="file" 
                             accept="image/*"
                             onChange={(e) => {
                               const file = e.target.files?.[0];
                               if (file) {
                                 const reader = new FileReader();
                                 reader.onloadend = () => {
                                   setEditingProduct({...editingProduct, image: reader.result as string});
                                 };
                                 reader.readAsDataURL(file);
                               }
                             }}
                             className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                           />
                        </div>
                        <div className="relative border border-slate-200 p-1 w-32 h-32 bg-slate-50 flex items-center justify-center group overflow-hidden rounded">
                           {editingProduct.image ? (
                             <>
                                <img src={editingProduct.image} className="w-full h-full object-cover rounded-sm" />
                                <button type="button" className="absolute bottom-1 right-1 bg-[#dc3545] text-white p-1.5 rounded opacity-100 shadow-sm hover:bg-[#c82333]" onClick={() => setEditingProduct({...editingProduct, image: ''})}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                             </>
                           ) : (
                             <span className="text-xs text-slate-400">Chưa có ảnh</span>
                           )}
                        </div>
                     </div>

                     {/* Dates */}
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tự đặt ngày đăng</label>
                        <input type="datetime-local" className="w-full border border-slate-300 p-2 rounded text-sm outline-none focus:border-[#3c8dbc]" defaultValue="2026-08-12T11:51" />
                     </div>

                     <div>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                           <input type="checkbox" className="w-3.5 h-3.5" checked={editingProduct.isFeatured || false} onChange={(e) => setEditingProduct({...editingProduct, isFeatured: e.target.checked})} />
                           <span>Tin nổi bật</span>
                        </label>
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Số thứ tự</label>
                        <input type="number" className="w-full border border-slate-300 p-2 rounded text-sm outline-none focus:border-[#3c8dbc]" placeholder="Nhập số thứ tự" />
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Trạng thái</label>
                        <div className="flex items-center gap-4 text-sm">
                           <label className="flex items-center gap-1 cursor-pointer">
                              <input type="radio" name="prodStatus" defaultChecked className="w-3.5 h-3.5" /> Hiện
                           </label>
                           <label className="flex items-center gap-1 cursor-pointer">
                              <input type="radio" name="prodStatus" className="w-3.5 h-3.5" /> Ẩn
                           </label>
                        </div>
                     </div>

                  </div>
               </div>
            </div>

          </div>
        </div>
      )}


      {/* ============================================================
          MODAL: THÊM / SỬA BÀI VIẾT (Markdown + AI Support)
          ============================================================ */}
      {isArticleModalOpen && editingArticle && (
        <div className="fixed inset-0 z-[100] bg-[#f4f6f9] overflow-y-auto flex flex-col font-sans">
          {/* Top Bar */}
          <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
            <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <h2 className="text-xl font-normal text-slate-800">
                   {editingArticle.id ? 'Sửa bài viết' : 'Thêm mới bài viết'}
                 </h2>
                 <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                    <span>Trang chủ</span> <span>/</span>
                    <span>Bài viết</span> <span>/</span>
                    <span className="text-[#0071ba]">{editingArticle.id ? 'Sửa bài viết' : 'Thêm mới bài viết'}</span>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleSaveArticle} className="bg-[#17a2b8] hover:bg-[#138496] text-white px-4 py-2 rounded font-bold text-sm shadow-sm transition">
                  LƯU BÀI VIẾT
                </button>
                <button type="button" onClick={() => setEditingArticle({...editingArticle})} className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-2 rounded font-bold text-sm shadow-sm transition">
                  NHẬP LẠI BÀI VIẾT
                </button>
                <button onClick={() => setIsArticleModalOpen(false)} className="text-slate-500 hover:text-slate-800 ml-2 sm:ml-4 flex items-center gap-1 text-sm">
                  <LogOut className="w-4 h-4" /> Thoát
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white rounded shadow-xs border-t-[3px] border-t-[#d2d6de]">
                  <div className="border-b border-slate-100 p-3">
                     <h3 className="text-base font-normal text-slate-800">Thông tin bài viết</h3>
                  </div>
                  <div className="p-4 sm:p-5">
                     <div className="flex border-b border-slate-200 mb-6">
                        <button type="button" className="px-6 py-2.5 text-sm text-slate-500 bg-slate-50 border-t border-x border-slate-200 rounded-t mr-1 hover:bg-slate-100 transition">
                           Tổng quan
                        </button>
                        <button type="button" className="px-6 py-2.5 text-sm text-[#0071ba] bg-white font-bold border-t-2 border-t-[#28a745] border-x border-slate-200 rounded-t -mb-px">
                           Việt Nam
                        </button>
                     </div>

                     <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700">Tên bài viết</label>
                           <div className="col-span-12 sm:col-span-9">
                             <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:border-[#3c8dbc] outline-none" value={editingArticle.title || ''} onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} />
                           </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700">Slug</label>
                           <div className="col-span-12 sm:col-span-9">
                             <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:border-[#3c8dbc] outline-none" value={editingArticle.id || ''} readOnly />
                           </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-start">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700 mt-2">Nhập giới thiệu</label>
                           <div className="col-span-12 sm:col-span-9">
                             <textarea className="w-full border border-slate-300 rounded p-2 text-sm focus:border-[#3c8dbc] outline-none" rows={3} value={editingArticle.excerpt || ''} onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })} />
                           </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-start">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700 mt-2">Nhập nội dung</label>
                           <div className="col-span-12 sm:col-span-9">
                             <RichTextEditor
                               value={editingArticle.content || ''}
                               onChange={(val) => setEditingArticle({ ...editingArticle, content: val })}
                               placeholder="Nhập nội dung bài viết y khoa, kiến thức phục hồi chức năng, hướng dẫn chăm sóc..."
                               minHeight="340px"
                               showAiButton={true}
                               onAiGenerate={() => {
                                 setIsAiModalOpen(true);
                               }}
                             />
                           </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                           <label className="col-span-12 sm:col-span-3 text-sm font-bold text-slate-700">Nhập tags</label>
                           <div className="col-span-12 sm:col-span-9">
                             <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:border-[#3c8dbc] outline-none" placeholder="" />
                           </div>
                        </div>

                        {/* Search preview */}
                        <div className="grid grid-cols-12 gap-2 sm:gap-4 mt-6">
                           <div className="col-span-12 sm:col-span-9 sm:col-start-4 border border-slate-200 rounded">
                              <div className="flex justify-between items-center p-2.5 border-b border-slate-200 bg-slate-50">
                                 <span className="text-sm text-slate-700">Xem trước kết quả tìm kiếm</span>
                                 <span className="text-xs text-[#3c8dbc] cursor-pointer">Tùy chỉnh SEO</span>
                              </div>
                              <div className="p-4 space-y-1 bg-white">
                                 <h4 className="text-lg text-[#1a0dab] truncate font-medium hover:underline cursor-pointer">{editingArticle.title || 'Tiêu đề bài viết'}</h4>
                                 <p className="text-sm text-[#006621] truncate">https://ytetecnic.vn/{editingArticle.id || 'duong-dan'}.html</p>
                                 <p className="text-sm text-slate-600 line-clamp-2">{editingArticle.excerpt || 'Mô tả ngắn hiển thị trên kết quả tìm kiếm của Google...'}</p>
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
               <div className="bg-white rounded shadow-xs border-t-[3px] border-t-[#d2d6de]">
                  <div className="border-b border-slate-100 p-3">
                     <h3 className="text-base font-normal text-slate-800">Cấu hình bài viết</h3>
                  </div>
                  
                  <div className="p-4 space-y-5">
                     
                     {/* Category Tree Mockup */}
                     <div>
                        <label className="block text-sm font-bold text-slate-700 bg-slate-100 p-2 border border-slate-300 border-b-0">Lựa chọn chuyên mục</label>
                        <div className="border border-slate-300 p-3 h-48 overflow-y-auto bg-white text-sm space-y-1">
                           {[
                             {id: 'KIEN_THUC_PHCN', name: 'Kiến thức phục hồi chức năng'},
                             {id: 'CHAM_SOC_NGUOI_BENH', name: 'Chăm sóc người bệnh tại nhà'},
                             {id: 'TU_VAN_THIET_BI', name: 'Tư vấn thiết bị y tế'},
                             {id: 'TIN_TUC_SU_KIEN', name: 'Tin tức & Tuyển dụng'}
                           ].map(cat => (
                             <label key={cat.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
                                <input type="radio" name="artCat" className="w-3.5 h-3.5" checked={editingArticle.category === cat.id} onChange={() => setEditingArticle({...editingArticle, category: cat.id as any, categoryName: cat.name})} />
                                <span className="text-slate-700">{cat.name}</span>
                             </label>
                           ))}
                        </div>
                     </div>

                     {/* Image */}
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Ảnh đại diện</label>
                        <div className="flex items-center gap-2 mb-2">
                           <input 
                             type="file" 
                             accept="image/*"
                             onChange={(e) => {
                               const file = e.target.files?.[0];
                               if (file) {
                                 const reader = new FileReader();
                                 reader.onloadend = () => {
                                   setEditingProduct({...editingProduct, image: reader.result as string});
                                 };
                                 reader.readAsDataURL(file);
                               }
                             }}
                             className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                           />
                        </div>
                        <div className="relative border border-slate-200 p-1 w-32 h-32 bg-slate-50 flex items-center justify-center group overflow-hidden rounded">
                           {editingArticle.coverImage ? (
                             <>
                                <img src={editingArticle.coverImage} className="w-full h-full object-cover rounded-sm" />
                                <button type="button" className="absolute bottom-1 right-1 bg-[#dc3545] text-white p-1.5 rounded opacity-100 shadow-sm hover:bg-[#c82333]" onClick={() => setEditingArticle({...editingArticle, coverImage: ''})}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                             </>
                           ) : (
                             <span className="text-xs text-slate-400">Chưa có ảnh</span>
                           )}
                        </div>
                     </div>

                     {/* Dates */}
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tự đặt ngày đăng</label>
                        <input type="datetime-local" className="w-full border border-slate-300 p-2 rounded text-sm outline-none focus:border-[#3c8dbc]" defaultValue="2026-08-12T11:51" />
                     </div>

                     <div>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                           <input type="checkbox" className="w-3.5 h-3.5" checked={editingArticle.isFeatured || false} onChange={(e) => setEditingArticle({...editingArticle, isFeatured: e.target.checked})} />
                           <span>Tin nổi bật</span>
                        </label>
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Số thứ tự</label>
                        <input type="number" className="w-full border border-slate-300 p-2 rounded text-sm outline-none focus:border-[#3c8dbc]" placeholder="Nhập số thứ tự" />
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Trạng thái</label>
                        <div className="flex items-center gap-4 text-sm">
                           <label className="flex items-center gap-1 cursor-pointer">
                              <input type="radio" name="artStatus" defaultChecked className="w-3.5 h-3.5" /> Hiện
                           </label>
                           <label className="flex items-center gap-1 cursor-pointer">
                              <input type="radio" name="artStatus" className="w-3.5 h-3.5" /> Ẩn
                           </label>
                        </div>
                     </div>

                  </div>
               </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: SOẠN BÀI BÁO Y KHOA BẰNG GEMINI AI
          ============================================================ */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                <h3 className="font-bold text-sm text-slate-800">Trợ Lý Soạn Bài Báo Y Khoa Gemini AI</h3>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Chủ đề bài viết y khoa *</label>
                <input 
                  type="text" 
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ví dụ: Phục hồi chức năng tay liệt sau tai biến đột quỵ..."
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Danh mục bài viết</label>
                <select 
                  value={aiCategory}
                  onChange={(e) => setAiCategory(e.target.value)}
                  className="w-full border border-slate-300 p-2 rounded bg-white"
                >
                  <option value="KIEN_THUC_PHCN">Kiến thức phục hồi chức năng</option>
                  <option value="CHAM_SOC_NGUOI_BENH">Chăm sóc người bệnh tại nhà</option>
                  <option value="TU_VAN_THIET_BI">Tư vấn thiết bị y tế</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Từ khóa trọng tâm</label>
                <input 
                  type="text" 
                  value={aiKeywords}
                  onChange={(e) => setAiKeywords(e.target.value)}
                  className="w-full border border-slate-300 p-2 rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-bold text-xs"
              >
                Hủy
              </button>
              <button 
                type="button" 
                disabled={isAiGenerating}
                onClick={handleGenerateAiArticle}
                className="px-5 py-2 bg-[#143472] hover:bg-blue-900 text-amber-300 font-bold rounded text-xs flex items-center gap-2 shadow-xs"
              >
                {isAiGenerating ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-amber-300 border-t-transparent rounded-full animate-spin"></span>
                    <span>Đang biên soạn...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Tạo bài viết AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: CHI TIẾT ĐƠN HÀNG
          ============================================================ */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800">
                Chi tiết đơn hàng: #{viewingOrder.orderCode || viewingOrder.id}
              </h3>
              <button onClick={() => setViewingOrder(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded space-y-1">
                <p><b>Khách hàng:</b> {viewingOrder.customerName}</p>
                <p><b>Điện thoại:</b> {viewingOrder.customerPhone}</p>
                <p><b>Địa chỉ:</b> {viewingOrder.shippingAddress}</p>
                <p><b>Thời gian đặt:</b> {new Date(viewingOrder.createdAt).toLocaleString('vi-VN')}</p>
              </div>

              <div className="border border-slate-200 rounded divide-y">
                {viewingOrder.items.map((item, i) => (
                  <div key={i} className="p-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-bold">{item.productName}</p>
                      <p className="text-[11px] text-slate-500">Số lượng: {item.quantity} x {item.price.toLocaleString('vi-VN')} đ</p>
                    </div>
                    <p className="font-bold text-red-600">{(item.quantity * item.price).toLocaleString('vi-VN')} đ</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm font-black pt-2">
                <span>Tổng thanh toán:</span>
                <span className="text-red-600">{viewingOrder.finalTotal.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button 
                onClick={() => setViewingOrder(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-bold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
