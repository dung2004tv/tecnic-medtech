import React, { useState } from 'react';
import { Plus, Folder, Edit, Trash2, X, Save, Check } from 'lucide-react';
import { Product } from '../../types';

interface CategoryItem {
  id: string;
  name: string;
  order: number;
  isFeatured: boolean;
  status: boolean;
}

interface AdminCategoryProductProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number | string) => void;
  onAddNewProduct: () => void;
}

export const AdminCategoryProduct: React.FC<AdminCategoryProductProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onAddNewProduct
}) => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Categories list
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: '1', name: 'Giường y tế đa năng', order: 1, isFeatured: true, status: true },
    { id: '2', name: 'Xe lăn y tế & Ghế bô', order: 2, isFeatured: true, status: true },
    { id: '3', name: 'Thiết bị tập PHCN & Robot', order: 3, isFeatured: true, status: true },
    { id: '4', name: 'Đai nẹp khớp & Cố định chấn thương', order: 4, isFeatured: true, status: true },
    { id: '5', name: 'Đệm hơi chống loét', order: 5, isFeatured: true, status: true },
    { id: '6', name: 'Máy vật lý trị liệu & Xung điện', order: 6, isFeatured: true, status: true },
    { id: '7', name: 'Thiết bị y học cổ truyền & Đông y', order: 7, isFeatured: false, status: true },
    { id: '8', name: 'Gậy chống & Nạng nách tập đi', order: 8, isFeatured: false, status: true }
  ]);

  // Modal State for Categories
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);
  const [catName, setCatName] = useState('');
  const [catOrder, setCatOrder] = useState(1);
  const [catFeatured, setCatFeatured] = useState(false);
  const [catStatus, setCatStatus] = useState(true);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAddCat = () => {
    setEditingCat(null);
    setCatName('');
    setCatOrder(categories.length + 1);
    setCatFeatured(false);
    setCatStatus(true);
    setIsCatModalOpen(true);
  };

  const handleOpenEditCat = (cat: CategoryItem) => {
    setEditingCat(cat);
    setCatName(cat.name);
    setCatOrder(cat.order);
    setCatFeatured(cat.isFeatured);
    setCatStatus(cat.status);
    setIsCatModalOpen(true);
  };

  const handleSaveCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) {
      showToast('Vui lòng nhập tên danh mục!');
      return;
    }

    if (editingCat) {
      setCategories(prev => prev.map(c => c.id === editingCat.id ? {
        ...c,
        name: catName.trim(),
        order: Number(catOrder) || 1,
        isFeatured: catFeatured,
        status: catStatus
      } : c));
      showToast('Đã cập nhật danh mục thành công!');
    } else {
      const newCat: CategoryItem = {
        id: Date.now().toString(),
        name: catName.trim(),
        order: Number(catOrder) || (categories.length + 1),
        isFeatured: catFeatured,
        status: catStatus
      };
      setCategories(prev => [...prev, newCat]);
      showToast('Đã thêm danh mục mới thành công!');
    }

    setIsCatModalOpen(false);
  };

  const handleDeleteCat = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) {
      setCategories(prev => prev.filter(c => c.id !== id));
      showToast(`Đã xóa danh mục "${name}"!`);
    }
  };

  const handleToggleCatFeatured = (id: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, isFeatured: !c.isFeatured } : c));
    showToast('Đã đổi trạng thái nổi bật của danh mục!');
  };

  const handleToggleCatStatus = (id: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, status: !c.status } : c));
    showToast('Đã đổi trạng thái hiển thị của danh mục!');
  };

  const filteredCategories = categories.filter(c => 
    !keyword.trim() || c.name.toLowerCase().includes(keyword.toLowerCase().trim())
  );

  const filteredProducts = products.filter(p => {
    const matchKey = !keyword.trim() || p.name.toLowerCase().includes(keyword.toLowerCase().trim());
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchKey && matchCat;
  });

  return (
    <div className="space-y-5 font-sans text-slate-800 animate-fadeIn">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#032f6a] text-white px-4 py-2.5 rounded shadow-lg text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách danh mục</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Danh mục sản phẩm</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách danh mục</span>
        </div>
      </div>

      {/* Action Top Button */}
      <div className="flex justify-between items-center gap-2">
        <button 
          onClick={handleOpenAddCat}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm Danh mục mới</span>
        </button>

        <button 
          onClick={onAddNewProduct}
          className="bg-[#28a745] hover:bg-[#218838] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm Sản phẩm mới</span>
        </button>
      </div>

      {/* Filter Box */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Nhập từ khóa tìm kiếm danh mục..."
            className="w-full border border-slate-300 px-3 py-1.5 text-xs rounded outline-none focus:border-[#17a2b8]"
          />
        </div>
        {keyword && (
          <button 
            onClick={() => setKeyword('')}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white text-xs font-bold px-4 py-1.5 rounded transition"
          >
            Làm lại
          </button>
        )}
      </div>

      {/* Table 1: Danh mục sản phẩm */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-12 text-center">#</th>
              <th className="py-2.5 px-3">Tên danh mục</th>
              <th className="py-2.5 px-3 w-20 text-center">Thứ tự</th>
              <th className="py-2.5 px-3 w-24 text-center">Nổi bật</th>
              <th className="py-2.5 px-3 w-24 text-center">Trạng thái</th>
              <th className="py-2.5 px-3 w-32 text-center">Tác Vụ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredCategories.map((cat, idx) => (
              <tr key={cat.id} className="hover:bg-slate-50/80 transition">
                <td className="py-2.5 px-3 text-center text-slate-500">{idx + 1}</td>
                <td className="py-2.5 px-3 font-bold text-[#0071ba] flex items-center gap-2">
                  <Folder className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                  <span className="cursor-pointer hover:underline">{cat.name}</span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className="font-bold text-slate-600">{cat.order}</span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <button
                    onClick={() => handleToggleCatFeatured(cat.id)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold text-white transition ${cat.isFeatured ? 'bg-[#28a745]' : 'bg-slate-400'}`}
                    title="Bấm để đổi nổi bật"
                  >
                    {cat.isFeatured ? 'Có' : 'Không'}
                  </button>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <button
                    onClick={() => handleToggleCatStatus(cat.id)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold text-white transition ${cat.status ? 'bg-[#28a745]' : 'bg-red-500'}`}
                    title="Bấm để đổi trạng thái"
                  >
                    {cat.status ? 'Hiện' : 'Ẩn'}
                  </button>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => handleOpenEditCat(cat)}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1 rounded transition" 
                      title="Sửa danh mục"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCat(cat.id, cat.name)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded transition" 
                      title="Xóa danh mục"
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

      {/* Section 2: Danh Sách sản phẩm theo danh mục */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
            <span className="text-slate-500 font-mono">:=</span>
            <h2>Danh Sách sản phẩm</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">Tổng: {filteredProducts.length} sản phẩm</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-2 w-10 text-center">STT</th>
                <th className="py-2.5 px-3">Tên sản phẩm</th>
                <th className="py-2.5 px-3 w-20 text-center">Hình ảnh</th>
                <th className="py-2.5 px-3 w-24 text-right">Giá bán</th>
                <th className="py-2.5 px-3">Danh mục</th>
                <th className="py-2.5 px-3 w-24 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.slice(0, 20).map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-2 text-center text-slate-500">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    <div>{p.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">Mã: {p.code}</div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {p.image && (
                      <img 
                        src={p.image} 
                        alt="" 
                        className="w-10 h-10 object-contain mx-auto rounded border border-slate-200 bg-white" 
                      />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-red-600">
                    {p.tecnicPrice.toLocaleString('vi-VN')}₫
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {p.categoryName}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button 
                        onClick={() => onEditProduct(p)}
                        className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded transition" 
                        title="Sửa sản phẩm"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => onDeleteProduct(p.id)}
                        className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded transition" 
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

      {/* MODAL THÊM / SỬA DANH MỤC */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="bg-[#032f6a] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Folder className="w-4 h-4 text-amber-300" />
                <span>{editingCat ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục mới'}</span>
              </h3>
              <button onClick={() => setIsCatModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCat} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Tên danh mục <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Ví dụ: Giường y tế, Đai nẹp khớp..."
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:border-[#17a2b8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    min="1"
                    value={catOrder}
                    onChange={(e) => setCatOrder(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:border-[#17a2b8]"
                  />
                </div>

                <div className="space-y-2 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={catFeatured}
                      onChange={(e) => setCatFeatured(e.target.checked)}
                      className="w-4 h-4 text-[#0071ba] rounded"
                    />
                    <span className="font-bold text-slate-700">Nổi bật</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={catStatus}
                      onChange={(e) => setCatStatus(e.target.checked)}
                      className="w-4 h-4 text-[#0071ba] rounded"
                    />
                    <span className="font-bold text-slate-700">Hiển thị</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#032f6a] hover:bg-[#021f4a] text-white font-bold transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{editingCat ? 'Lưu thay đổi' : 'Thêm danh mục'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
