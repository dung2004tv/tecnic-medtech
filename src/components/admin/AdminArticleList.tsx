import React, { useState } from 'react';
import { Plus, Search, RotateCcw, Edit, Trash2, Sparkles, Eye } from 'lucide-react';
import { Article } from '../../types';

interface AdminArticleListProps {
  articles: Article[];
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
  onAddNewArticle: () => void;
  onOpenAiModal: () => void;
}

export const AdminArticleList: React.FC<AdminArticleListProps> = ({
  articles,
  onEditArticle,
  onDeleteArticle,
  onAddNewArticle,
  onOpenAiModal
}) => {
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filterType, setFilterType] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredArticles = articles.filter(a => {
    const matchKey = !keyword.trim() || 
      a.title.toLowerCase().includes(keyword.toLowerCase().trim()) || 
      (a.excerpt && a.excerpt.toLowerCase().includes(keyword.toLowerCase().trim()));
    const matchCat = categoryFilter === 'ALL' || a.category === categoryFilter;
    return matchKey && matchCat;
  });

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách bài viết</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Bài viết</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách bài viết</span>
        </div>
      </div>

      {/* Action Buttons: + Thêm mới & Gemini AI generator */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <button 
          onClick={onAddNewArticle}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm mới</span>
        </button>

        <button 
          onClick={onOpenAiModal}
          className="bg-[#143472] hover:bg-blue-900 text-amber-300 border border-amber-400/40 text-xs font-bold px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Soạn bài báo y khoa bằng Gemini AI</span>
        </button>
      </div>

      {/* Filter Box (Thanh tìm kiếm chuẩn hình 4) */}
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
              <option value="newest">Mới nhất</option>
              <option value="views">Lượt xem nhiều</option>
            </select>
          </div>

          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="">-- Lọc --</option>
              <option value="featured">Bài viết nổi bật</option>
            </select>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="ALL">-- Tất cả danh mục --</option>
              <option value="KIEN_THUC_PHCN">Kiến thức phục hồi chức năng</option>
              <option value="CHAM_SOC_NGUOI_BENH">Chăm sóc người bệnh tại nhà</option>
              <option value="TU_VAN_THIET_BI">Tư vấn thiết bị y tế</option>
              <option value="TIN_TUC_SU_KIEN">Tin tức & Sự kiện TECNIC</option>
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
              Làm lại
            </button>
          </div>

        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-10 text-center">
                <button 
                  onClick={() => {
                    if (selectedIds.length > 0) {
                      if (window.confirm(`Xóa ${selectedIds.length} bài viết đã chọn?`)) {
                        selectedIds.forEach(id => onDeleteArticle(id));
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
              <th className="py-2.5 px-3 min-w-[200px]">Tên bài viết</th>
              <th className="py-2.5 px-3 min-w-[240px]">Giới thiệu</th>
              <th className="py-2.5 px-3 w-20 text-center">Số lượt xem</th>
              <th className="py-2.5 px-3 w-20 text-center">Ảnh</th>
              <th className="py-2.5 px-3 w-20 text-center">Trạng thái</th>
              <th className="py-2.5 px-3 w-20 text-center">Nổi bật</th>
              <th className="py-2.5 px-3 w-16 text-center">Thứ tự</th>
              <th className="py-2.5 px-3 min-w-[140px]">Danh mục</th>
              <th className="py-2.5 px-3 w-24 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredArticles.map((a, idx) => (
              <tr key={a.id} className="hover:bg-slate-50/80 transition">
                <td className="py-2.5 px-3 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(a.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds([...selectedIds, a.id]);
                      else setSelectedIds(selectedIds.filter(id => id !== a.id));
                    }}
                    className="rounded" 
                  />
                </td>
                <td className="py-2.5 px-2 text-center text-slate-500">{idx + 1}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800">
                  <p className="line-clamp-2">{a.title}</p>
                </td>
                <td className="py-2.5 px-3 text-slate-600">
                  <p className="line-clamp-2">{a.excerpt || 'Đang cập nhật tóm tắt...'}</p>
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600 font-bold">
                  {a.views || Math.floor(Math.random() * 500) + 120}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {a.coverImage && (
                    <img 
                      src={a.coverImage} 
                      alt="" 
                      className="w-12 h-10 object-cover mx-auto rounded border border-slate-200" 
                    />
                  )}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold text-white bg-[#28a745]">
                    Hiện
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white ${a.isFeatured ? 'bg-[#28a745]' : 'bg-[#17a2b8]'}`}>
                    {a.isFeatured ? 'Có' : 'Không'}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <input 
                    type="number" 
                    defaultValue={idx} 
                    className="w-12 text-center border border-slate-300 py-0.5 rounded text-xs" 
                  />
                </td>
                <td className="py-2.5 px-3 text-slate-600">
                  {a.categoryName || 'Tin tức & Tuyển dụng'}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => onEditArticle(a)}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded" 
                      title="Sửa bài viết"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => onDeleteArticle(a.id)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded" 
                      title="Xóa bài viết"
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
