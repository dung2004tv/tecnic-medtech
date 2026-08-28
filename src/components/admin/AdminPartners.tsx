import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit, Save, X, Image as ImageIcon, Globe, Check, Eye, EyeOff, Search, ExternalLink
} from 'lucide-react';
import { Partner } from '../../types';

export const AdminPartners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>(() => {
    try {
      const stored = localStorage.getItem('tecnic_partners');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn(e);
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  
  // Form State
  const [formName, setFormName] = useState('');
  const [formLogo, setFormLogo] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formOrder, setFormOrder] = useState(1);
  const [formStatus, setFormStatus] = useState(true);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const savePartnersToStorage = (updated: Partner[]) => {
    setPartners(updated);
    try {
      localStorage.setItem('tecnic_partners', JSON.stringify(updated));
      window.dispatchEvent(new Event('tecnic_partners_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenAdd = () => {
    setEditingPartner(null);
    setFormName('');
    setFormLogo('');
    setFormWebsite('');
    setFormOrder(partners.length + 1);
    setFormStatus(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormName(partner.name);
    setFormLogo(partner.logo || '');
    setFormWebsite(partner.website || '');
    setFormOrder(partner.order ?? 1);
    setFormStatus(partner.status !== false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('Vui lòng nhập tên đối tác / khách hàng!');
      return;
    }

    if (editingPartner) {
      // Edit
      const updated = partners.map(p => {
        if (p.id === editingPartner.id) {
          return {
            ...p,
            name: formName.trim(),
            logo: formLogo.trim(),
            website: formWebsite.trim(),
            order: Number(formOrder) || 1,
            status: formStatus
          };
        }
        return p;
      });
      savePartnersToStorage(updated);
      showToast('Đã cập nhật thông tin đối tác thành công!');
    } else {
      // Add
      const newPartner: Partner = {
        id: Date.now().toString(),
        name: formName.trim(),
        logo: formLogo.trim(),
        website: formWebsite.trim(),
        order: Number(formOrder) || (partners.length + 1),
        status: formStatus
      };
      savePartnersToStorage([...partners, newPartner]);
      showToast('Đã thêm đối tác mới thành công!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string | number, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đối tác "${name}" không?`)) {
      const updated = partners.filter(p => p.id !== id);
      savePartnersToStorage(updated);
      showToast(`Đã xóa đối tác "${name}"!`);
    }
  };

  const handleToggleStatus = (id: string | number) => {
    const updated = partners.map(p => {
      if (p.id === id) {
        const nextStatus = !(p.status !== false);
        return { ...p, status: nextStatus };
      }
      return p;
    });
    savePartnersToStorage(updated);
    showToast('Đã thay đổi trạng thái hiển thị!');
  };

  const filteredPartners = partners
    .filter(p => !searchTerm.trim() || p.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-5 font-sans text-slate-800 animate-fadeIn">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#032f6a] text-white px-4 py-2.5 rounded shadow-lg text-xs font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span>Quản lý Đối tác - Khách hàng</span>
            <span className="text-xs bg-blue-100 text-[#0071ba] font-bold px-2 py-0.5 rounded-full">
              {partners.length} đối tác
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản lý danh sách logo đối tác, bệnh viện, doanh nghiệp liên kết hiển thị trên trang chủ
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white px-4 py-2 rounded text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ THÊM ĐỐI TÁC MỚI</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm đối tác theo tên..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-300 outline-none focus:border-[#17a2b8]"
          />
        </div>

        <div className="text-xs text-slate-500">
          Hiện tại: <strong>{filteredPartners.filter(p => p.status !== false).length}</strong> đối tác đang hiển thị
        </div>
      </div>

      {/* Partners List / Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        {filteredPartners.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <ImageIcon className="w-8 h-8 opacity-50" />
            </div>
            <p className="font-medium text-sm text-slate-700">Chưa có đối tác / khách hàng nào được thiết lập.</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Khi bạn thêm đối tác tại đây, mục &quot;ĐỐI TÁC - KHÁCH HÀNG&quot; sẽ tự động xuất hiện trên trang chủ.
            </p>
            <button
              onClick={handleOpenAdd}
              className="mt-2 bg-[#0071ba] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm đối tác đầu tiên
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px]">
                  <th className="py-3 px-4 w-16 text-center">Thứ tự</th>
                  <th className="py-3 px-4 w-28 text-center">Logo</th>
                  <th className="py-3 px-4">Tên Đối tác / Doanh nghiệp</th>
                  <th className="py-3 px-4">Website liên kết</th>
                  <th className="py-3 px-4 w-28 text-center">Trạng thái</th>
                  <th className="py-3 px-4 w-28 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 text-center font-bold text-slate-600">
                      {partner.order ?? 1}
                    </td>
                    
                    <td className="py-3 px-4 text-center">
                      <div className="w-20 h-12 bg-white border border-slate-200 rounded p-1 flex items-center justify-center mx-auto overflow-hidden">
                        {partner.logo ? (
                          <img 
                            src={partner.logo} 
                            alt={partner.name} 
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x50?text=LOGO';
                            }}
                          />
                        ) : (
                          <span className="text-[10px] text-slate-400 font-bold">NO LOGO</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 text-sm">{partner.name}</div>
                      <div className="text-[11px] text-slate-400">ID: {partner.id}</div>
                    </td>

                    <td className="py-3 px-4">
                      {partner.website ? (
                        <a 
                          href={partner.website} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-[#0071ba] hover:underline flex items-center gap-1 font-medium truncate max-w-xs"
                        >
                          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{partner.website}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">Không có link</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(partner.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition ${
                          partner.status !== false 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Bấm để bật/tắt hiển thị"
                      >
                        {partner.status !== false ? (
                          <>
                            <Eye className="w-3 h-3" /> Hiển thị
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Đang ẩn
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(partner)}
                          className="p-1.5 bg-blue-50 text-[#0071ba] hover:bg-blue-100 rounded transition"
                          title="Chỉnh sửa đối tác"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id, partner.name)}
                          className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded transition"
                          title="Xóa đối tác"
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
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#032f6a] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-300" />
                <span>{editingPartner ? 'Chỉnh sửa Đối tác / Khách hàng' : 'Thêm Đối tác / Khách hàng mới'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/80 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              
              {/* Tên đối tác */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">
                  Tên đối tác / Bệnh viện / Tổ chức <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ví dụ: Bệnh viện Quân Y 103, Vingroup, Techcombank..."
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:border-[#17a2b8]"
                />
              </div>

              {/* Logo URL */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">
                  Đường dẫn ảnh Logo (URL)
                </label>
                <input
                  type="url"
                  value={formLogo}
                  onChange={(e) => setFormLogo(e.target.value)}
                  placeholder="https://domain.com/logo.png"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:border-[#17a2b8]"
                />
                <p className="text-[11px] text-slate-400">
                  Khuyến nghị ảnh định dạng PNG/SVG nền trong suốt hoặc hình chữ nhật kích thước ~ 200x100px.
                </p>
              </div>

              {/* Preview Logo */}
              {formLogo && (
                <div className="space-y-1">
                  <span className="block font-bold text-slate-600 text-[11px]">Xem trước logo:</span>
                  <div className="w-32 h-16 bg-slate-50 border border-slate-200 rounded flex items-center justify-center p-2">
                    <img 
                      src={formLogo} 
                      alt="Preview" 
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x60?text=Loi+Anh';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Website */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">
                  Website / Liên kết (Tùy chọn)
                </label>
                <input
                  type="url"
                  value={formWebsite}
                  onChange={(e) => setFormWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:border-[#17a2b8]"
                />
              </div>

              {/* Thứ tự & Trạng thái */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    min="1"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:border-[#17a2b8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Trạng thái</label>
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="partnerStatus"
                      checked={formStatus}
                      onChange={(e) => setFormStatus(e.target.checked)}
                      className="w-4 h-4 text-[#0071ba] rounded cursor-pointer"
                    />
                    <label htmlFor="partnerStatus" className="text-slate-700 font-medium cursor-pointer">
                      Hiển thị trên website
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#032f6a] hover:bg-[#021f4a] text-white font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{editingPartner ? 'Lưu thay đổi' : 'Thêm đối tác'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
