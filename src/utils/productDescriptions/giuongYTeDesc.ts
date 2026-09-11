import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getGiuongYTeDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'Osada / GBM / Royalmed';
  const warranty = product.specifications?.warrantyMonths || 36;
  const warrantyText = getWarrantyText(warranty);

  // 1. Giường kéo giãn cột sống lưng & cổ bằng điện (SD-41GK, SD-31GK)
  if (name.includes('KÉO GIÃN') || code === 'TEC-1000102' || code === 'TEC-1000103') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là hệ thống giường vật lý trị liệu kéo giãn cột sống thắt lưng và đốt sống cổ điều khiển điện tử tự động, giải pháp điều trị bảo tồn không xâm lấn hiệu quả hàng đầu cho các bệnh lý cột sống.

Sản phẩm đặc biệt phù hợp với:
- **Người bị thoát vị đĩa đệm cột sống thắt lưng (L3-L4-L5-S1):** Rễ thần kinh tọa bị chèn ép gây đau buốt, tê bì dọc xuống cẳng chân và bàn chân.
- **Người bị thoát vị đĩa đệm đốt sống cổ, thoái hóa đốt sống cổ:** Đau mỏi cứng cổ vai gáy, lan xuống hai cánh tay và làm giảm cảm giác các ngón tay.
- **Người bị thoái hóa gai cột sống, hẹp lỗ liên hợp:** Cần giải tỏa áp lực tỳ đè lên đĩa đệm và mở rộng các khoang gian đốt sống.
- **Các phòng khám cơ xương khớp, bệnh viện phục hồi chức năng và gia đình:** Trang bị thiết bị kéo giãn chuyên sâu ngay tại nhà.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn quy trình y tế:**
- **Bước 1: Chuẩn bị bệnh nhân:** Cho người bệnh nằm ngửa thả lỏng trên giường, lưng áp sát mặt đệm phẳng.
- **Bước 2: Cố định đai thắt lưng (Kéo lưng):**
  - Quấn đai ngực quanh bờ sườn dưới của bệnh nhân và móc chặt dây đai vào khung đầu giường.
  - Quấn đai hông ôm sát quanh mào chậu và móc vào ngàm kéo của motor phía đuôi giường.
  - Rút căng các dây đai vừa khít cơ thể (không quá chật làm khó thở).
- **Bước 3: Cố định đai Glisson (Kéo cổ):** Đặt đầu bệnh nhân lên giá đỡ cổ, lồng đai nâng cằm và đai chẩm sau gáy, cân chỉnh góc kéo từ 15° đến 25° gập nhẹ cổ.
- **Bước 4: Cài đặt thông số:**
  - *Lực kéo lưng ban đầu:* Cài khoảng bằng 1/3 đến 1/2 trọng lượng cơ thể (ví dụ người 60kg cài lực kéo 20kg – 25kg trong các buổi đầu, sau tăng dần lên 30kg theo độ thích ứng).
  - *Lực kéo cổ ban đầu:* Cài khoảng 1/10 trọng lượng cơ thể (5kg – 8kg).
  - *Thời gian kéo:* Cài đặt từ 15 đến 20 phút mỗi buổi.
