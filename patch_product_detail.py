import re

filepath = 'src/components/ProductDetailPage.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure we have Star icon imported
if 'Star' not in content:
    content = content.replace("Eye}", "Eye, Star}")
    content = content.replace("Star,", "Star,") # Just in case

# Replace the RIGHT COLUMN (lg:col-span-7) entirely
# Let's find the start of right column
pattern = re.compile(r'\{/\* RIGHT: DETAILS, PRICING & ACTION BUTTONS \(7 Cols\) \*/\}.*?(?=\{/\* 3\. TABS CONTENT)', re.DOTALL)

replacement = """{/* RIGHT: DETAILS, PRICING & ACTION BUTTONS (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            
            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 leading-tight">
              {product.name}
            </h1>

            {/* Rating, Reviews, Views */}
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="underline cursor-pointer hover:text-[#0071ba]">{product.reviewCount || 0} Đánh giá</span>
              <span className="text-slate-300">|</span>
              <span>Lượt xem: {product.soldCount * 3 + 17}</span>
            </div>

            {/* Price Box */}
            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold text-red-600">
                {product.tecnicPrice.toLocaleString('vi-VN')}₫
              </span>
              {product.marketPrice > product.tecnicPrice && (
                <span className="text-sm sm:text-base text-slate-400 line-through mb-1">
                  Giá niêm yết: {product.marketPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>

            {/* Product Info List (Công dụng, Xuất xứ, Mô tả ngắn) */}
            <div className="space-y-3.5 text-sm text-slate-700 pt-1">
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
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    {product.specifications.features.map((feat, idx) => (
                      <li key={idx} className="leading-relaxed">{feat}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-slate-600 leading-relaxed markdown-body">
                    <Markdown>{product.shortDescription}</Markdown>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION SECTION */}
            <div className="space-y-4 pt-6 mt-4 border-t border-slate-200">
              
              {/* Số lượng */}
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-700 text-sm">Số lượng:</span>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="px-3 py-1.5 text-slate-700 hover:bg-slate-100 font-bold transition disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 font-bold text-sm text-slate-900 border-x border-slate-200">{quantity}</span>
                  <button
                    type="button"
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="px-3 py-1.5 text-slate-700 hover:bg-slate-100 font-bold transition disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* HÀNG 1: THÊM VÀO GIỎ HÀNG */}
              <button
                type="button"
                onClick={() => onAddToCart(product, quantity)}
                disabled={isOutOfStock}
                className="w-full sm:w-64 py-2.5 px-4 rounded-xl font-bold text-sm border-2 border-[#0071ba] text-[#0071ba] hover:bg-blue-50 transition flex items-center justify-center gap-2 shadow-2xs active:scale-[0.99] disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Thêm vào giỏ hàng</span>
              </button>

              {/* HÀNG 2: ĐẶT HÀNG */}
              <button
                type="button"
                onClick={() => onBuyNow(product, quantity)}
                disabled={isOutOfStock}
                className="w-full py-3 px-6 rounded-xl font-black bg-red-600 hover:bg-red-700 text-white transition shadow-lg shadow-red-500/25 flex flex-col items-center justify-center active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                <span className="text-base sm:text-lg tracking-wide uppercase">Đặt hàng</span>
                <span className="text-[11px] sm:text-xs font-normal text-red-100 mt-0.5">
                  Gọi điện xác nhận và giao hàng tận nơi
                </span>
              </button>
              
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
                     <Phone className="w-5 h-5" />
                   </div>
                   <div>
                     <div className="font-black text-red-600 text-lg">038 988 0369</div>
                     <div className="text-xs text-slate-500">Hotline: 038 988 0369</div>
                   </div>
                 </div>
                 
                 <div className="text-right">
                   <div className="text-xs text-slate-500 mb-1">Chia sẻ mạng xã hội:</div>
                   <div className="flex gap-2 justify-end">
                      <button onClick={handleCopyLink} className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition" title="Sao chép Link">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <a href={`https://zalo.me/0389880369`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition" title="Chia sẻ Zalo">
                        <MessageCircle className="w-4 h-4" />
                      </a>
                   </div>
                 </div>
              </div>

            </div>

          </div>

        </div>
"""

new_content = pattern.sub(replacement, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Patch applied to ProductDetailPage.tsx!")
