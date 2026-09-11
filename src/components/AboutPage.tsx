import React from 'react';
import { 
  Building2, MapPin, Phone, Mail, ShieldCheck, 
  CheckCircle2, Sparkles, 
  ExternalLink, Accessibility, Activity, Bot, ArrowRight,
  Newspaper, Eye, Clock, TrendingUp, ChevronRight, ShoppingBag
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { INITIAL_ARTICLES } from '../data/articlesData';
import { CategoryId, Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/productsData';

interface AboutPageProps {
  onSelectCategory?: (categoryId: CategoryId) => void;
  onOpenArticles?: (articleId?: string) => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onViewAllProducts?: () => void;
  bestSellerProducts?: Product[];
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onSelectCategory,
  onOpenArticles,
  onSelectProduct,
  onAddToCart,
  onViewAllProducts,
  bestSellerProducts = []
}) => {
  // Popular articles for right sidebar ("TIN XEM NHIỀU")
  const popularArticles = INITIAL_ARTICLES.slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-10">
      
      {/* PAGE HEADER / TITLE (Phong cách tecnic.vn) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0071ba] border border-blue-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#0071ba]" />
          <span>TECNIC MEDTECH • Về Chúng Tôi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0c2a5c] tracking-tight uppercase">
          Giới thiệu TECNIC MEDTECH
        </h1>
        <p className="text-xs sm:text-sm text-[#0071ba] font-bold italic">
          "{COMPANY_INFO.slogan}"
        </p>
      </div>

      {/* MAIN CONTENT & SIDEBAR GRID (Form sườn tecnic.vn) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT MAIN COLUMN (70%) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* CONTENT CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs space-y-6">
            

            {/* MỞ ĐẦU */}
            <div className="space-y-4 text-slate-800 leading-relaxed text-sm sm:text-base">
              <p className="font-black text-[#0c2a5c] text-base sm:text-lg">
                Kính thưa quý khách hàng, đối tác, nhà đầu tư và toàn thể CBNV hệ thống TECNIC!
              </p>

              <p className="text-slate-700">
                <strong className="text-[#0071ba]">Công ty Cổ phần Giải pháp Công nghệ Hỗ trợ Y tế TECNIC (TECNIC MEDTECH)</strong> xin gửi lời chào trân trọng và lời chúc tốt đẹp nhất đến Quý khách hàng, Quý đối tác, Quý nhà đầu tư cùng toàn thể CBNV trong hệ thống TECNIC.
              </p>

              <p className="text-slate-700">
                Với phương châm <strong className="text-[#0071ba]">“Giải pháp toàn diện, tái sinh cuộc sống”</strong>, TECNIC MEDTECH lấy nhu cầu thực tế của người bệnh, gia đình và hệ thống y tế làm trọng tâm trong quá trình nghiên cứu, lựa chọn và cung cấp các giải pháp công nghệ hỗ trợ y tế. Chúng tôi hướng tới những giải pháp thiết thực, phù hợp và có giá trị lâu dài, góp phần nâng cao chất lượng chăm sóc sức khỏe và chất lượng cuộc sống tại Việt Nam.
              </p>

              <div className="pt-2">
                <h3 className="font-black text-[#0c2a5c] text-base sm:text-lg italic border-l-4 border-[#0071ba] pl-3 py-1 bg-blue-50/50 rounded-r-lg">
                  Từ định hướng đó, hoạt động của TECNIC MEDTECH tập trung vào các lĩnh vực:
                </h3>
              </div>
            </div>

            {/* 3 LĨNH VỰC HOẠT ĐỘNG CỐT LÕI (Nội dung chính từ tecnic.vn) */}
            <div className="space-y-6 pt-2">
              
              {/* Lĩnh vực 1 */}
              <div className="bg-slate-50/90 rounded-2xl p-6 border border-slate-200/90 hover:border-blue-400 transition space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-[#0071ba] text-white font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                    1
                  </span>
                  <div className="space-y-3">
                    <h4 className="font-black text-base sm:text-lg text-[#0c2a5c] flex items-center gap-2 flex-wrap">
                      <Accessibility className="w-5 h-5 text-[#0071ba]" />
                      <span>Phục hồi chức năng và hỗ trợ chăm sóc – Đồng hành cùng người bệnh tại nhà</span>
                    </h4>
                    
                    <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      <p>
                        Sau điều trị và xuất viện, người bệnh cần một quá trình phục hồi chức năng và chăm sóc phù hợp để duy trì khả năng vận động, từng bước trở lại sinh hoạt và nâng cao chất lượng cuộc sống.
                      </p>
                      <p>
                        TECNIC MEDTECH cung cấp thiết bị phục hồi chức năng, thiết bị hỗ trợ vận động và chăm sóc người bệnh, đồng thời tư vấn giải pháp và lựa chọn thiết bị phù hợp với tình trạng, nhu cầu và khả năng vận động của từng người bệnh.
                      </p>
                      <p>
                        Từ tập luyện, di chuyển, thay đổi tư thế đến chăm sóc tại giường, chúng tôi hướng tới giải pháp thiết thực cho người bệnh và giảm gánh nặng cho người chăm sóc tại nhà.
                      </p>
                    </div>

                    {onSelectCategory && (
                      <button
                        onClick={() => onSelectCategory('ROBOT_NANG_HA')}
                        className="text-xs font-bold text-[#0071ba] hover:text-blue-900 inline-flex items-center gap-1.5 pt-1 cursor-pointer"
                      >
                        Khám phá Thiết Bị Phục Hồi Chức Năng <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Lĩnh vực 2 */}
              <div className="bg-slate-50/90 rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-400 transition space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                    2
                  </span>
                  <div className="space-y-3">
                    <h4 className="font-black text-base sm:text-lg text-[#0c2a5c] flex items-center gap-2 flex-wrap">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <span>Theo dõi sức khỏe – Chủ động chăm sóc tại nhà</span>
                    </h4>

                    <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      <p>
                        TECNIC MEDTECH cung cấp thiết bị theo dõi sức khỏe tại nhà, hướng đến người cao tuổi, người mắc bệnh mạn tính, người sau đột quỵ và những người cần theo dõi sức khỏe lâu dài.
                      </p>
                      <p>
                        Các giải pháp giúp gia đình chủ động kiểm tra, theo dõi các chỉ số sức khỏe, nhận biết những thay đổi bất thường và có thêm cơ sở để phối hợp với nhân viên y tế khi cần thiết.
                      </p>
                      <p>
                        Qua đó, chăm sóc sức khỏe không chỉ dừng lại ở điều trị mà được mở rộng thành một quá trình theo dõi, phòng ngừa và chăm sóc liên tục tại gia đình.
                      </p>
                    </div>

                    {onSelectCategory && (
                      <button
                        onClick={() => onSelectCategory('DAI_NEP_KHOP')}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1.5 pt-1 cursor-pointer"
                      >
                        Khám phá Thiết Bị Theo Dõi & Chăm Sóc Gia Đình <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Lĩnh vực 3 */}
              <div className="bg-slate-50/90 rounded-2xl p-6 border border-slate-200/90 hover:border-purple-400 transition space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                    3
                  </span>
                  <div className="space-y-3">
                    <h4 className="font-black text-base sm:text-lg text-[#0c2a5c] flex items-center gap-2 flex-wrap">
                      <Bot className="w-5 h-5 text-purple-600" />
                      <span>Công nghệ y tế chuyên sâu – Đồng hành cùng bệnh viện và cơ sở y tế</span>
                    </h4>

                    <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      <p>
                        TECNIC MEDTECH tập trung nghiên cứu, tìm kiếm và đưa những công nghệ, thiết bị và giải pháp y tế tiên tiến từ thế giới về Việt Nam, đáp ứng nhu cầu ngày càng cao của bệnh viện, phòng khám và các cơ sở y tế.
                      </p>
                      <p>
                        Từ năng lực cung cấp và triển khai thực tế, TECNIC MEDTECH hướng tới trở thành cầu nối đưa tiến bộ công nghệ y tế đến gần hơn với thực tiễn y khoa tại Việt Nam, góp phần nâng cao hiệu quả chẩn đoán, điều trị, chăm sóc và phục hồi chức năng, vì chất lượng cuộc sống tốt hơn cho người bệnh.
                      </p>
                    </div>

                    {onSelectCategory && (
                      <button
                        onClick={() => onSelectCategory('TRI_LIEU_XUNG_DIEN')}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1.5 pt-1 cursor-pointer"
                      >
                        Khám phá Công Nghệ Y Tế Chuyên Sâu <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR COLUMN (30% - Form sườn "TIN XEM NHIỀU" bên tecnic.vn) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          
          {/* TIN XEM NHIỀU BOX */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm sm:text-base text-[#0c2a5c] uppercase tracking-wide flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#0071ba]" />
                <span>TIN XEM NHIỀU</span>
              </h3>
              {onOpenArticles && (
                <button 
                  onClick={() => onOpenArticles()} 
                  className="text-xs font-bold text-[#0071ba] hover:underline cursor-pointer"
                >
                  Tất cả
                </button>
              )}
            </div>

            <div className="space-y-4">
              {popularArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => onOpenArticles && onOpenArticles(art.id)}
                  className="group flex gap-3 items-start cursor-pointer transition hover:bg-slate-50 p-2 rounded-xl"
                >
                  <img 
                    src={art.coverImage} 
                    alt={art.title} 
                    className="w-20 h-16 object-cover rounded-lg shrink-0 border border-slate-200 group-hover:scale-105 transition"
                  />
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-[#0071ba] transition leading-snug">
                      {art.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.publishedAt}
                      </span>
                      {art.views && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {art.views}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* MỤC SẢN PHẨM BÁN CHẠY GỢI Ý */}
      {bestSellerProducts && bestSellerProducts.length > 0 && (
        <section className="bg-white rounded-3xl p-5 sm:p-6 text-slate-800 border border-slate-200/90 shadow-2xs relative overflow-hidden">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-5 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0071ba] flex items-center justify-center font-black shadow-2xs border border-blue-100">
                <TrendingUp className="w-5 h-5 text-[#0071ba]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                  SẢN PHẨM BÁN CHẠY & TIÊU BIỂU
                </h3>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Thiết bị phục hồi chức năng và giải pháp y tế chất lượng cao được tin dùng nhất
                </p>
              </div>
            </div>

            {onViewAllProducts && (
              <button
                onClick={onViewAllProducts}
                className="bg-blue-50 hover:bg-[#0071ba] text-[#0071ba] hover:text-white font-bold text-xs px-4 py-2 rounded-full border border-blue-200 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Xem toàn bộ sản phẩm ({CATEGORIES.length - 1} danh mục)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {bestSellerProducts.slice(0, 4).map((prod) => (
              <div 
                key={prod.id} 
                onClick={() => onSelectProduct && onSelectProduct(prod)}
                className="bg-white text-slate-800 rounded-2xl p-2.5 flex flex-col justify-between hover:shadow-xl transition cursor-pointer group relative border border-slate-200/90 transform hover:-translate-y-1"
              >
                <div className="relative flex items-center justify-center h-32 rounded-xl overflow-hidden mb-1.5 bg-slate-50">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition"
                    referrerPolicy="no-referrer"
                  />
                  {prod.specifications?.origin && (
                    <span className="absolute top-1.5 left-1.5 bg-white/95 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700 shadow-xs border border-slate-200">
                      {prod.specifications.origin}
                    </span>
                  )}
                </div>
                
                <div>
                  <h5 className="font-bold text-xs text-slate-900 line-clamp-2 min-h-[32px] leading-snug group-hover:text-[#0071ba]">
                    {prod.name}
                  </h5>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-black text-xs sm:text-sm text-red-600">
                      {prod.tecnicPrice.toLocaleString('vi-VN')}&nbsp;đ
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      Bán chạy
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KHỐI BÀI BÁO VÀ CẨM NANG Y KHOA (Khi nhấn vào ra bài báo) */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-[#0071ba] rounded-full"></span>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-[#0071ba]" />
                <span>BÀI BÁO & CẨM NANG Y KHOA PHỤC HỒI</span>
              </h4>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Kiến thức phục hồi chức năng, giải pháp chăm sóc người bệnh từ đội ngũ chuyên gia
              </p>
            </div>
          </div>
          {onOpenArticles && (
            <button
              onClick={() => onOpenArticles()}
              className="bg-[#0071ba] hover:bg-[#0e387a] text-white font-bold text-xs px-4 py-1.5 rounded-full transition shadow-xs flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <span>Xem tất cả bài viết</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* DANH SÁCH BÀI BÁO DẠNG CARD KHI NHẤN VÀO RA CHI TIẾT BÀI BÁO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {INITIAL_ARTICLES.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => onOpenArticles && onOpenArticles(article.id)}
              className="group bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-3 border border-slate-200 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-40 rounded-xl overflow-hidden mb-3 relative bg-slate-200">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {article.categoryName || 'Y khoa'}
                  </span>
                </div>
                <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-[#0071ba] transition">
                  {article.title}
                </h5>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-3 mt-2 border-t border-slate-200/60">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.publishedAt}
                </span>
                <span className="text-[#0071ba] font-bold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                  Đọc tiếp <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
