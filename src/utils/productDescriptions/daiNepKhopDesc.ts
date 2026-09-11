import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getDaiNepKhopDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'Bonbone / Orbe / Pamedi';
  const warranty = product.specifications?.warrantyMonths || 6;
  const warrantyText = getWarrantyText(warranty);

  // 1. Đai hỗ trợ di chuyển (Orbe có dây, không dây, Famedi)
  if (name.includes('DI CHUYỂN') || code === 'TEC-100037' || code === 'TEC-100038' || code === 'TEC-100039') {
    const hasStraps = name.includes('CÓ DÂY') || code === 'TEC-100038';
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là sản phẩm hỗ trợ người chăm sóc và kỹ thuật viên phục hồi chức năng nâng đỡ, trợ lực xoay trở và dìu người bệnh di chuyển an toàn tuyệt đối, loại bỏ nguy cơ tuột tay gây ngã người bệnh hoặc đau lưng cho người chăm sóc.

Sản phẩm phù hợp với:
- **Người cao tuổi, người liệt nửa người sau tai biến:** Chân yếu mất thăng bằng, cần người thân dìu tập đi từng bước hằng ngày.
- **Bệnh nhân sau phẫu thuật hoặc chấn thương:** Cần chuyển đổi tư thế từ giường sang xe lăn, ghế bô, bồn cầu hoặc ô tô.
- **Người chăm sóc bệnh nhân tại gia đình:** Cần điểm tựa nắm chắc chắn, phân bổ lực khoa học để không bị trẹo cột sống, thoát vị đĩa đệm khi nâng đỡ bệnh nhân.
- **Kỹ thuật viên tại các trung tâm phục hồi chức năng:** Dụng cụ bảo hộ tiêu chuẩn trong quá trình tập vận động trị liệu.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Cài đai vào người bệnh:**
  - Cho người bệnh ngồi trên mép giường hoặc ghế.
  - Quấn bản đai to quanh vùng eo và thắt lưng người bệnh sao cho các quai tay cầm hướng ra phía ngoài.
  - Dán chặt lớp băng dán xé Velcro, sau đó cài khóa chốt bấm an toàn và rút dây siết vừa khít với bụng (vừa vặn nhét lọt 2 ngón tay).
${hasStraps ? '  - Vòng hai dây đai đùi qua hai bên háng, cài chốt bấm mặt trước và rút căng vừa phải để cố định đai không bị xếch ngược lên ngực.\n' : ''}- **Bước 2: Hỗ trợ người bệnh đứng dậy:**
  - Người chăm sóc đứng đối diện, hai chân mở rộng làm trụ vững vàng.
  - Hai tay nắm chặt vào hai quai ngang hoặc dọc hai bên sườn đai của người bệnh.
  - Nhịp nhàng đếm "1, 2, 3", người chăm sóc dồn lực cánh tay và cơ đùi kéo nhẹ người bệnh đứng thẳng lên, người bệnh tự tỳ lực lên chân mình.
- **Bước 3: Dìu người bệnh tập bước:** Người chăm sóc đi bên cạnh phía chân yếu, một tay nắm chắc quai đai sau lưng để sẵn sàng ghì giữ nếu người bệnh hẫng chân hoặc mất đà.
- **Bước 4: Chuyển sang xe lăn:** Đưa người bệnh xoay người từ từ vào giữa lòng ghế xe lăn đã khóa phanh, hạ ngồi xuống nhẹ nhàng rồi tháo đai.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luôn kiểm tra khóa gài an toàn đã kêu tiếng "Cạch" khớp chặt trước khi nâng đỡ người bệnh.
- Không siết đai quá chật làm khó thở hoặc chèn ép dạ dày người bệnh.
- Vệ sinh đai bằng cách giặt tay với nước ấm và xà phòng loãng, phơi nơi thoáng gió, không giặt sấy nhiệt độ cao.
- Kiểm tra các đường may chịu lực định kỳ trước mỗi lần dùng.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** sử dụng chất liệu vải dù Oxford mật độ cao kết hợp mút xốp EVA đàn hồi êm ái, gia cố 4 đến 6 quai tay cầm trợ lực đa hướng bằng chỉ dù chuyên dụng chịu lực kéo giật tức thời lên đến 150kg.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Chất liệu | Vải Oxford quân nhu mật độ cao, mút đệm EVA tản lực, chốt khóa ABS |
| Hệ thống quai cầm | 4 – 6 quai trợ lực đa hướng gia cường chỉ dù |
| Kích cỡ vòng eo | Size M (65 – 85cm), Size L (85 – 105cm), Size XL (105 – 125cm) |
| Khả năng chịu lực kéo | 150 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Điểm cầm nắm trợ lực đa hướng:** Người chăm sóc dễ dàng dìu người bệnh từ mọi góc độ mà không cần túm áo quần hay nách bệnh nhân.
- **Bản đai rộng tản áp lực:** Ôm trọn vùng thắt lưng, không thắt nghẽn hay gây cọ xát bầm tím da.
- **Bảo vệ toàn diện cho cả hai người:** Tránh chấn thương cột sống cho người chăm sóc và phòng chống té ngã cho bệnh nhân.
- **Độ bền cơ học vượt trội:** Đường may gia cố kép, các chốt khóa nhựa kỹ thuật bền bỉ chịu lực giật mạnh.`;
  }

  // 2. Đai vai cao cấp Pamedi / Đai vai thường Famedi / Đai nâng vai Bonbone
  if (name.includes('VAI') || code === 'TEC-100035' || code === 'TEC-100036' || code === 'TEC-100042') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là sản phẩm nâng đỡ và cố định khớp vai chuyên sâu, giải pháp hàng đầu trong điều trị bảo tồn và phòng ngừa biến chứng bán trật khớp vai (sa trễ khớp vai) ở bệnh nhân liệt nửa người.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh liệt nửa người sau tai biến mạch máu não:** Cơ delta và bao khớp vai suy yếu, cánh tay bị trọng lượng kéo trĩu xuống gây dãn bao khớp và đau đớn.
- **Người chấn thương đám rối thần kinh cánh tay:** Cần điểm tựa nâng đỡ để các dây thần kinh phục hồi.
- **Người viêm quanh khớp vai, trật khớp vai tái hồi:** Cần giữ vững đầu xương cánh tay khớp vào ổ chảo xương bả vai.
- **Bệnh nhân sau phẫu thuật khớp vai:** Cần bất động hoặc nâng đỡ có kiểm soát theo hướng dẫn của bác sĩ.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Luồn ống bọc bắp tay:** Đưa ống bao vào cánh tay bên vai liệt/đau, kéo lên sát nách và dán băng nhám ôm vừa vặn bắp tay.
- **Bước 2: Cố định dải đai chéo:** Vắt dải đai dài qua mỏm vai đau, kéo xéo qua lưng sang nách bên vai lành và dán chặt trước ngực.
- **Bước 3: Căn chỉnh lực nâng vai:** Dùng tay nâng nhẹ khuỷu tay của người bệnh lên để chỏm xương vai khớp đúng vào ổ chảo, sau đó siết căng dải đai ngực và dán cố định. Khớp vai được nâng nhẹ, không còn cảm giác bị kéo trĩu là đạt yêu cầu.
- **Bước 4: Thời gian đeo:** Nên đeo đai suốt thời gian ngồi dậy, đứng hoặc tập đi lại trong ngày. Khi nằm nghỉ ngơi trên giường có thể tháo đai và kê gối nhỏ dưới cẳng tay.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không siết đai quá chật làm ngón tay bị tím tái, lạnh hoặc tê bì do cản trở lưu thông máu.
- Luôn tháo đai khi đi ngủ ban đêm để các khớp và cơ được thả lỏng tự nhiên.
- Giặt đai nhẹ nhàng bằng tay với nước mát, không vắt xoắn mạnh, phơi trong bóng râm.
- Nếu xuất hiện sưng đau bất thường, tháo đai và tham khảo ý kiến chuyên gia phục hồi chức năng.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** sử dụng sợi Polyurethane tổng hợp kết hợp vải Neoprene cao cấp đục lỗ thoáng khí, tạo lực nâng chéo ôm sát bờ vai theo chuẩn công thái học giải phẫu mà không cộm cấn khi mặc bên trong trang phục thường ngày.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Chất liệu | Sợi dệt Neoprene co giãn 4 chiều kháng khuẩn, khóa dán Velcro cao cấp |
| Quy cách | Thiết kế thông minh dùng chung được cho cả vai trái và vai phải |
| Kích cỡ | Free size (tùy chỉnh linh hoạt theo thể trọng 40kg – 85kg) |
| Cơ chế tác động | Nâng chỏm xương cánh tay áp sát vào ổ chảo xương bả vai |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Nâng đỡ khớp vai chống xệ hiệu quả:** Loại bỏ hoàn toàn cảm giác căng buốt, đứt xé bao khớp vai khi tay liệt buông thõng.
- **Phân bổ lực kéo cân bằng:** Dải đai chéo phân tán trọng lượng cánh tay sang bờ vai lành và lưng, không làm lệch vẹo cột sống.
- **Thoáng khí không bí rít:** Vải đục lỗ tản nhiệt mồ hôi, dễ chịu khi đeo nhiều giờ liền trong ngày.
- **Thiết kế gọn gàng, kín đáo:** Dễ dàng mặc giấu bên trong áo sơ mi hoặc áo thun, tự tin giao tiếp và sinh hoạt.`;
  }

  // 3. Đai lưng cao cấp (Nhiệt) Famedi
  if (name.includes('LƯNG') || code === 'TEC-100040') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Đai lưng cao cấp (Nhiệt) Famedi** là sự kết hợp đột phá giữa nẹp định hình cột sống thắt lưng theo trục sinh lý học và liệu pháp chườm nhiệt sưởi ấm chuyên sâu giúp giảm đau cơ và kích thích tuần hoàn máu.

