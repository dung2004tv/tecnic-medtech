import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Sparkles, Headphones, Eye, ShoppingCart, 
  PhoneCall, ShieldCheck, CheckCircle2, ChevronRight, MessageSquare, UserCheck,
  Stethoscope, Info, Phone
} from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { ProductImage } from './ProductImage';

interface ChatBotProps {
  onSelectProduct?: (product: Product) => void;
  allProducts: Product[];
}

interface ExtendedChatMessage extends ChatMessage {
  recommendedProducts?: Product[];
}

const INITIAL_MESSAGES: ExtendedChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: `Dạ kính chào Quý khách! Chuyên viên Tư vấn Thiết Bị & Vật Tư Y Tế TECNIC MEDTECH (tecnic.vn) sẵn sàng hỗ trợ Quý khách 24/7.
    
Quý khách đang cần tư vấn về dòng thiết bị y tế hay vật tư nào ạ?
1. 🛏️ **Giường y tế dưỡng bệnh**: Giường 2-4 tay quay có bô vệ sinh, giường điện tự động, giường kéo giãn cột sống.
2. 🦽 **Xe lăn**: Xe lăn ngả nằm 180°, xe lăn siêu nhẹ hợp kim nhôm, xe lăn có bô tắm.
3. 🤖 **Thiết bị phục hồi chức năng**: Găng tay Robot tập bàn tay, ghế nâng chuyển thủy lực.
4. 🩺 **Đai nẹp Bonbone Nhật Bản**: Đai trợ lực khớp gối, đai cột sống thắt lưng, đai cổ thoáng khí.
5. 💨 **Chống loét tì đè**: Đệm hơi tự động đảo khí, ống thông tiểu vô khuẩn CLINY.
6. ⚡ **Vật lý trị liệu**: Máy xung điện Omron, máy nén ép suy giãn tĩnh mạch.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const SUGGESTIONS = [
  "Tư vấn giường y tế 4 tay quay có bô",
  "Găng tay Robot PHCN sau tai biến",
  "Xe lăn ngả nằm 180° có bô vệ sinh",
  "Giải pháp chống loét cho người nằm lâu",
  "Đai cố định & trợ lực khớp gối Bonbone",
  "Máy xung điện Omron giảm đau cơ khớp",
  "Chính sách bảo hành và giao hàng"
];

// Helper to find matching products
function findMatchingProducts(query: string, products: Product[]): Product[] {
  const q = query.toLowerCase();
  let matches: Product[] = [];

  const byModel = products.filter(p => 
    (p.specifications.model && q.includes(p.specifications.model.toLowerCase())) ||
    (p.code && q.includes(p.code.toLowerCase())) ||
    p.name.toLowerCase().includes(q)
  );
  if (byModel.length > 0) {
    return byModel.slice(0, 3);
  }

  if (q.includes('giường') || q.includes('tay quay') || q.includes('kéo giãn')) {
    matches = products.filter(p => p.category === 'GIUONG_Y_TE').slice(0, 3);
  } else if (q.includes('xe lăn') || q.includes('ngả nằm') || q.includes('lăn tay')) {
    matches = products.filter(p => p.category === 'XE_LAN').slice(0, 3);
  } else if (q.includes('robot') || q.includes('găng') || q.includes('nâng chuyển') || q.includes('thủy lực')) {
    matches = products.filter(p => p.category === 'ROBOT_NANG_HA').slice(0, 3);
  } else if (q.includes('đệm hơi') || q.includes('loét') || q.includes('thông tiểu') || q.includes('cliny')) {
    matches = products.filter(p => p.category === 'DEM_HOI_CHONG_LOET').slice(0, 3);
  } else if (q.includes('bonbone') || q.includes('đai') || q.includes('nẹp') || q.includes('khớp')) {
    matches = products.filter(p => p.category === 'DAI_NEP_KHOP').slice(0, 3);
  } else if (q.includes('xung điện') || q.includes('omron') || q.includes('đạp chân') || q.includes('suy giãn') || q.includes('massage')) {
    matches = products.filter(p => p.category === 'TRI_LIEU_XUNG_DIEN').slice(0, 3);
  } else if (q.includes('khung') || q.includes('nạng') || q.includes('gậy') || q.includes('tập đi')) {
    matches = products.filter(p => p.category === 'KHUNG_TAP_DI' || p.category === 'GAY_NANG').slice(0, 3);
  } else if (q.includes('ghế bô') || q.includes('ghế tắm') || q.includes('vệ sinh')) {
    matches = products.filter(p => p.category === 'GHE_BO_TAM').slice(0, 3);
  }

  if (matches.length === 0 && q.length > 2) {
    matches = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.specifications.brand.toLowerCase().includes(q)
    ).slice(0, 3);
  }

  return matches;
}

// Client-side medical rule response generator (100% guarantee no code snippets)
function generateClientMedicalReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("giường") || q.includes("tay quay") || q.includes("kéo giãn") || q.includes("nằm")) {
    return `Dạ chào Quý khách! Về **Giường y tế dưỡng bệnh & PHCN** tại TECNIC (tecnic.vn):
