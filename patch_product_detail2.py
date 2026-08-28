import re

filepath = 'src/components/ProductDetailPage.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. FIX THE RIGHT COLUMN DETAILS (Buttons, Stars, Share)
pattern1 = re.compile(r'\{/\* RIGHT: DETAILS, PRICING & ACTION BUTTONS \(7 Cols\) \*/\}.*?\{/\* 3\. TABS CONTENT \(Mô tả chi tiết & Thông số kỹ thuật - Bỏ tab bảo hành theo yêu cầu\) \*/\}', re.DOTALL)

replacement1 = """{/* RIGHT: DETAILS, PRICING & ACTION BUTTONS (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#333333] leading-tight">
              {product.name}
            </h1>

            {/* Rating & Views */}
            <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
              <span>{product.reviewCount || 0} Đánh giá</span>
              <span>Lượt xem: {product.soldCount * 3 + 17}</span>
            </div>

            {/* Price Box */}
            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-2xl sm:text-[28px] font-bold text-[#e31837]">
                {product.tecnicPrice.toLocaleString('vi-VN')}₫
              </span>
              {product.marketPrice > product.tecnicPrice && (
                <span className="text-sm sm:text-base text-slate-400 line-through mb-1">
                  Giá niêm yết: {product.marketPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>

            {/* Product Info List (Công dụng, Xuất xứ, Mô tả ngắn) */}
            <div className="space-y-4 text-[15px] text-[#333333] pt-2">
              {product.specifications.application && (
                <p>
                  <strong>Công dụng:</strong> {product.specifications.application}
                </p>
              )}
              
              <p>
                <strong>Xuất xứ thương hiệu:</strong> Thương hiệu <strong>{product.specifications.brand}</strong> – {product.specifications.origin}. Sản phẩm được thiết kế và sản xuất 100% tại {product.specifications.origin}.
              </p>

              <div className="space-y-2">
                <p className="font-bold">Mô tả ngắn về sản phẩm:</p>
                {product.specifications.features && product.specifications.features.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1.5 text-[#333333]">
                    {product.specifications.features.map((feat, idx) => (
                      <li key={idx} className="leading-relaxed">{feat}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-[#333333] leading-relaxed markdown-body text-[15px]">
                    <Markdown>{product.shortDescription}</Markdown>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION SECTION */}
            <div className="space-y-4 pt-4">
              
              {/* Row 1: Số lượng & Thêm vào giỏ hàng */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#333333] text-[15px]">Số lượng:</span>
                  <div className="flex items-center border border-[#e5e5e5] rounded overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="px-3 py-1.5 text-slate-700 hover:bg-slate-100 transition disabled:opacity-40 border-r border-[#e5e5e5]"
                    >
                      -
                    </button>
                    <span className="w-12 text-center py-1.5 font-bold text-[#333333]">{quantity}</span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      disabled={quantity >= product.stock || isOutOfStock}
                      className="px-3 py-1.5 text-slate-700 hover:bg-slate-100 transition disabled:opacity-40 border-l border-[#e5e5e5]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={isOutOfStock}
                  className="flex-1 min-w-[200px] py-2.5 px-4 rounded bg-[#e31837] text-white font-bold text-sm hover:bg-red-700 transition uppercase shadow-sm"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

              {/* Row 2: ĐẶT HÀNG */}
              <button
                type="button"
                onClick={() => onBuyNow(product, quantity)}
                disabled={isOutOfStock}
                className="w-full py-2.5 px-6 rounded bg-[#032f6a] hover:bg-[#021f4a] text-white transition shadow flex flex-col items-center justify-center active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                <span className="text-lg font-bold uppercase tracking-wide">Đặt hàng</span>
                <span className="text-xs font-normal text-blue-100 mt-0.5">
                  Gọi điện xác nhận và giao hàng tận nơi
                </span>
              </button>
              
              {/* Row 3: HOTLINE */}
              <a
                href="tel:0389880369"
                className="w-full py-3 px-6 rounded bg-[#e31837] hover:bg-red-700 text-white transition shadow flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
              >
                <Phone className="w-6 h-6" />
                <span className="text-xl font-bold uppercase tracking-wide">Hotline: 038 988 0369</span>
              </a>

            </div>

          </div>

        </div>

        {/* 3. BOTTOM SECTION (Mô tả sản phẩm & Sản phẩm liên quan) */}"""