Sản phẩm phù hợp với:
- **Người thoái hóa cột sống thắt lưng, thoát vị đĩa đệm (L4-L5-S1):** Thường xuyên bị chèn ép rễ thần kinh tọa gây tê buốt lan xuống chân.
- **Người cao tuổi đau mỏi thắt lưng mãn tính:** Đau nhức thắt lưng tăng lên khi thay đổi thời tiết, khi ngủ dậy buổi sáng.
- **Người làm việc ngồi lâu, đứng lâu hoặc lái xe đường dài:** Cần điểm tựa nâng đỡ giữ thẳng lưng, phòng ngừa cong vẹo cột sống.
- **Người đang điều trị bảo tồn vùng thắt lưng:** Theo phác đồ vật lý trị liệu của bác sĩ chuyên khoa cơ xương khớp.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Đeo đai định hình lưng:**
  - Đặt đai phía sau lưng sao cho các thanh nẹp nằm đối xứng chính giữa cột sống thắt lưng.
  - Kéo hai mép bản đai chính về phía trước bụng và dán chồng lên nhau với độ ôm vừa vặn.
  - Cầm hai dải dây đai trợ lực phụ hai bên hông, kéo căng đều về phía trước và dán đè lên bản đai chính để nhân đôi lực siết.
- **Bước 2: Sử dụng chức năng chườm nhiệt:**
  - Cắm dây nguồn USB vào củ sạc điện thoại hoặc pin sạc dự phòng để di chuyển tự do.
  - Nhấn giữ nút nguồn trên mặt đai 3 giây để kích hoạt (đèn Đỏ: 60°C - nhiệt cao làm ấm sâu).
  - Bấm nhẹ nút để chuyển mức nhiệt: Đèn Xanh dương (50°C - nhiệt vừa thư giãn), Đèn Xanh lá (42°C - nhiệt êm dịu).
  - Sử dụng chườm nhiệt 20 – 30 phút mỗi lần, ngày 2 – 3 lần vào buổi sáng hoặc trước khi ngủ.