1. **Giường y tế 4 tay quay có bô vệ sinh Hueloi JYC01 / GBM-092A**: Nâng hạ đầu lưng 0-85°, nâng hạ chân, nghiêng trái/phải và có cần gạt bô vệ sinh tự động tại giường, vô cùng tiện lợi cho người nhà chăm sóc.
2. **Giường điện tự động OSADA SD-33E / SD-57C**: Điều khiển remote nhẹ nhàng, tích hợp chậu gội đầu và bàn ăn.
3. **Giường kéo giãn cột sống điện SD-41GK**: Giúp giải phóng chèn ép rễ thần kinh do thoát vị đĩa đệm.
👉 TECNIC hỗ trợ giao hàng, lắp đặt tận nơi, bảo hành chính hãng 24 - 36 tháng. Hotline: **034 84 02466**!`;
  }

  if (q.includes("xe lăn") || q.includes("ngả nằm") || q.includes("lăn tay")) {
    return `Dạ chào Quý khách! Về dòng **Xe lăn tay & Xe lăn đa năng** tại TECNIC:
1. **Xe lăn ngả nằm 180° Lucass X-72 / GBM-061C**: Tựa lưng ngả thẳng thành giường nằm, có gác chân nâng hạ và bô vệ sinh đi kèm.
2. **Xe lăn siêu nhẹ GBM-065B**: Khung hợp kim nhôm siêu nhẹ chỉ 7.5kg, gấp gọn bỏ cốp ô tô tiện lợi khi đi khám hoặc dạo phố.
3. **Xe lăn ghế bô Lucass X-8 / X-9**: Chống nước, tắm và vệ sinh trực tiếp trên bồn cầu.`;
  }

  if (q.includes("robot") || q.includes("găng") || q.includes("tai biến") || q.includes("liệt") || q.includes("bàn tay")) {
    return `Dạ chào Quý khách! Đối với phục hồi chức năng vận động bàn tay:
1. **Găng tay Robot PHCN Oromi 962 / Hueloi**:
   - Sử dụng áp lực khí nén tập gập/duỗi từng ngón tay theo phác đồ y khoa.
   - Chế độ tập gương (Mirror Therapy): Tay lành tập dẫn dắt tay liệt cử động theo, kích thích tái tạo đường dẫn truyền thần kinh.
2. **Ghế nâng hạ chuyển bệnh nhân thủy lực OSADA XDC-01 / GBM-053**: Hỗ trợ di chuyển người bệnh từ giường sang xe lăn hoặc bồn cầu nhẹ nhàng, an toàn tuyệt đối.
👉 Quý khách có thể gọi ngay **034 84 02466** để Chuyên viên kỹ thuật tư vấn chọn kích cỡ (size S, M, L, XL) vừa vặn nhất!`;
  }

  if (q.includes("đệm") || q.includes("loét") || q.includes("chống loét")) {
    return `Dạ chào Quý khách! Để chống loét tì đè cho người nằm lâu:
1. **Đệm hơi chống loét tự động đảo khí GBM-095B / GBM-096B (có lỗ bô)**: Máy bơm tự động đảo khí luân phiên 6-8 phút/lần, giúp các vùng mông, lưng luôn được thông thoáng máu.
2. **Đệm hơi nâng lưng 45° GBM-073B**: Nâng người bệnh ngồi dậy ăn uống và thở dễ dàng.
3. **Đệm hơi OSADA SD-AM05**: Chất liệu PVC y tế kháng khuẩn, máy bơm chạy siêu êm.`;
  }

  if (q.includes("đai") || q.includes("nẹp") || q.includes("bonbone") || q.includes("gối") || q.includes("cổ") || q.includes("vai")) {
    return `Dạ chào Quý khách! Về hệ thống **Đai nẹp định hình Bonbone Nhật Bản & Famedi**:
