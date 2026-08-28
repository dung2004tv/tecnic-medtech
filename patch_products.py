import os
import re

filepath = 'src/data/productsData.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_product = """
  {
    id: 9999,
    code: 'TEC-WRIST',
    name: 'Đai Cổ Tay Wrist Bandage – Nẹp Cổ Tay Hỗ Trợ Cố Định Và Bảo Vệ Cổ Tay',
    category: 'DAI_NEP_KHOP',
    categoryName: 'Giải pháp hệ xương khớp / Đai định hình cột sống & Bảo vệ xương khớp',
    marketPrice: 288000,
    tecnicPrice: 190000,
    discountPercent: 34,
    stock: 50,
    soldCount: 17,
    rating: 5.0,
    reviewCount: 0,
    isFeatured: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=800',
    shortDescription: `**Đai Cổ Tay Wrist Bandage** là sản phẩm hỗ trợ vùng cổ tay và bàn tay với thiết kế đàn hồi, dễ đeo và tháo, giúp tăng sự ổn định cho cổ tay mà vẫn duy trì khả năng vận động linh hoạt.`,
    fullDescription: `### Mô tả sản phẩm

**Đai Cổ Tay Wrist Bandage** là sản phẩm hỗ trợ vùng cổ tay và bàn tay, được thiết kế nhằm mang lại sự ổn định chắc chắn nhưng vẫn đảm bảo khả năng vận động linh hoạt. Sản phẩm được thiết kế và sản xuất 100% tại Nhật Bản, chú trọng đến sự tiện dụng và cảm giác thoải mái trong quá trình sử dụng.

Wrist Bandage có thiết kế dễ dàng đeo vào và tháo ra, giúp người dùng nhanh chóng sử dụng trước khi luyện tập, vận động hoặc thi đấu mà không mất nhiều thời gian. Đai giúp giữ cố định tốt vùng cổ tay và bàn tay, hỗ trợ hạn chế các chuyển động không mong muốn của cổ tay trong quá trình vận động. Nhờ đó, sản phẩm có thể hỗ trợ phòng tránh trật cổ tay trong các hoạt động phù hợp.

Một ưu điểm nổi bật của Wrist Bandage là chất liệu có độ đàn hồi tốt, giúp đai ôm sát cổ tay nhưng vẫn cho phép bàn tay và cổ tay cử động linh hoạt. Điều này đặc biệt thuận tiện với người cần sử dụng đai trong quá trình luyện tập hoặc thi đấu.

Với thiết kế gọn gàng, đàn hồi và dễ sử dụng, Wrist Bandage phù hợp để hỗ trợ cổ tay trong các hoạt động thể thao cũng như vận động hằng ngày.

### Thông số sản phẩm:
- **Tên sản phẩm:** Wrist Bandage – Đai Cổ Tay
- **Màu sắc:** Đen
- **Xuất xứ:** Thiết kế và sản xuất 100% tại Nhật Bản
- **Chất liệu:** Có độ đàn hồi tốt
- **Vùng hỗ trợ:** Cổ tay và bàn tay
- **Đặc điểm:** Dễ đeo, dễ tháo, co giãn tốt
- **Mục đích sử dụng:** Hỗ trợ cố định và bảo vệ cổ tay khi vận động`,
    specifications: {
      brand: 'Bonbone',
      origin: 'Nhật Bản',
      warrantyMonths: 12,
      application: 'Dùng để hỗ trợ cố định và ổn định vùng cổ tay, giúp bảo vệ cổ tay khi vận động, đồng thời hỗ trợ duy trì sự linh hoạt và thoải mái trong quá trình luyện tập hoặc thi đấu.',
      features: [
        'Thiết kế dễ dàng đeo vào và tháo ra, mang lại khả năng hỗ trợ chắc chắn cho vùng cổ tay.',
        'Giúp cố định tốt cổ tay và bàn tay, hỗ trợ ổn định khớp trong quá trình vận động.',
        'Hỗ trợ phòng tránh tình trạng trật cổ tay khi vận động, đồng thời không gây cản trở đáng kể đến các chuyển động cần thiết trong luyện tập và thi đấu.',
        'Sử dụng chất liệu có độ đàn hồi tốt, giúp cổ tay dễ dàng cử động và mang lại cảm giác thoải mái khi sử dụng.',
        'Thiết kế ôm sát, gọn nhẹ, thuận tiện sử dụng trong các hoạt động thể thao và sinh hoạt hằng ngày.',
        'Thiết kế và sản xuất 100% tại Nhật Bản, đảm bảo độ hoàn thiện và chất lượng sản phẩm.'
      ],
      targetUsers: 'Người thường xuyên vận động, luyện tập thể thao hoặc thi đấu. Người muốn giữ cố định cổ tay và bàn tay trong quá trình vận động. Người cần hỗ trợ hạn chế nguy cơ trật cổ tay.'
    }
  },"""

# Insert at the beginning of the products array
content = content.replace("export const mockProducts: Product[] = [", "export const mockProducts: Product[] = [" + new_product)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added new product!")