- **Bước 5: Bắt đầu kéo:** Bấm nút **START** và trao nút bấm dừng khẩn cấp (Emergency Switch) vào tay người bệnh. Máy từ từ tăng lực kéo êm ái theo mức đã lập trình.
- **Bước 6: Kết thúc buổi tập:** Máy phát chuông báo kết thúc và tự động xả lực kéo. Tháo đai và **yêu cầu bệnh nhân nằm yên thả lỏng trên giường từ 5 đến 10 phút trước khi ngồi dậy từ từ**, đeo đai lưng bảo vệ khi đứng lên đi lại.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Chống chỉ định tuyệt đối:** Loãng xương nặng, gãy xương cột sống chưa liền, lao cột sống, u cột sống, phụ nữ mang thai hoặc bệnh nhân sau phẫu thuật cột sống có nẹp ốc vít dưới 6 tháng.
- Luôn cầm nút ngắt khẩn cấp trong tay suốt quá trình kéo để chủ động dừng lại nếu thấy đau buốt bất thường.
- Tuyệt đối không đứng phắt dậy ngay sau khi vừa kết thúc kéo giãn.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** tích hợp motor điện tuyến tính vi xử lý chuẩn xác từng chữ số kilogam, kết hợp mặt giường tách đôi trượt bi triệt tiêu 100% lực ma sát bề mặt, truyền trọn vẹn lực kéo vào các khe đốt sống.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | Osada |
| Cơ chế giảm áp | Lực kéo giãn dọc trục làm mở rộng khe liên đốt từ 1mm đến 2.5mm |
| Lực kéo thắt lưng | 0 kg – 99 kg (cài đặt điện tử kỹ thuật số) |
| Lực kéo đốt sống cổ | 0 kg – 30 kg |
| Chế độ kéo | Kéo ngắt quãng (Intermittent) / Kéo liên tục (Continuous) |
| Mặt giường trượt | Ray trượt bi êm ái triệt tiêu ma sát |
| Tính năng an toàn | Nút bấm dừng khẩn cấp Emergency Stop trao tay bệnh nhân |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Tạo áp suất âm hút nhân nhầy thoát vị:** Giúp đĩa đệm co rút dần về vị trí tự nhiên, giải phóng chèn ép rễ thần kinh.
- **Mặt trượt bi không ma sát:** Toàn bộ lực kéo tập trung 100% vào vị trí tổn thương mà không bị tiêu hao lực tỳ đè.
- **Độ chính xác và an toàn tuyệt đối:** Vi xử lý kiểm soát lực kéo ổn định, nút dừng khẩn cấp an tâm cho người bệnh.`;
  }

  // 2. Giường y tế 4 tay quay đa chức năng (GBM-092A, Osada SD-58C, SD-57C)
  if (name.includes('4 TAY QUAY') || code === 'TEC-100094' || code === 'TEC-1000100' || code === 'TEC-100097') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng giường y tế đa chức năng cao cấp 4 tay quay trợ lực, giải pháp chăm sóc toàn diện chuẩn bệnh viện tại nhà: **Nâng lưng ăn uống + Nâng hạ chân thư giãn + Lật nghiêng người trái/phải chống loét + Bô vệ sinh tại giường + Chậu gội đầu tận giường + Bàn ăn di động**.

Sản phẩm là lựa chọn số một cho:
- **Người bệnh liệt nửa người do tai biến, đột quỵ:** Mất khả năng tự trở mình và đi lại.
- **Người cao tuổi nằm liệt giường dài ngày:** Cần thay đổi tư thế liên tục để phòng ngừa loét tỳ đè vùng lưng và mông.
- **Người sau chấn thương sọ não, phẫu thuật cột sống:** Cần phục hồi chức năng vận động ngay tại giường.
- **Gia đình chăm sóc bệnh nhân tại nhà:** Giúp một người chăm sóc duy nhất có thể xoay trở, tắm gội và cho người bệnh đi vệ sinh dễ dàng mà không tốn sức khiêng vác.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn từng chức năng:**
- **Bước 1: Nâng lưng ngồi ăn:** Cầm tay quay số 1 ở đuôi giường, xoay theo chiều kim đồng hồ để nâng tựa lưng từ 0° đến 85° (thường nâng góc 75° – 80° khi ăn uống để chống sặc). Gác bàn ăn nhựa bắt ngang hai thành giường để bày cơm nước.
- **Bước 2: Nâng hạ chân:** Xoay tay quay số 2 để nâng chân lên 0° – 45° chống ứ phù tĩnh mạch; hoặc hạ thấp cẳng chân xuống 0° – 90° kết hợp nâng lưng để tạo tư thế ngồi buông chân thoải mái như trên ghế sofa.
- **Bước 3: Lật nghiêng người lau lưng chống loét:** Xoay tay quay số 3 cùng chiều kim đồng hồ để nâng mạn giường bên phải (nghiêng người sang trái) hoặc ngược chiều để nâng mạn giường bên trái (nghiêng sang phải) góc 0° – 55°. Dễ dàng lau rửa lưng, thay ga và vỗ rung long đờm cho người bệnh.
- **Bước 4: Sử dụng bô vệ sinh:** Xoay tay quay số 4, tấm đệm mông sẽ tự động hạ xuống và khay bô sẽ đưa bô nâng sát mông người bệnh đi vệ sinh sạch sẽ. Xong việc, quay ngược lại để hạ bô xuống mang đi rửa và đệm tự phẳng lại.
- **Bước 5: Gội đầu tại giường:** Tháo tấm đệm nhỏ đầu giường ra, đặt chậu gội đầu chuyên dụng vào, cho bệnh nhân gối đầu lên hõm chậu và nối ống xả nước vào xô dưới sàn để gội đầu sạch sẽ.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Đạp khóa phanh bánh xe trước khi cho người bệnh bước lên hoặc xuống giường.
- Luôn dựng khóa hai thanh chắn hông giường lên khi người bệnh ngủ để chống lăn ngã ban đêm.
- Gấp gọn các tay quay giấu dưới đuôi giường sau khi sử dụng để không va chạm vào chân người đi lại.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** có khung thép hộp chịu lực dập khuôn nguyên khối sơn tĩnh điện tĩnh điện chống oxy hóa, đệm xơ dừa ép nhiệt kết hợp mút êm bọc da PU chống thấm nước, 4 bánh xe chịu tải trọng tới 300kg.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Kích thước phủ bì | Dài 210 cm x Rộng 96 cm x Cao 55 cm |
| Góc nâng hạ lưng | Nâng lưng từ 0° đến 85° (tư thế ngồi tựa lưng thẳng) |
| Góc nâng hạ chân | Nâng chân 0° – 45° / Hạ chân 0° – 90° (tư thế ngồi ghế) |
| Góc lật nghiêng người | Nghiêng trái 0° – 55°, Nghiêng phải 0° – 55° chống loét |
| Tải trọng tối đa | 250 kg – 300 kg |
| Phụ kiện trọn bộ đi kèm | Đệm xơ dừa cao cấp, bô vệ sinh tự động, chậu gội đầu có ống xả, bàn ăn nhựa, cọc truyền dịch Inox |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Chăm sóc toàn diện 6 trong 1:** Giải quyết trọn vẹn mọi nhu cầu ăn, ngủ, vệ sinh, tắm gội và thư giãn tại giường.
- **Lật nghiêng người nhẹ nhàng:** Giảm 100% nguy cơ loét tỳ đè vùng xương cùng cụt mà không tốn sức lực của người nhà.
- **Đệm xơ dừa tự nhiên thông thoáng:** Thoát mồ hôi tối đa, không hầm bí lưng như đệm mút thông thường.
- **Cơ cấu tay quay êm ái:** Trục xoay trợ lực thép hợp kim, xoay nhẹ nhàng không gây tiếng ồn.`;
  }

  // 3. Giường y tế điều khiển điện 3 chức năng (SD-33E)
  if (name.includes('ĐIỆN') || code === 'TEC-100096') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Giường y tế điều khiển điện 3 chức năng Osada SD-33E** là dòng giường y tế tự động hóa thông minh cao cấp, vận hành hoàn toàn bằng hệ thống motor điện qua remote cầm tay một chạm.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh muốn tự chủ vận động:** Bệnh nhân chỉ cần bấm nút trên remote là có thể tự nâng lưng ngồi dậy ăn uống, xem tivi hoặc nâng chân mà không cần phiền người nhà.
