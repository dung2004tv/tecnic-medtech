import { Product } from '../types';

const getCompanyContactSection = (productName: string): string => `### 6. Thông tin liên hệ
Để được tư vấn chi tiết về **${productName}**, cách sử dụng và lựa chọn sản phẩm phù hợp nhất, vui lòng liên hệ:

**CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC (TECNIC Medtech)**
- 🏢 **Địa chỉ:** Tầng 2, Tòa nhà New Skyline, KĐT mới Văn Quán - Yên Phúc, Phường Hà Đông, TP. Hà Nội, Việt Nam.
- 📋 **Mã số thuế:** 0110887948
- 📞 **Điện thoại / Hotline:** 034 84 02466/ 038 988 0369
- 📧 **Email:** tecnic.medtech@gmail.com
- 🌐 **Website:** tecnic.vn

*TECNIC Medtech – Kiến tạo để phụng sự*`;

/**
 * Generates accurate, highly realistic, clinical and practical medical descriptions
 * tailored specifically for each medical equipment product and its category.
 */
export function getRealProductDescription(product: Product): string {
  const name = product.name;
  const brand = product.specifications?.brand || 'TECNIC Medtech';
  const origin = product.specifications?.origin || 'Chính hãng';
  const model = product.specifications?.model || '';
  const mat = product.specifications?.material || 'Vật liệu y tế chuyên dụng, an toàn sinh học';
  const dim = product.specifications?.dimensions || 'Kích thước tiêu chuẩn y tế';
  const wei = product.specifications?.weight || 'Khả năng chịu tải tiêu chuẩn';
  const color = product.specifications?.color || 'Tiêu chuẩn y tế';
  const warranty = product.specifications?.warrantyMonths ? `${product.specifications.warrantyMonths} tháng` : '12 tháng';
  const category = product.category || '';
  const nameLower = name.toLowerCase();

  // 1. GẬY & NẠNG TẬP ĐI
  if (category === 'GAY_NANG' || nameLower.includes('gậy') || nameLower.includes('nạng')) {
    const is3Chan = nameLower.includes('3 chân');
    const is4Chan = nameLower.includes('4 chân');
    const isNangNach = nameLower.includes('nạng nhôm') || nameLower.includes('nạng nách');
    const isNangKhuyu = nameLower.includes('nạng khuỷu') || nameLower.includes('nạng c');

    return `### 1. Đối tượng sử dụng phù hợp
**${name}** là thiết bị trợ giúp di chuyển chuyên dụng được thiết kế nhằm trợ lực, giữ thăng bằng và phục hồi chức năng vận động an toàn cho:
- **Người cao tuổi, người suy giảm thể lực:** Chân yếu, run chân, dễ mất thăng bằng khi đi lại trong nhà và ngoài trời.
- **Người trong giai đoạn phục hồi chức năng:** Sau chấn thương khớp háng, khớp gối, cổ chân hoặc sau phẫu thuật xương khớp cần điểm tựa tỳ nén tải trọng an toàn.
- **Bệnh nhân di chứng tai biến mạch máu não (đột quỵ):** Liệt nửa người nhẹ cần tái huấn luyện dáng đi và kích hoạt nhóm cơ vận động.
${isNangNach ? '- **Người bị gãy xương chi dưới bó bột/nẹp:** Cần trợ lực toàn diện để không tỳ chân đau xuống mặt đất.' : ''}
${isNangKhuyu ? '- **Người cần hỗ trợ vận động lâu dài:** Thiết kế nạng khuỷu giúp lực phân bổ đều lên cẳng tay, giảm mỏi cổ tay và vai.' : ''}

---

### 2. Hướng dẫn sử dụng & Căn chỉnh chuẩn y khoa
- **Bước 1 - Căn chỉnh chiều cao chuẩn:** Cho người sử dụng đứng thẳng, thả lỏng hai vai. Điều chỉnh nấc bấm sao cho tay cầm của ${name} nằm ngang mức **mấu chuyển lớn xương đùi** (khớp háng) hoặc ngang nếp gấp cổ tay khi buông thõng. Góc gập khuỷu tay lý tưởng khi nắm tay cầm là từ **20° - 30°**.
- **Bước 2 - Tư thế cầm nắm:** Nắm chắc tay cầm, đầu ngón tay không bị trơn trượt. Đặt ${is3Chan || is4Chan ? 'toàn bộ các chân tiếp đất đồng thời, không đặt nghiêng đế' : 'chân gậy cách mũi bàn chân cùng bên khoảng 15-20cm về phía trước và chếch ngoài 15cm'}.
- **Bước 3 - Nguyên tắc bước đi an toàn:**
  + *Khi tập đi:* Bước chân đau (yếu) cùng lúc với gậy/nạng lên phía trước -> Dồn lực tỳ lên gậy -> Bước chân lành lên ngang hoặc vượt qua chân đau.
  + *Khi lên cầu thang:* Chân lành bước lên trước -> Chân đau và gậy bước lên cùng lúc sau.
  + *Khi xuống cầu thang:* Gậy đưa xuống bậc dưới trước -> Chân đau bước xuống -> Chân lành bước xuống sau.

---

### 3. Lưu ý an toàn khi sử dụng
- Thường xuyên kiểm tra **đế cao su chống trượt**: Khi thấy đế bị mòn hoặc nứt vỡ, cần thay thế ngay để đảm bảo độ ma sát bám sàn.
- Đảm bảo **chốt bấm định vị** đã khớp hoàn toàn vào lỗ khóa trước khi dồn trọng lượng cơ thể lên gậy/nạng.
- Tránh di chuyển trên sàn nhà trơn ướt nhiều xà phòng hoặc bề mặt gồ ghề trơn trượt nếu không có người hỗ trợ đi kèm.
- Vệ sinh bề mặt bằng khăn mềm ẩm, không dùng hóa chất tẩy rửa mạnh làm ăn mòn lớp mạ kim loại.

---

### 4. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Chất liệu cấu tạo:** ${mat} (chống oxy hóa, chịu lực tốt)
- **Kích thước / Chiều cao:** ${dim} (tích hợp nhiều nấc tăng giảm chiều cao linh hoạt)
- **Tải trọng chịu lực tối đa:** ${wei}
- **Màu sắc:** ${color}
- **Thời gian bảo hành:** ${warranty}

---

### 5. Tính năng & Ưu điểm vượt trội
- **Trọng lượng siêu nhẹ:** Giúp người cao tuổi dễ dàng nhấc và di chuyển liên tục mà không gây mỏi cơ vai và cánh tay.
- **Đế cao su cao cấp đàn hồi cao:** Thiết kế rãnh ma sát sâu chống trơn trượt hiệu quả trên sàn gạch men, sàn gỗ và đường nhựa.
- **Tay nắm công thái học (Ergonomic):** Ôm vừa vặn lòng bàn tay, hạn chế chai sần và giảm áp lực lên các dây thần kinh cổ tay.
- **Cơ chế chốt khóa chắc chắn:** Tăng giảm chiều cao nhanh chóng, khóa chặt an toàn không bị rung lắc khi tỳ đè nặng.

---

${getCompanyContactSection(name)}`;
  }

  // 2. KHUNG TẬP ĐI
  if (category === 'KHUNG_TAP_DI' || nameLower.includes('khung tập đi') || nameLower.includes('khung w')) {
    const hasWheels = nameLower.includes('bánh xe') || nameLower.includes('gbm') || nameLower.includes('vk');
    const hasSeat = nameLower.includes('ghế') || nameLower.includes('037') || nameLower.includes('033');

    return `### 1. Đối tượng sử dụng phù hợp
**${name}** là giải pháp hỗ trợ tập phục hồi dáng đi và tự chủ sinh hoạt hàng đầu dành cho:
- **Bệnh nhân sau phẫu thuật xương khớp:** Thay khớp háng, thay khớp gối, phẫu thuật kết hợp xương chi dưới cần vùng nâng đỡ thăng bằng rộng 3 chiều.
- **Người bệnh sau tai biến mạch máu não (Stroke):** Liệt nửa người hoặc yếu cơ hai chi dưới, mất cảm giác thăng bằng trong giai đoạn đầu tập đứng và bước đi.
- **Người cao tuổi, người bị hội chứng Parkinson:** Run rẩy, giảm phản xạ thăng bằng, giúp phòng tránh nguy cơ ngã gây gãy xương đùi nguy hiểm.
${hasSeat ? '- **Người cần nghỉ chân thường xuyên:** Tích hợp ghế ngồi nghỉ ngơi tiện lợi khi di chuyển quãng đường dài ngoài công viên hoặc hành lang bệnh viện.' : ''}

---

### 2. Hướng dẫn sử dụng & Quy trình tập luyện
- **Bước 1 - Điều chỉnh khung vừa vặn:** Cho người bệnh đứng bên trong khung, tay bám vào tay cầm. Điều chỉnh các chân khung sao cho khuỷu tay gập góc **20° - 30°**.
- **Bước 2 - Thao tác di chuyển:**
  ${hasWheels ? '+ Đẩy nhẹ khung về phía trước khoảng 20-30cm (hoặc lăn bánh xe với tốc độ vừa phải).' : '+ Nhấc nhẹ khung về phía trước một khoảng 20-25cm, đảm bảo 4 chân tiếp đất vững chắc.'}
  + Bước chân yếu (chân đau) lên trước, dồn đều trọng lượng cơ thể lên 2 tay cầm của khung.
  + Bước tiếp chân khỏe lên ngang bằng hoặc vượt nhẹ chân yếu.
- **Bước 3 - Khi ngồi xuống / đứng dậy:** Luôn giữ khung ổn định trước mặt. Dùng 2 tay chống vào thành ghế/giường để đẩy người đứng dậy vững vàng trước khi nắm vào tay vịn khung.

---

### 3. Lưu ý an toàn khi sử dụng
- Luôn quan sát mặt sàn di chuyển, tránh các chướng ngại vật, dây điện hoặc bậc thềm cao.
${hasWheels ? '- Kiểm tra hệ thống khóa phanh bánh xe trước khi người bệnh ngồi xuống nghỉ hoặc đứng tỳ cố định.' : '- Không nhấc khung quá xa khỏi cơ thể để tránh làm nghiêng trọng tâm gây ngã.'}
- Khi không sử dụng, có thể bấm nút chốt gập gọn khung để cất trữ hoặc mang theo ô tô.

---

### 4. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Chất liệu cấu tạo:** ${mat} (ống hợp kim nhôm/thép cường lực siêu bền)
- **Kích thước sử dụng:** ${dim}
- **Tải trọng an toàn:** ${wei}
- **Màu sắc:** ${color}
- **Thời gian bảo hành:** ${warranty}

---

### 5. Tính năng & Ưu điểm vượt trội
- **Khung kết cấu hình chữ U vững chắc:** Tạo không gian bước đi rộng rãi, bao bọc 3 mặt quanh người bệnh đảm bảo an toàn tuyệt đối.
- **Cơ chế gấp gọn thông minh 1 chạm:** Dễ dàng bấm nút gấp xếp gọn gàng chỉ trong 3 giây, tiết kiệm diện tích tối đa.
${hasWheels ? '- **Bánh xe dẫn hướng xoay êm ái:** Bánh trước xoay linh hoạt, bánh sau bám đường giúp di chuyển nhẹ nhàng không tốn sức.' : '- **Đế cao su giác hút chân không:** 4 chân cao su dẻo bám dính chắc chắn trên mọi bề mặt gạch, chống trơn tuyệt hảo.'}
- **Đệm tỳ tay êm ái:** Tay nắm bọc cao su xốp EVA chống trơn, thấm hút mồ hôi và giảm áp lực cổ tay khi chống tỳ liên tục.

---

${getCompanyContactSection(name)}`;
  }

  // 3. GIƯỜNG Y TẾ & GIƯỜNG PHỤC HỒI CHỨC NĂNG
  if (category === 'GIUONG_Y_TE' || nameLower.includes('giường')) {
    const isElectric = nameLower.includes('điện') || nameLower.includes('tự động') || nameLower.includes('sd-33e') || nameLower.includes('sd-41gk');
    const isTraction = nameLower.includes('kéo giãn') || nameLower.includes('cột sống');

    if (isTraction) {
      return `### 1. Đối tượng & Chỉ định trị liệu
**${name}** là thiết bị vật lý trị liệu cơ xương khớp chuyên sâu, đạt tiêu chuẩn kỹ thuật Bộ Y Tế:
- **Bệnh nhân thoái hóa cột sống cổ, cột sống thắt lưng:** Giảm áp lực nội đĩa đệm, giải phóng chèn ép rễ thần kinh.
- **Bệnh nhân thoát vị đĩa đệm giai đoạn bán cấp và mạn tính:** Kéo giãn tạo điều kiện cho khối thoát vị trở về vị trí sinh lý.
- **Người đau dây thần kinh tọa, đau mỏi vai gáy co cứng cơ:** Kéo giãn ngắt quãng giải tỏa co thắt cơ sâu và phục hồi lưu thông khí huyết.
- **Phòng khám PHCN, Trung tâm Vật lý trị liệu và gia đình:** Thiết bị điều trị chuẩn mực với lực kéo cài đặt điện tử chính xác tuyệt đối.

---

### 2. Quy trình vận hành & Trị liệu an toàn
- **Bước 1 - Chuẩn bị:** Cho người bệnh nằm ngửa thư giãn trên mặt giường, đặt gối đỡ vùng khoeo chân để thư giãn cơ thắt lưng chậu.
- **Bước 2 - Cố định đai lực:** Đeo đai ngực và đai khung chậu ôm sát cơ thể, siết chặt các khóa cài đảm bảo không bị trượt đai khi kéo.
- **Bước 3 - Cài đặt thông số:** Cài đặt lực kéo (theo chỉ định của bác sĩ: thường từ 1/3 đến 1/2 trọng lượng cơ thể đối với cột sống lưng, 1/10 đến 1/7 đối với cột sống cổ), thời gian kéo và chế độ kéo liên tục hoặc ngắt quãng.
- **Bước 4 - Kết thúc buổi tập:** Nằm nghỉ thả lỏng tại giường từ 5-10 phút trước khi tháo đai và ngồi dậy nhẹ nhàng.

---

### 3. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Chất liệu cấu tạo:** ${mat}
- **Kích thước tiêu chuẩn:** ${dim}
- **Tải trọng tối đa:** ${wei}
- **Hệ thống điều khiển:** Động cơ điện lực kéo chính xác cao, vi xử lý thông minh ngắt khẩn cấp an toàn
- **Thời gian bảo hành:** ${warranty}

---

### 4. Lưu ý an toàn khi sử dụng
- Tuân thủ đúng phác đồ điều trị và lực kéo chỉ định của bác sĩ chuyên khoa PHCN.
- Không sử dụng cho bệnh nhân loãng xương nặng, gãy xương cột sống chưa liền hoặc phụ nữ có thai.
- Luôn kiểm tra khóa an toàn và để nút ngắt khẩn cấp trong tầm với của người bệnh.

---

### 5. Tính năng nổi bật
- **Lực kéo chính xác từng kg:** Màn hình kỹ thuật số hiển thị rõ ràng thông số lực kéo, thời gian giữ lực và thời gian nghỉ.
- **Nút bấm ngắt khẩn cấp:** Người bệnh tự chủ ngắt máy tức thì nếu cảm thấy đau tức bất thường.
- **Đệm bọc da PU y tế kháng khuẩn:** Êm ái, chống thấm mồ hôi và dễ dàng khử khuẩn sau mỗi lượt bệnh nhân.

---

${getCompanyContactSection(name)}`;
    }

    return `### 1. Đối tượng sử dụng phù hợp
**${name}** là trang thiết bị y tế chăm sóc toàn diện tại bệnh viện và gia đình dành cho:
- **Người bệnh sau đột quỵ tai biến, người liệt vận động:** Nằm bất động dài ngày cần hỗ trợ lăn trở mình và thay đổi tư thế thường xuyên.
- **Người cao tuổi sức khỏe suy kiệt:** Khó tự ngồi dậy, gặp khó khăn khi ăn uống, uống thuốc và vệ sinh cá nhân.
- **Bệnh nhân sau phẫu thuật chấn thương chỉnh hình:** Cần nâng cao chân giảm phù nề và nâng lưng tựa nghiêng thoải mái.
- **Người nhà và nhân viên điều dưỡng:** Giảm thiểu 80% gánh nặng tỳ đè, bế ẵm nặng nhọc khi chăm sóc bệnh nhân tại nhà.

---

### 2. Các chức năng chăm sóc thông minh
- **Nâng/Hạ tựa lưng (0° - 85°):** Hỗ trợ bệnh nhân ngồi ăn cơm, xem TV, đọc sách và ngăn ngừa hiện tượng trào ngược thức ăn, hít sặc vào phổi.
- **Nâng/Hạ chân (0° - 45°):** Giúp lưu thông tĩnh mạch chi dưới, phòng ngừa phù nề chân và giãn tĩnh mạch do ứ trệ tuần hoàn máu.
- **Nghiêng trái/Nghiêng phải (0° - 55°):** Lăn trở cơ thể nhẹ nhàng mỗi 2 tiếng/lần, chống loét tỳ đè vùng xương cùng cụt và lưng hông.
- **Tiện ích tích hợp đi kèm:** Chậu gội đầu tận giường có ống thoát nước, bô vệ sinh chuyên dụng gạt cần mở nắp tự động, bàn ăn di động và cây truyền dịch điều chỉnh độ cao.

---

### 3. Hướng dẫn vận hành & An toàn
${isElectric ? '- Dùng Remote điều khiển cầm tay bấm giữ nút chức năng tương ứng để chuyển đổi tư thế êm ái.' : '- Xoay tay quay phía cuối giường nhẹ nhàng theo chiều kim đồng hồ để nâng và ngược chiều để hạ. Gập gọn tay quay vào trong sau khi thao tác.'}
- Luôn khóa chốt bánh xe cố định khi giường ở vị trí tĩnh để tránh trôi trượt.
- Kéo lan can bảo vệ hai bên hông lên cao và chốt chặt để bảo vệ bệnh nhân không bị ngã khi ngủ hoặc khi người nhà vắng mặt.

---

### 4. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Khung giường:** ${mat} (thép cán nguội phủ sơn tĩnh điện nano y tế kháng khuẩn)
- **Kích thước lòng giường:** ${dim}
- **Tải trọng chịu lực an toàn:** ${wei}
- **Đệm y tế:** Đệm xơ dừa tự nhiên ép mút kháng khuẩn, thông thoáng không bí bách lưng
- **Thời gian bảo hành:** ${warranty}

---

### 5. Tính năng & Ưu điểm vượt trội
- **Khung thép hộp dày dặn:** Chịu tải cao vững chắc, không rung lắc, tuổi thọ lên tới hàng chục năm.
- **Hệ thống bánh xe chịu lực có phanh hãm:** Di chuyển nhẹ nhàng trong phòng bệnh và khóa chặt vị trí tuyệt đối an toàn.
- **Nan giường thoáng khí:** Thiết kế dập lỗ thông hơi giúp đệm luôn khô ráo, thoáng mát.

---

${getCompanyContactSection(name)}`;
  }

  // 4. XE LĂN
  if (category === 'XE_LAN' || nameLower.includes('xe lăn')) {
    const isElectric = nameLower.includes('điện');
    const isReclining = nameLower.includes('ngả') || nameLower.includes('bô');

    return `### 1. Đối tượng sử dụng phù hợp
**${name}** là phương tiện hỗ trợ di chuyển cao cấp, an toàn và thuận tiện dành cho:
- **Người khuyết tật chi dưới, người yếu nửa người do tai biến:** Cần phương tiện di chuyển tự chủ hoặc có người đẩy hỗ trợ.
- **Người cao tuổi:** Khó khăn khi đi bộ đường dài, đi khám bệnh tại bệnh viện hoặc đi dạo ngoài trời cùng con cháu.
- **Bệnh nhân sau phẫu thuật, gãy chân bó bột:** Cần phương tiện chuyển viện, ra vào phòng khám hoặc phục hồi chức năng.
${isReclining ? '- **Bệnh nhân cần nằm nghỉ ngơi tại chỗ:** Thiết kế tựa lưng ngả nằm và gác chân nâng hạ giúp người bệnh có thể nằm thư giãn thoải mái suốt cả ngày.' : ''}

---

### 2. Hướng dẫn sử dụng & Gấp mở xe
- **Mở xe:** Đặt 2 tay lên 2 bên mép đệm ngồi và ấn dứt khoát xuống dưới cho đến khi khung xe mở căng hết cỡ.
- **Gấp xe:** Dùng 2 tay nắm vào chính giữa mép trước và mép sau của đệm ngồi rồi nhấc bổng thẳng lên trên, xe sẽ tự động gập gọn lại.
- **Lên/Xuống xe lăn an toàn:**
  + Luôn khóa cả 2 cần phanh bánh xe hai bên trước khi người bệnh ngồi vào hoặc đứng dậy.
  + Gập bàn để chân lên để tránh người bệnh dẫm chân lên bàn để chân làm lật xe về phía trước.

---

### 3. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Chất liệu khung xe:** ${mat} (hợp kim nhôm/thép carbon siêu bền, sơn tĩnh điện)
- **Kích thước mở/gấp:** ${dim}
- **Tải trọng tối đa:** ${wei}
- **Hệ thống bánh xe:** Bánh trước xoay 360° linh hoạt, bánh sau lớn đặc chống thủng êm ái
- **Hệ thống phanh:** Phanh hãm bánh xe cho người ngồi + Phanh tay trợ lực cho người đẩy
- **Thời gian bảo hành:** ${warranty}

---

### 4. Lưu ý an toàn khi sử dụng
- Khi lên dốc hoặc xuống dốc cao, cần có người hỗ trợ đẩy phía sau để đảm bảo cân bằng.
- Luôn thắt đai an toàn qua bụng khi di chuyển trên địa hình gồ ghề.
- Không để xe lăn ngoài trời mưa nắng kéo dài làm giảm tuổi thọ lốp và đệm ngồi.

---

### 5. Tính năng & Tiện ích nổi bật
- **Đệm ngồi êm ái, thoáng khí tổ ong (Honeycomb):** Chống bí nóng, thấm hút mồ hôi tốt và dễ dàng tháo rời giặt sạch.
- **Vành lăn tay trợ lực:** Nhẹ nhàng, vừa vặn tầm tay giúp người ngồi tự lăn xe mà không bị trượt tay.
- **Đai an toàn bảo vệ bụng:** Giữ người bệnh ngồi vững vàng khi lên dốc hoặc đi qua đoạn đường xóc.

---

${getCompanyContactSection(name)}`;
  }

  // 5. THIẾT BỊ XUNG ĐIỆN & MÁY TRỊ LIỆU
  if (category === 'TRI_LIEU_XUNG_DIEN' || nameLower.includes('xung điện') || nameLower.includes('omron') || nameLower.includes('máy tập chân') || nameLower.includes('đèn hồng ngoại') || nameLower.includes('súng massage')) {
    const isHongNgoai = nameLower.includes('hồng ngoại');
    const isMayDapChan = nameLower.includes('đạp chân') || nameLower.includes('máy tập chân');

    if (isHongNgoai) {
      return `### 1. Đối tượng & Chỉ định nhiệt trị liệu
**${name}** là thiết bị nhiệt trị liệu chuyên dụng ứng dụng tia hồng ngoại bước sóng sâu:
- **Người đau nhức xương khớp mạn tính:** Đau lưng, đau mỏi cổ vai gáy, viêm quanh khớp vai, thoái hóa khớp gối.
- **Người co thắt cơ, căng cứng cơ:** Sau khi làm việc văn phòng kéo dài hoặc vận động thể thao quá mức.
- **Người cần tăng cường tuần hoàn máu cục bộ:** Kích thích trao đổi chất, giảm sưng viêm và làm mềm mô cơ trước khi xoa bóp, tập vận động.

---

### 2. Hướng dẫn sử dụng an toàn
- **Khoảng cách chiếu:** Đặt đèn cách vùng da điều trị từ **40 - 50cm**. Luôn điều chỉnh góc chiếu vuông góc với mặt da.
- **Thời gian chiếu:** Mỗi lần chiếu từ **15 - 30 phút**, ngày chiếu 1 - 2 lần.
- **Cảm nhận nhiệt độ:** Người bệnh cảm thấy ấm nóng dễ chịu, không được để quá nóng gây bỏng rát da.

---

### 3. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Chất liệu:** ${mat}
- **Công suất / Điện áp:** ${dim}
- **Thời gian bảo hành:** ${warranty}

---

### 4. Lưu ý an toàn khi sử dụng
- Không chiếu trực tiếp vào mắt (cần nhắm mắt hoặc đeo kính bảo vệ nếu chiếu vùng mặt).
- Không chạm tay vào bóng đèn khi đang bật hoặc vừa tắt vì nhiệt độ bóng rất cao.
- Tránh xa tầm tay trẻ em và các vật liệu dễ bắt cháy.

---

### 5. Ưu điểm vượt trội
- **Tia hồng ngoại phổ rộng chuẩn y tế:** Thâm nhập sâu qua các lớp biểu bì, giãn mạch và nuôi dưỡng mô cơ hiệu quả.
- **Cổ đèn uốn linh hoạt:** Dễ dàng điều chỉnh hướng chiếu đến mọi vùng cơ thể (lưng, gối, vai, gáy).

---

${getCompanyContactSection(name)}`;
    }

    if (isMayDapChan) {
      return `### 1. Đối tượng tập luyện phù hợp
**${name}** là thiết bị tập vận động chủ động và thụ động phục hồi chức năng:
- **Bệnh nhân sau tai biến:** Tập thụ động bằng động cơ điện giúp chống teo cơ, chống cứng khớp tay và chân.
- **Người cao tuổi chân tay yếu, hạn chế đi lại:** Duy trì độ dẻo dai khớp gối, khớp háng và kích thích lưu thông tuần hoàn máu tại nhà.
- **Người phục hồi sau phẫu thuật xương:** Tập luyện chủ động tăng dần kháng lực để hồi phục sức mạnh nhóm cơ đùi, bắp chân và cẳng tay.

---

### 2. Hướng dẫn tập luyện hiệu quả
- Đặt máy trên bề mặt phẳng, ngồi trên ghế có tựa lưng thoải mái và đặt hai chân vào bàn đạp, cài chặt đai cố định bàn chân.
- Bật máy chọn tốc độ quay phù hợp (từ thấp đến cao), thời gian tập từ **15 - 20 phút mỗi buổi**, ngày tập 2 lần.

---

### 3. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Chất liệu:** ${mat}
- **Kích thước / Trọng lượng:** ${dim} - ${wei}
- **Thời gian bảo hành:** ${warranty}

---

### 4. Lưu ý khi tập luyện
- Luôn khởi động nhẹ nhàng trước khi tập với mức tốc độ hoặc kháng lực thấp nhất.
- Ngồi ở tư thế chuẩn, giữ thẳng lưng để không làm lệch trục cột sống khi đạp xe.

---

### 5. Tính năng nổi bật
- **Chế độ quay đảo chiều 2 hướng:** Tập luyện toàn diện các nhóm cơ gấp và cơ duỗi chi dưới.
- **Màn hình LED đa năng:** Hiển thị thời gian, số vòng quay, quãng đường và lượng calo tiêu thụ.

---

${getCompanyContactSection(name)}`;
    }

    return `### 1. Cơ chế tác động & Đối tượng điều trị
**${name}** ứng dụng công nghệ kích thích xung điện thần kinh qua da (TENS) và kích thích cơ (EMS) chuẩn y tế:
- **Cơ chế giảm đau tự nhiên:** Kích thích dòng xung điện tần số thấp giúp ngăn chặn xung tín hiệu đau truyền lên não bộ, đồng thời thúc đẩy cơ thể tự sản sinh Endorphin (hormone giảm đau nội sinh tự nhiên).
- **Đối tượng chỉ định:**
  + Người đau lưng, đau vai gáy, đau khớp gối, đau thần kinh tọa, đau mỏi bắp chân do thoái hóa hoặc làm việc văn phòng.
  + Bệnh nhân phục hồi chức năng sau tai biến cần kích thích tái kích hoạt thần kinh vận động.
  + Người chơi thể thao cần thư giãn cơ sâu sau khi vận động cường độ cao.

---

### 2. Hướng dẫn sử dụng chi tiết
- **Bước 1 - Chuẩn bị da:** Vệ sinh sạch sẽ và lau khô vùng da cần dán điện cực (không bôi kem dưỡng ẩm, dầu nóng trước khi dán).
- **Bước 2 - Dán điện cực:** Dán 2 miếng đệm Long Life Pad ôm sát vào vùng đau (cách nhau khoảng 5-10cm, không dán đè lên nhau).
- **Bước 3 - Bật nguồn & Lựa chọn chế độ:** Chọn chương trình điều trị thích hợp (Đấm bóp, Xoa bóp, Day miết) và vị trí cơ thể (Vai, Lưng, Khớp, Cánh tay, Bắp chân, Lòng bàn chân).
- **Bước 4 - Tăng cường độ:** Tăng dần mức cường độ từ mức 1 cho đến khi cảm thấy cơ co bóp nhẹ nhàng, dễ chịu, không tăng quá mạnh gây đau rát.
- **Thời gian trị liệu:** Thiết bị tự động ngắt sau **15 phút/lần**. Ngày dùng 1-2 lần cho mỗi vùng đau.

---

### 3. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Công nghệ phát xung:** TENS & EMS tần số thấp an toàn sinh học
- **Nguồn điện:** Pin tiêu chuẩn tiện lợi mang theo khi đi làm, du lịch
- **Thời gian bảo hành:** ${warranty}

---

### 4. Chống chỉ định y khoa
- Không sử dụng cho người đang mang máy tạo nhịp tim hoặc thiết bị điện tử cấy ghép trong cơ thể.
- Không dán miếng điện cực lên vùng tim, cổ họng, mắt hoặc vết thương hở đang chảy máu.

---

### 5. Tính năng vượt trội
- **Nhỏ gọn bỏ túi:** Dễ dàng mang theo điều trị tại văn phòng, trên ô tô hoặc khi đi công tác.
- **Điện cực Long Life Pad bền bỉ:** Có thể rửa sạch bằng nước và tái sử dụng lên đến 150-300 lần.

---

${getCompanyContactSection(name)}`;
  }

  // 6. ĐAI NẸP KHỚP & CHỈNH HÌNH
  if (category === 'DAI_NEP_KHOP' || nameLower.includes('đai') || nameLower.includes('nẹp')) {
    return `### 1. Đối tượng & Chỉ định sử dụng
**${name}** là dụng cụ chỉnh hình và cố định khớp y tế chất lượng cao:
- **Người bị thoái hóa đốt sống, thoát vị đĩa đệm, đau lưng cấp/mạn tính:** Giữ cột sống ở trục sinh lý chuẩn, phân tán áp lực lên đĩa đệm.
- **Người sau chấn thương, bong gân, giãn dây chằng:** Giữ vững ổ khớp, hạn chế cử động sai tư thế gây tổn thương thứ phát.
- **Người vận động viên hoặc người làm việc nặng nhọc:** Bảo vệ khớp gối, cổ chân, cột sống thắt lưng trong quá trình bê vác và thi đấu thể thao.

---

### 2. Hướng dẫn đeo và điều chỉnh đúng cách
- Đặt sản phẩm cân đối vào vùng khớp/cột sống cần cố định.
- Kéo căng hai dải đai phụ trợ lực và dán chặt vào mặt gai dính Velcro phía trước.
- Đảm bảo độ ôm khít vừa vặn: Giữ vững chắc vùng khớp nhưng vẫn cho phép luồn ngón tay vào bên trong dễ dàng, không gây tê bì đầu ngón do cản trở lưu thông máu.

---

### 3. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Chất liệu:** ${mat} (vải dệt kim 3D co giãn thoáng khí, thanh nẹp hợp kim trợ lực)
- **Kích thước / Size:** ${dim}
- **Thời gian bảo hành:** ${warranty}

---

### 4. Lưu ý khi sử dụng
- Không nên đeo đai liên tục suốt 24 giờ mà nên tháo ra khi nằm ngủ để cơ bắp tự vận động tự nhiên.
- Giặt tay bằng nước ấm và xà phòng trung tính, phơi trong bóng râm, không dùng máy sấy nhiệt độ cao.

---

### 5. Ưu điểm nổi bật
- **Chất liệu dệt 3D siêu thoáng khí:** Thấm hút mồ hôi tối đa, không gây ngứa ngáy hay bí bách khi đeo cả ngày.
- **Thanh nẹp định hình giải phẫu học:** Uốn cong tự nhiên theo đường cong sinh lý cơ thể, nâng đỡ tối đa.

---

${getCompanyContactSection(name)}`;
  }

  // 7. ĐỆM HƠI CHỐNG LOÉT
  if (category === 'DEM_HOI_CHONG_LOET' || nameLower.includes('đệm hơi') || nameLower.includes('chống loét')) {
    return `### 1. Cơ chế phòng ngừa loét tì đè & Đối tượng sử dụng
**${name}** là giải pháp số 1 chống loét tì đè cho bệnh nhân nằm lâu:
- **Cơ chế luân chuyển múi hơi liên tục:** Máy bơm điện đảo áp lực theo chu kỳ **6-8 phút/lần**, khiến các điểm tỳ đè trên cơ thể (xương cùng cụt, gót chân, bả vai, chẩm gáy) liên tục được giải tỏa áp lực, tái lưu thông vi mạch máu dưới da.
- **Đối tượng chỉ định:** Bệnh nhân hôn mê, liệt nửa người do tai biến, gãy xương chậu/xương đùi phải nằm bất động tại chỗ dài ngày.

---

### 2. Hướng dẫn lắp đặt & Vận hành
- Trải đệm phẳng lên trên mặt nệm giường, hướng các ống dẫn khí về phía cuối chân giường.
- Nối 2 dây dẫn khí từ đệm vào máy bơm.
- Cắm điện và xoay núm điều chỉnh áp lực lên mức Max để đệm bơm căng trong 15-20 phút, sau đó điều chỉnh về mức độ mềm phù hợp với thể trọng người bệnh.
- Máy bơm được thiết kế vận hành liên tục 24/24 với độ ồn cực thấp (<20dB), không gây ảnh hưởng giấc ngủ của người bệnh.

---

### 3. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Chất liệu đệm:** ${mat} (PVC y tế cao cấp, không độc hại, không thấm nước)
- **Kích thước đệm:** ${dim}
- **Tải trọng tối đa:** ${wei}
- **Thời gian bảo hành:** ${warranty}

---

### 4. Lưu ý khi sử dụng
- Không để các vật sắc nhọn (kéo, dao, kim tiêm) chọc vào bề mặt đệm.
- Vệ sinh lau chùi bề mặt đệm bằng khăn ẩm và dung dịch cồn y tế nhẹ, không phơi trực tiếp dưới nắng gắt.

---

### 5. Ưu điểm vượt trội
- **Múi hơi tổ ong/múi quả trám đàn hồi cao:** Phân tán đều trọng lượng cơ thể, êm ái dễ chịu.
- **Máy bơm công nghệ Nhật Bản siêu êm:** Tiết kiệm điện năng và vận hành bền bỉ không nóng máy.

---

${getCompanyContactSection(name)}`;
  }

  // DEFAULT / CÁC SẢN PHẨM KHÁC (GHẾ BÔ, TAY VỊN, THIẾT BỊ HỖ TRỢ)
  return `### 1. Đối tượng sử dụng phù hợp
**${name}** là sản phẩm y tế chuyên dụng được nghiên cứu và thiết kế nhằm mang lại sự hỗ trợ tối ưu, an toàn và tiện lợi cho người sử dụng:
- **Người cao tuổi, người hạn chế khả năng tự chủ vận động:** Tránh té ngã trong sinh hoạt hằng ngày tại gia đình.
- **Người bệnh trong quá trình phục hồi chức năng:** Hỗ trợ phục hồi khả năng vận động sau chấn thương hoặc phẫu thuật.
- **Gia đình và cơ sở chăm sóc y tế:** Giúp người chăm sóc thực hiện các thao tác phụng dưỡng bệnh nhân thuận tiện, nhẹ nhàng và an toàn.

---

### 2. Hướng dẫn sử dụng & Bảo quản an toàn
- **Kiểm tra trước khi dùng:** Đảm bảo các khớp nối, bu-lông và chi tiết cố định đã được lắp ráp chắc chắn.
- **Vận hành đúng tư thế:** Thực hiện theo hướng dẫn từ chuyên viên kỹ thuật của TECNIC để đạt hiệu quả hỗ trợ tốt nhất.
- **Vệ sinh định kỳ:** Lau chùi bằng khăn mềm và dung dịch khử khuẩn y tế thông dụng, bảo quản nơi khô ráo thoáng mát.

---

### 3. Thông số kỹ thuật chi tiết
- **Tên sản phẩm:** ${name}
- **Thương hiệu:** ${brand}
- **Xuất xứ:** ${origin}
${model ? `- **Mã Model:** ${model}` : ''}
- **Chất liệu cấu tạo:** ${mat}
- **Kích thước tiêu chuẩn:** ${dim}
- **Tải trọng an toàn:** ${wei}
- **Màu sắc:** ${color}
- **Thời gian bảo hành:** ${warranty}

---

### 4. Lưu ý an toàn khi sử dụng
- Đặt sản phẩm trên nền nhà bằng phẳng, không trơn trượt.
- Khóa chặt phanh hãm hoặc chốt chặn an toàn trước khi sử dụng.

---

### 5. Tính năng & Ưu điểm vượt trội
- **Thiết kế chuẩn công thái học:** Tối ưu hóa theo thể trạng người Việt Nam, mang lại cảm giác thoải mái và an toàn tuyệt đối.
- **Vật liệu y tế cao cấp:** Chịu lực bền bir, chống gỉ sét và an toàn cho làn da nhạy cảm.
- **Tiện dụng & Dễ vệ sinh:** Dễ dàng tháo lắp, lau chùi và di chuyển trong không gian phòng ngủ hoặc phòng tắm.

---

${getCompanyContactSection(name)}`;
}
