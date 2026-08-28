import React, { useState } from 'react';
import { Plus, Search, RotateCcw, Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { CATEGORIES } from '../../data/productsData';

interface AdminProductListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number | string) => void;
  onAddNewProduct: () => void;
}

export const AdminProductList: React.FC<AdminProductListProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onAddNewProduct
}) => {
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filterType, setFilterType] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const filteredProducts = products.filter(p => {
    const matchKey = !keyword.trim() || p.name.toLowerCase().includes(keyword.toLowerCase().trim());
    const matchCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchKey && matchCat;
  });

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách Sản phẩm</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Sản phẩm</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách Sản phẩm</span>
        </div>
      </div>

      {/* Button: + Thêm mới */}
      <div className="flex justify-start">
        <button 
          onClick={onAddNewProduct}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm mới</span>
        </button>
      </div>

      {/* Filter Box (Thanh tìm kiếm chuẩn hình 2) */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2.5 items-center">
          
          <div className="md:col-span-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Từ khóa"
              className="w-full border border-slate-300 px-3 py-1.5 text-xs rounded outline-none focus:border-[#17a2b8]"
            />
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="">-- Sắp xếp theo --</option>
              <option value="name_asc">Tên (A-Z)</option>
              <option value="name_desc">Tên (Z-A)</option>
              <option value="price_asc">Giá (Thấp - Cao)</option>
              <option value="price_desc">Giá (Cao - Thấp)</option>
            </select>
          </div>

          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="">-- Lọc --</option>
              <option value="featured">Sản phẩm nổi bật</option>
              <option value="discount">Có giảm giá</option>
              <option value="in_stock">Còn hàng</option>
            </select>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="ALL">-- Tất cả danh mục --</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => {}}
              className="flex-1 bg-[#28a745] hover:bg-[#218838] text-white text-xs font-bold py-1.5 px-3 rounded transition text-center"
            >
              Tìm
            </button>
            <button 
              onClick={() => {
                setKeyword('');
                setCategoryFilter('ALL');
                setSortBy('');
                setFilterType('');
              }}
              className="flex-1 bg-[#dc3545] hover:bg-[#c82333] text-white text-xs font-bold py-1.5 px-3 rounded transition text-center"
            >
              Làm mới
            </button>
          </div>

        </div>
      </div>

      {/* Record Counter */}
      <div className="flex justify-end text-xs font-bold text-slate-700">
        <span>Tổng số bản ghi {filteredProducts.length} / {products.length || 114}</span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-10 text-center">
                <button 
                  onClick={() => {
                    if (selectedIds.length > 0) {
                      if (window.confirm(`Xóa ${selectedIds.length} sản phẩm đã chọn?`)) {
                        selectedIds.forEach(id => onDeleteProduct(id));
                        setSelectedIds([]);
                      }
                    }
                  }}
                  className="bg-[#dc3545] text-white p-1 rounded hover:bg-[#c82333]" 
                  title="Xóa đã chọn"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </th>
              <th className="py-2.5 px-2 w-10 text-center">STT</th>
              <th className="py-2.5 px-3 min-w-[220px]">Tên</th>
              <th className="py-2.5 px-3 w-20 text-center">Hình ảnh</th>
              <th className="py-2.5 px-3 w-20 text-center">Trạng thái</th>
              <th className="py-2.5 px-3 w-20 text-center">Nổi bật</th>
              <th className="py-2.5 px-3 w-16 text-center">Thứ tự</th>
              <th className="py-2.5 px-3 min-w-[160px]">Danh mục</th>
              <th className="py-2.5 px-3 w-24 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredProducts.map((p, idx) => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition">
                <td className="py-2.5 px-3 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(p.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds([...selectedIds, p.id]);
                      else setSelectedIds(selectedIds.filter(id => id !== p.id));
                    }}
                    className="rounded" 
                  />
                </td>
                <td className="py-2.5 px-2 text-center text-slate-500">{idx}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800">
                  {p.name}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {p.image && (
                    <img 
                      src={p.image} 
                      alt="" 
                      className="w-12 h-12 object-contain mx-auto rounded border border-slate-200 bg-white" 
                    />
                  )}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold text-white bg-[#28a745]">
                    Hiện
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white ${p.isFeatured ? 'bg-[#28a745]' : 'bg-[#17a2b8]'}`}>
                    {p.isFeatured ? 'Có' : 'Không'}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <input 
                    type="number" 
                    defaultValue={0} 
                    className="w-12 text-center border border-slate-300 py-0.5 rounded text-xs" 
                  />
                </td>
                <td className="py-2.5 px-3 text-slate-600">
                  {p.categoryName || 'Máy siêu âm thai nhi tại nhà'}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => onEditProduct(p)}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded" 
                      title="Sửa sản phẩm"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => onDeleteProduct(p.id)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded" 
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
  );
};