- **Bước 3: Vệ sinh đai:** Tháo rời tấm nhiệt và dây dẫn điện trước khi giặt nhẹ đai bằng tay với nước xà phòng loãng.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không sử dụng tính năng nhiệt khi đang ngủ say để phòng tránh bỏng nhiệt độ thấp kéo dài.
- Không siết đai quá chật gây ép bụng, khó thở hoặc ảnh hưởng đến tiêu hóa.
- Phụ nữ mang thai, người đang sốt cao hoặc vùng da thắt lưng có vết thương hở không sử dụng chế độ nhiệt.
- Đai có tác dụng hỗ trợ vùng thắt lưng, không thay thế cho việc chẩn đoán và điều trị y tế chuyên khoa.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Đai lưng nhiệt Famedi** tích hợp 4 thanh nẹp hợp kim đàn hồi uốn cong theo đường cong sinh lý tự nhiên của cột sống thắt lưng, kết hợp hệ thống phát nhiệt sợi carbon nano an toàn tuyệt đối với điện áp 5V.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Đai lưng cao cấp (Nhiệt) Famedi |
| Thương hiệu | Famedi |
| Cấu trúc nẹp | 4 thanh hợp kim định hình cột sống thắt lưng |
| Chức năng nhiệt | 3 cấp độ nhiệt thông minh (42°C – 50°C – 60°C) điều khiển nút bấm LED |
| Nguồn cấp điện | Cổng USB 5V an toàn tuyệt đối chống giật, dùng được với sạc dự phòng |
| Kích cỡ vòng bụng | Size M (65 – 80cm), Size L (80 – 95cm), Size XL (95 – 110cm) |
| Chất liệu vải | Thun dệt co giãn đục lỗ thoáng khí đa chiều kháng khuẩn |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Tác động kép Định hình + Chườm ấm:** Vừa giải tỏa trọng lượng tỳ đè lên đĩa đệm, vừa làm mềm cơ thắt lưng đang co thắt.
- **Dây đai trợ lực kép (Dual Straps):** Tăng cường lực siết gấp đôi, cố định đai vững chắc không bị xô lệch khi cúi người.
- **Nguồn điện USB 5V linh hoạt:** Dễ dàng sử dụng khi ngồi văn phòng, ngồi trên ô tô hoặc đi lại trong nhà với pin dự phòng.
- **Chất liệu vải dệt thông hơi:** Hàng ngàn lỗ thoáng khí li ti giúp thoát mồ hôi nhanh, không gây ngứa ngáy hay nổi mẩn da.`;
  }

  // 4. Đai cổ tay Bonbone Wrist Bandage
  if (name.includes('CỔ TAY') || code === 'TEC-100034') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Đai Cổ Tay Wrist Bandage Bonbone (Nhật Bản)** là sản phẩm cố định và trợ lực vùng cổ tay mỏng nhẹ, bảo vệ cổ tay trong sinh hoạt hằng ngày và khi vận động.

Sản phẩm phù hợp với:
- **Người bị hội chứng ống cổ tay, viêm bao gân:** Thường xuyên tê rần, đau buốt ngón tay cái, ngón trỏ và cổ tay.
- **Dân văn phòng, lập trình viên:** Gõ phím, di chuột liên tục nhiều giờ khiến khớp cổ tay bị căng cứng quá mức.
- **Vận động viên thể thao:** Chơi cầu lông, tennis, bóng bàn, tập gym nâng tạ cần bảo vệ dây chằng cổ tay.
- **Người sau chấn thương bong gân cổ tay:** Giai đoạn phục hồi cần giữ ổn định cổ tay ở tư thế thẳng tự nhiên.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Xỏ ngón cái:** Luồn ngón tay cái vào vòng xỏ trên đai sao cho mặt đệm êm áp sát vào lòng bàn tay và cổ tay.
- **Bước 2: Quấn đai:** Quấn dải băng thun vòng quanh khớp cổ tay theo chiều kim đồng hồ với độ siết vừa phải.
- **Bước 3: Dán khóa nhám:** Kéo căng nhẹ dải dán và dán cố định vào mặt nhám (cổ tay được giữ vững nhưng các đầu ngón tay vẫn hồng hào, cử động thoải mái).
- **Bước 4: Vệ sinh:** Giặt nhẹ bằng tay trong nước mát với xà phòng nhẹ, không dùng chất tẩy, phơi trong bóng râm.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không quấn đai quá chặt làm nghẽn mạch máu nuôi các ngón tay.
- Tháo đai khi đi ngủ ban đêm để cổ tay được thả lỏng tự do.
- Giữ sạch sẽ bề mặt băng dán để duy trì độ bám dính lâu dài.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Đai cổ tay Bonbone** được sản xuất tại Nhật Bản với công nghệ dệt nén không đường may độc quyền, mỏng nhẹ chỉ 1mm ôm sát cổ tay như làn da thứ hai nhưng có lực nâng giữ vững chãi.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Đai Cổ Tay Bonbone Wrist Bandage |
| Thương hiệu | Bonbone (Daiya Industry - Nhật Bản) |
| Chất liệu | Nylon, Polyurethane cao cấp dệt không đường may |
| Quy cách | 1 chiếc (dùng chung được cho cả tay trái và tay phải) |
| Kích cỡ | Free size (chu vi vòng cổ tay từ 13 cm đến 21 cm) |
| Độ dày | Siêu mỏng chỉ 1.0 mm |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Siêu mỏng nhẹ 1mm:** Ôm sát cổ tay, gõ bàn phím và làm việc máy tính trơn tru không bị cộm vướng.
- **Vòng xỏ ngón cái chống tuột:** Giữ đai luôn ở vị trí chính xác suốt cả ngày dài hoạt động.
- **Chất liệu cao cấp từ Nhật Bản:** Kháng khuẩn, thoáng khí và bền bỉ, không bị bai dão sau thời gian dài sử dụng.`;
  }

  // 5. Đai nẹp cổ thoáng khí (Bonbone)
  if (name.includes('CỔ') || code === 'TEC-100041') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Đai nẹp cổ thoáng khí Bonbone (Nhật Bản)** là nẹp nâng đỡ đốt sống cổ cao cấp, giải pháp vàng giúp giải tỏa tải trọng đầu đè lên đĩa đệm đốt sống cổ C3-C7.

