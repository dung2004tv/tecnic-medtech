import React, { useState } from 'react';
import { Search, RotateCcw, Download, Trash2, Mail, Phone, Plus, Edit, X, Save, Check } from 'lucide-react';

interface ContactItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  content: string;
  status: 'PROCESSED' | 'PENDING';
  createdAt: string;
}

export const AdminContactList: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [contacts, setContacts] = useState<ContactItem[]>([
    {
      id: '1',
      name: 'Nguyễn Đình Quân',
      phone: '0988776655',
      email: 'dinhquan.med@gmail.com',
      content: 'Tôi muốn tư vấn mua giường y tế 4 tay quay có bô vệ sinh cho người nhà tai biến tại Cầu Giấy, Hà Nội.',
      status: 'PROCESSED',
      createdAt: '2026-03-22 10:15'
    },
    {
      id: '2',
      name: 'Trần Thị Bích Ngọc',
      phone: '0912998877',
      email: 'bichngoc.clinic@gmail.com',
      content: 'Xin báo giá dự án cung cấp 10 máy đo huyết áp điện tử và 5 máy đo đường huyết cho phòng khám tư nhân.',
      status: 'PENDING',
      createdAt: '2026-03-21 15:40'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredContacts = contacts.filter(c => {
    const matchKey = !keyword.trim() || 
      c.name.toLowerCase().includes(keyword.toLowerCase()) || 
      c.phone.includes(keyword) || 
      c.email.toLowerCase().includes(keyword.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchKey && matchStatus;
  });

  const handleToggleStatus = (id: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { 
      ...c, 
      status: c.status === 'PROCESSED' ? 'PENDING' : 'PROCESSED' 
    } : c));
    showToast('Đã đổi trạng thái xử lý liên hệ!');
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa thông tin liên hệ này?")) {
      setContacts(prev => prev.filter(c => c.id !== id));
      showToast('Đã xóa liên hệ!');
    }
  };

  const handleOpenAdd = () => {
    setEditingContact({
      id: '',
      name: '',
      phone: '',
      email: '',
      content: '',
      status: 'PENDING',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: ContactItem) => {
    setEditingContact({ ...c });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContact || !editingContact.name.trim() || !editingContact.phone.trim()) {
      showToast('Vui lòng nhập họ tên và số điện thoại!');
      return;
    }

    if (editingContact.id) {
      setContacts(prev => prev.map(c => c.id === editingContact.id ? editingContact : c));
      showToast('Đã cập nhật liên hệ!');
    } else {
      const newContact: ContactItem = {
        ...editingContact,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      setContacts(prev => [newContact, ...prev]);
      showToast('Đã thêm liên hệ mới thành công!');
    }

    setIsModalOpen(false);
    setEditingContact(null);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 animate-fadeIn">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#032f6a] text-white px-4 py-2.5 rounded shadow-lg text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách liên hệ</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Liên hệ</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách</span>
        </div>
      </div>

      {/* Button top: + Thêm mới */}
      <div className="flex justify-start">
        <button 
          onClick={handleOpenAdd}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm thông tin liên hệ mới</span>
        </button>
      </div>

      {/* Filter Box (Thanh tìm kiếm chuẩn hình 8) */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2.5 items-center">
          
          <div className="md:col-span-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Từ khóa (Họ tên, SĐT, Email...)"
              className="w-full border border-slate-300 px-3 py-1.5 text-xs rounded outline-none focus:border-[#17a2b8]"
            />
          </div>

          <div>
            <select
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="newest">Sắp xếp theo: Mới nhất</option>
              <option value="oldest">Sắp xếp theo: Cũ nhất</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="ALL">Tình trạng (Tất cả)</option>
              <option value="PENDING">Chưa xử lý</option>
              <option value="PROCESSED">Đã xử lý</option>
            </select>
          </div>

          <div className="flex gap-1.5 md:col-span-2">
            <button 
              onClick={() => {}}
              className="flex-1 bg-[#28a745] hover:bg-[#218838] text-white text-xs font-bold py-1.5 px-2 rounded transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Tìm kiếm</span>
            </button>
            <button 
              onClick={() => {
                setKeyword('');
                setStatusFilter('ALL');
              }}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white text-xs font-bold py-1.5 px-3 rounded transition flex items-center justify-center cursor-pointer"
              title="Làm lại"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => showToast("Đã xuất danh sách liên hệ ra file Excel thành công!")}
              className="bg-[#28a745] hover:bg-[#218838] text-white text-xs font-bold py-1.5 px-2.5 rounded transition flex items-center justify-center gap-1 cursor-pointer"
              title="Xuất Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Excel</span>
            </button>
          </div>

        </div>
      </div>

      {/* Record Counter */}
      <div className="flex justify-end text-xs font-bold text-slate-700">
        <span>Tổng số bản ghi {filteredContacts.length}</span>
      </div>

      {/* Contacts Table (Chuẩn cấu trúc hình 8) */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-10 text-center">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="py-2.5 px-2 w-10 text-center">Stt</th>
              <th className="py-2.5 px-4 min-w-[220px]">Thông tin</th>
              <th className="py-2.5 px-3 w-28 text-center">Trạng thái</th>
              <th className="py-2.5 px-4 min-w-[280px]">Nội dung liên hệ</th>
              <th className="py-2.5 px-3 w-32 text-center">Thời gian</th>
              <th className="py-2.5 px-3 w-24 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredContacts.map((c, idx) => (
              <tr key={c.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3 text-center">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-3 px-2 text-center text-slate-500">{idx + 1}</td>
                
                {/* Thông tin */}
                <td className="py-3 px-4 space-y-0.5">
                  <div className="font-bold text-slate-800">{c.name}</div>
                  <div className="text-slate-600 font-mono text-[11px] flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" /> {c.phone}
                  </div>
                  <div className="text-slate-500 text-[11px] flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" /> {c.email || 'N/A'}
                  </div>
                </td>

                {/* Trạng thái */}
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={() => handleToggleStatus(c.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                      c.status === 'PROCESSED' 
                        ? 'bg-[#28a745] hover:bg-[#218838] text-white' 
                        : 'bg-[#ffc107] hover:bg-[#e0a800] text-slate-900'
                    }`}
                  >
                    {c.status === 'PROCESSED' ? 'Đã xử lý' : 'Chưa xử lý'}
                  </button>
                </td>

                {/* Nội dung */}
                <td className="py-3 px-4 text-slate-700">
                  {c.content}
                </td>

                {/* Thời gian */}
                <td className="py-3 px-3 text-center text-[11px] text-slate-600 font-mono">
                  {c.createdAt}
                </td>

                {/* Hành động */}
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => handleOpenEdit(c)}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded transition cursor-pointer"
                      title="Sửa thông tin liên hệ"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(c.id)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded transition cursor-pointer"
                      title="Xóa liên hệ"
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

      {/* MODAL THÊM / SỬA LIÊN HỆ */}
      {isModalOpen && editingContact && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-[#032f6a] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {editingContact.id ? 'Chỉnh sửa Thông tin liên hệ' : 'Thêm mới Thông tin liên hệ'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={editingContact.name}
                    onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                    placeholder="Nguyễn Văn B"
                    className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={editingContact.phone}
                    onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                    placeholder="0988..."
                    className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email liên hệ</label>
                <input 
                  type="email" 
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  placeholder="khachhang@gmail.com"
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nội dung nhu cầu tư vấn</label>
                <textarea 
                  rows={4}
                  value={editingContact.content}
                  onChange={(e) => setEditingContact({ ...editingContact, content: e.target.value })}
                  placeholder="Cần tư vấn báo giá giường y tế, giao hàng tận nơi..."
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Trạng thái xử lý</label>
                <select
                  value={editingContact.status}
                  onChange={(e) => setEditingContact({ ...editingContact, status: e.target.value as any })}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] bg-white font-bold"
                >
                  <option value="PENDING">Chưa xử lý (Cần gọi lại)</option>
                  <option value="PROCESSED">Đã xử lý (Đã tư vấn/báo giá)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#032f6a] hover:bg-[#021f4a] text-white rounded text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{editingContact.id ? 'Lưu thông tin' : 'Tạo liên hệ'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
