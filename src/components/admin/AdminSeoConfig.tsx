import React, { useState } from 'react';
import { Check, RotateCcw, Image as ImageIcon, Trash2 } from 'lucide-react';

export const AdminSeoConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VI' | 'EN'>('VI');
  
  const [seoTitle, setSeoTitle] = useState('CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC (TECNIC Medtech)');
  const [seoKeywords, setSeoKeywords] = useState('giường y tế, xe lăn, máy theo dõi sức khoẻ, máy đo đường huyết, máy đo huyết áp, TECNIC');
  const [seoDescription, setSeoDescription] = useState('Chăm sóc sức khỏe cộng đồng, chúng tôi phụng sự khách hàng bằng những dịch vụ, sản phẩm công nghệ thiết bị y tế giúp người bệnh, người già và người thân của họ trong việc điều trị, phụng dưỡng và chăm sóc như người thân của mình.');
  const [indexWebsite, setIndexWebsite] = useState<'index' | 'noindex'>('index');
  const [notificationEmail, setNotificationEmail] = useState('tecnic.medtech@gmail.com');
  const [seoImage, setSeoImage] = useState('https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80');
  const [faviconImage, setFaviconImage] = useState('/logo-tecnic.png');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setSeoTitle('CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC (TECNIC Medtech)');
    setSeoKeywords('giường y tế, xe lăn, máy theo dõi sức khoẻ, máy đo đường huyết, máy đo huyết áp');
    setSeoDescription('chăm sóc sức khỏe cộng đồng, chúng tôi phụng sự khách hàng bằng những dịch vụ, sản phẩm công nghệ thiết bị y tế giúp người bệnh, người già và người thân của họ trong việc điều trị, phụng dưỡng và chăm sóc như người thân của mình.');
    setIndexWebsite('index');
    setNotificationEmail('ytetecnic.vn.group@gmail.com');
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Action Buttons Top */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Sửa seo</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSave}
            className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
          >
            <Check className="w-4 h-4" />
            <span>Chấp nhận</span>
          </button>
          <button 
            onClick={handleReset}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded">
          ✓ Đã lưu cấu hình SEO và thông tin Website thành công!
        </div>
      )}

      {/* Language Tabs */}
      <div className="border-b border-slate-200 flex gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('VI')}
          className={`py-2 px-3 border-b-2 transition ${
            activeTab === 'VI' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Việt Nam
        </button>
        <button
          onClick={() => setActiveTab('EN')}
          className={`py-2 px-3 border-b-2 transition ${
            activeTab === 'EN' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          English
        </button>
      </div>

      {/* Main SEO Form (2 Columns Chuẩn Hình 9) */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
          
          {/* Cột Trái (8/12): Title, Keywords, Description, Index, Email */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Nhập title seo */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nhập title seo</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] text-slate-800"
              />
            </div>

            {/* Nhập từ khóa seo */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nhập từ khóa seo</label>
              <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] text-slate-800"
              />
            </div>

            {/* Nhập mô tả seo */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nhập mô tả seo</label>
              <textarea
                rows={4}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] text-slate-800"
              />
              <p className="text-[11px] text-red-500 italic mt-1">
                Lưu ý: Để tối ưu seo, vui lòng nhập ít nhất 160 ký tự ({seoDescription.length} ký tự hiện tại)
              </p>
            </div>

            {/* Index website */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Index website</label>
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="indexOption"
                    checked={indexWebsite === 'index'}
                    onChange={() => setIndexWebsite('index')}
                    className="text-[#17a2b8]"
                  />
                  <span>Index</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="indexOption"
                    checked={indexWebsite === 'noindex'}
                    onChange={() => setIndexWebsite('noindex')}
                    className="text-[#17a2b8]"
                  />
                  <span>NoIndex</span>
                </label>
              </div>
            </div>

            {/* Cấu hình email nhận thông tin */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Cấu hình email nhận thông tin</label>
              <input
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] text-slate-800"
              />
            </div>

          </div>

          {/* Cột Phải (4/12): Ảnh SEO & Favicon */}
          <div className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-slate-200 lg:pl-6 pt-4 lg:pt-0">
            
            {/* Ảnh SEO */}
            <div>
              <label className="block text-slate-700 font-bold mb-2">Ảnh seo</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                  />
                </div>
                {seoImage && (
                  <div className="relative inline-block border border-slate-300 p-1 rounded bg-slate-50">
                    <img src={seoImage} alt="SEO Preview" className="w-48 h-32 object-cover rounded" />
                    <button
                      onClick={() => setSeoImage('')}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded hover:bg-red-700"
                      title="Xóa ảnh"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Favicon */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Favicon</label>
              <p className="text-[11px] text-red-500 italic mb-2">
                Lưu ý: Sau khi thay favicon, vui lòng xóa cache để hệ thống nhận favicon mới.
              </p>
              <div className="space-y-2">
                <input
                  type="file"
                  className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                />
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded border border-slate-200 w-fit">
                  <div className="w-8 h-8 rounded bg-white border border-slate-300 flex items-center justify-center p-1">
                    <img src={faviconImage} alt="Favicon" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">Icon tab trình duyệt</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Actions */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end gap-2">
          <button 
            onClick={handleSave}
            className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-5 py-2 rounded shadow-xs transition"
          >
            Chấp nhận
          </button>
          <button 
            onClick={handleReset}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white text-xs font-bold px-4 py-2 rounded shadow-xs transition"
          >
            Làm lại
          </button>
        </div>

      </div>

    </div>
  );
};
