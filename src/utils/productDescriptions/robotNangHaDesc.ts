import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getRobotNangHaDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'Oromi / Hueloi / Osada';
  const warranty = product.specifications?.warrantyMonths || 12;
  const warrantyText = getWarrantyText(warranty);

  // 1. Găng tay Robot phục hồi chức năng bàn tay (TEC-100077, TEC-100078)
  if (name.includes('GĂNG') || code === 'TEC-100077' || code === 'TEC-100078') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là thiết bị tập phục hồi chức năng bàn tay và các ngón tay thông minh ứng dụng công nghệ khí nén sinh học (Bionic Pneumatic), giải pháp phục hồi vận động bàn tay sau tai biến.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh liệt nửa người sau tai biến mạch máu não (đột quỵ):** Bàn tay bị co cứng nắm chặt, các ngón tay co quắp không tự duỗi ra được.
- **Bệnh nhân sau phẫu thuật nối gân cơ bàn tay, gãy xương cẳng tay:** Các khớp ngón tay bị xơ dính, hạn chế tầm vận động gập duỗi.
- **Bệnh nhân chấn thương sọ não, tổn thương tủy sống:** Cần kích thích tái lập bản đồ dẫn truyền thần kinh vận động của vỏ não.
- **Người cao tuổi bị cứng khớp bàn tay, run tay do Parkinson:** Giúp xoa bóp làm mềm khớp và duy trì sự khéo léo của các ngón tay.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn theo phác đồ phục hồi:**
- **Bước 1: Đeo găng robot vào bàn tay bị liệt:**
  - Xỏ từng ngón tay yếu vào các ngón của găng robot sao cho đầu ngón tay lọt khít vào bao ngón.
  - Kéo dải băng dán quấn chặt quanh cổ tay để cố định găng không bị xô lệch.
  - Cắm đầu giắc ống dẫn khí của găng vào cổng xuất khí trên thân máy chính.
- **Bước 2: Đeo găng cảm biến (Khi tập chế độ gương):** Đeo găng tay cảm biến nhẹ vào bàn tay lành bên đối diện.
- **Bước 3: Khởi động và cài đặt chế độ tập:**
  - Bật công tắc nguồn máy chính.
  - Trên màn hình cảm ứng LCD, bấm chọn chế độ tập mong muốn:
    - **Chế độ Tự động (Auto):** Cài đặt thời gian co (ví dụ 3 giây), thời gian duỗi (3 giây), chỉnh cấp độ lực từ mức nhẹ (mức 2 – 3) rồi tăng dần lên mức 6 – 8 khi khớp ngón tay đã mềm hơn.
    - **Chế độ Tập gương (Mirror):** Bàn tay lành chủ động nắm mở, găng robot bên tay liệt sẽ thu nhận tín hiệu không dây và lập tức cử động co duỗi theo nhịp nhàng.
