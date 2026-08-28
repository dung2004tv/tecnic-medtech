import re

notice_html = """              <div className="flex justify-between items-baseline pt-2 border-t text-slate-900 font-black text-sm">
                <span>Tổng thanh toán (Đã VAT):</span>
                <span className="text-lg text-red-600 whitespace-nowrap">{finalTotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <p className="text-[10px] text-amber-700 italic mt-2 leading-snug">
                * Lưu ý: Đối với các sản phẩm nặng như giường hay sản phẩm nặng sẽ rơi vào hàng cồng kềnh và phát sinh phụ phí tùy từng mặt hàng.
              </p>
            </div>"""

with open('src/components/CartModal.tsx', 'r') as f:
    content = f.read()
    
content = re.sub(
    r'<div className="flex justify-between items-baseline pt-2 border-t text-slate-900 font-black text-sm">\s*<span>Tổng thanh toán \(Đã VAT\):</span>\s*<span className="text-lg text-red-600 whitespace-nowrap">\{finalTotal\.toLocaleString\(\'vi-VN\'\)\} đ</span>\s*</div>\s*</div>',
    notice_html,
    content
)

with open('src/components/CartModal.tsx', 'w') as f:
    f.write(content)


with open('src/components/CheckoutModal.tsx', 'r') as f:
    content = f.read()

checkout_notice_html = """              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t">
                <span>Tổng tiền cần thanh toán:</span>
                <span className="text-red-600 text-base whitespace-nowrap">{completedOrder.finalTotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <p className="text-[10px] text-amber-700 italic mt-2 leading-snug">
                * Lưu ý: Đối với các sản phẩm nặng như giường hay sản phẩm nặng sẽ rơi vào hàng cồng kềnh và phát sinh phụ phí tùy từng mặt hàng.
              </p>
            </div>"""

content = re.sub(
    r'<div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t">\s*<span>Tổng tiền cần thanh toán:</span>\s*<span className="text-red-600 text-base whitespace-nowrap">\{completedOrder\.finalTotal\.toLocaleString\(\'vi-VN\'\)\} đ</span>\s*</div>\s*</div>',
    checkout_notice_html,
    content
)

# And another place in checkout where shipping fee is displayed
summary_notice_html = """                <p className="text-[10px] text-amber-700 italic mt-3 leading-snug">
                  * Lưu ý: Đối với các sản phẩm nặng như giường hay sản phẩm nặng sẽ rơi vào hàng cồng kềnh và phát sinh phụ phí tùy từng mặt hàng.
                </p>
              </div>"""

content = re.sub(
    r'</ul>\s*</div>\s*</div>\s*</div>\s*</div>\s*(?:<!--)?.*?(?:-->)?\s*<div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50">',
    """</ul>
              </div>
              """ + summary_notice_html + """
            </div>
          </div>

          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50">""",
    content
)

with open('src/components/CheckoutModal.tsx', 'w') as f:
    f.write(content)
