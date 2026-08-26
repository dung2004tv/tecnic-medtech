import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, FileText, PlusCircle, Sparkles, Trash2, Edit3, 
  Search, CheckCircle2, AlertCircle, RefreshCcw, Save, X, 
  ShoppingBag, Check, Image as ImageIcon, LayoutDashboard, 
  Package, Newspaper, BookOpen, Sliders, ShoppingCart, PhoneCall, 
  Settings, Users, Menu, Home, Phone, LogOut, ChevronDown, 
  ChevronRight, Download, Filter, Eye, Printer, UserCheck, 
  Lock, Unlock, ArrowUpDown, DollarSign, BarChart3, Clock, MapPin
} from 'lucide-react';
import { Article, ArticleCategory, Product, Order, User, UserRole, BannerSlide } from '../types';
import { INITIAL_ARTICLES } from '../data/articlesData';
import { CATEGORIES, HERO_BANNERS } from '../data/productsData';
import { COMPANY_INFO } from '../data/companyData';
import { ProductImage } from './ProductImage';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
  currentUser?: User | null;
  onLogout?: () => void;
  onSelectProduct?: (product: Product) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

type AdminMenuKey = 
  | 'DASHBOARD'
  | 'PRODUCTS'
  | 'ARTICLES'
  | 'PAGES'
  | 'SLIDES'
  | 'ORDERS'
  | 'CONTACTS'
  | 'CONFIG'
  | 'USERS';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  allProducts,
  currentUser,
  onLogout,
  onSelectProduct,
  onOpenAuth
}) => {
  // Navigation & UI state
  const [activeMenu, setActiveMenu] = useState<AdminMenuKey>('ORDERS');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>('PRODUCTS');
  
  // Data states
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsList, setProductsList] = useState<Product[]>(allProducts);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [systemConfig, setSystemConfig] = useState({
    marqueeNotice: "Với đội ngũ nhân sự năng động luôn sẵn sàng tư vấn và hỗ trợ phục vụ quý khách hàng 24/7",
    hotline: "034 84 02466",
    hotline2: "038 988 0369",
    companyEmail: "tecnic.medtech@gmail.com",
    headquarters: "Tầng 2, Tòa nhà New Skyline, KĐT Văn Quán, Q. Hà Đông, TP. Hà Nội",
    bankName: "BIDV - Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
    accountNumber: "8661234668",
    accountHolder: "CONG TY CP CN VA DV Y TE TECNIC",
    branch: "Chi nhánh Hà Tây, Hà Nội"
  });

  // Orders Filter State (Screenshots 2 & 3)
  const [orderKeyword, setOrderKeyword] = useState('');
  const [orderSort, setOrderSort] = useState<'newest' | 'oldest' | 'total-desc' | 'total-asc'>('newest');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Products Filter & Management State
  const [productKeyword, setProductKeyword] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('ALL');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // User Management State
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    fullName: '',
    phone: '',
    email: '',
    accountType: 'STAFF' as UserRole,
    clinicName: '',
    address: ''
  });

  // AI Generator state
  const [aiTopic, setAiTopic] = useState('');
  const [aiCategory, setAiCategory] = useState<ArticleCategory>('KIEN_THUC_PHCN');
  const [aiTarget, setAiTarget] = useState('Người bệnh tai biến, người cao tuổi & gia đình chăm sóc');
  const [aiKeywords, setAiKeywords] = useState('Phục hồi chức năng, TECNIC MEDTECH, thiết bị y tế chuẩn Bộ Y Tế');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<Partial<Article> | null>(null);

  // Banner & Slide Management State
  const [slideBanners, setSlideBanners] = useState<BannerSlide[]>(HERO_BANNERS);
  const [editingSlide, setEditingSlide] = useState<Partial<BannerSlide> | null>(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [panoramaConfig, setPanoramaConfig] = useState({
    title: "GIẢI PHÁP Y TẾ VÀ PHỤC HỒI CHỨC NĂNG TECNIC",
    slogan: "Chất lượng tạo uy tín",
    buttonText: "Liên hệ ngay",
    targetAction: "CONTACT",
    bannerImage: ""
  });

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Fetch all administration data
  const loadAdminData = async () => {
    try {
      // 1. Orders
      const ordRes = await fetch('/api/orders');
      const ordData = await ordRes.json();
      if (ordData.success && ordData.data) {
        setOrders(ordData.data);
      }

      // 2. Users
      const usrRes = await fetch('/api/users');
      const usrData = await usrRes.json();
      if (usrData.success && usrData.data) {
        setUsersList(usrData.data);
      }

      // 3. Articles
      const artRes = await fetch('/api/articles');
      const artData = await artRes.json();
      if (artData.success && artData.data) {
        setArticles(artData.data);
      }

      // 4. System config
      const cfgRes = await fetch('/api/system-config');
      const cfgData = await cfgRes.json();
      if (cfgData.success && cfgData.data) {
        setSystemConfig(cfgData.data);
      }
    } catch (err) {
      console.warn("Could not load backend admin data:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAdminData();
    }
  }, [isOpen]);

  // ----------------------------------------------------
  // ORDER MANAGEMENT HANDLERS
  // ----------------------------------------------------
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (orderKeyword.trim()) {
      const q = orderKeyword.toLowerCase().trim();
      result = result.filter(o => 
        (o.orderCode && o.orderCode.toLowerCase().includes(q)) ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        o.shippingAddress.toLowerCase().includes(q)
      );
    }

    if (orderStatusFilter !== 'ALL') {
      result = result.filter(o => o.orderStatus === orderStatusFilter);
    }

    if (orderSort === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (orderSort === 'total-desc') {
      result.sort((a, b) => b.finalTotal - a.finalTotal);
    } else if (orderSort === 'total-asc') {
      result.sort((a, b) => a.finalTotal - b.finalTotal);
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [orders, orderKeyword, orderStatusFilter, orderSort]);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string, newPayment?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderStatus: newStatus, 
          paymentStatus: newPayment 
        })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus as any, paymentStatus: (newPayment as any) || o.paymentStatus } : o));
        if (viewingOrder && viewingOrder.id === orderId) {
          setViewingOrder(prev => prev ? { ...prev, orderStatus: newStatus as any, paymentStatus: (newPayment as any) || prev.paymentStatus } : null);
        }
        showToast("Đã cập nhật trạng thái đơn hàng thành công!");
      }
    } catch (err) {
      showToast("Lỗi khi cập nhật trạng thái đơn hàng");
    }
  };

  const handleDeleteSingleOrder = async (orderId: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${orderId}?`)) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.filter(o => o.id !== orderId));
        setSelectedOrderIds(prev => prev.filter(id => id !== orderId));
        showToast("Đã xóa đơn hàng thành công!");
      }
    } catch (err) {
      showToast("Lỗi khi xóa đơn hàng");
    }
  };

  const handleBulkDeleteOrders = async () => {
    if (selectedOrderIds.length === 0) {
      showToast("Vui lòng chọn ít nhất một đơn hàng để xóa!");
      return;
    }
    if (!window.confirm(`Bạn có chắc chắn muốn xóa ${selectedOrderIds.length} đơn hàng đã chọn?`)) return;

    try {
      const res = await fetch('/api/orders/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedOrderIds })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.filter(o => !selectedOrderIds.includes(o.id)));
        setSelectedOrderIds([]);
        showToast(`Đã xóa thành công ${selectedOrderIds.length} đơn hàng!`);
      }
    } catch (err) {
      showToast("Lỗi khi xóa đơn hàng hàng loạt");
    }
  };

  const handleSelectAllOrders = (checked: boolean) => {
    if (checked) {
      setSelectedOrderIds(filteredOrders.map(o => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleToggleSelectOrder = (id: string) => {
    setSelectedOrderIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExportOrdersExcel = () => {
    if (filteredOrders.length === 0) {
      showToast("Không có đơn hàng nào để xuất!");
      return;
    }

    const headers = ["STT", "Mã đơn hàng", "Người đặt hàng", "Số điện thoại", "Địa chỉ giao hàng", "Sản phẩm", "Tổng tiền (VNĐ)", "Trạng thái đơn", "Thanh toán", "Thời gian đặt"];
    const rows = filteredOrders.map((o, idx) => {
      const prodSummary = o.items.map(i => `${i.productName} (x${i.quantity})`).join("; ");
      return [
        idx + 1,
        `"${o.orderCode || o.id}"`,
        `"${o.customerName}"`,
        `"${o.customerPhone}"`,
        `"${o.shippingAddress.replace(/"/g, '""')}"`,
        `"${prodSummary.replace(/"/g, '""')}"`,
        o.finalTotal,
        `"${getStatusText(o.orderStatus)}"`,
        `"${o.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}"`,
        `"${new Date(o.createdAt).toLocaleString('vi-VN')}"`
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DANH_SACH_DON_HANG_TECNIC_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Đã xuất danh sách đơn hàng Excel/CSV thành công!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded-full text-[11px] shadow-2xs">Chờ xác nhận</span>;
      case 'CONFIRMED':
        return <span className="bg-blue-100 text-blue-900 border border-blue-300 font-bold px-2 py-0.5 rounded-full text-[11px] shadow-2xs">Đã xác nhận</span>;
      case 'PACKING':
        return <span className="bg-sky-100 text-sky-900 border border-sky-300 font-bold px-2 py-0.5 rounded-full text-[11px] shadow-2xs">Đang đóng gói</span>;
      case 'SHIPPING':
        return <span className="bg-purple-100 text-purple-900 border border-purple-300 font-bold px-2 py-0.5 rounded-full text-[11px] shadow-2xs">Đang vận chuyển</span>;
      case 'DELIVERED':
        return <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2 py-0.5 rounded-full text-[11px] shadow-2xs">Đã giao hàng</span>;
      case 'CANCELLED':
        return <span className="bg-red-100 text-red-900 border border-red-300 font-bold px-2 py-0.5 rounded-full text-[11px] shadow-2xs">Đã hủy</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full text-[11px]">{status}</span>;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Chờ xác nhận';
      case 'CONFIRMED': return 'Đã xác nhận';
      case 'PACKING': return 'Đang đóng gói';
      case 'SHIPPING': return 'Đang vận chuyển';
      case 'DELIVERED': return 'Đã giao hàng';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  // ----------------------------------------------------
  // PRODUCT MANAGEMENT HANDLERS
  // ----------------------------------------------------
  const filteredProducts = useMemo(() => {
    let list = [...productsList];
    if (productKeyword.trim()) {
      const q = productKeyword.toLowerCase().trim();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.specifications.brand.toLowerCase().includes(q));
    }
    if (productCategoryFilter !== 'ALL') {
      list = list.filter(p => p.category === productCategoryFilter);
    }
    return list;
  }, [productsList, productKeyword, productCategoryFilter]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      if (editingProduct.id) {
        // Update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProduct)
        });
        const data = await res.json();
        if (data.success) {
          setProductsList(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct } : p));
          showToast("Đã cập nhật sản phẩm thành công!");
          setIsProductModalOpen(false);
        }
      } else {
        // Create
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProduct)
        });
        const data = await res.json();
        if (data.success) {
          setProductsList(prev => [data.data, ...prev]);
          showToast("Đã thêm sản phẩm mới thành công!");
          setIsProductModalOpen(false);
        }
      }
    } catch (err) {
      showToast("Lỗi khi lưu sản phẩm");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi hệ thống?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProductsList(prev => prev.filter(p => p.id !== id));
        showToast("Đã xóa sản phẩm thành công!");
      }
    } catch (err) {
      showToast("Lỗi khi xóa sản phẩm");
    }
  };

  // ----------------------------------------------------
  // USER / STAFF CREATION & MANAGEMENT
  // ----------------------------------------------------
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.fullName || !newUserData.phone || !newUserData.email) {
      showToast("Vui lòng điền đầy đủ họ tên, SĐT và Email!");
      return;
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData)
      });
      const data = await res.json();
      if (data.success) {
        setUsersList(prev => [...prev, data.data]);
        setNewUserModalOpen(false);
        setNewUserData({ fullName: '', phone: '', email: '', accountType: 'STAFF', clinicName: '', address: '' });
        showToast("Tạo tài khoản quản trị/nhân viên thành công!");
      }
    } catch (err) {
      showToast("Lỗi khi tạo tài khoản");
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus?: string) => {
    const nextStatus = currentStatus === 'LOCKED' ? 'ACTIVE' : 'LOCKED';
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (data.success) {
        setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus } : u));
        showToast(nextStatus === 'LOCKED' ? "Đã khóa tài khoản!" : "Đã mở khóa tài khoản!");
      }
    } catch (err) {
      showToast("Lỗi khi cập nhật tài khoản");
    }
  };

  const handleChangeUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountType: newRole })
      });
      const data = await res.json();
      if (data.success) {
        setUsersList(prev => prev.map(u => u.id === userId ? { ...u, accountType: newRole } : u));
        showToast("Đã phân quyền tài khoản thành công!");
      }
    } catch (err) {
      showToast("Lỗi khi đổi quyền");
    }
  };

  // ----------------------------------------------------
  // SYSTEM CONFIG HANDLER
  // ----------------------------------------------------
  const handleSaveSystemConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/system-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(systemConfig)
      });
      const data = await res.json();
      if (data.success) {
        showToast("Đã lưu cấu hình hệ thống & thông báo marquee thành công!");
      }
    } catch (err) {
      showToast("Lỗi khi lưu cấu hình");
    }
  };

  // ----------------------------------------------------
  // AI ARTICLE GENERATOR
  // ----------------------------------------------------
  const handleGenerateAiArticle = async () => {
    if (!aiTopic.trim()) {
      showToast("Vui lòng nhập chủ đề bài viết!");
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
        setAiResult(data.data);
        showToast("Gemini AI đã hoàn thành bài viết y khoa!");
      } else {
        showToast("Lỗi khi tạo bài viết AI");
      }
    } catch (err: any) {
      showToast("Lỗi kết nối máy chủ AI");
    } finally {
      setIsAiGenerating(false);
    }
  };

  if (!isOpen) return null;

  // Quyền truy cập: Chỉ cho Quản trị viên (ADMIN) và Nhân viên (STAFF)
  const isAuthorized = currentUser && (currentUser.accountType === 'ADMIN' || currentUser.accountType === 'STAFF');

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-black text-slate-900">Khu Vực Quản Trị Hệ Thống</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Trang quản trị chỉ dành riêng cho <b>Quản Trị Viên</b> và <b>Nhân Viên TECNIC</b>. Quý khách hàng hoặc người dùng chưa đăng nhập không có quyền truy cập khu vực này.
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 font-medium">
            {currentUser ? (
              <p>Tài khoản hiện tại: <b>{currentUser.fullName}</b> ({currentUser.accountType === 'DAI_LY' ? 'Đại lý' : 'Khách hàng thân thiết'}) không có quyền quản trị.</p>
            ) : (
              <p>Vui lòng đăng nhập với tài khoản Quản trị viên hoặc Nhân viên để tiếp tục.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
            >
              Về Trang Mua Sắm
            </button>
            <button
              onClick={() => {
                onClose();
                if (onOpenAuth) onOpenAuth('login');
              }}
              className="flex-1 px-4 py-2.5 bg-[#0071ba] hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Đăng Nhập Quản Trị
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* 1. TOP HEADER BAR (Phong cách hình 2 & 3) */}
      <header className="bg-[#143472] text-white h-14 px-4 flex items-center justify-between shadow-md shrink-0 z-30">
        
        {/* Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-900 text-white transition"
            title="Mở rộng / Thu gọn thanh điều hướng"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-400 text-blue-950 rounded-lg flex items-center justify-center font-black text-sm">
              T
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-sm tracking-wide text-white block leading-tight">TECNIC ADMIN</span>
              <span className="text-[10px] text-amber-300 font-semibold">CỔNG QUẢN TRỊ DOANH NGHIỆP</span>
            </div>
          </div>
        </div>

        {/* Center: Notice Marquee Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:flex items-center bg-blue-950/60 border border-blue-800/80 px-3 py-1.5 rounded-full overflow-hidden text-xs text-blue-100">
          <span className="text-amber-400 font-bold shrink-0 mr-2 flex items-center gap-1">
            📢 Thông báo:
          </span>
          <div className="truncate text-amber-200">
            {systemConfig.marqueeNotice}
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 bg-blue-900/70 hover:bg-blue-800 text-white px-3 py-1.5 rounded-lg font-bold transition border border-blue-700/50"
            title="Quay lại giao diện mua sắm khách hàng"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Trang chủ</span>
          </button>

          <a
            href={`tel:${systemConfig.hotline.replace(/\s/g, '')}`}
            className="hidden lg:flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1.5 rounded-lg font-black transition shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hỗ trợ 24/7: <b>{systemConfig.hotline}</b></span>
          </a>

          <button
            onClick={() => {
              if (onLogout) onLogout();
              onClose();
            }}
            className="flex items-center gap-1.5 bg-red-600/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold transition"
            title="Đăng xuất quyền quản trị"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Thoát</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN LAYOUT (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR (Dark Navy styling chuẩn hình 2 & 3) */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-[#1e293b] text-slate-200 flex flex-col transition-all duration-200 shrink-0 border-r border-slate-700 overflow-y-auto select-none`}>
          
          {/* Admin User Profile Card */}
          <div className="p-4 border-b border-slate-700/80 bg-slate-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-blue-950 font-black flex items-center justify-center shrink-0 shadow-md">
                <UserCheck className="w-5 h-5" />
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0">
                  <p className="font-bold text-xs text-white truncate">
                    {currentUser?.fullName || "Quản Trị Viên Hệ Thống TEC..."}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {currentUser?.accountType === 'STAFF' ? 'Online (Nhân viên)' : 'Online (Toàn quyền)'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 py-3 px-2 space-y-1 text-xs font-semibold">
            
            {/* 1. Bảng điều khiển */}
            <button
              onClick={() => setActiveMenu('DASHBOARD')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeMenu === 'DASHBOARD' 
                  ? 'bg-[#0071ba] text-white shadow-md font-bold' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400 shrink-0" />
              {!sidebarCollapsed && <span>BẢNG ĐIỀU KHIỂN</span>}
            </button>

            {/* 2. Quản lý modul sản phẩm */}
            <div>
              <button
                onClick={() => {
                  setActiveMenu('PRODUCTS');
                  setOpenSubMenu(openSubMenu === 'PRODUCTS' ? null : 'PRODUCTS');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
                  activeMenu === 'PRODUCTS' 
                    ? 'bg-slate-800 text-white font-bold' 
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-blue-400 shrink-0" />
                  {!sidebarCollapsed && <span>Quản lý modul sản phẩm</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openSubMenu === 'PRODUCTS' ? 'rotate-180' : ''}`} />
                )}
              </button>

              {!sidebarCollapsed && openSubMenu === 'PRODUCTS' && (
                <div className="ml-7 mt-1 space-y-1 border-l border-slate-700 pl-2 text-[11px]">
                  <button
                    onClick={() => { setActiveMenu('PRODUCTS'); }}
                    className="w-full text-left py-1.5 px-2 hover:text-amber-300 rounded transition flex items-center justify-between"
                  >
                    <span>Danh sách sản phẩm</span>
                    <span className="bg-blue-900/60 text-blue-200 px-1.5 py-0.2 rounded text-[10px]">110</span>
                  </button>
                  <button
                    onClick={() => {
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
                        shortDescription: 'Thiết bị y tế chính hãng TECNIC MEDTECH',
                        specifications: { brand: 'TECNIC', origin: 'Việt Nam', warrantyMonths: 24 }
                      });
                      setIsProductModalOpen(true);
                    }}
                    className="w-full text-left py-1.5 px-2 hover:text-amber-300 rounded transition text-amber-400 font-bold"
                  >
                    + Thêm mới sản phẩm
                  </button>
                </div>
              )}
            </div>

            {/* 3. Quản lý modul tin tức */}
            <button
              onClick={() => setActiveMenu('ARTICLES')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
                activeMenu === 'ARTICLES' 
                  ? 'bg-[#0071ba] text-white shadow-md font-bold' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Newspaper className="w-4 h-4 text-emerald-400 shrink-0" />
                {!sidebarCollapsed && <span>Quản lý modul tin tức</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="bg-emerald-900/60 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded font-bold">AI</span>
              )}
            </button>

            {/* 4. Trang thông tin */}
            <button
              onClick={() => setActiveMenu('PAGES')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeMenu === 'PAGES' ? 'bg-[#0071ba] text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-300 shrink-0" />
              {!sidebarCollapsed && <span>Trang thông tin</span>}
            </button>

            {/* 5. Quản lý slide trang chủ */}
            <button
              onClick={() => setActiveMenu('SLIDES')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeMenu === 'SLIDES' ? 'bg-[#0071ba] text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Sliders className="w-4 h-4 text-pink-400 shrink-0" />
              {!sidebarCollapsed && <span>Quản lý slide trang chủ</span>}
            </button>

            {/* 6. Quản lý đơn hàng (MỤC QUAN TRỌNG NHẤT TRONG SCREENSHOT) */}
            <button
              onClick={() => setActiveMenu('ORDERS')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
                activeMenu === 'ORDERS' 
                  ? 'bg-[#0071ba] text-white shadow-md font-bold' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-4 h-4 text-red-400 shrink-0" />
                {!sidebarCollapsed && <span>Quản lý đơn hàng</span>}
              </div>
              <span className="bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                {orders.length}
              </span>
            </button>

            {/* 7. Thông tin liên hệ */}
            <button
              onClick={() => setActiveMenu('CONTACTS')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeMenu === 'CONTACTS' ? 'bg-[#0071ba] text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-cyan-400 shrink-0" />
              {!sidebarCollapsed && <span>Thông tin liên hệ</span>}
            </button>

            {/* 8. Cấu hình hệ thống */}
            <button
              onClick={() => setActiveMenu('CONFIG')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeMenu === 'CONFIG' ? 'bg-[#0071ba] text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400 shrink-0" />
              {!sidebarCollapsed && <span>Cấu hình hệ thống</span>}
            </button>

            {/* 9. Quản lý quản trị viên / Phân quyền */}
            <button
              onClick={() => setActiveMenu('USERS')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
                activeMenu === 'USERS' ? 'bg-[#0071ba] text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-yellow-400 shrink-0" />
                {!sidebarCollapsed && <span>Quản lý QTV / Phân quyền</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded font-bold">
                  {usersList.length}
                </span>
              )}
            </button>

          </nav>

          {/* Sidebar Footer */}
          {!sidebarCollapsed && (
            <div className="p-3 bg-slate-950/60 border-t border-slate-800 text-[10px] text-slate-400 text-center">
              TECNIC MEDTECH v2.6.0
            </div>
          )}
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100">
          
          {/* TOAST ALERT */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 bg-[#143472] text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-400 flex items-center gap-2 text-xs font-bold animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* ============================================================
              VIEW 1: QUẢN LÝ ĐƠN HÀNG (TRỌNG TÂM SCREENSHOT 2 & 3)
              ============================================================ */}
          {activeMenu === 'ORDERS' && (
            <div className="space-y-4 max-w-7xl mx-auto">
              
              {/* Page Title & Breadcrumb */}
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Danh sách đơn hàng
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span className="hover:text-blue-600 cursor-pointer" onClick={onClose}>Trang chủ</span>
                  <span>/</span>
                  <span className="text-slate-700">Đơn hàng</span>
                  <span>/</span>
                  <span className="font-bold text-[#0071ba]">Danh sách đơn hàng</span>
                </div>
              </div>

              {/* Card Container (Khung trắng viền xám y như hình 2 & 3) */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                
                {/* Header Card Title */}
                <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="font-bold text-sm text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-[#0071ba]" />
                    Danh sách đơn hàng mới
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">
                    Hệ thống tự động đồng bộ thời gian thực
                  </span>
                </div>

                {/* Filter Toolbar (Y chang thanh tìm kiếm trong hình 2 & 3) */}
                <div className="p-4 border-b border-slate-200 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 items-center">
                    
                    {/* Input: Từ khóa */}
                    <div className="lg:col-span-4 relative">
                      <input
                        type="text"
                        value={orderKeyword}
                        onChange={(e) => setOrderKeyword(e.target.value)}
                        placeholder="Từ khóa (Tên KH, SĐT, MGD, Địa chỉ...)"
                        className="w-full border border-slate-300 px-3 py-2 text-xs rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] text-slate-800"
                      />
                    </div>

                    {/* Select: Sắp xếp theo */}
                    <div className="lg:col-span-3">
                      <select
                        value={orderSort}
                        onChange={(e) => setOrderSort(e.target.value as any)}
                        className="w-full border border-slate-300 px-3 py-2 text-xs rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] text-slate-700 font-medium bg-white"
                      >
                        <option value="newest">Sắp xếp theo: Mới nhất</option>
                        <option value="oldest">Sắp xếp theo: Cũ nhất</option>
                        <option value="total-desc">Tổng tiền: Cao đến thấp</option>
                        <option value="total-asc">Tổng tiền: Thấp đến cao</option>
                      </select>
                    </div>

                    {/* Select: Tình trạng đơn */}
                    <div className="lg:col-span-3">
                      <select
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="w-full border border-slate-300 px-3 py-2 text-xs rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] text-slate-700 font-medium bg-white"
                      >
                        <option value="ALL">Tình trạng đơn (Tất cả)</option>
                        <option value="PENDING">Chờ xác nhận</option>
                        <option value="PACKING">Đang đóng gói</option>
                        <option value="SHIPPING">Đang vận chuyển</option>
                        <option value="DELIVERED">Đã giao hàng</option>
                        <option value="CANCELLED">Đã hủy</option>
                      </select>
                    </div>

                    {/* Action Buttons: Tìm kiếm, Làm lại, Xuất Excel */}
                    <div className="lg:col-span-2 flex items-center gap-1.5">
                      <button
                        onClick={() => showToast("Đã lọc danh sách đơn hàng!")}
                        className="flex-1 bg-[#10b981] hover:bg-emerald-600 text-white font-bold py-2 px-2.5 rounded-xl transition text-xs flex items-center justify-center gap-1 shadow-xs"
                        title="Tìm kiếm"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Tìm</span>
                      </button>

                      <button
                        onClick={() => {
                          setOrderKeyword('');
                          setOrderStatusFilter('ALL');
                          setOrderSort('newest');
                          showToast("Đã làm lại bộ lọc!");
                        }}
                        className="bg-[#ef4444] hover:bg-red-600 text-white font-bold py-2 px-2.5 rounded-xl transition text-xs flex items-center justify-center gap-1 shadow-xs"
                        title="Làm lại bộ lọc"
                      >
                        <RefreshCcw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={handleExportOrdersExcel}
                        className="bg-[#16a34a] hover:bg-green-700 text-white font-bold py-2 px-2.5 rounded-xl transition text-xs flex items-center justify-center gap-1 shadow-xs"
                        title="Xuất Excel danh sách đơn hàng"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Sub-toolbar: Total record count & Bulk Delete */}
                <div className="px-5 py-2.5 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between text-xs">
                  <div className="font-bold text-slate-700 flex items-center gap-2">
                    <span>Tổng số bản ghi: <b className="text-[#0071ba] text-sm">{filteredOrders.length}</b> / {orders.length}</span>
                    {selectedOrderIds.length > 0 && (
                      <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-bold text-[11px]">
                        Đã chọn {selectedOrderIds.length} đơn
                      </span>
                    )}
                  </div>

                  {selectedOrderIds.length > 0 && (
                    <button
                      onClick={handleBulkDeleteOrders}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 transition shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa đã chọn ({selectedOrderIds.length})</span>
                    </button>
                  )}
                </div>

                {/* Orders Table (Exact layout as screenshot 2 & 3) */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                            onChange={(e) => handleSelectAllOrders(e.target.checked)}
                            className="rounded text-[#0071ba] focus:ring-[#0071ba]"
                          />
                        </th>
                        <th className="p-3 w-12 text-center">Stt</th>
                        <th className="p-3 min-w-[240px]">Thông tin người đặt hàng</th>
                        <th className="p-3 min-w-[120px]">Tổng tiền</th>
                        <th className="p-3 min-w-[120px]">Trạng thái</th>
                        <th className="p-3 min-w-[110px]">Thanh toán</th>
                        <th className="p-3 min-w-[140px]">Thời gian</th>
                        <th className="p-3 min-w-[130px] text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-10 text-center text-slate-500">
                            Không tìm thấy đơn hàng nào phù hợp với bộ lọc.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order, idx) => (
                          <tr 
                            key={order.id}
                            className={`hover:bg-blue-50/50 transition ${selectedOrderIds.includes(order.id) ? 'bg-blue-50/80' : ''}`}
                          >
                            {/* Checkbox */}
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={selectedOrderIds.includes(order.id)}
                                onChange={() => handleToggleSelectOrder(order.id)}
                                className="rounded text-[#0071ba] focus:ring-[#0071ba]"
                              />
                            </td>

                            {/* Stt */}
                            <td className="p-3 text-center font-bold text-slate-600">
                              {idx + 1}
                            </td>

                            {/* Thông tin người đặt hàng */}
                            <td className="p-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-[#143472]">
                                  <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-mono">
                                    {order.orderCode || order.id}
                                  </span>
                                  <span>{order.customerName}</span>
                                </div>
                                <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{order.customerPhone}</span>
                                </div>
                                <div className="text-[11px] text-slate-500 line-clamp-1 flex items-center gap-1" title={order.shippingAddress}>
                                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span>{order.shippingAddress}</span>
                                </div>
                              </div>
                            </td>

                            {/* Tổng tiền */}
                            <td className="p-3">
                              <span className="font-black text-red-600 text-sm block">
                                {order.finalTotal.toLocaleString('vi-VN')}đ
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {order.items.length} mặt hàng
                              </span>
                            </td>

                            {/* Trạng thái đơn */}
                            <td className="p-3">
                              {getStatusBadge(order.orderStatus)}
                            </td>

                            {/* Trạng thái thanh toán */}
                            <td className="p-3">
                              {order.paymentStatus === 'PAID' ? (
                                <span className="bg-red-100 text-red-700 border border-red-200 font-bold px-2 py-0.5 rounded-full text-[10px]">
                                  Đã thanh toán
                                </span>
                              ) : (
                                <span className="bg-slate-100 text-slate-600 border border-slate-200 font-bold px-2 py-0.5 rounded-full text-[10px]">
                                  Chưa thanh toán
                                </span>
                              )}
                            </td>

                            {/* Thời gian */}
                            <td className="p-3 text-[11px] text-slate-600 font-mono">
                              {new Date(order.createdAt).toLocaleString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                              })}
                            </td>

                            {/* Hành động */}
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => setViewingOrder(order)}
                                  className="p-1.5 bg-blue-100 hover:bg-blue-200 text-[#0071ba] rounded-lg transition"
                                  title="Xem chi tiết đơn & in phiếu"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <select
                                  value={order.orderStatus}
                                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                  className="text-[10px] border border-slate-300 rounded px-1 py-1 font-bold bg-white text-slate-700 outline-none"
                                  title="Chuyển trạng thái nhanh"
                                >
                                  <option value="PENDING">Chờ xác nhận</option>
                                  <option value="PACKING">Đang đóng gói</option>
                                  <option value="SHIPPING">Đang vận chuyển</option>
                                  <option value="DELIVERED">Đã giao hàng</option>
                                  <option value="CANCELLED">Đã hủy</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteSingleOrder(order.id)}
                                  className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                                  title="Xóa đơn hàng"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer note */}
                <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
                  <span>Trang 1 / 1 (Hiển thị tất cả bản ghi)</span>
                  <span>TECNIC MEDICAL ERP System</span>
                </div>

              </div>

            </div>
          )}

          {/* ============================================================
              VIEW 2: BẢNG ĐIỀU KHIỂN (DASHBOARD)
              ============================================================ */}
          {activeMenu === 'DASHBOARD' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Bảng Điều Khiển Tổng Quan</h1>
                <p className="text-xs text-slate-500">Thống kê hoạt động cung ứng thiết bị y tế & PHCN thời gian thực</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0071ba] flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Tổng Doanh Thu</p>
                    <p className="text-xl font-black text-slate-900">
                      {orders.reduce((sum, o) => sum + o.finalTotal, 0).toLocaleString('vi-VN')} đ
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Đơn Hàng Mới</p>
                    <p className="text-xl font-black text-slate-900">{orders.length} đơn</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Sản Phẩm Trong Kho</p>
                    <p className="text-xl font-black text-slate-900">{productsList.length} thiết bị</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Tài Khoản Đăng Ký</p>
                    <p className="text-xl font-black text-slate-900">{usersList.length + 15} bác sĩ & KH</p>
                  </div>
                </div>
              </div>

              {/* Quick Order list */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-sm text-[#143472]">Đơn hàng cần xử lý ngay</h3>
                  <button onClick={() => setActiveMenu('ORDERS')} className="text-xs font-bold text-[#0071ba] hover:underline">
                    Xem tất cả đơn hàng &rarr;
                  </button>
                </div>
                <div className="space-y-2">
                  {orders.slice(0, 4).map(o => (
                    <div key={o.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#143472]">{o.customerName}</span> ({o.customerPhone})
                        <p className="text-[11px] text-slate-500">{o.shippingAddress}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-red-600">{o.finalTotal.toLocaleString('vi-VN')} đ</span>
                        <div>{getStatusBadge(o.orderStatus)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              VIEW 3: QUẢN LÝ MODUL SẢN PHẨM (110 THIẾT BỊ)
              ============================================================ */}
          {activeMenu === 'PRODUCTS' && (
            <div className="space-y-4 max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quản Lý Modul Sản Phẩm</h1>
                  <p className="text-xs text-slate-500">Danh mục 110 thiết bị y tế & phục hồi chức năng chính hãng TECNIC</p>
                </div>

                <button
                  onClick={() => {
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
                      shortDescription: 'Thiết bị y tế chính hãng TECNIC MEDTECH',
                      specifications: { brand: 'TECNIC', origin: 'Việt Nam', warrantyMonths: 24 }
                    });
                    setIsProductModalOpen(true);
                  }}
                  className="bg-[#0071ba] hover:bg-[#143472] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition"
                >
                  <PlusCircle className="w-4 h-4 text-amber-300" />
                  <span>Thêm mới sản phẩm</span>
                </button>
              </div>

              {/* Product Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap gap-3 items-center">
                <div className="flex-1 min-w-[200px] relative">
                  <input
                    type="text"
                    value={productKeyword}
                    onChange={(e) => setProductKeyword(e.target.value)}
                    placeholder="Tìm tên, mã sản phẩm hoặc thương hiệu..."
                    className="w-full border border-slate-300 px-3 py-2 text-xs rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                </div>
                <div className="w-64">
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2 text-xs rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-medium"
                  >
                    <option value="ALL">Tất cả danh mục ({productsList.length} SP)</option>
                    {CATEGORIES.filter(c => c.id !== 'ALL').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <span className="text-xs font-bold text-slate-600">
                  Hiển thị: {filteredProducts.length} SP
                </span>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 z-10 border-b border-slate-200">
                      <tr>
                        <th className="p-3 w-16 text-center">Ảnh</th>
                        <th className="p-3 min-w-[260px]">Tên thiết bị y tế</th>
                        <th className="p-3 min-w-[140px]">Danh mục</th>
                        <th className="p-3 min-w-[120px]">Giá TECNIC</th>
                        <th className="p-3 min-w-[100px]">Giá niêm yết</th>
                        <th className="p-3 w-20 text-center">Kho</th>
                        <th className="p-3 w-24 text-center">Nổi bật</th>
                        <th className="p-3 w-24 text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition">
                          <td className="p-2 text-center">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 mx-auto">
                              <ProductImage product={p} size="sm" showBadge={false} />
                            </div>
                          </td>
                          <td className="p-3 font-bold text-[#143472]">
                            <p className="line-clamp-2">{p.name}</p>
                            <span className="text-[10px] text-slate-400 font-mono">{p.code} • {p.specifications.brand}</span>
                          </td>
                          <td className="p-3 text-slate-600 font-medium">
                            {p.categoryName}
                          </td>
                          <td className="p-3 font-black text-red-600">
                            {p.tecnicPrice.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="p-3 text-slate-400 line-through">
                            {p.marketPrice.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="p-3 text-center font-bold text-slate-700">
                            {p.stock}
                          </td>
                          <td className="p-3 text-center">
                            {p.isFeatured ? (
                              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">Có</span>
                            ) : (
                              <span className="text-slate-400 text-[10px]">-</span>
                            )}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setIsProductModalOpen(true);
                                }}
                                className="p-1.5 bg-blue-50 text-[#0071ba] hover:bg-blue-100 rounded-lg"
                                title="Sửa sản phẩm"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                                title="Xóa sản phẩm"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              VIEW 4: QUẢN LÝ MODUL TIN TỨC & SOẠN BÀI BẰNG AI
              ============================================================ */}
          {activeMenu === 'ARTICLES' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quản Lý Modul Tin Tức & Soạn Bài Bằng AI</h1>
                <p className="text-xs text-slate-500">Tạo bài viết chuyên sâu về phục hồi chức năng chuẩn y khoa và SEO bằng Gemini AI</p>
              </div>

              {/* AI Article Writer Box */}
              <div className="bg-linear-to-r from-blue-900 to-[#143472] text-white p-6 rounded-3xl shadow-lg space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <h2 className="text-base font-black uppercase tracking-wide">Trợ lý Gemini AI soạn thảo bài viết y tế chuẩn SEO</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-blue-200 block mb-1">Chủ đề bài viết y khoa:</label>
                    <input
                      type="text"
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      placeholder="Ví dụ: Phục hồi chức năng tay liệt sau đột quỵ bằng Găng tay Robot thông minh"
                      className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-xl text-white outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-blue-300"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-blue-200 block mb-1">Danh mục tin tức:</label>
                    <select
                      value={aiCategory}
                      onChange={(e) => setAiCategory(e.target.value as any)}
                      className="w-full bg-slate-800 border border-white/20 px-3 py-2 rounded-xl text-white outline-none font-bold"
                    >
                      <option value="KIEN_THUC_PHCN">Kiến thức phục hồi chức năng</option>
                      <option value="CHAM_SOC_NGUOI_BENH">Chăm sóc người nằm liệt & tai biến</option>
                      <option value="TU_VAN_THIET_BI">Tư vấn thiết bị y tế chính hãng</option>
                      <option value="TIN_TUC_Y_TE">Tin tức y tế & Dự án TECNIC</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerateAiArticle}
                  disabled={isAiGenerating}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-6 py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                >
                  {isAiGenerating ? (
                    <span>Gemini AI đang viết bài viết y khoa...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Tự động viết bài viết bằng AI
                    </>
                  )}
                </button>

                {aiResult && (
                  <div className="mt-4 p-4 bg-white text-slate-800 rounded-2xl space-y-2">
                    <h3 className="font-black text-sm text-[#143472]">{aiResult.title}</h3>
                    <p className="text-xs text-slate-600 italic">{aiResult.excerpt}</p>
                    <button
                      onClick={() => {
                        setArticles(prev => [aiResult as Article, ...prev]);
                        setAiResult(null);
                        showToast("Đã xuất bản bài viết lên trang tin tức!");
                      }}
                      className="bg-[#0071ba] text-white font-bold px-4 py-1.5 rounded-xl text-xs"
                    >
                      Duyệt & Đăng bài viết này
                    </button>
                  </div>
                )}
              </div>

              {/* Articles List */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <h3 className="font-black text-sm text-[#143472]">Danh sách bài viết hiện tại ({articles.length})</h3>
                <div className="divide-y divide-slate-100">
                  {articles.map(art => (
                    <div key={art.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{art.title}</p>
                        <p className="text-[11px] text-slate-500">{typeof art.author === 'string' ? art.author : art.author?.name || 'BS TECNIC'} • {art.publishedAt}</p>
                      </div>
                      <button
                        onClick={() => {
                          setArticles(prev => prev.filter(a => a.id !== art.id));
                          showToast("Đã gỡ bài viết!");
                        }}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        title="Xóa bài viết"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              VIEW 5: QUẢN LÝ QUẢN TRỊ VIÊN & PHÂN QUYỀN (USERS & ROLES)
              ============================================================ */}
          {activeMenu === 'USERS' && (
            <div className="space-y-4 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quản Lý Quản Trị Viên & Phân Quyền</h1>
                  <p className="text-xs text-slate-500">Phân quyền chi tiết cho Admin, Nhân viên CSKH, Đại lý và Khách hàng</p>
                </div>
                <button
                  onClick={() => setNewUserModalOpen(true)}
                  className="bg-[#0071ba] hover:bg-[#143472] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <PlusCircle className="w-4 h-4 text-amber-300" />
                  <span>Thêm nhân sự / Quản trị viên</span>
                </button>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Họ và tên</th>
                      <th className="p-3">Số điện thoại</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Vai trò phân quyền</th>
                      <th className="p-3">Trạng thái</th>
                      <th className="p-3 text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-[#143472]">
                          {u.fullName}
                          {u.clinicName && <span className="block text-[10px] text-slate-400 font-normal">{u.clinicName}</span>}
                        </td>
                        <td className="p-3 font-mono">{u.phone}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">
                          <select
                            value={u.accountType}
                            onChange={(e) => handleChangeUserRole(u.id, e.target.value as any)}
                            disabled={u.id === 'USR-ADMIN'}
                            className="border border-slate-300 rounded px-2 py-1 font-bold text-xs bg-white text-slate-800"
                          >
                            <option value="ADMIN">Quản trị viên (Toàn quyền)</option>
                            <option value="STAFF">Nhân viên vận hành</option>
                            <option value="DAI_LY">Đại lý / Doanh nghiệp</option>
                            <option value="CA_NHAN">Khách hàng cá nhân</option>
                          </select>
                        </td>
                        <td className="p-3">
                          {u.status === 'LOCKED' ? (
                            <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full text-[10px]">Đã khóa</span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px]">Hoạt động</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {u.id !== 'USR-ADMIN' && (
                            <button
                              onClick={() => handleToggleUserStatus(u.id, u.status)}
                              className={`p-1.5 rounded-lg text-xs font-bold ${u.status === 'LOCKED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-700'}`}
                            >
                              {u.status === 'LOCKED' ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================
              VIEW 6: CẤU HÌNH HỆ THỐNG
              ============================================================ */}
          {activeMenu === 'CONFIG' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Cấu Hình Hệ Thống</h1>
                <p className="text-xs text-slate-500">Thông tin liên hệ, hotline, tài khoản ngân hàng nhận thanh toán VietQR</p>
              </div>

              <form onSubmit={handleSaveSystemConfig} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dòng chữ chạy thông báo Marquee (Đầu trang quản trị):</label>
                  <input
                    type="text"
                    value={systemConfig.marqueeNotice}
                    onChange={(e) => setSystemConfig({ ...systemConfig, marqueeNotice: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Hotline tư vấn chính (24/7):</label>
                    <input
                      type="text"
                      value={systemConfig.hotline}
                      onChange={(e) => setSystemConfig({ ...systemConfig, hotline: e.target.value })}
                      className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Hotline dự phòng:</label>
                    <input
                      type="text"
                      value={systemConfig.hotline2}
                      onChange={(e) => setSystemConfig({ ...systemConfig, hotline2: e.target.value })}
                      className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Trụ sở công ty:</label>
                  <input
                    type="text"
                    value={systemConfig.headquarters}
                    onChange={(e) => setSystemConfig({ ...systemConfig, headquarters: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-black text-sm text-[#143472] mb-3">Tài khoản Ngân hàng nhận thanh toán (Tạo mã VietQR tự động)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Ngân hàng:</label>
                      <input
                        type="text"
                        value={systemConfig.bankName}
                        onChange={(e) => setSystemConfig({ ...systemConfig, bankName: e.target.value })}
                        className="w-full border border-slate-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Số tài khoản:</label>
                      <input
                        type="text"
                        value={systemConfig.accountNumber}
                        onChange={(e) => setSystemConfig({ ...systemConfig, accountNumber: e.target.value })}
                        className="w-full border border-slate-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tên chủ tài khoản:</label>
                      <input
                        type="text"
                        value={systemConfig.accountHolder}
                        onChange={(e) => setSystemConfig({ ...systemConfig, accountHolder: e.target.value })}
                        className="w-full border border-slate-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Chi nhánh:</label>
                      <input
                        type="text"
                        value={systemConfig.branch}
                        onChange={(e) => setSystemConfig({ ...systemConfig, branch: e.target.value })}
                        className="w-full border border-slate-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition uppercase tracking-wider"
                >
                  Lưu cấu hình hệ thống
                </button>
              </form>
            </div>
          )}

          {/* ============================================================
              VIEW 7: QUẢN LÝ SLIDE & BANNER TRANG CHỦ
              ============================================================ */}
          {activeMenu === 'SLIDES' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Sliders className="w-6 h-6 text-[#0071ba]" />
                    Quản Lý Banner & Slide Trang Chủ
                  </h1>
                  <p className="text-xs text-slate-500">Tùy chỉnh Banner Panorama chính diện và các Slide xoay vòng trên trang web TECNIC</p>
                </div>

                <button
                  onClick={() => {
                    setEditingSlide({
                      id: Date.now(),
                      title: 'GIẢI PHÁP THIẾT BỊ Y TẾ CHÍNH HÃNG TECNIC',
                      subtitle: 'Đồng hành cùng người bệnh & gia đình trên hành trình phục hồi sức khỏe',
                      badge: 'Chính Hãng 100%',
                      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&auto=format&fit=crop&q=80',
                      linkText: 'Xem sản phẩm',
                      targetCategory: 'ALL',
                      bgGradient: 'from-[#0e387a] via-[#143472] to-[#0071ba]'
                    });
                    setIsSlideModalOpen(true);
                  }}
                  className="bg-[#0071ba] hover:bg-[#143472] text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Thêm Slide Mới</span>
                </button>
              </div>

              {/* KHỐI 1: BANNER CHÍNH PANORAMA (HERO BANNER) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h2 className="font-black text-sm text-[#143472] uppercase tracking-wide">
                      1. Banner Panorama Chính (Đầu Trang Chủ)
                    </h2>
                  </div>
                  <span className="bg-blue-50 text-[#0071ba] font-bold text-xs px-3 py-1 rounded-full border border-blue-200">
                    Kích thước chuẩn: 1920 × 720 px (Khổ rộng)
                  </span>
                </div>

                {/* Preview Banner */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-[#ffffff] via-[#f2f9ff] to-[#e1f2fe] p-6 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        TECNIC MEDTECH
                      </span>
                      <h3 className="text-xl font-black text-[#0071ba] leading-tight uppercase">
                        {panoramaConfig.title}
                      </h3>
                      <p className="text-2xl text-[#005fa3] font-semibold italic" style={{ fontFamily: "Georgia, serif" }}>
                        {panoramaConfig.slogan}
                      </p>
                      <button className="bg-[#0071ba] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md">
                        {panoramaConfig.buttonText} →
                      </button>
                    </div>

                    <div className="flex justify-center items-center">
                      {panoramaConfig.bannerImage ? (
                        <img 
                          src={panoramaConfig.bannerImage} 
                          alt="Banner Preview" 
                          className="max-h-48 rounded-xl object-cover shadow-sm border border-slate-200"
                        />
                      ) : (
                        <div className="w-full h-44 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 flex flex-col items-center justify-center text-center p-4 text-slate-500">
                          <ImageIcon className="w-10 h-10 text-blue-400 mb-2" />
                          <p className="font-bold text-xs text-slate-700">Hình ảnh thiết bị y tế & nhân viên chăm sóc</p>
                          <p className="text-[10px] text-slate-400">Khung tròn minh họa phối cảnh TECNIC</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Tùy Biến Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tiêu đề chính trên Banner:</label>
                    <input
                      type="text"
                      value={panoramaConfig.title}
                      onChange={(e) => setPanoramaConfig({ ...panoramaConfig, title: e.target.value })}
                      className="w-full border border-slate-300 p-2.5 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#0071ba]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Câu Slogan nét chữ nghệ thuật:</label>
                    <input
                      type="text"
                      value={panoramaConfig.slogan}
                      onChange={(e) => setPanoramaConfig({ ...panoramaConfig, slogan: e.target.value })}
                      className="w-full border border-slate-300 p-2.5 rounded-xl italic font-serif text-slate-800 outline-none focus:ring-2 focus:ring-[#0071ba]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Chữ trên nút kêu gọi hành động (CTA):</label>
                    <input
                      type="text"
                      value={panoramaConfig.buttonText}
                      onChange={(e) => setPanoramaConfig({ ...panoramaConfig, buttonText: e.target.value })}
                      className="w-full border border-slate-300 p-2.5 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#0071ba]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Gắn link ảnh Banner thiết kế riêng (hoặc tải file):</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Dán link ảnh online (https://...) hoặc tải ảnh bên cạnh"
                        value={panoramaConfig.bannerImage}
                        onChange={(e) => setPanoramaConfig({ ...panoramaConfig, bannerImage: e.target.value })}
                        className="flex-1 border border-slate-300 p-2.5 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-[#0071ba]"
                      />
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shrink-0 transition">
                        <ImageIcon className="w-4 h-4" />
                        <span>Tải ảnh</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setPanoramaConfig({ ...panoramaConfig, bannerImage: event.target.result as string });
                                  showToast("Đã tải ảnh banner lên thành công!");
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => showToast("Đã lưu cài đặt Banner Panorama thành công!")}
                    className="bg-[#0071ba] hover:bg-[#143472] text-white font-bold px-6 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 text-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Cài Đặt Banner Chính</span>
                  </button>
                </div>
              </div>

              {/* KHỐI 2: QUẢN LÝ CÁC SLIDE CAROUSEL XOAY VÒNG */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="font-black text-sm text-[#143472] uppercase tracking-wide">
                    2. Danh Sách Slide Carousel Xoay Vòng ({slideBanners.length} Slide)
                  </h2>
                  <span className="text-xs text-slate-500">Tự động chuyển cảnh sau mỗi 6 giây</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slideBanners.map((sl, index) => (
                    <div key={sl.id || index} className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between bg-slate-50 hover:shadow-md transition">
                      <div className="relative h-40 bg-slate-800 overflow-hidden">
                        <img 
                          src={sl.image} 
                          alt={sl.title}
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 p-3 flex flex-col justify-between text-white z-10">
                          <span className="self-start text-[10px] font-black bg-amber-400 text-blue-950 px-2 py-0.5 rounded-full uppercase">
                            {sl.badge}
                          </span>
                          <div>
                            <h3 className="font-bold text-xs line-clamp-2 uppercase drop-shadow-sm">{sl.title}</h3>
                            <p className="text-[10px] text-blue-100 line-clamp-1">{sl.subtitle}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-white space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>Liên kết: <b>{sl.targetCategory || 'Tất cả'}</b></span>
                          <span className="text-[#0071ba] font-bold">{sl.linkText} →</span>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setEditingSlide(sl);
                              setIsSlideModalOpen(true);
                            }}
                            className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0071ba] font-bold rounded-lg transition flex items-center justify-center gap-1 text-[11px]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Chỉnh sửa</span>
                          </button>
                          <button
                            onClick={() => {
                              if (slideBanners.length <= 1) {
                                showToast("Cần giữ ít nhất 1 slide!");
                                return;
                              }
                              setSlideBanners(prev => prev.filter((_, i) => i !== index));
                              showToast("Đã xóa slide!");
                            }}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                            title="Xóa slide"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              VIEW 8: PAGES, CONTACTS
              ============================================================ */}
          {(activeMenu === 'PAGES' || activeMenu === 'CONTACTS') && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {activeMenu === 'PAGES' && 'Trang Thông Tin & Giới Thiệu'}
                {activeMenu === 'CONTACTS' && 'Danh Sách Khách Hàng Yêu Cầu Liên Hệ'}
              </h1>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-600 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="font-bold text-sm">Hệ thống đang hoạt động ổn định và sẵn sàng đồng bộ dữ liệu.</p>
                <p className="text-xs text-slate-400">Các trang thông tin đều được cấu hình tự động từ bộ dữ liệu chuẩn TECNIC MEDTECH.</p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ============================================================
          MODAL: CHI TIẾT ĐƠN HÀNG & IN PHIẾU GIAO HÀNG
          ============================================================ */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
            <div className="bg-[#143472] text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-black text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  Chi Tiết Đơn Hàng: {viewingOrder.orderCode || viewingOrder.id}
                </h3>
                <p className="text-xs text-blue-200">Thời gian đặt: {new Date(viewingOrder.createdAt).toLocaleString('vi-VN')}</p>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {/* Customer Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                <h4 className="font-black text-slate-800 uppercase text-[11px] text-[#0071ba]">Thông tin khách hàng & Giao hàng</h4>
                <p><b>Khách hàng:</b> {viewingOrder.customerName}</p>
                <p><b>Điện thoại:</b> {viewingOrder.customerPhone}</p>
                <p><b>Email:</b> {viewingOrder.customerEmail}</p>
                <p><b>Địa chỉ nhận hàng:</b> {viewingOrder.shippingAddress}</p>
                {viewingOrder.notes && <p className="text-amber-800 font-medium"><b>Ghi chú:</b> {viewingOrder.notes}</p>}
              </div>

              {/* Items Table */}
              <div>
                <h4 className="font-black text-slate-800 uppercase text-[11px] mb-2">Danh sách sản phẩm trong đơn</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                      <tr>
                        <th className="p-2.5">Sản phẩm</th>
                        <th className="p-2.5 text-center">SL</th>
                        <th className="p-2.5 text-right">Đơn giá</th>
                        <th className="p-2.5 text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {viewingOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-medium">{item.productName}</td>
                          <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                          <td className="p-2.5 text-right font-medium">{item.price.toLocaleString('vi-VN')} đ</td>
                          <td className="p-2.5 text-right font-black text-red-600">{item.subtotal.toLocaleString('vi-VN')} đ</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold border-t">
                      <tr>
                        <td colSpan={3} className="p-2.5 text-right">Tổng thanh toán:</td>
                        <td className="p-2.5 text-right font-black text-red-600 text-sm">
                          {viewingOrder.finalTotal.toLocaleString('vi-VN')} đ
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Status Update Quick Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                <span className="font-bold text-[#143472]">Cập nhật trạng thái:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleUpdateOrderStatus(viewingOrder.id, 'PACKING')}
                    className="bg-sky-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs hover:bg-sky-700"
                  >
                    Đóng gói
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(viewingOrder.id, 'SHIPPING')}
                    className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs hover:bg-purple-700"
                  >
                    Vận chuyển
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(viewingOrder.id, 'DELIVERED', 'PAID')}
                    className="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs hover:bg-emerald-700"
                  >
                    Đã giao & Đã thu tiền
                  </button>
                </div>
              </div>

            </div>

            <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                In phiếu đơn hàng
              </button>
              <button
                onClick={() => setViewingOrder(null)}
                className="px-4 py-2 bg-[#0071ba] text-white font-bold rounded-xl text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: THÊM / SỬA SẢN PHẨM
          ============================================================ */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
            <div className="bg-[#143472] text-white p-5 flex justify-between items-center">
              <h3 className="font-black text-base">
                {editingProduct.id ? 'Chỉnh Sửa Thiết Bị Y Tế' : 'Thêm Mới Thiết Bị Y Tế'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-slate-300 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tên thiết bị y tế *</label>
                <input
                  required
                  type="text"
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Danh mục *</label>
                  <select
                    value={editingProduct.category || 'GIUONG_Y_TE'}
                    onChange={(e) => {
                      const cat = CATEGORIES.find(c => c.id === e.target.value);
                      setEditingProduct({ 
                        ...editingProduct, 
                        category: e.target.value as any,
                        categoryName: cat ? cat.name : 'Thiết bị y tế'
                      });
                    }}
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-medium"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Thương hiệu *</label>
                  <input
                    type="text"
                    value={editingProduct.specifications?.brand || 'TECNIC'}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      specifications: { ...(editingProduct.specifications as any), brand: e.target.value } 
                    })}
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Giá bán TECNIC (đ) *</label>
                  <input
                    required
                    type="number"
                    value={editingProduct.tecnicPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tecnicPrice: Number(e.target.value) })}
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-black text-red-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Giá niêm yết (đ)</label>
                  <input
                    type="number"
                    value={editingProduct.marketPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, marketPrice: Number(e.target.value) })}
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số lượng kho</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Đường dẫn ảnh sản phẩm</label>
                <input
                  type="text"
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  placeholder="/products/GĂNG TAY ROBOT...png"
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mô tả ngắn gọn:</label>
                <textarea
                  rows={3}
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0071ba] hover:bg-[#143472] text-white font-bold rounded-xl transition"
                >
                  Lưu sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: TẠO TÀI KHOẢN NHÂN SỰ / QUẢN TRỊ VIÊN
          ============================================================ */}
      {newUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
            <div className="bg-[#143472] text-white p-5 flex justify-between items-center">
              <h3 className="font-black text-base">Thêm Tài Khoản Quản Trị / Nhân Viên</h3>
              <button onClick={() => setNewUserModalOpen(false)} className="p-1 text-slate-300 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 overflow-y-auto space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Họ và tên nhân sự *</label>
                <input
                  required
                  type="text"
                  value={newUserData.fullName}
                  onChange={(e) => setNewUserData({ ...newUserData, fullName: e.target.value })}
                  placeholder="Ví dụ: Lê Văn Nam"
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Số điện thoại *</label>
                <input
                  required
                  type="tel"
                  value={newUserData.phone}
                  onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                  placeholder="0987654321"
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email *</label>
                <input
                  required
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  placeholder="nam.le@tecnic.vn"
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Vai trò phân quyền *</label>
                <select
                  value={newUserData.accountType}
                  onChange={(e) => setNewUserData({ ...newUserData, accountType: e.target.value as any })}
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-bold"
                >
                  <option value="STAFF">Nhân viên Điều Hành & CSKH (Vận hành đơn hàng)</option>
                  <option value="ADMIN">Quản trị viên Hệ thống (Toàn quyền)</option>
                  <option value="DAI_LY">Đại lý / Doanh nghiệp / Tổ chức</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition uppercase tracking-wider"
              >
                Xác nhận tạo tài khoản
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: THÊM / SỬA SLIDE CAROUSEL
          ============================================================ */}
      {isSlideModalOpen && editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
            <div className="bg-[#143472] text-white p-5 flex justify-between items-center">
              <h3 className="font-black text-base">
                {slideBanners.some(s => s.id === editingSlide.id) ? 'Chỉnh Sửa Slide Carousel' : 'Thêm Mới Slide Carousel'}
              </h3>
              <button onClick={() => setIsSlideModalOpen(false)} className="p-1 text-slate-300 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editingSlide.title) {
                  showToast("Vui lòng nhập tiêu đề slide!");
                  return;
                }
                const isExisting = slideBanners.some(s => s.id === editingSlide.id);
                if (isExisting) {
                  setSlideBanners(prev => prev.map(s => s.id === editingSlide.id ? (editingSlide as BannerSlide) : s));
                  showToast("Đã cập nhật slide thành công!");
                } else {
                  setSlideBanners(prev => [...prev, editingSlide as BannerSlide]);
                  showToast("Đã thêm slide mới thành công!");
                }
                setIsSlideModalOpen(false);
              }}
              className="p-6 overflow-y-auto space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tiêu đề slide *</label>
                <input
                  required
                  type="text"
                  value={editingSlide.title || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  placeholder="Ví dụ: THIẾT BỊ Y TẾ CHÍNH HÃNG TECNIC"
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phụ đề mô tả ngắn</label>
                <textarea
                  rows={2}
                  value={editingSlide.subtitle || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  placeholder="Mô tả ưu điểm hoặc chương trình của slide..."
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nhãn nổi bật (Badge)</label>
                  <input
                    type="text"
                    value={editingSlide.badge || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                    placeholder="Chính Hãng 100%"
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Chữ trên nút</label>
                  <input
                    type="text"
                    value={editingSlide.linkText || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, linkText: e.target.value })}
                    placeholder="Khám phá ngay"
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Danh mục sản phẩm liên kết</label>
                <select
                  value={editingSlide.targetCategory || 'ALL'}
                  onChange={(e) => setEditingSlide({ ...editingSlide, targetCategory: e.target.value as any })}
                  className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] font-bold"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hình ảnh Slide (URL hoặc tải file)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingSlide.image || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 border border-slate-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                  <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shrink-0 transition">
                    <ImageIcon className="w-4 h-4" />
                    <span>Tải file</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              setEditingSlide({ ...editingSlide, image: event.target.result as string });
                              showToast("Đã tải ảnh lên!");
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSlideModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0071ba] hover:bg-[#143472] text-white font-bold rounded-xl"
                >
                  Lưu Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
