import { Product } from '../../types';
import { getGayNangDescription } from './gayNangDesc';
import { getKhungTapDiDescription } from './khungTapDiDesc';
import { getXeLanDescription } from './xeLanDesc';
import { getGheBoTamDescription } from './gheBoTamDesc';
import { getDaiNepKhopDescription } from './daiNepKhopDesc';
import { getTayVinDescription } from './tayVinDesc';
import { getSanPhamHoTroDescription } from './sanPhamHoTroDesc';
import { getDemHoiDescription } from './demHoiDesc';
import { getRobotNangHaDescription } from './robotNangHaDesc';
import { getTriLieuXungDienDescription } from './triLieuXungDienDesc';
import { getGiuongYTeDescription } from './giuongYTeDesc';

import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function generateProductDetailMarkdown(product: Product): string {
  const cat = (product.category || '').toUpperCase();
  const nameUpper = (product.name || '').toUpperCase();
  const code = (product.code || '').toUpperCase();

  // 1. Check by Category enum or keywords
  if (cat.includes('GAY_NANG') || cat.includes('GAY-NANG') || nameUpper.includes('GẬY') || nameUpper.includes('NẠNG')) {
    return getGayNangDescription(product);
  }

  if (cat.includes('KHUNG_TAP_DI') || cat.includes('KHUNG-TAP-DI') || nameUpper.includes('KHUNG TẬP ĐI') || nameUpper.includes('KHUNG W-47') || nameUpper.includes('VK157')) {
    return getKhungTapDiDescription(product);
  }

  if (cat.includes('XE_LAN') || cat.includes('XE-LAN') || nameUpper.includes('XE LĂN')) {
    return getXeLanDescription(product);
  }

  if (cat.includes('GHE_BO_TAM') || cat.includes('GHE-BO-TAM') || nameUpper.includes('GHẾ BÔ') || nameUpper.includes('G-96')) {
    return getGheBoTamDescription(product);
  }

  if (cat.includes('DAI_NEP_KHOP') || cat.includes('DAI-NEP-KHOP') || nameUpper.includes('ĐAI') || nameUpper.includes('NẸP CỔ TAY')) {
    return getDaiNepKhopDescription(product);
  }

  if (cat.includes('TAY_VIN') || cat.includes('TAY-VIN') || nameUpper.includes('TAY VỊN')) {
    return getTayVinDescription(product);
  }

  if (cat.includes('SAN_PHAM_HO_TRO') || cat.includes('SAN-PHAM-HO-TRO') || nameUpper.includes('BÓNG GAI') || nameUpper.includes('BỒN CẦU DI ĐỘNG') || nameUpper.includes('BÔ TIỂU') || nameUpper.includes('CHẬU GỘI ĐẦU')) {
    return getSanPhamHoTroDescription(product);
  }

  if (cat.includes('DEM_HOI') || cat.includes('DEM-HOI') || nameUpper.includes('ĐỆM') || nameUpper.includes('THÔNG TIỂU')) {
    return getDemHoiDescription(product);
  }

  if (cat.includes('ROBOT') || nameUpper.includes('ROBOT') || nameUpper.includes('GĂNG TẬP TAY') || nameUpper.includes('GHẾ NÂNG CHUYỂN')) {
    return getRobotNangHaDescription(product);
  }

  if (cat.includes('TRI_LIEU') || cat.includes('XUNG_DIEN') || nameUpper.includes('XUNG ĐIỆN') || nameUpper.includes('MASSAGE') || nameUpper.includes('ĐẠP CHÂN') || nameUpper.includes('HỒNG NGOẠI')) {
    return getTriLieuXungDienDescription(product);
  }

  if (cat.includes('GIUONG') || nameUpper.includes('GIƯỜNG')) {
    return getGiuongYTeDescription(product);
  }

  // Fallback if not matched: check by code
  if (code.startsWith('TEC-10001') && parseInt(code.replace('TEC-', '')) <= 10007) {
    return getGayNangDescription(product);
  }
  if (code.startsWith('TEC-10008') || code.startsWith('TEC-10009') || code.startsWith('TEC-100010') || code.startsWith('TEC-100011') || code.startsWith('TEC-100012') || code.startsWith('TEC-100013') || code.startsWith('TEC-100014') || code.startsWith('TEC-100015')) {
    return getKhungTapDiDescription(product);
  }
  if (code.includes('100016') || code.includes('100017') || code.includes('100018') || code.includes('100019') || code.includes('100020') || code.includes('100021') || code.includes('100022') || code.includes('100023') || code.includes('100024') || code.includes('100025')) {
    return getXeLanDescription(product);
  }

  // Generic fallback if completely novel item
  const warranty = product.specifications?.warrantyMonths || 12;
  const warrantyText = getWarrantyText(warranty);

  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${product.name}** là sản phẩm chính hãng thuộc hệ thống thiết bị y tế và hỗ trợ phục hồi chức năng của TECNIC MEDTECH.

Sản phẩm phù hợp với:
- Người cao tuổi, người bệnh đang trong quá trình điều trị và phục hồi chức năng vận động.
- Gia đình và cơ sở chăm sóc sức khỏe có nhu cầu trang bị thiết bị y tế chuyên dụng bền đẹp, tiện lợi.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Kiểm tra bao bì và các phụ kiện đi kèm trước khi sử dụng.
- **Bước 2:** Lắp ráp hoặc tùy chỉnh các nấc kích cỡ sao cho vừa vặn với vóc dáng người dùng.
- **Bước 3:** Thao tác theo đúng hướng dẫn kỹ thuật đi kèm sản phẩm.
- **Bước 4:** Vệ sinh sạch sẽ bằng khăn mềm và bảo quản nơi khô ráo, thoáng mát sau khi dùng.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Kiểm tra độ an toàn của các khớp nối, khóa gài trước mỗi lần sử dụng.
- Không sử dụng quá tải trọng khuyến cáo của nhà sản xuất.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${product.name}** được gia công chế tạo từ vật liệu y tế tiêu chuẩn cao cấp, thân thiện với người sử dụng và có độ bền cơ học vượt trội.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${product.name} |
| Xuất xứ | ${product.specifications?.origin || 'Chính hãng'} |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Thiết kế công thái học:** Tối ưu hóa trải nghiệm người dùng, thao tác dễ dàng và tiện lợi.
- **Vật liệu an toàn, bền bỉ:** Kháng khuẩn, chịu lực tốt và đáp ứng các tiêu chuẩn chất lượng nghiêm ngặt.`;
}