- **Bước 4: Tập phân lập từng ngón:** Xoay van khí cơ học trên mu các ngón tay: Vặn vuông góc để khóa khí các ngón không tập, chỉ tập trung bơm xả co duỗi riêng ngón tay bị cứng đơ (ngón cái, ngón trỏ...).
- **Bước 5: Thời lượng tập luyện chuẩn:** Mỗi ngày tập từ 2 đến 3 lần, mỗi lần từ 15 đến 20 phút. Sau mỗi đợt tập, xoa bóp nhẹ lòng bàn tay và các khớp ngón tay.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không kéo giật gập gãy các ống dẫn khí cao su trên găng tay robot.
- Với bàn tay co cứng nặng, nên ngâm tay vào nước ấm khoảng 5 – 10 phút hoặc xoa bóp nhẹ nhàng trước khi đeo găng để đạt hiệu quả co duỗi tốt nhất.
- Tăng dần cấp độ lực theo cảm giác chịu đựng của người bệnh, không ép gập duỗi quá mạnh gây đau rát khớp.
- Bảo quản máy nơi khô ráo, tránh ánh nắng trực tiếp hoặc nơi ẩm ướt.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** tích hợp hệ thống bơm hút khí nén sinh học mô phỏng chuyển động sinh lý của bàn tay người, kết hợp cảm biến phản xạ gương thông minh kích thích vỏ não tái thiết lập xung dẫn truyền vận động.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Công nghệ | Khí nén sinh học Bionic Pneumatic + Cảm biến phản xạ gương (Mirror Therapy) |
| Màn hình điều khiển | Màn hình cảm ứng LCD đa sắc trực quan một chạm |
| Cấp độ áp lực khí | 9 mức điều chỉnh lực co duỗi linh hoạt |
| Thời gian mỗi liệu trình | Tự động ngắt hẹn giờ từ 10 đến 30 phút |
| Bộ sản phẩm hoàn chỉnh | Thân máy chính, găng robot tay liệt, găng cảm biến tay lành, bóng gai tập tay, adapter sạc |
| Chọn size găng | Size M (tay nữ), Size L (tay nam vừa), Size XL (tay nam lớn) |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Công nghệ phản xạ gương Mirror Therapy:** Kích hoạt tế bào thần kinh vận động phục hồi nhanh gấp nhiều lần so với tập thụ động.
- **Tập phân lập từng ngón tay thông minh:** Van khóa khí độc lập giúp tập trung cải thiện từng ngón tay co cứng nhất.
- **Ống khí silicon mềm mại:** Lực kéo duỗi êm ái, bảo vệ tuyệt đối các bao khớp ngón tay mỏng manh.
- **Giao diện cảm ứng dễ dùng:** Người bệnh và người nhà có thể tự thao tác luyện tập tại nhà mỗi ngày mà không cần đến bệnh viện.`;
  }

  // 2. Ghế nâng chuyển bệnh nhân (TEC-100079, 80, 81, 82)
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là thiết bị nâng hạ và di chuyển người bệnh đa năng 4 trong 1: **Xe nâng chuyển người bệnh + Ghế bô vệ sinh + Ghế đẩy tắm chống nước + Ghế ngồi sinh hoạt bàn ăn**.

Sản phẩm là giải pháp hoàn hảo cho:
- **Người bệnh liệt hoàn toàn, liệt nửa người, gãy xương:** Không có khả năng tự nhấc người dậy.
- **Người chăm sóc bệnh nhân tại nhà:** Loại bỏ hoàn toàn việc phải bế ẵm, khiêng vác nặng nhọc, ngăn ngừa thoái hóa và thoát vị đĩa đệm cột sống lưng cho người chăm sóc.
- **Bệnh nhân cần di chuyển thường xuyên:** Chuyển đổi tư thế êm ái từ giường sang xe lăn, ghế sofa, bàn ăn, buồng tắm hoặc bồn cầu vệ sinh.
- **Bệnh viện, viện dưỡng lão, trung tâm phục hồi:** Thiết bị hỗ trợ di chuyển chuyên nghiệp bảo vệ bệnh nhân chống rơi ngã tuyệt đối.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn thao tác an toàn:**
- **Bước 1: Chuẩn bị:** Cho người bệnh ngồi trên mép giường, hai chân buông thõng xuống sàn.
- **Bước 2: Đưa ghế vào đón người bệnh:**
  - Mở chốt khóa an toàn phía sau lưng ghế, tách mở bung hai cánh ghế sang hai bên 180°.
  - Đẩy ghế áp sát từ phía trước người bệnh sao cho hai cánh đệm luồn trọn vẹn dưới mông bệnh nhân.
  - Đạp khóa phanh hai bánh xe sau để cố định ghế vững vàng.
- **Bước 3: Khóa an toàn:** Khép hai cánh ghế lại sát nhau phía sau lưng người bệnh. Cài chặt chốt khóa ngàm cơ học và thắt thêm đai khóa bảo hiểm an toàn phía sau.
- **Bước 4: Nâng bổng người bệnh:** Dùng chân đạp nhẹ cần bơm thủy lực (hoặc bấm nút điều khiển motor điện) để nâng mặt ghế đưa người bệnh nhấc bổng rời khỏi mặt giường khoảng 5cm. Nhả khóa phanh và đẩy nhẹ nhàng di chuyển.
- **Bước 5: Đưa đi vệ sinh hoặc tắm:** Đẩy ghế lùi trùm trực tiếp lên bồn cầu bệt gia đình (hoặc dùng bô nhựa gắn kèm dưới gầm). Khi tắm, đẩy thẳng ghế vào buồng tắm hoa sen, xịt nước tắm rửa thoải mái nhờ khung và đệm chống nước hoàn toàn.
- **Bước 6: Trả người bệnh về giường/ghế:** Đẩy ghế vào mép giường, đạp khóa phanh, nhấn van xả hạ ghế xuống sát mặt giường, tháo chốt khóa và tách mở hai cánh ghế để rút ghế ra ngoài.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Bắt buộc cài chốt khóa an toàn kép phía sau lưng** và thắt đai an toàn trước khi nâng bổng người bệnh rời khỏi giường.
- Luôn đạp khóa phanh bánh xe trước khi bắt đầu thao tác mở cánh ghế đón hoặc trả người bệnh.
- Chiều rộng cửa buồng tắm hoặc phòng ngủ cần tối thiểu 60cm để xe di chuyển qua dễ dàng.
- Lau khô xe sau khi tắm cho người bệnh để kéo dài tối đa tuổi thọ cơ khí.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** sở hữu thiết kế đột phá với hai cánh tựa lưng tách mở 180° ôm trọn người bệnh từ mép giường, kết hợp cơ cấu nâng hạ thủy lực/điện mạnh mẽ chịu tải trọng lên tới 150kg.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Cơ chế mở ghế | Hai cánh tựa lưng tách mở đôi 180° đón bệnh nhân từ mép giường |
| Cơ cấu nâng hạ | Bơm thủy lực đạp chân trợ lực hoặc Motor điện điều khiển remote |
| Chiều cao nâng hạ mặt ghế | 40 cm – 65 cm (khớp vừa mọi độ cao giường và bồn cầu) |
| Chiều rộng lòng ghế | 48 cm – 52 cm (ngồi rộng rãi, thoải mái) |
| Chiều rộng phủ bì khung | 58 cm (lọt vừa mọi khuôn cửa phòng tắm gia đình) |
| Tải trọng tối đa | 130 kg – 150 kg |
| Chất liệu | Khung thép hợp kim carbon sơn tĩnh điện chống nước + Đệm xốp PU nguyên khối |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Cơ chế tách mở 180° độc quyền:** Một người chăm sóc duy nhất dễ dàng chuyển bệnh nhân nặng mà không tốn một giọt mồ hôi.
- **Đa năng 4 trong 1 hoàn hảo:** Vừa là xe nâng di chuyển, vừa là ghế bô vệ sinh, ghế tắm chống nước và ghế ngồi ăn.
- **An toàn tuyệt đối:** Hệ thống khóa chốt ngàm kép phía sau lưng cùng đai bảo hiểm chống tuột ngã.
- **Chống nước toàn diện:** Thoải mái đưa người bệnh vào phòng tắm gội xịt nước vệ sinh hằng ngày.`;
}
