import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, Clock, Eye, Calendar, User, Tag, 
  ChevronRight, ArrowLeft, Share2, Sparkles, PlusCircle, 
  ThumbsUp, CheckCircle2, Bookmark, ExternalLink, Flame, 
  Stethoscope, HeartHandshake, ShieldCheck, Newspaper
} from 'lucide-react';
import { Article, ArticleCategory, Product } from '../types';
import { INITIAL_ARTICLES } from '../data/articlesData';

interface ArticlesPageProps {
  onSelectProduct?: (product: Product) => void;
  allProducts: Product[];
  onOpenAdmin: () => void;
  currentUser?: import('../types').User | null;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  onSelectProduct,
  allProducts,
  onOpenAdmin,
  currentUser
}) => {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load articles from backend
  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setArticles(data.data);
      }
    } catch (err) {
      console.warn("Could not fetch articles from backend, using local store:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSelectArticle = async (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await fetch(`/api/articles/${article.id}`);
      const data = await res.json();
      if (data.success) {
        if (data.related) setRelatedArticles(data.related);
        if (data.relatedProducts) {
          setRelatedProducts(data.relatedProducts);
        } else if (article.relatedProductIds) {
          const prods = allProducts.filter(p => article.relatedProductIds?.includes(p.id));
          setRelatedProducts(prods);
        }
      }
    } catch (err) {
      // Local fallback
      const related = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);
      setRelatedArticles(related);
      if (article.relatedProductIds) {
        const prods = allProducts.filter(p => article.relatedProductIds?.includes(p.id));
        setRelatedProducts(prods);
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const categories = [
    { id: 'ALL', name: 'Tất Cả Bài Viết', icon: BookOpen },
    { id: 'KIEN_THUC_PHCN', name: 'Kiến Thức Phục Hồi Chức Năng', icon: Stethoscope },
    { id: 'CHAM_SOC_NGUOI_BENH', name: 'Chăm Sóc Người Bệnh', icon: HeartHandshake },
    { id: 'TU_VAN_THIET_BI', name: 'Tư Vấn Chọn Thiết Bị Y Tế', icon: ShieldCheck },
    { id: 'TIN_TUC_Y_TE', name: 'Tin Tức Y Tế & TECNIC', icon: Newspaper },
  ];

  const filteredArticles = articles.filter(art => {
    if (activeCategory !== 'ALL' && art.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesTitle = art.title.toLowerCase().includes(q);
      const matchesExcerpt = art.excerpt.toLowerCase().includes(q);
      const matchesTag = art.tags?.some(t => t.toLowerCase().includes(q));
      return matchesTitle || matchesExcerpt || matchesTag;
    }
    return true;
  });

  const featuredArticle = articles.find(a => a.isFeatured) || articles[0];

  // Helper to format inline markdown (bold, italic, code)
  const formatInlineText = (text: string) => {
    // Split by bold **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      // Check italic *text*
      const subParts = part.split(/(\*.*?\*)/g);
      return subParts.map((sub, j) => {
        if (sub.startsWith('*') && sub.endsWith('*') && sub.length > 2) {
          return <em key={`${i}-${j}`} className="italic text-slate-700">{sub.slice(1, -1)}</em>;
        }
        return sub;
      });
    });
  };

  // Render markdown with custom styling
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let tableRows: string[] = [];

    const flushTable = (key: number) => {
      if (tableRows.length === 0) return null;
      const rows = [...tableRows];
      tableRows = [];

      // Filter out divider row (e.g., | :--- | :--- |)
      const dataRows = rows.filter(r => !r.includes('---'));
      if (dataRows.length === 0) return null;

      const headerCols = dataRows[0].split('|').filter(c => c.trim().length > 0);
      const bodyRows = dataRows.slice(1);

      return (
        <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[#143472] border-b border-slate-200">
                {headerCols.map((col, cIdx) => (
                  <th key={cIdx} className="p-3.5 font-black uppercase text-[11px] sm:text-xs">
                    {formatInlineText(col.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bodyRows.map((row, rIdx) => {
                const cols = row.split('|').filter(c => c.trim().length > 0);
                return (
                  <tr key={rIdx} className="hover:bg-blue-50/40 transition">
                    {cols.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3.5 text-slate-700 font-medium">
                        {formatInlineText(cell.trim())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx];

      // Table line
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        tableRows.push(line.trim());
        // If last line or next line is not table, flush
        if (idx === lines.length - 1 || !lines[idx + 1].trim().startsWith('|')) {
          const renderedTable = flushTable(idx);
          if (renderedTable) elements.push(renderedTable);
        }
        continue;
      }

      // Markdown Image ![caption](url)
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const caption = imgMatch[1];
        const src = imgMatch[2];
        elements.push(
          <figure key={idx} className="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <div className="relative overflow-hidden bg-slate-100 flex items-center justify-center">
              <img 
                src={src} 
                alt={caption || "Minh họa bài viết y khoa"} 
                className="w-full max-h-[520px] object-cover object-center hover:scale-[1.01] transition duration-300"
                referrerPolicy="no-referrer"
                onError={(e: any) => {
                  e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80';
                }}
              />
            </div>
            {caption && (
              <figcaption className="p-3 text-center text-xs text-slate-600 italic bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071ba] shrink-0" />
                <span>{caption}</span>
              </figcaption>
            )}
          </figure>
        );
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-lg sm:text-xl font-black text-[#143472] mt-8 mb-3 border-l-4 border-[#0071ba] pl-3.5 flex items-center gap-2">
            <span>{line.replace('## ', '')}</span>
          </h2>
        );
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-base sm:text-lg font-bold text-slate-900 mt-5 mb-1.5">
            {line.replace('### ', '')}
          </h3>
        );
        continue;
      }

      if (line.startsWith('> ')) {
        elements.push(
          <div key={idx} className="my-4 p-4 rounded-2xl bg-blue-50 border-l-4 border-[#0071ba] text-slate-800 text-xs sm:text-sm italic space-y-1">
            {formatInlineText(line.replace('> ', ''))}
          </div>
        );
        continue;
      }

      if (line.startsWith('- **')) {
        const parts = line.replace('- **', '').split('**:');
        elements.push(
          <div key={idx} className="flex items-start gap-2.5 ml-2 my-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071ba] mt-2 shrink-0" />
            <p>
              <strong className="text-slate-900 font-bold">{parts[0]}:</strong> {formatInlineText(parts.slice(1).join('**:'))}
            </p>
          </div>
        );
        continue;
      }

      if (line.startsWith('- ')) {
        elements.push(
          <div key={idx} className="flex items-start gap-2.5 ml-2 my-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071ba] mt-2 shrink-0" />
            <p>{formatInlineText(line.replace('- ', ''))}</p>
          </div>
        );
        continue;
      }

      if (/^[0-9]+\.\s/.test(line)) {
        const match = line.match(/^([0-9]+)\.\s(.*)$/);
        if (match) {
          elements.push(
            <div key={idx} className="flex items-start gap-3 my-2.5 ml-1">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-[#0071ba] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                {match[1]}
              </span>
              <p className="flex-1 font-medium text-slate-800">{formatInlineText(match[2])}</p>
            </div>
          );
          continue;
        }
      }

      if (line.startsWith('---')) {
        elements.push(<hr key={idx} className="my-6 border-slate-200" />);
        continue;
      }

      if (!line.trim()) {
        elements.push(<div key={idx} className="h-1.5" />);
        continue;
      }

      elements.push(<p key={idx} className="leading-relaxed">{formatInlineText(line)}</p>);
    }

    return (
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
        {elements}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. TOP BANNER / BREADCRUMB */}
      <div className="bg-gradient-to-r from-[#143472] via-[#0f4c9c] to-[#0071ba] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/60 px-3 py-1 rounded-full text-xs font-bold text-blue-200 border border-blue-400/30">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>CẨM NANG HƯỚNG DẪN & PHỤC HỒI CHỨC NĂNG</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight">
              Kiến Thức Thiết Bị & Phục Hồi Chức Năng
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Tổng hợp cẩm nang chăm sóc người bệnh, kỹ thuật phục hồi chức năng và hướng dẫn sử dụng các thiết bị y tế chuẩn Bộ Y Tế được biên soạn bởi Đội ngũ Chuyên viên & Kỹ thuật viên TECNIC MEDTECH.
            </p>
          </div>

          {currentUser && (currentUser.accountType === 'ADMIN' || currentUser.accountType === 'STAFF') && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-blue-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>Quản Trị / Tạo Bài Viết Bằng AI</span>
              </button>
            </div>
          )}
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 2. ARTICLE DETAIL VIEW (IF SELECTED) */}
      {selectedArticle ? (
        <div className="space-y-6">
          
          {/* Back Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0071ba] hover:text-blue-900 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách bài viết</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Đã sao chép liên kết!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-500" />
                  <span>Chia sẻ bài viết</span>
                </>
              )}
            </button>
          </div>

          {/* Main Article Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Article Content */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="bg-blue-50 text-[#0071ba] font-bold px-3 py-1 rounded-full border border-blue-200">
                  {selectedArticle.categoryName}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedArticle.publishedAt}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.readTime}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {selectedArticle.views} lượt xem
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Excerpt */}
              <div className="bg-blue-50/70 border-l-4 border-[#0071ba] p-4 rounded-r-2xl italic text-xs sm:text-sm text-slate-700 font-medium">
                "{selectedArticle.excerpt}"
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden shadow-xs border border-slate-200 max-h-[420px]">
                <img 
                  src={selectedArticle.coverImage} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Full Content */}
              <div className="prose max-w-none pt-4">
                {renderMarkdown(selectedArticle.content)}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
                  <Tag className="w-3.5 h-3.5" /> Từ khóa:
                </span>
                {selectedArticle.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg hover:bg-blue-50 hover:text-[#0071ba] transition cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Call to action box */}
              <div className="bg-gradient-to-r from-[#143472] to-[#0071ba] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm">Cần tư vấn trực tiếp từ Chuyên viên TECNIC?</h4>
                  <p className="text-xs text-blue-100 mt-0.5">Tổng đài hỗ trợ thiết bị y tế & PHCN 24/7 miễn phí</p>
                </div>
                <a 
                  href="tel:0348402466"
                  className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs px-5 py-2.5 rounded-xl shrink-0 transition"
                >
                  Hotline: 034 84 02466
                </a>
              </div>

            </div>

            {/* Right: Sidebar (Related Products & Articles) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Related Products Box */}
              {relatedProducts.length > 0 && (
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                      ★
                    </div>
                    <h3 className="font-black text-xs sm:text-sm text-slate-900 uppercase">
                      Thiết Bị Y Tế Khuyên Dùng
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {relatedProducts.map((prod) => (
                      <div 
                        key={prod.id}
                        onClick={() => onSelectProduct && onSelectProduct(prod)}
                        className="p-2.5 rounded-2xl border border-slate-100 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/50 transition cursor-pointer flex items-center gap-3 group"
                      >
                        <div className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                          <img 
                            src={prod.image} 
                            alt={prod.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e: any) => {
                              e.target.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=300&auto=format&fit=crop&q=80';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] bg-blue-100 text-[#0071ba] font-bold px-1.5 py-0.5 rounded">
                            {prod.code}
                          </span>
                          <h5 className="font-bold text-xs text-slate-900 truncate group-hover:text-[#0071ba] mt-0.5">
                            {prod.name}
                          </h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-black text-xs text-red-600">
                              {prod.tecnicPrice.toLocaleString('vi-VN')} đ
                            </span>
                            <span className="text-[10px] text-slate-400 line-through">
                              {prod.marketPrice.toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles Box */}
              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-xs sm:text-sm text-slate-900 uppercase border-b border-slate-100 pb-3">
                    Bài Viết Cùng Chuyên Mục
                  </h3>
                  <div className="space-y-3">
                    {relatedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleSelectArticle(art)}
                        className="group cursor-pointer space-y-1.5 p-2 rounded-xl hover:bg-slate-50 transition"
                      >
                        <span className="text-[10px] font-bold text-[#0071ba]">
                          {art.categoryName}
                        </span>
                        <h5 className="font-bold text-xs text-slate-800 group-hover:text-[#0071ba] line-clamp-2 leading-snug">
                          {art.title}
                        </h5>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>{art.publishedAt}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Contact Box */}
              <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-3 text-xs">
                <h4 className="font-black text-slate-900 uppercase">Đội Ngũ Tư Vấn TECNIC</h4>
                <p className="text-slate-600 leading-relaxed">
                  Đội ngũ Chuyên viên tư vấn và Kỹ thuật viên TECNIC luôn sẵn sàng hỗ trợ, tư vấn lựa chọn và hướng dẫn lắp đặt thiết bị cho người bệnh trên khắp 63 tỉnh thành.
                </p>
                <div className="pt-2 border-t border-slate-200 space-y-1 font-medium">
                  <div>🏢 Trụ sở: Tòa nhà New Skyline, Văn Quán, Hà Đông, Hà Nội</div>
                  <div>📞 Hotline: <b className="text-amber-600">034 84 02466</b></div>
                  <div>🌐 Website: tecnic.vn</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* 3. ARTICLES LIST & CATEGORY TABS */
        <div className="space-y-6">
          
          {/* SEARCH & CATEGORY FILTER */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            
            {/* Search Box */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết theo từ khóa (tai biến, đệm hơi, giường y tế, găng tay robot...)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0071ba] focus:bg-white transition"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      isActive
                        ? 'bg-[#143472] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-[#0071ba]'}`} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* FEATURED HERO ARTICLE (IF ON ALL CATEGORIES & NO SEARCH) */}
          {activeCategory === 'ALL' && !searchQuery && featuredArticle && (
            <div 
              onClick={() => handleSelectArticle(featuredArticle)}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 group cursor-pointer hover:shadow-md transition"
            >
              <div className="md:col-span-6 relative h-64 md:h-full overflow-hidden bg-slate-100">
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 bg-amber-400 text-blue-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Flame className="w-3 h-3 text-red-600" /> BÀI VIẾT NỔI BẬT
                </span>
              </div>

              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="bg-blue-50 text-[#0071ba] font-bold px-2.5 py-0.5 rounded-full">
                      {featuredArticle.categoryName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {featuredArticle.publishedAt}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-[#0071ba] transition leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0071ba]"></span>
                    <span className="font-bold text-slate-800">Ban Biên Tập TECNIC MEDTECH</span>
                  </div>

                  <span className="text-[#0071ba] font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                    Đọc tiếp <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ARTICLE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => handleSelectArticle(art)}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={art.coverImage} 
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute bottom-3 left-3 bg-[#143472]/90 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                      {art.categoryName}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{art.publishedAt}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="font-black text-sm text-slate-900 group-hover:text-[#0071ba] line-clamp-2 leading-snug transition">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071ba]" />
                    <span>Kiến thức Y khoa</span>
                  </div>

                  <span className="text-[#0071ba] font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                    Chi tiết <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">Không tìm thấy bài viết nào phù hợp</p>
              <p className="text-xs text-slate-500">Hãy thử tìm từ khóa khác hoặc bấm nút dưới để xem tất cả.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                }}
                className="bg-[#0071ba] text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Xem tất cả bài viết
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