- **Đai cố định & trợ lực khớp gối Bonbone**: Dành cho người thoái hóa khớp gối, đứt dây chằng chéo, viêm đau khớp khi đứng lên ngồi xuống.
- **Đai nẹp cổ thoáng khí Bonbone**: Cố định đốt sống cổ, giảm đau mỏi vai gáy và thoái hóa cột sống cổ.
- **Đai định hình thắt lưng Bonbone Pro Hard Slim**: Cố định vững chắc vùng thắt lưng L1-L5, giảm đau thoát vị đĩa đệm.
- **Đai di chuyển bệnh nhân Famedi / Orbe**: Thiết kế quai trợ lực giúp người nhà đỡ bệnh nhân tập đi an toàn, chống trượt ngã.`;
  }

  if (q.includes("xung điện") || q.includes("omron") || q.includes("đạp chân") || q.includes("suy giãn") || q.includes("massage")) {
    return `Dạ chào Quý khách! Về vật lý trị liệu & kích thích thần kinh cơ:
1. **Máy xung điện Omron HV-F013 / HV-F028 / HV-F230 (không dây)**: Kích thích dòng xung TENS & EMS giảm đau nhức và phục hồi cơ teo liệt.
2. **Máy nén khí trị liệu suy giãn tĩnh mạch GBM-034**: Tạo áp lực ép tuần hoàn bắp chân giúp máu hồi lưu về tim.
3. **Máy đạp chân điện có nẹp gối**: Tự động quay hỗ trợ cả tay và chân cho người yếu liệt.`;
  }

  if (q.includes("thanh toán") || q.includes("giao hàng") || q.includes("địa chỉ") || q.includes("hotline") || q.includes("tài khoản")) {
    return `Dạ thông tin liên hệ và đặt hàng tại **TECNIC MEDTECH** (tecnic.vn):
- 🏢 **Trụ sở**: Tầng 2, Tòa nhà New Skyline, KĐT Văn Quán, P. Hà Đông, Hà Nội.
- 📞 **Hotline tư vấn 24/7**: 034 84 02466 (Tư vấn thiết bị tận tâm).
- 💳 **Tài khoản doanh nghiệp**: Ngân hàng BIDV – Chi nhánh Hà Đông | STK: **8661234668** | Tên: CÔNG TY CP CN VA DV Y TE TECNIC.
- 🚚 **Giao hàng**: Miễn phí ship toàn quốc cho đơn từ 1.000.000đ, hỗ trợ kiểm tra thiết bị trước khi thanh toán COD!`;
  }

  return `Dạ xin chào Quý khách! Chuyên viên Tư vấn Thiết Bị & Vật Tư Y Tế TECNIC hân hạnh được hỗ trợ.
