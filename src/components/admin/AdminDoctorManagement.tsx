import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, Plus, Search, Edit2, Trash2, CheckCircle2, 
  XCircle, Phone, Mail, Building2, Tag, Percent, DollarSign, Save, X, RefreshCw, Copy, Check
} from 'lucide-react';
import { Doctor } from '../../types';
import { INITIAL_DOCTORS, normalizeDoctorName, generateDoctorReferralCode } from '../../data/doctorsData';

export const AdminDoctorManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Form state
  const [formData, setFormData] = useState<Partial<Doctor>>({
    name: '',
    code: '',
    hospital: '',
    specialty: '',
    phone: '',
    email: '',
    discountType: 'PERCENT',
    discountValue: 5,
    commissionRate: 5,
    isActive: true,
    notes: ''
  });

  // Load from API or fallback
  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/doctors');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setDoctors(json.data);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not fetch doctors from API, using local state:", e);
    }
    // Fallback to localStorage or INITIAL_DOCTORS
    try {
      const local = localStorage.getItem('tecnic_doctors');
      if (local) {
        setDoctors(JSON.parse(local));
      }
    } catch (e) {
      // ignore
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleOpenAddModal = () => {
    setEditingDoctor(null);
    setFormData({
      name: '',
      hospital: 'Bệnh viện Bạch Mai / ĐHY Hà Nội',
      specialty: 'Phục hồi chức năng & Cơ xương khớp',
      phone: '',
      email: '',
      discountType: 'PERCENT',
      discountValue: 5,
      commissionRate: 5,
      isActive: true,
      notes: ''
    });
    setIsEditingModalOpen(true);
  };

  const handleOpenEditModal = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({ ...doctor });
    setIsEditingModalOpen(true);
  };

  const handleDeleteDoctor = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa bác sĩ "${name}" khỏi danh sách giới thiệu?`)) {
      return;
    }

    try {
      await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn("Delete API failed:", e);
    }

    const updated = doctors.filter(d => d.id !== id);
    setDoctors(updated);
    try {
      localStorage.setItem('tecnic_doctors', JSON.stringify(updated));
    } catch (e) {}

    setSaveSuccessMsg(`Đã xóa bác sĩ "${name}" thành công.`);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleToggleStatus = async (doctor: Doctor) => {
    const updatedStatus = !doctor.isActive;
    const updated = doctors.map(d => d.id === doctor.id ? { ...d, isActive: updatedStatus } : d);
    setDoctors(updated);
    try {
      localStorage.setItem('tecnic_doctors', JSON.stringify(updated));
      await fetch(`/api/doctors/${doctor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: updatedStatus })
      });
    } catch (e) {}
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert("Vui lòng nhập họ và tên Bác sĩ!");
      return;
    }

    if (editingDoctor) {
      // Update
      const updatedCode = (formData.code && formData.code.trim())
        ? formData.code.trim().toUpperCase()
        : (formData.name ? generateDoctorReferralCode(formData.name) : editingDoctor.code);

      const updatedDoc: Doctor = {
        ...editingDoctor,
        ...formData,
        name: formData.name.trim(),
        code: updatedCode,
        discountValue: Number(formData.discountValue) || 5,
        commissionRate: Number(formData.commissionRate) || 5,
      } as Doctor;

      try {
        await fetch(`/api/doctors/${editingDoctor.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedDoc)
        });
      } catch (e) {}

      const updatedList = doctors.map(d => d.id === editingDoctor.id ? updatedDoc : d);
      setDoctors(updatedList);
      try {
        localStorage.setItem('tecnic_doctors', JSON.stringify(updatedList));
      } catch (e) {}
      setSaveSuccessMsg(`Cập nhật thông tin Bác sĩ ${updatedDoc.name} thành công!`);
    } else {
      // Create new
      const newCode = (formData.code && formData.code.trim())
        ? formData.code.trim().toUpperCase()
        : generateDoctorReferralCode(formData.name.trim());

      const newDoc: Doctor = {
        id: `DOC-${Date.now().toString().slice(-4)}`,
        name: formData.name.trim(),
        code: newCode,
        hospital: formData.hospital || 'Bệnh viện / Phòng khám',
        specialty: formData.specialty || 'Phục hồi chức năng',
        phone: formData.phone || '',
        email: formData.email || '',
        discountType: (formData.discountType as any) || 'PERCENT',
        discountValue: Number(formData.discountValue) || 5,
        commissionRate: Number(formData.commissionRate) || 5,
        isActive: formData.isActive ?? true,
        notes: formData.notes || '',
        createdAt: new Date().toISOString()
      };

      try {
        await fetch('/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newDoc)
        });
      } catch (e) {}

      const updatedList = [newDoc, ...doctors];
      setDoctors(updatedList);
      try {
        localStorage.setItem('tecnic_doctors', JSON.stringify(updatedList));
      } catch (e) {}
      setSaveSuccessMsg(`Thêm Bác sĩ ${newDoc.name} thành công!`);
    }

    setIsEditingModalOpen(false);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const filteredDoctors = doctors.filter(doc => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      doc.name.toLowerCase().includes(q) ||
      (doc.hospital && doc.hospital.toLowerCase().includes(q)) ||
      (doc.specialty && doc.specialty.toLowerCase().includes(q)) ||
      (doc.phone && doc.phone.includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0071ba] flex items-center justify-center shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span>Quản lý Bác sĩ Giới thiệu & Chiết khấu</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {doctors.length} Bác sĩ
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Cấu hình danh sách bác sĩ đối tác. Khi khách hàng mua hàng nhập đúng tên bác sĩ (VD: <b>Nguyễn Phú Sĩ</b>), hệ thống tự động áp dụng mã giảm giá và tính hoa hồng.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={fetchDoctors}
              className="px-3 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              title="Tải lại danh sách"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Làm mới</span>
            </button>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-[#0071ba] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition shadow-xs cursor-pointer w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Bác sĩ mới</span>
            </button>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bác sĩ, bệnh viện, số điện thoại..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-[#0071ba] focus:ring-1 focus:ring-blue-100"
            />
          </div>

          <div className="text-xs text-slate-500">
            Hiển thị <b>{filteredDoctors.length}</b> / {doctors.length} bác sĩ trong hệ thống
          </div>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="p-3.5">Họ và tên Bác sĩ</th>
                <th className="p-3.5">Bệnh viện / Cơ sở</th>
                <th className="p-3.5">Chuyên khoa</th>
                <th className="p-3.5">Liên hệ</th>
                <th className="p-3.5 text-center">Mức giảm cho khách</th>
                <th className="p-3.5 text-center">Hoa hồng BS</th>
                <th className="p-3.5 text-center">Trạng thái</th>
                <th className="p-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    Không tìm thấy bác sĩ nào phù hợp với từ khóa "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <Stethoscope className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleCopyCode(doc.code || 'BS')}
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 inline-flex items-center gap-1 cursor-pointer transition shadow-2xs"
                          title="Bấm để sao chép mã giới thiệu"
                        >
                          <span>Mã: {doc.code || 'BS'}</span>
                          {copiedCode === doc.code ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-blue-500" />
                          )}
                        </button>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {doc.id}</span>
                      </div>
                      {doc.notes && (
                        <p className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-1">{doc.notes}</p>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-700">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{doc.hospital || 'Chưa cập nhật'}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 font-medium">
                      {doc.specialty || 'Phục hồi chức năng'}
                    </td>
                    <td className="p-3.5 text-slate-600 space-y-0.5">
                      {doc.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{doc.phone}</span>
                        </div>
                      )}
                      {doc.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[140px]">{doc.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200">
                        <Tag className="w-3 h-3" />
                        <span>
                          {doc.discountType === 'PERCENT' ? `${doc.discountValue}%` : `${doc.discountValue.toLocaleString('vi-VN')} đ`}
                        </span>
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded-md border border-blue-100">
                        {doc.commissionRate || 5}%
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(doc)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer ${
                          doc.isActive 
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {doc.isActive ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{doc.isActive ? 'Đang hoạt động' : 'Tạm dừng'}</span>
                      </button>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(doc)}
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        title="Chỉnh sửa thông tin"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDoctor(doc.id, doc.name)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                        title="Xóa bác sĩ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: THÊM / CHỈNH SỬA BÁC SĨ */}
      {isEditingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#0071ba]" />
                <h3 className="font-bold text-base text-slate-800">
                  {editingDoctor ? `Chỉnh sửa Bác sĩ: ${editingDoctor.name}` : 'Thêm Bác sĩ Giới thiệu mới'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Họ và tên Bác sĩ *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder=""
                    className="w-full border border-slate-300 p-2.5 rounded-lg text-xs outline-none focus:border-[#0071ba] font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Mã giới thiệu (Referral Code)
                  </label>
                  <input
                    type="text"
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder=""
                    className="w-full border border-slate-300 p-2.5 rounded-lg text-xs outline-none focus:border-[#0071ba] font-mono uppercase font-bold text-blue-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bệnh viện / Nơi công tác</label>
                  <input
                    type="text"
                    value={formData.hospital || ''}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    placeholder=""
                    className="w-full border border-slate-300 p-2.5 rounded-lg text-xs outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chuyên khoa</label>
                  <input
                    type="text"
                    value={formData.specialty || ''}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    placeholder=""
                    className="w-full border border-slate-300 p-2.5 rounded-lg text-xs outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số điện thoại liên hệ</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder=""
                    className="w-full border border-slate-300 p-2.5 rounded-lg text-xs outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email / Gmail</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder=""
                    className="w-full border border-slate-300 p-2.5 rounded-lg text-xs outline-none focus:border-[#0071ba]"
                  />
                </div>

                {/* Giảm giá & Hoa hồng */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hình thức giảm giá cho khách</label>
                  <select
                    value={formData.discountType || 'PERCENT'}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg text-xs outline-none focus:border-[#0071ba] bg-white"
                  >
                    <option value="PERCENT">Phần trăm (%) trên giá trị đơn</option>
                    <option value="FIXED">Số tiền cố định (VNĐ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Giá trị giảm giá {formData.discountType === 'PERCENT' ? '(%)' : '(VNĐ)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.discountValue ?? 5}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg text-xs outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">% Hoa hồng chiết khấu cho Bác sĩ</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formData.commissionRate ?? 5}
                    onChange={(e) => setFormData({ ...formData, commissionRate: Number(e.target.value) })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg text-xs outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.isActive ?? true}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-[#0071ba] rounded"
                    />
                    <span>Kích hoạt bác sĩ (cho phép khách nhập tên nhận giảm giá)</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Ghi chú quản trị</label>
                  <textarea
                    rows={2}
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Ghi chú thêm về bác sĩ đối tác..."
                    className="w-full border border-slate-300 p-2 rounded-lg text-xs outline-none focus:border-[#0071ba]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0071ba] hover:bg-blue-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingDoctor ? 'Lưu thay đổi' : 'Tạo hồ sơ bác sĩ'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
