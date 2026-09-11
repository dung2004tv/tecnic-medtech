import React, { useState, useEffect, useRef } from 'react';
import { 
  Folder, FileText, Plus, Edit, Trash2, Check, X, 
  ArrowLeft, Save, Upload, Image as ImageIcon,
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Table, Code, Undo, Redo, Search, Maximize,
  ChevronRight, AlertCircle, RefreshCw
} from 'lucide-react';
import { SettingItem, DEFAULT_SETTINGS } from '../../data/settingsData';

// CKEditor-style Rich Text Editor Component
interface CkEditorToolbarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
}

const CkEditorToolbar: React.FC<CkEditorToolbarProps> = ({ value, onChange, placeholder = 'Nhập nội dung chi tiết...', rows = 8 }) => {
  const [isSource, setIsSource] = useState(false);
  const [fontSize, setFontSize] = useState('14px');
  const [format, setFormat] = useState('Normal');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wrapSelection = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const el = textareaRef.current;
    if (!el) {
      onChange(value + prefix + defaultText + suffix);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.substring(start, end) || defaultText;
    const nextVal = value.substring(0, start) + prefix + selected + suffix + value.substring(end);
    onChange(nextVal);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 10);
  };

  const handleBold = () => wrapSelection('<strong>', '</strong>', 'văn bản in đậm');
  const handleItalic = () => wrapSelection('<em>', '</em>', 'văn bản in nghiêng');
  const handleUnderline = () => wrapSelection('<u>', '</u>', 'văn bản gạch chân');
  const handleStrike = () => wrapSelection('<strike>', '</strike>', 'văn bản gạch ngang');
  
  const handleBulletList = () => {
    wrapSelection('<ul>\n  <li>', '</li>\n</ul>', 'Mục danh sách 1');
  };

  const handleOrderedList = () => {
    wrapSelection('<ol>\n  <li>', '</li>\n</ol>', 'Mục danh sách 1');
  };

  const handleAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
    wrapSelection(`<p style="text-align: ${align};">`, '</p>', 'Đoạn văn căn lề');
  };

  const handleInsertLink = () => {
    const url = prompt('Nhập đường link URL (ví dụ: https://tecnic.vn):', 'https://');
    if (url) {
      const text = prompt('Nhập chữ hiển thị:', 'Xem chi tiết');
      wrapSelection(`<a href="${url}" target="_blank" rel="noopener noreferrer">`, '</a>', text || url);
    }
  };

  const handleInsertImage = () => {
    const url = prompt('Nhập link ảnh (URL):', 'https://images.unsplash.com/');
    if (url) {
      wrapSelection(`<img src="${url}" alt="Hình ảnh" style="max-width: 100%; border-radius: 8px; margin: 10px 0;" />\n`);
    }
  };

  const handleInsertTable = () => {
    const tableHtml = `\n<table border="1" cellpadding="8" style="width: 100%; border-collapse: collapse; border-color: #cbd5e1; margin: 12px 0;">
  <thead>
    <tr style="background-color: #f1f5f9;">
      <th style="padding: 8px; text-align: left;">Thông số</th>
      <th style="padding: 8px; text-align: left;">Giá trị chuẩn</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px;">Tiêu chuẩn</td>
      <td style="padding: 8px;">Đạt chuẩn Bộ Y Tế Việt Nam</td>
    </tr>
  </tbody>
</table>\n`;
    wrapSelection(tableHtml);
  };

  return (
    <div className="border border-slate-300 rounded bg-[#fcfcfc] overflow-hidden shadow-2xs font-sans text-xs">
      {/* CKEditor Top Toolbar Rows (Classic style chuẩn ảnh 3, 4, 5, 6) */}
      <div className="bg-[#f0f0f0] border-b border-slate-300 p-1 space-y-1 select-none">
        
        {/* Row 1: Source, Undo, Redo, Cut, Copy, Paste, Search */}
        <div className="flex flex-wrap items-center gap-0.5">
          <button
            type="button"
            onClick={() => setIsSource(!isSource)}
            className={`px-2 py-1 rounded text-[11px] font-bold border transition flex items-center gap-1 ${
              isSource 
                ? 'bg-amber-100 text-amber-800 border-amber-300' 
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
            }`}
            title="Xem mã HTML nguồn"
          >
            <Code className="w-3.5 h-3.5 text-blue-600" />
            <span>Source</span>
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1"></span>

          <button
            type="button"
            onClick={() => document.execCommand('undo')}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Undo"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => document.execCommand('redo')}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Redo"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1"></span>

          <button
            type="button"
            onClick={handleBold}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-black"
            title="In đậm (Bold)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleItalic}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 italic"
            title="In nghiêng (Italic)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleUnderline}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 underline"
            title="Gạch chân (Underline)"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleStrike}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 line-through"
            title="Gạch ngang (Strikethrough)"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1"></span>

          <button
            type="button"
            onClick={handleBulletList}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Danh sách dấu chấm (Bullets)"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleOrderedList}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Danh sách số (Numbering)"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1"></span>

          <button
            type="button"
            onClick={() => handleAlign('left')}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Căn trái"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleAlign('center')}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Căn giữa"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleAlign('right')}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Căn phải"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleAlign('justify')}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Căn đều hai bên"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1"></span>

          <button
            type="button"
            onClick={handleInsertLink}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Chèn liên kết web"
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
          </button>
          <button
            type="button"
            onClick={handleInsertImage}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Chèn hình ảnh"
          >
            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
          </button>
          <button
            type="button"
            onClick={handleInsertTable}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700"
            title="Chèn bảng biểu"
          >
            <Table className="w-3.5 h-3.5 text-indigo-600" />
          </button>
        </div>

        {/* Row 2: Format dropdown, Size dropdown, Color */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5 border-t border-slate-200/80">
          <select
            value={format}
            onChange={(e) => {
              setFormat(e.target.value);
              if (e.target.value === 'H1') wrapSelection('<h1>', '</h1>', 'Tiêu đề 1');
              else if (e.target.value === 'H2') wrapSelection('<h2>', '</h2>', 'Tiêu đề 2');
              else if (e.target.value === 'H3') wrapSelection('<h3>', '</h3>', 'Tiêu đề 3');
              else wrapSelection('<p>', '</p>', 'Đoạn văn bản');
            }}
            className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[11px] text-slate-700"
          >
            <option value="Normal">Format (Đoạn văn)</option>
            <option value="H1">Tiêu đề H1</option>
            <option value="H2">Tiêu đề H2</option>
            <option value="H3">Tiêu đề H3</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              wrapSelection(`<span style="font-size: ${e.target.value};">`, '</span>', 'Văn bản định dạng kích thước');
            }}
            className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[11px] text-slate-700"
          >
            <option value="12px">Size: 12px</option>
            <option value="14px">Size: 14px (Chuẩn)</option>
            <option value="16px">Size: 16px</option>
            <option value="18px">Size: 18px</option>
            <option value="20px">Size: 20px</option>
            <option value="24px">Size: 24px</option>
          </select>

          <button
            type="button"
            onClick={() => {
              const color = prompt('Nhập mã màu (ví dụ: #0073b7, #00a65a, red):', '#0073b7');
              if (color) wrapSelection(`<span style="color: ${color};">`, '</span>', 'Văn bản đổi màu');
            }}
            className="px-1.5 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-bold text-red-600 flex items-center gap-1"
            title="Đổi màu chữ"
          >
            <span className="underline font-black">A</span>
            <span className="w-2.5 h-1 bg-red-600 rounded-xs"></span>
          </button>
        </div>

      </div>

      {/* Editor Body */}
      <div className="p-2 bg-white">
        {isSource ? (
          <textarea
            ref={textareaRef}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full font-mono text-xs text-slate-800 bg-[#f8fafc] p-2.5 border border-slate-200 rounded outline-none focus:border-blue-500 transition resize-y leading-relaxed"
          />
        ) : (
          <div className="space-y-2">
            <textarea
              ref={textareaRef}
              rows={rows}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full text-xs text-slate-800 bg-white p-2.5 border border-slate-200 rounded outline-none focus:border-[#17a2b8] transition resize-y leading-relaxed"
            />
            {value && (
              <div className="border-t border-dashed border-slate-200 pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Xem trước trực tiếp (Preview):</span>
                <div 
                  className="prose prose-xs max-w-none text-slate-700 bg-slate-50/50 p-2.5 rounded border border-slate-100 overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminInfoPages: React.FC = () => {
  const [settings, setSettings] = useState<SettingItem[]>(DEFAULT_SETTINGS);
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [currentFolderName, setCurrentFolderName] = useState<string>('Root');
  
  // View mode: 'LIST' or 'EDIT'
  const [viewMode, setViewMode] = useState<'LIST' | 'EDIT'>('LIST');
  const [editingItem, setEditingItem] = useState<SettingItem | null>(null);

  // SweetAlert Confirm Modal (Ảnh 7)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    item: SettingItem | null;
    targetVisibility: boolean;
  }>({
    isOpen: false,
    item: null,
    targetVisibility: false
  });

  const [toast, setToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Load from API on mount
  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/settings');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setSettings(json.data);
        }
      }
    } catch (err) {
      console.warn('API settings fallback to local defaults:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Filter items in the current folder view
  const currentItems = settings.filter(s => (s.parentId || 'root') === currentFolderId);

  // Open Edit Form
  const handleOpenEdit = (item: SettingItem) => {
    setEditingItem({ ...item });
    setViewMode('EDIT');
  };

  // Open Add Form
  const handleOpenAdd = (parentId: string = currentFolderId) => {
    const parent = settings.find(s => s.id === parentId);
    const newItem: SettingItem = {
      id: '',
      name: '',
      slug: '',
      subtitle: '',
      value: '',
      description: '',
      content1: '',
      content2: '',
      parentId: parentId,
      isFolder: false,
      category: parent ? parent.name : 'Root',
      bgColor: '#000000',
      avatar: '',
      order: currentItems.length + 1,
      isVisible: true
    };
    setEditingItem(newItem);
    setViewMode('EDIT');
  };

  // Navigate to folder
  const handleEnterFolder = (folder: SettingItem) => {
    setCurrentFolderId(folder.id);
    setCurrentFolderName(folder.name);
  };

  // Navigate back to Root
  const handleGoToRoot = () => {
    setCurrentFolderId('root');
    setCurrentFolderName('Root');
  };

  // Click on "Hiện" / "Ẩn" Button -> Open SweetAlert Modal (Ảnh 7)
  const handleTriggerVisibilityModal = (item: SettingItem) => {
    setConfirmModal({
      isOpen: true,
      item: item,
      targetVisibility: !item.isVisible
    });
  };

  // Confirm in SweetAlert Modal
  const handleConfirmVisibilityChange = async () => {
    if (!confirmModal.item) return;
    const targetId = confirmModal.item.id;
    const nextVis = confirmModal.targetVisibility;

    // Optimistic UI Update
    setSettings(prev => prev.map(s => s.id === targetId ? { ...s, isVisible: nextVis } : s));

    try {
      const res = await fetch(`/api/settings/${targetId}/toggle-visible`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        showToast(`Đã chuyển trạng thái setting sang "${nextVis ? 'Hiện' : 'Ẩn'}" thành công!`);
      }
    } catch (err) {
      console.error(err);
    }

    setConfirmModal({ isOpen: false, item: null, targetVisibility: false });
  };

  // Update order STT
  const handleUpdateOrder = async (id: string, newOrder: number) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, order: newOrder } : s));
    try {
      await fetch(`/api/settings/${id}/order`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder })
      });
      showToast('Đã cập nhật số thứ tự STT!');
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Item
  const handleDelete = async (item: SettingItem) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${item.name}"?`)) {
      setSettings(prev => prev.filter(s => s.id !== item.id));
      try {
        await fetch(`/api/settings/${item.id}`, { method: 'DELETE' });
        showToast(`Đã xóa nội dung "${item.name}" thành công!`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Save Edit/Add Form
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) {
      alert('Vui lòng nhập tên nội dung!');
      return;
    }

    try {
      if (editingItem.id) {
        // Update PUT
        const res = await fetch(`/api/settings/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingItem)
        });
        if (res.ok) {
          const json = await res.json();
          setSettings(prev => prev.map(s => s.id === editingItem.id ? json.data : s));
        } else {
          setSettings(prev => prev.map(s => s.id === editingItem.id ? editingItem : s));
        }
        showToast('Đã cập nhật nội dung setting thành công!');
      } else {
        // Create POST
        const res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingItem)
        });
        if (res.ok) {
          const json = await res.json();
          setSettings(prev => [...prev, json.data]);
        } else {
          const newItem: SettingItem = {
            ...editingItem,
            id: String(Date.now())
          };
          setSettings(prev => [...prev, newItem]);
        }
        showToast('Đã thêm mới nội dung setting thành công!');
      }
    } catch (err) {
      console.error(err);
      showToast('Đã lưu thay đổi vào hệ thống!');
    }

    setViewMode('LIST');
    setEditingItem(null);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#222d32] text-white px-4 py-2.5 rounded shadow-2xl border border-[#00c0ef] text-xs font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. VIEW MODE: LIST (DANH SÁCH NỘI DUNG - Chuẩn Ảnh 1 & Ảnh 2)             */}
      {/* ========================================================================= */}
      {viewMode === 'LIST' && (
        <div className="space-y-4">
          
          {/* Title & Breadcrumbs Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách nội dung</h1>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span onClick={handleGoToRoot} className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
              <span>/</span>
              <span onClick={handleGoToRoot} className="hover:text-blue-600 cursor-pointer">Setting</span>
              <span>/</span>
              <span className="font-semibold text-slate-700">Danh sách nội dung</span>
            </div>
          </div>

          {/* Action Bar: + Thêm mới */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => handleOpenAdd(currentFolderId)}
              className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm mới</span>
            </button>

            {currentFolderId !== 'root' && (
              <button 
                onClick={handleGoToRoot}
                className="bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại thư mục cha</span>
              </button>
            )}
          </div>

          {/* Main Table Box (Chuẩn Ảnh 1 & Ảnh 2) */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Inner Breadcrumb (Ảnh 2: Root / Quản lý nội dung giao diện trang chủ) */}
            <div className="bg-slate-50/90 px-4 py-2.5 border-b border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-2">
              <button 
                onClick={handleGoToRoot} 
                className={`hover:underline cursor-pointer ${currentFolderId === 'root' ? 'text-slate-800' : 'text-[#00c0ef] font-bold'}`}
              >
                Root
              </button>
              {currentFolderId !== 'root' && (
                <>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-800 font-bold">{currentFolderName}</span>
                </>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-slate-200 text-slate-700 font-bold">
                    <th className="py-2.5 px-3 w-12 text-center">Folder</th>
                    <th className="py-2.5 px-3 min-w-[240px]">Tên nội dung</th>
                    <th className="py-2.5 px-3 min-w-[200px]">Giá trị</th>
                    <th className="py-2.5 px-3 w-16 text-center">STT</th>
                    <th className="py-2.5 px-3 w-20 text-center">Hiển thị</th>
                    <th className="py-2.5 px-3 w-44 text-center">Action</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-100 font-medium">
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                        Chưa có nội dung nào trong thư mục này. Bấm "+ Thêm mới" để tạo nội dung.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition">
                        
                        {/* 1. Folder Icon (File: hồng #e83e8c | Folder: vàng #f39c12) */}
                        <td className="py-2.5 px-3 text-center">
                          {item.isFolder ? (
                            <button 
                              onClick={() => handleEnterFolder(item)}
                              title="Nhấp để mở thư mục con"
                              className="cursor-pointer hover:scale-110 transition-transform"
                            >
                              <Folder className="w-4 h-4 text-[#f39c12] fill-[#f39c12] mx-auto" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleOpenEdit(item)}
                              title="Nhấp để chỉnh sửa nội dung"
                              className="cursor-pointer hover:scale-110 transition-transform"
                            >
                              <FileText className="w-4 h-4 text-[#e83e8c] mx-auto" />
                            </button>
                          )}
                        </td>

                        {/* 2. Tên nội dung (Link xanh dương #0073b7) */}
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => {
                              if (item.isFolder) {
                                handleEnterFolder(item);
                              } else {
                                handleOpenEdit(item);
                              }
                            }}
                            className="text-[#0073b7] font-bold hover:underline cursor-pointer text-left block"
                          >
                            {item.name}
                          </button>
                        </td>

                        {/* 3. Giá trị */}
                        <td className="py-2.5 px-3 text-slate-600 font-normal">
                          {item.value || item.subtitle || (
                            <span className="text-slate-300 italic">--</span>
                          )}
                        </td>

                        {/* 4. STT (Input số) */}
                        <td className="py-2.5 px-3 text-center">
                          <input 
                            type="number"
                            value={item.order}
                            onChange={(e) => handleUpdateOrder(item.id, Number(e.target.value))}
                            className="w-12 text-center border border-slate-300 py-0.5 rounded text-xs outline-none focus:border-[#00c0ef] bg-white font-bold"
                          />
                        </td>

                        {/* 5. Hiển thị (Nút xanh Hiện / đỏ Ẩn - BẤM VÀO MỞ SWEETALERT MODAL ẢNH 7) */}
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => handleTriggerVisibilityModal(item)}
                            className={`px-3 py-1 rounded text-[11px] font-bold text-white transition shadow-2xs cursor-pointer ${
                              item.isVisible 
                                ? 'bg-[#28a745] hover:bg-[#218838]' 
                                : 'bg-[#dc3545] hover:bg-[#c82333]'
                            }`}
                            title="Bấm để đổi trạng thái ẩn/hiện"
                          >
                            {item.isVisible ? 'Hiện' : 'Ẩn'}
                          </button>
                        </td>

                        {/* 6. Action (Sửa, + Thêm, Xóa, [+] mở folder) */}
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            
                            {/* Nút Sửa: hình vuông xanh cyan #00c0ef */}
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="bg-[#00c0ef] hover:bg-[#00a7d0] text-white p-1 rounded transition shadow-2xs"
                              title="Sửa nội dung"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            {/* Nút + Thêm: nút xanh cyan #00c0ef */}
                            <button
                              onClick={() => handleOpenAdd(item.isFolder ? item.id : currentFolderId)}
                              className="bg-[#00c0ef] hover:bg-[#00a7d0] text-white px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-0.5 shadow-2xs"
                              title="Thêm mục con"
                            >
                              <Plus className="w-3 h-3" />
                              <span>+ Thêm</span>
                            </button>

                            {/* Nút Xóa: hình vuông đỏ #dd4b39 */}
                            <button
                              onClick={() => handleDelete(item)}
                              className="bg-[#dd4b39] hover:bg-[#c23321] text-white p-1 rounded transition shadow-2xs"
                              title="Xóa nội dung"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Nút [+] Mở folder (Nếu là Folder): xanh ngọc #00a65a */}
                            {item.isFolder && (
                              <button
                                onClick={() => handleEnterFolder(item)}
                                className="bg-[#00a65a] hover:bg-[#008d4c] text-white p-1 rounded transition shadow-2xs"
                                title="Mở danh sách mục con bên trong"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            )}

                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW MODE: EDIT (CHỈNH SỬA / THÊM MỚI SETTING - Chuẩn Ảnh 3, 4, 5, 6)   */}
      {/* ========================================================================= */}
      {viewMode === 'EDIT' && editingItem && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setViewMode('LIST');
                  setEditingItem(null);
                }}
                className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 font-bold text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại danh sách</span>
              </button>

              <h2 className="text-base font-bold text-slate-800 ml-2">
                {editingItem.id ? 'Quản lý nội dung / Setting - Chỉnh sửa nội dung' : 'Quản lý nội dung / Setting - Thêm mới nội dung'}
              </h2>
            </div>

            <button
              onClick={handleSaveForm}
              className="bg-[#0071ba] hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>Lưu thay đổi</span>
            </button>
          </div>

          {/* Main 2-Column Form (Chuẩn ảnh 3, 4, 5, 6) */}
          <form onSubmit={handleSaveForm} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* CỘT TRÁI (8/12 = ~66%): THÔNG TIN NỘI DUNG */}
            <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
              
              {/* Tab Ngôn ngữ: Việt Nam (Chuẩn ảnh 3: có gạch xanh lá trên đầu tab) */}
              <div className="border-b border-slate-200 flex items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 border-t-2 border-[#00a65a] bg-white text-slate-800 font-bold text-xs -mb-px"
                >
                  Việt Nam
                </button>
              </div>

              {/* Tên */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="Nhập tên nội dung..."
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 focus:border-[#00c0ef] outline-none transition"
                />
              </div>

              {/* Đường dẫn */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đường dẫn
                </label>
                <input
                  type="text"
                  value={editingItem.slug || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                  placeholder="Nhập đường dẫn (ví dụ: /gioi-thieu, /thiet-bi-y-te)..."
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 focus:border-[#00c0ef] outline-none transition"
                />
              </div>

              {/* Nhập giới thiệu */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nhập giới thiệu
                </label>
                <textarea
                  rows={2}
                  value={editingItem.subtitle || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value, value: e.target.value })}
                  placeholder="Nhập giới thiệu ngắn hoặc giá trị hiển thị..."
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 focus:border-[#00c0ef] outline-none transition resize-y"
                />
              </div>

              {/* Nhập mô tả (CKEditor Toolbar 1) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nhập mô tả
                </label>
                <CkEditorToolbar 
                  value={editingItem.description || ''}
                  onChange={(val) => setEditingItem({ ...editingItem, description: val })}
                  placeholder="Nhập mô tả chi tiết, định dạng bullet list, tiêu đề, nội dung HTML..."
                  rows={7}
                />
              </div>

              {/* Nhập nội dung 1 (CKEditor Toolbar 2) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nhập nội dung 1
                </label>
                <CkEditorToolbar 
                  value={editingItem.content1 || ''}
                  onChange={(val) => setEditingItem({ ...editingItem, content1: val })}
                  placeholder="Nhập nội dung 1 (ví dụ: danh sách hỗ trợ khách hàng, menu con, văn bản bổ sung)..."
                  rows={5}
                />
              </div>

              {/* Nhập nội dung 2 (CKEditor Toolbar 3) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nhập nội dung 2
                </label>
                <CkEditorToolbar 
                  value={editingItem.content2 || ''}
                  onChange={(val) => setEditingItem({ ...editingItem, content2: val })}
                  placeholder="Nhập nội dung 2 (ví dụ: bản đồ chỉ đường Google Maps, chi nhánh, thông số phụ)..."
                  rows={4}
                />
              </div>

              {/* Nút lưu lại ở chân cột trái */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#0071ba] hover:bg-blue-700 text-white px-6 py-2.5 rounded font-bold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu lại</span>
                </button>
              </div>

            </div>

            {/* CỘT PHẢI (4/12 = ~33%): THÔNG TIN KHÁC (Chuẩn ảnh 3 & Ảnh 6) */}
            <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
              
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2">
                Thông tin khác
              </h3>

              {/* Chọn danh mục */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chọn danh mục
                </label>
                <div className="flex items-center gap-1">
                  <select
                    value={editingItem.parentId || 'root'}
                    onChange={(e) => {
                      const pId = e.target.value;
                      const pObj = settings.find(s => s.id === pId);
                      setEditingItem({
                        ...editingItem,
                        parentId: pId,
                        category: pObj ? pObj.name : 'Root'
                      });
                    }}
                    className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 focus:border-[#00c0ef] outline-none bg-white font-medium"
                  >
                    <option value="root">Root (Cấp cao nhất)</option>
                    {settings.filter(s => s.isFolder || s.parentId === 'root').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, parentId: 'root', category: 'Root' })}
                    className="p-2 border border-slate-300 rounded hover:bg-slate-100 text-slate-500"
                    title="Bỏ chọn danh mục về Root"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Màu nền */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Màu nền
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editingItem.bgColor || '#000000'}
                    onChange={(e) => setEditingItem({ ...editingItem, bgColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer p-0.5"
                  />
                  <div 
                    className="flex-1 h-8 rounded border border-slate-300 flex items-center px-3 text-xs font-mono text-white"
                    style={{ backgroundColor: editingItem.bgColor || '#000000' }}
                  >
                    {editingItem.bgColor || '#000000'}
                  </div>
                </div>
              </div>

              {/* Ảnh đại diện (Choose file + Preview + Nút xóa đỏ chuẩn ảnh 3) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ảnh đại diện
                </label>
                
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setEditingItem({ ...editingItem, avatar: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                  />

                  {/* Or Input Image URL */}
                  <input
                    type="text"
                    value={editingItem.avatar || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, avatar: e.target.value })}
                    placeholder="Hoặc dán link ảnh URL..."
                    className="w-full border border-slate-300 rounded p-1.5 text-xs text-slate-800 focus:border-[#00c0ef] outline-none"
                  />

                  {/* Preview box */}
                  {editingItem.avatar && (
                    <div className="relative inline-block border border-slate-300 rounded p-1 bg-slate-50">
                      <img 
                        src={editingItem.avatar} 
                        alt="Ảnh đại diện preview" 
                        className="w-28 h-20 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/logo-tecnic.jpg';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, avatar: '' })}
                        className="absolute -top-2 -right-2 bg-[#dd4b39] hover:bg-red-700 text-white p-1 rounded-full shadow-md transition"
                        title="Xóa ảnh này"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Các trường Upload ảnh khác (Ảnh 3: Ảnh background, Ảnh icon 1-6) */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Ảnh background</label>
                  <input type="file" className="w-full text-xs file:py-0.5 file:px-2 file:text-xs file:rounded file:border-0 file:bg-slate-100 text-slate-500" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Ảnh icon</label>
                  <input type="file" className="w-full text-xs file:py-0.5 file:px-2 file:text-xs file:rounded file:border-0 file:bg-slate-100 text-slate-500" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Ảnh icon 2</label>
                  <input type="file" className="w-full text-xs file:py-0.5 file:px-2 file:text-xs file:rounded file:border-0 file:bg-slate-100 text-slate-500" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Ảnh icon 3</label>
                  <input type="file" className="w-full text-xs file:py-0.5 file:px-2 file:text-xs file:rounded file:border-0 file:bg-slate-100 text-slate-500" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Ảnh icon 4</label>
                  <input type="file" className="w-full text-xs file:py-0.5 file:px-2 file:text-xs file:rounded file:border-0 file:bg-slate-100 text-slate-500" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Ảnh icon 5</label>
                  <input type="file" className="w-full text-xs file:py-0.5 file:px-2 file:text-xs file:rounded file:border-0 file:bg-slate-100 text-slate-500" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Ảnh icon 6</label>
                  <input type="file" className="w-full text-xs file:py-0.5 file:px-2 file:text-xs file:rounded file:border-0 file:bg-slate-100 text-slate-500" />
                </div>
              </div>

              {/* Số thứ tự */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số thứ tự
                </label>
                <input
                  type="number"
                  value={editingItem.order}
                  onChange={(e) => setEditingItem({ ...editingItem, order: Number(e.target.value) })}
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 focus:border-[#00c0ef] outline-none"
                />
              </div>

              {/* Trạng thái (Radio: (●) Hiện  (○) Ẩn) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Trạng thái
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700">
                    <input
                      type="radio"
                      name="itemStatus"
                      checked={editingItem.isVisible === true}
                      onChange={() => setEditingItem({ ...editingItem, isVisible: true })}
                      className="text-[#0071ba] w-4 h-4 cursor-pointer"
                    />
                    <span>Hiện</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700">
                    <input
                      type="radio"
                      name="itemStatus"
                      checked={editingItem.isVisible === false}
                      onChange={() => setEditingItem({ ...editingItem, isVisible: false })}
                      className="text-[#0071ba] w-4 h-4 cursor-pointer"
                    />
                    <span>Ẩn</span>
                  </label>
                </div>
              </div>

              {/* Nút lưu lại to ở cột phải */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#0071ba] hover:bg-blue-700 text-white py-2.5 rounded font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu lại</span>
                </button>
              </div>

            </div>

          </form>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SWEETALERT CONFIRM MODAL KHI ẤN CHỮ "HIỆN" HOẶC "ẨN" (Chuẩn Ảnh 7)     */}
      {/* ========================================================================= */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4 animate-fadeIn">
          
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-2xl border border-slate-100 transform transition-all animate-scaleUp">
            
            {/* Warning Circle Icon with "!" in orange (Chuẩn Ảnh 7) */}
            <div className="w-20 h-20 rounded-full border-4 border-[#f8bb86] text-[#f8bb86] flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-4xl font-bold leading-none select-none">!</span>
            </div>

            {/* Title: Bạn có chắc chắn muốn ẩn setting (hoặc hiện setting) */}
            <h3 className="text-lg font-bold text-slate-800 mb-6">
              {confirmModal.targetVisibility 
                ? 'Bạn có chắc chắn muốn hiện setting' 
                : 'Bạn có chắc chắn muốn ẩn setting'}
            </h3>

            {/* 2 Buttons: Yes, next step! (Blue) & Cancel (Red) */}
            <div className="flex items-center justify-center gap-3">
              
              <button
                type="button"
                onClick={handleConfirmVisibilityChange}
                className="bg-[#3085d6] hover:bg-[#2874bc] text-white px-6 py-2.5 rounded-md font-bold text-xs transition shadow-md cursor-pointer active:scale-95"
              >
                Yes, next step!
              </button>

              <button
                type="button"
                onClick={() => setConfirmModal({ isOpen: false, item: null, targetVisibility: false })}
                className="bg-[#d33] hover:bg-[#b52a2a] text-white px-6 py-2.5 rounded-md font-bold text-xs transition shadow-md cursor-pointer active:scale-95"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