- **Gia đình có người già, người tai biến:** Chăm sóc tiện nghi tối đa, không tốn sức quay tay cơ học.
- **Bệnh viện, viện dưỡng lão cao cấp:** Tiêu chuẩn trang bị hiện đại cho phòng bệnh VIP.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Cắm phích nguồn của giường vào ổ điện 220V trong phòng.
- **Bước 2:** Cài remote điều khiển vào móc treo bên thành giường trong tầm với thuận tiện của người bệnh.
- **Bước 3: Thao tác điều khiển trên remote:**
  - Bấm và giữ nút **Back Up (Nâng lưng):** Tựa lưng tự động nâng lên từ từ (nhả tay ra giường sẽ dừng lại ở vị trí đó).
  - Bấm nút **Back Down (Hạ lưng):** Tự động hạ phẳng lưng về vị trí ban đầu.
  - Bấm nút **Leg Up (Nâng chân):** Tự động nâng cẳng chân lên cao chống phù nề.
  - Bấm nút **Leg Down (Hạ chân):** Tự động hạ chân xuống.
- **Bước 4: Hạ thanh chắn:** Khi người bệnh cần rời giường, ấn lẫy chốt đỏ ở đầu thành chắn nhôm để hạ thanh chắn xuống, giúp người bệnh bước chân ra sàn an toàn.
- **Bước 5: Trường hợp mất điện:** Lắp tay quay cơ học dự phòng đi kèm vào đuôi giường để xoay điều chỉnh bình thường.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không để dây điện remote bị kẹp vào các khớp cơ khí của giường khi nâng hạ.
- Đạp phanh khóa bánh xe để giường luôn cố định vững vàng.
- Tránh làm rơi vỡ remote hoặc đổ nước trực tiếp lên bảng phím điều khiển.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Giường điện Osada SD-33E** trang bị 3 động cơ điện Linear Actuator 24V công nghệ Đức vận hành êm ru tuyệt đối, khung thép hợp kim sơn tĩnh điện phủ nano kháng khuẩn và đệm xơ dừa y tế cao cấp.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Giường y tế điều khiển điện 3 chức năng Osada SD-33E |
| Thương hiệu | Osada (Nhật Bản) |
| Động cơ điện | Hệ thống 3 motor điện Linear Actuator 24V siêu êm |
| Bảng điều khiển | Remote phím bấm minh họa trực quan một chạm |
| Kích thước | Dài 212 cm x Rộng 97 cm x Cao 50 cm |
| Tải trọng tối đa | 250 kg |
| Dự phòng mất điện | Có tay quay cơ học phụ đi kèm |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Tự động hóa thông minh:** Người bệnh tự do điều chỉnh tư thế ngồi và nằm chỉ bằng một nút bấm.
- **Motor điện công nghệ Đức siêu êm:** Vận hành trơn tru không tiếng ồn, tuổi thọ trên 10 năm.
- **Tay quay phụ an tâm:** Không lo gián đoạn chức năng kể cả khi xảy ra mất điện sinh hoạt.`;
  }

  // 4. Các dòng giường 2 tay quay, 3 tay quay, giường khám siêu âm (GBM-093A, Osada SD-22C, SD-33C, Royalmed...)
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng giường y tế chuyên dụng tiêu chuẩn chất lượng cao, thiết kế bằng khung thép hộp chịu lực kiên cố, hỗ trợ đắc lực cho công tác điều trị, chăm sóc phục hồi sức khỏe tại gia đình và cơ sở y tế.

Sản phẩm phù hợp với:
- **Người bệnh sau phẫu thuật, người già suy yếu:** Cần nâng tựa lưng ngồi dậy ăn uống và nâng chân thư giãn.
- **Gia đình cần một chiếc giường y tế bền chắc, kinh tế:** Đầy đủ các tính năng cơ bản thiết yếu nhất.
- **Phòng khám tư nhân, trạm y tế cơ sở:** Giường khám bệnh và điều trị nội trú tiêu chuẩn.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Đặt giường ở vị trí bằng phẳng trong phòng, đạp khóa phanh ở cả 4 bánh xe để cố định vị trí.
- **Bước 2:** Cầm tay quay ở đuôi giường xoay theo chiều kim đồng hồ để nâng tựa lưng hoặc nâng chân người bệnh theo nhu cầu sinh hoạt. Xoay ngược lại để hạ phẳng.
- **Bước 3:** Kéo hai thanh chắn bảo vệ hai bên giường lên cho đến khi nghe tiếng "Tách" khóa ngàm an toàn để chống người bệnh lăn ngã ban đêm.
- **Bước 4:** Khi người bệnh cần ngồi dậy bước ra ngoài, nhấn lẫy mở khóa ở thanh chắn để hạ thanh chắn xuống phẳng mặt đệm.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Khóa chặt phanh bánh xe trước khi hỗ trợ người bệnh bước lên hoặc rời khỏi giường.
- Gấp gọn tay quay vào dưới đuôi giường sau khi điều chỉnh xong.
- Thường xuyên lau chùi đệm và khung giường bằng dung dịch khử khuẩn y tế.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** có khung thép hộp sơn tĩnh điện chống oxy hóa, chịu tải trọng lớn trên 200kg, các thanh nan giường đan dày dặn chống võng cột sống, cơ cấu tay quay ren thép trợ lực mượt mà.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Kích thước tiêu chuẩn | Dài 200 cm x Rộng 90 cm x Cao 55 cm |
| Khung giường | Thép hộp sơn tĩnh điện chống oxy hóa |
| Đệm nằm | Đệm y tế tiêu chuẩn thoáng khí chống thấm bọc simili |
| Tải trọng chịu lực | 200 kg – 250 kg |
| Bánh xe | 4 bánh xe cao su chịu lực có khóa phanh hãm độc lập |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Khung thép chịu lực bền bỉ:** Vững chắc, không rung lắc hay kêu cót két, tuổi thọ sử dụng lâu năm.
- **Nâng lưng và nâng chân trợ lực:** Giúp người bệnh ngồi dậy ăn uống ngon miệng và lưu thông máu tốt.
- **Thanh chắn an toàn chống ngã:** An tâm cho cả người bệnh và người chăm sóc suốt đêm dài.`;
}