Quý khách đang quan tâm đến dòng thiết bị nào ạ?
1. 🦽 Xe lăn tay, xe lăn ngả nằm 180° & Xe lăn siêu nhẹ
2. 🛏️ Giường y tế dưỡng bệnh 2-4 tay quay / Giường điện có bô
3. 🤖 Găng tay Robot PHCN sau tai biến & Ghế nâng chuyển thủy lực
4. 🩺 Đai nẹp định hình Bonbone Nhật Bản & Khung tập đi có ghế
5. 💨 Đệm hơi chống loét tự động đảo khí cho người nằm liệt
6. ⚡ Máy xung điện Omron & Máy nén ép suy giãn tĩnh mạch`;
}

// Sub-component to render clean message text
const ChatMessageRenderer: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="space-y-1 text-xs leading-relaxed whitespace-pre-line">
      {text}
    </div>
  );
};

export const ChatBot: React.FC<ChatBotProps> = ({ onSelectProduct, allProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ExtendedChatMessage[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ExtendedChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const matchedProducts = findMatchingProducts(text, allProducts);

    try {
      let botReply = '';
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4).map(m => ({ 
            role: m.sender === 'user' ? 'user' : 'model', 
            text: m.text 
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply && data.reply.trim()) {
          botReply = data.reply.trim();
        }
      }

      if (!botReply) {
        botReply = generateClientMedicalReply(text);
      }

      const botMsg: ExtendedChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botReply,
        recommendedProducts: matchedProducts.length > 0 ? matchedProducts : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn("Chat API error (using local medical response):", err);
      const fallbackReply = generateClientMedicalReply(text);
      const botMsg: ExtendedChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        recommendedProducts: matchedProducts.length > 0 ? matchedProducts : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <aside aria-label="Hỗ trợ trực tuyến" className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end">
      
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="bg-white w-[92vw] sm:w-[440px] h-[75vh] max-h-[580px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-fadeIn">
          
          {/* CHAT HEADER */}
          <div className="bg-[#143472] text-white p-3.5 sm:p-4 flex justify-between items-center shrink-0 border-b-2 border-amber-400">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-md">
                  <Stethoscope className="w-5 h-5 text-blue-950" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                  Tư Vấn Thiết Bị Y Tế TECNIC
                  <span className="text-[10px] bg-amber-400 text-blue-950 px-1.5 py-0.2 rounded font-bold">24/7</span>
                </h4>
                <p className="text-[10px] text-blue-200 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  Tra cứu thông số & Báo giá thiết bị y tế
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:0348402466"
                className="text-[10px] bg-amber-400 text-blue-950 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition hover:bg-amber-300 shadow-xs"
              >
                <Phone className="w-3 h-3" /> Hotline 24/7
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-blue-200 hover:text-white rounded-full hover:bg-white/10 transition"
                title="Đóng cửa sổ chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CHAT MESSAGES BODY */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#0071ba] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-xs">
                    T
                  </div>
                )}

                <div
                  className={`max-w-[90%] p-3 rounded-2xl leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0071ba] text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <ChatMessageRenderer text={msg.text} />
                  
                  {/* RECOMMENDED PRODUCTS CARDS */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                      <p className="text-[11px] font-bold text-[#143472] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          Sản phẩm đề xuất cho Quý khách:
                        </span>
                      </p>
                      <div className="space-y-1.5">
                        {msg.recommendedProducts.map((p) => (
                          <div 
                            key={p.id}
                            className="bg-slate-50 hover:bg-blue-50 border border-slate-200 p-2 rounded-xl flex items-center justify-between gap-2 transition"
                          >
                            <div 
                              onClick={() => onSelectProduct && onSelectProduct(p)}
                              className="flex items-center gap-2 overflow-hidden cursor-pointer flex-1"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                                <ProductImage product={p} size="sm" showBadge={false} />
                              </div>
                              <div className="overflow-hidden">
                                <p className="font-bold text-[11px] text-slate-900 truncate">{p.name}</p>
                                <span className="text-[10px] text-red-600 font-black">
                                  {p.tecnicPrice.toLocaleString('vi-VN')} đ
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button 
                                type="button"
                                onClick={() => onSelectProduct && onSelectProduct(p)}
                                className="text-[10px] bg-[#0071ba] text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 hover:bg-blue-800"
                              >
                                <Eye className="w-2.5 h-2.5" />
                                Xem
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className={`text-[9px] block mt-1.5 ${
                      msg.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#0071ba] text-white flex items-center justify-center shrink-0 shadow-xs">
                  T
                </div>
                <div className="bg-white border p-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-slate-400 ml-1">Đang tra cứu dữ liệu y khoa...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK SUGGESTION CHIPS */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item)}
                className="text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap border font-medium transition shrink-0 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-[#0071ba] border-blue-200"
              >
                {item}
              </button>
            ))}
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Hỏi tư vấn về giường bệnh, xe lăn, phục hồi tai biến, nẹp khớp..."
              className="flex-1 bg-slate-100 text-slate-800 text-xs px-3.5 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-[#0071ba]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 bg-[#0071ba] hover:bg-blue-800 text-white rounded-full transition disabled:opacity-40 shadow-xs flex items-center justify-center shrink-0"
              title="Gửi câu hỏi"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#143472] to-[#0071ba] hover:from-blue-900 hover:to-blue-700 text-white pl-2 pr-4 py-2 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white"
        title="Tư Vấn Thiết Bị Y Tế TECNIC"
      >
        <div className="w-10 h-10 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-md relative">
          <Stethoscope className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-ping"></span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="text-left">
          <p className="text-xs font-black leading-tight uppercase tracking-wider text-amber-300 flex items-center gap-1">
            TƯ VẤN THIẾT BỊ
          </p>
          <p className="text-[10px] text-blue-100 font-medium">Chuyên viên tư vấn 24/7</p>
        </div>
      </button>

    </aside>
  );
};