if not pattern1.search(content):
    print("Could not find pattern 1")
else:
    content = pattern1.sub(replacement1, content)


# 2. RESTRUCTURE BOTTOM SECTION
pattern2 = re.compile(r'\{/\* 3\. BOTTOM SECTION \(Mô tả sản phẩm & Sản phẩm liên quan\) \*/\}.*?(?=</div\>\s*</div\>\s*\)\;\s*\})', re.DOTALL)

replacement2 = """{/* 3. BOTTOM SECTION (Mô tả sản phẩm & Sản phẩm liên quan) */}
        
        {/* Social Share Bar */}
        <div className="flex items-center justify-end gap-2 text-sm text-[#333333] pt-6 pb-2 border-b border-slate-200">
          <span>Chia sẻ mạng xã hội:</span>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 bg-[#1877f2] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="Facebook">
              <span className="font-bold text-xs">f</span>
            </button>
            <button className="w-7 h-7 bg-[#1da1f2] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="Twitter">
              <span className="font-bold text-xs">t</span>
            </button>
            <button className="w-7 h-7 bg-[#bd081c] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="Pinterest">
              <span className="font-bold text-xs">p</span>
            </button>
            <button className="w-7 h-7 bg-[#25d366] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="WhatsApp">
              <span className="font-bold text-xs">w</span>
            </button>
            <button onClick={handleCopyLink} className="w-7 h-7 bg-[#0071ba] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="Copy Link">
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Left: Product Description */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl font-bold uppercase text-[#333333] pb-2 inline-block border-b-2 border-red-600">
              Mô tả sản phẩm
            </h2>
            <div className="text-[15px] text-[#333333] leading-[1.8] markdown-body">
              <Markdown>{product.fullDescription || product.shortDescription}</Markdown>
            </div>
            
            {product.specifications.targetUsers && (
              <div className="pt-4">
                <h3 className="font-bold text-[#0071ba] text-lg mb-2">1. Đối tượng sử dụng phù hợp</h3>
                <p className="text-[15px] text-[#333333] leading-[1.8]">
                  <strong>{product.name}</strong> là sản phẩm hỗ trợ vùng cổ tay và bàn tay với thiết kế đàn hồi, dễ đeo và tháo, giúp tăng sự ổn định cho cổ tay mà vẫn duy trì khả năng vận động linh hoạt.
                  <br/><br/>
                  Sản phẩm phù hợp với:<br/>
                  {product.specifications.targetUsers}
                </p>
              </div>
            )}
          </div>

          {/* Right: Related Products */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-base font-bold uppercase text-white bg-[#032f6a] py-2.5 px-4 rounded-t-md">
              Sản phẩm liên quan
            </h2>
            <div className="space-y-4 border border-[#e5e5e5] p-3 rounded-b-md -mt-4 bg-white">
              {relatedProducts.map(rp => (
                <div 
                  key={rp.id} 
                  className="flex gap-3 items-center group cursor-pointer hover:bg-slate-50 p-2 rounded transition"
                  onClick={() => onSelectProduct(rp)}
                >
                  <div className="w-20 h-20 bg-white border border-slate-200 rounded shrink-0 p-1 flex items-center justify-center">
                    <img src={rp.image} alt={rp.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-[13px] font-medium text-[#333333] group-hover:text-[#0071ba] transition line-clamp-2 leading-snug">
                      {rp.name}
                    </h3>
                    <div className="text-red-600 font-bold text-sm mt-1">
                      {rp.tecnicPrice.toLocaleString('vi-VN')} ₫
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>"""

if not pattern2.search(content):
    print("Could not find pattern 2")
else:
    content = pattern2.sub(replacement2, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ProductDetailPage.tsx")