Sản phẩm phù hợp với:
- **Người thoái hóa đốt sống cổ, thoát vị đĩa đệm cổ:** Đau mỏi cổ gáy, tê bì lan xuống vai và cánh tay.
- **Người làm việc văn phòng, lái xe nhiều:** Ngồi sai tư thế gục đầu, cúi nhìn màn hình điện thoại/máy tính thời gian dài.
- **Người sau chấn thương giật cổ (Whiplash injury):** Cần nâng đỡ tạm thời để các cơ gáy được thư giãn.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Đặt nẹp:** Giữ đầu thẳng tự nhiên, mắt nhìn về phía trước. Đặt phần cong lõm của đai khớp vừa vặn dưới cằm.
- **Bước 2: Cố định:** Vòng hai cánh đai ra sau gáy, kéo căng nhẹ nhàng và dán hai đầu băng dính lại với nhau.
- **Bước 3: Thời gian sử dụng:** Đeo từ 1 đến 2 giờ mỗi lần trong lúc làm việc văn phòng, lái xe hoặc xem tivi để duy trì tư thế cổ thẳng chuẩn.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không đeo đai khi đi ngủ qua đêm.
- Không siết quá chặt gây khó thở hoặc chèn ép khí quản và động mạch cảnh vùng cổ.
- Giặt nhẹ bằng tay với xà phòng pha loãng, không phơi trực tiếp dưới nắng gắt.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Đai nẹp cổ Bonbone** thiết kế dạng lưới 3D thông gió độc quyền Nhật Bản, nâng đỡ nhẹ nhàng sức nặng của đầu (khoảng 5kg) mà trọng lượng đai chỉ vẻn vẹn 70g.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Đai nẹp cổ thoáng khí Bonbone |
| Thương hiệu | Bonbone (Nhật Bản) |
| Chiều cao nẹp | 8 cm – 9 cm (chuẩn giải phẫu học cổ) |
| Chu vi vòng cổ | Size S (28 – 34cm), Size M (34 – 40cm), Size L (40 – 46cm) |
| Trọng lượng siêu nhẹ | ~70 g |
| Chất liệu | Lưới dệt 3D kháng khuẩn siêu thoáng khí |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Lưới 3D siêu thoáng khí:** Đeo cả ngày mùa hè không bị bí rít hay đổ mồ hôi vùng cổ gáy.
- **Đường cong nâng cằm giải phẫu:** Giảm ngay áp lực tỳ đè lên đĩa đệm đốt sống cổ, xua tan cơn đau nhức vai gáy.
- **Trọng lượng siêu nhẹ:** Thoải mái quay đầu nhẹ nhàng, không gây vướng víu khó chịu.`;
  }

  // 6. Đai cố định đầu gối / khớp gối (TEC-100046, 47, 48)
  if (name.includes('GỐI') || code === 'TEC-100046' || code === 'TEC-100047' || code === 'TEC-100048') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là sản phẩm nẹp cố định và trợ lực khớp gối chuyên sâu, hỗ trợ điều trị tổn thương dây chằng, sụn chêm và thoái hóa khớp gối.

Sản phẩm phù hợp với:
- **Người bị thoái hóa khớp gối, tràn dịch khớp gối:** Đau buốt khi bước lên xuống cầu thang hoặc khi đứng dậy.
- **Bệnh nhân tổn thương dây chằng chéo (ACL/PCL), rách sụn chêm:** Cần giữ vững khớp gối chống trẹo và vẹo khớp.
- **Người sau phẫu thuật thay khớp gối:** Giai đoạn phục hồi chức năng vận động.
- **Người chơi thể thao:** Phòng ngừa chấn thương gối khi chạy bộ, leo núi, bóng đá, bóng chuyền.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Đặt vị trí nẹp:** Duỗi thẳng chân hoặc hơi chùng nhẹ khớp gối khoảng 10°. Đặt nẹp ôm vào khớp gối sao cho vòng đệm silicon tròn khớp trọn vẹn quanh xương bánh chè.
- **Bước 2: Cố định dải đai:** Dán dải đai chính giữa qua kheo chân trước, sau đó dán tiếp dải đai phía trên đùi và dải đai phía dưới bắp chân.
- **Bước 3: Kiểm tra cử động:** Siết đều các dải đai với lực vừa phải, gập nhẹ chân thấy gối được nâng giữ chắc chắn và êm ái là đúng chuẩn.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không dán đai quá chặt làm cản trở tuần hoàn máu chi dưới gây tê bàn chân.
- Tháo đai khi nghỉ ngơi trên giường để các mạch máu lưu thông tự nhiên.
- Giặt tay với nước lạnh, không dùng máy giặt hay máy sấy nhiệt độ cao.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** tích hợp vòng đệm silicon hấp thụ lực quanh xương bánh chè và các thanh nẹp trợ lực hai bên sườn gối, ngăn chặn hiện tượng trẹo gối sang hai bên khi vận động.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Cấu trúc trợ lực | Vòng silicon bảo vệ bánh chè + Thanh nẹp trợ lực hai bên sườn |
| Chất liệu | Vải Neoprene co giãn 4 chiều kháng khuẩn, khóa dán Velcro |
| Phân loại | Dùng chung cho cả chân trái và chân phải |
| Kích cỡ | Size M (vòng đùi 35-41cm), Size L (42-47cm), Size XL (48-55cm) |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Vòng silicon định vị bánh chè:** Giảm sốc và giải tỏa áp lực trực diện khi gập gối bước đi.
- **Thanh nẹp sườn chống vặn xoắn:** Giữ trục khớp gối luôn thẳng, ngăn ngừa tái phát trẹo khớp.
- **Hệ thống đai dán 3 điểm:** Ôm sát theo dáng chân, không bị tuột xệ khi đi bộ hay chạy nhảy.`;
  }

  // 7. Đai nẹp mắt cá chân / cổ chân (TEC-100043, TEC-100051)
  if (name.includes('MẮT CÁ') || name.includes('CỔ CHÂN') || code === 'TEC-100043' || code === 'TEC-100051') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là đai nẹp định hình và bảo vệ khớp cổ chân - mắt cá chân, hỗ trợ điều trị bong gân lật sơ mi và tổn thương dây chằng cổ chân.

