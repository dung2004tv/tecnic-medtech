import os

filepath = 'src/components/AboutPage.tsx'
with open(filepath, 'r') as f:
    content = f.read()

replacement = """          {/* GIỚI THIỆU CHUNG (DỮ LIỆU TỪ TECNIC.VN) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0071ba] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Building2 className="w-3.5 h-3.5" />
                <span>Về TECNIC.VN</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight uppercase">
                KIẾN TẠO ĐỂ PHỤNG SỰ
              </h3>
              <div className="w-16 h-1.5 bg-amber-400 rounded-full" />
              <p className="text-sm text-slate-600 leading-relaxed text-justify">
                <strong>TECNIC.VN</strong>, được vận hành bởi <strong>TECNIC Medical (Công ty CP Công nghệ và Dịch vụ Y tế Tecnic)</strong> và <strong>TECNIC Medtech</strong>, là doanh nghiệp Việt Nam tập trung phát triển hệ sinh thái chăm sóc sức khỏe. Mục tiêu của chúng tôi là mang đến những giải pháp y tế chất lượng cao, phù hợp và có tính ứng dụng cao nhất cho các gia đình, người bệnh, bệnh viện và các cơ sở y tế tại Việt Nam.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed text-justify">
                Chúng tôi hoạt động dựa trên phương châm kinh doanh <strong>"Phụng sự"</strong> và được dẫn dắt bởi sứ mệnh <strong>"Kiến tạo để phụng sự"</strong>. Triết lý này được mở rộng để phục vụ khách hàng, nhân viên, cổ đông và toàn thể cộng đồng. TECNIC hướng tới tầm nhìn trở thành một trong những doanh nghiệp VNR 500, dẫn đầu phân khúc thị trường với các sản phẩm dịch vụ chất lượng, và là một trong những môi trường làm việc mang lại nhiều hạnh phúc và cơ hội phát triển nhất cho cán bộ nhân viên.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-[#143472] uppercase text-sm border-b pb-2">3 LĨNH VỰC HOẠT ĐỘNG TRỌNG TÂM</h4>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-4 items-start transition hover:shadow-md">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-black text-slate-800 text-sm">Chăm sóc sức khỏe dự phòng</h5>
                  <p className="text-xs text-slate-500 mt-1">Chủ động quản lý và theo dõi sức khỏe ngay tại nhà.</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-4 items-start transition hover:shadow-md">
                <div className="w-12 h-12 bg-blue-100 text-[#0071ba] rounded-2xl flex items-center justify-center shrink-0">
                  <Accessibility className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-black text-slate-800 text-sm">Phục hồi chức năng (Rehabilitation)</h5>
                  <p className="text-xs text-slate-500 mt-1">Hỗ trợ toàn diện cho bệnh nhân phục hồi tại nhà.</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-4 items-start transition hover:shadow-md">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-black text-slate-800 text-sm">Công nghệ y tế chuyên dụng</h5>
                  <p className="text-xs text-slate-500 mt-1">Hợp tác cung ứng giải pháp với các bệnh viện và cơ sở y tế.</p>
                </div>
              </div>
            </div>
          </div>"""

# I need to find where to replace in AboutPage.tsx
# The area is after `{activeTab === 'OVERVIEW' && (`
import re
pattern = r"\{/\* GIỚI THIỆU CHUNG \*/\}(.*?)\{/\* TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI \(3 CARDS\) \*/\}"
new_content = re.sub(pattern, replacement + "\n\n          {/* TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI (3 CARDS) */}", content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(new_content)

