import re

filepath = 'src/components/ProductDetailPage.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's remove from {/* 3. to the end of the return statement
pattern = re.compile(r'\{\/\* 3\..*?(?=</div\>\s*\)\;)', re.DOTALL)

replacement = """{/* Social Share Bar */}
        <div className="flex items-center justify-end gap-2 text-[13px] text-[#333333] pt-5 pb-3 border-b border-slate-200 mt-2">
          <span>Chia sẻ mạng xã hội:</span>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 bg-[#1877f2] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="Facebook">
              <span className="font-bold text-sm">f</span>
            </button>
            <button className="w-7 h-7 bg-[#1da1f2] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="Twitter">
              <span className="font-bold text-sm">t</span>
            </button>
            <button className="w-7 h-7 bg-[#bd081c] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="Pinterest">
              <span className="font-bold text-sm">p</span>
            </button>
            <button className="w-7 h-7 bg-[#25d366] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </button>
            <button onClick={handleCopyLink} className="w-7 h-7 bg-[#0071ba] text-white rounded flex items-center justify-center hover:opacity-80 transition" title="Copy Link">
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2-Column Layout (Mô tả & Sản phẩm liên quan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Left: Product Description */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-[22px] font-bold uppercase text-[#333333] pb-2 inline-block border-b-2 border-[#e31837] mb-2">
              Mô tả sản phẩm
            </h2>
            <div className="text-[15px] text-[#333333] leading-[1.8] markdown-body">
              <Markdown>{product.fullDescription || product.shortDescription}</Markdown>
            </div>
            
            {product.specifications.targetUsers && (
              <div className="pt-2">
                <h3 className="font-bold text-[#0071ba] text-lg mb-2">Đối tượng sử dụng phù hợp</h3>
                <p className="text-[15px] text-[#333333] leading-[1.8]">
                  {product.specifications.targetUsers}
                </p>
              </div>
            )}
          </div>

          {/* Right: Related Products */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-base font-bold uppercase text-white bg-[#032f6a] py-3 px-4 rounded-t-md m-0">
              SẢN PHẨM LIÊN QUAN
            </h2>
            <div className="space-y-0 border border-[#e5e5e5] rounded-b-md -mt-4 bg-white overflow-hidden divide-y divide-[#e5e5e5]">
              {relatedProducts.map(rp => (
                <div 
                  key={rp.id} 
                  className="flex gap-4 items-center group cursor-pointer hover:bg-slate-50 p-4 transition"
                  onClick={() => onSelectProduct(rp)}
                >
                  <div className="w-20 h-20 bg-white shrink-0 flex items-center justify-center">
                    <img src={rp.image} alt={rp.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-[14px] text-[#333333] group-hover:text-[#0071ba] transition line-clamp-3 leading-snug">
                      {rp.name}
                    </h3>
                    <div className="text-[#e31837] font-bold text-sm mt-1.5">
                      {rp.tecnicPrice.toLocaleString('vi-VN')} ₫
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>"""

new_content = pattern.sub(replacement, content)
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Updated ProductDetailPage.tsx fully")