Sản phẩm phù hợp với:
- **Người bị lật sơ mi, bong gân cổ chân:** Sưng đau mắt cá chân sau chấn thương thể thao hoặc bước hụt bậc thang.
- **Người sau tháo bột tập đi:** Cần dụng cụ giữ vững khớp cổ chân trong giai đoạn tập đi lại đầu tiên.
- **Vận động viên:** Chơi bóng rổ, bóng đá, cầu lông, chạy trail phòng chống tái phát lật cổ chân.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Đặt gót chân vào lỗ khoét hở gót của đai.
- **Bước 2:** Dán phần đai ôm bọc quanh cổ chân phía trên.
- **Bước 3:** Kéo hai dải đai chéo vắt qua mu bàn chân xuống dưới lòng bàn chân theo hình số 8, kéo căng và dán chặt vào hai bên mắt cá.
- **Bước 4:** Đi lại thử vài bước, chỉnh lại độ siết nếu cảm thấy quá chật hoặc lỏng.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không quấn đai quá chặt làm tê bì các đầu ngón chân.
- Tháo đai khi ngủ ban đêm để bàn chân được thả lỏng.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** có thiết kế quấn hình số 8 ôm trọn mắt cá trong và mắt cá ngoài, hở gót thoáng khí, dễ dàng mang bên trong giày thể thao thường ngày.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Kiểu dáng | Đai nẹp cổ chân quấn số 8 hở gót tiện lợi |
| Kích cỡ | Size S (size giày 35 – 37), Size M (38 – 41), Size L (42 – 45) |
| Chất liệu | Thun dệt co giãn tổng hợp kháng khuẩn thoáng khí |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Cơ chế quấn số 8 khóa mắt cá:** Hạn chế cử động lật nghiêng bàn chân nhưng vẫn cho phép gập duỗi tự nhiên.
- **Gót hở thoáng khí:** Mang vừa vặn trong giày thể thao mà không gây cộm chân hay bí nóng.`;
  }

  // 8. Đai hỗ trợ cánh tay / khuỷu tay / bắp chân (TEC-100044, 45, 49, 50)
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dụng cụ đai nẹp trợ lực và bảo vệ mô cơ, dây chằng khớp chuyên dụng, hỗ trợ giảm đau mỏi cơ và phòng ngừa chấn thương khi vận động.

Sản phẩm phù hợp với:
- **Người bị viêm gân, căng cơ, mỏi khớp:** Sau lao động nặng hoặc chơi thể thao quá sức.
- **Người cần trợ lực cơ bắp:** Giữ ấm và tăng cường tuần hoàn máu nuôi dưỡng mô cơ tổn thương.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Đặt đai áp sát vào vùng cơ khớp cần bảo vệ.
- **Bước 2:** Quấn đều đai theo chu vi bắp tay hoặc bắp chân với độ căng vừa phải.
- **Bước 3:** Dán cố định các dải nhám dính và kiểm tra cử động thoải mái.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Tháo đai khi nghỉ ngơi hoặc đi ngủ.
- Giặt nhẹ bằng tay với nước mát, phơi nơi râm mát.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** sử dụng chất liệu vải dệt nén co giãn cao cấp đàn hồi 4 chiều, hỗ trợ giải tỏa áp lực và duy trì sự linh hoạt của các bó cơ.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Chất liệu | Vải dệt co giãn tổng hợp thoáng khí |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Nén trợ lực cơ bắp:** Hạn chế rung lắc cơ, giảm mỏi và căng cơ hiệu quả.
- **Chất liệu thoáng khí co giãn 4 chiều:** Ôm sát theo đường cong cơ thể, cử động tự nhiên.`;
}
