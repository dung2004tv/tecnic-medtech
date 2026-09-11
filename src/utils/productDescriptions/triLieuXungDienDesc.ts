import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getTriLieuXungDienDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'Omron / Philips / Oromi / GBM';
  const warranty = product.specifications?.warrantyMonths || 12;
  const warrantyText = getWarrantyText(warranty);

  // 1. Máy xung điện Omron (HV-F013, F027, F028, F230, F030)
  if (name.includes('XUNG ĐIỆN') || name.includes('OMRON')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là thiết bị mát xa xung điện trị liệu giảm đau công nghệ TENS (Transcutaneous Electrical Nerve Stimulation) đến từ tập đoàn y tế Omron (Nhật Bản), giúp cắt cơn đau nhức cơ xương khớp tự nhiên mà không cần phụ thuộc vào thuốc giảm đau.

Sản phẩm đặc biệt phù hợp với:
- **Người cao tuổi:** Thường xuyên đau nhức mỏi lưng, thoái hóa cột sống, đau khớp gối hoặc tê buốt bắp chân.
- **Dân văn phòng, người ngồi lâu:** Đau mỏi cứng cơ vùng vai gáy, lưng thắt lưng do sai tư thế ngồi máy tính.
- **Người chơi thể thao, lao động chân tay:** Căng cứng cơ bắp, tích tụ axit lactic sau các buổi tập luyện cường độ cao.
- **Bệnh nhân sau chấn thương hoặc đang điều trị phục hồi chức năng:** Cần kích thích thần kinh cơ nhẹ nhàng theo hướng dẫn y khoa.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn quy trình y tế:**
- **Bước 1: Lắp pin và nối dây dẫn:** Lắp 2 viên pin AAA vào khoang pin máy. Cắm giắc cắm của dây điện cực vào cổng kết nối trên đỉnh thân máy.
- **Bước 2: Dán miếng điện cực:**
  - Làm sạch và lau khô vùng da cần điều trị.
  - Bóc hai miếng dán điện cực Long Life Pad ra khỏi tấm nhựa bảo quản.
  - Dán hai miếng lên vùng bị đau (hai bên bả vai, hai bên cột sống thắt lưng, hai bên khớp gối...). **Khoảng cách giữa hai miếng dán tối thiểu từ 5cm trở lên**, không dán chạm mép vào nhau.
- **Bước 3: Bật nguồn và cài đặt:**
  - Bật nút nguồn, chọn vùng trị liệu (Region) hoặc kiểu xoa bóp (Day, Đấm, Nhào nặn cơ).
  - Tăng dần cường độ xung điện từ mức 1 lên từ từ đến khi cảm thấy cơ bắp co bóp nhịp nhàng, êm dịu và dễ chịu.
- **Bước 4: Thư giãn:** Ngồi hoặc nằm thư giãn trong 15 phút. Máy sẽ tự động phát tiếng bíp và ngắt nguồn khi hết chu trình.
- **Bước 5: Bảo quản miếng dán:** Tháo nhẹ hai miếng dán ra khỏi da, dán lại vào tấm nhựa trong suốt bảo quản. Có thể rửa nhẹ bề mặt keo dưới vòi nước lạnh khoảng 5 giây khi miếng dán bị bám bụi bẩn.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Chống chỉ định nghiêm ngặt:** Tuyệt đối không dùng cho người đang mang máy tạo nhịp tim hoặc các thiết bị điện tử y tế cấy ghép trong cơ thể.
- Không dán miếng điện cực lên vùng xoang động mạch cảnh (vùng cổ trước), vùng ngực trước tim, mắt, miệng hoặc vùng da có vết thương hở.
- Mỗi vùng cơ chỉ nên điều trị 1 – 2 lần mỗi ngày, mỗi lần 15 phút.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** ứng dụng dòng điện xung tần số thấp TENS phong bế tín hiệu đau truyền lên tủy sống và kích thích tiết Endorphin tự nhiên, kết hợp miếng dán Long Life Pad độ bền cao có thể tái sử dụng tới 300 lần.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | Omron Healthcare (Nhật Bản) |
| Công nghệ trị liệu | Dòng điện xung tần số thấp TENS giảm đau tự nhiên |
| Dải tần số phát xung | 1 Hz – 1200 Hz |
| Thời gian mỗi liệu trình | 15 phút tự động ngắt nguồn an toàn |
| Cấp độ cường độ xung | 10 – 15 mức điều chỉnh linh hoạt |
| Nguồn cấp điện | 2 pin AAA tiện lợi, dễ dàng thay thế |
| Bộ phụ kiện đi kèm | Thân máy chính, dây nối điện cực, cặp miếng dán Long Life Pad, tấm giữ nhựa, pin, bao đựng |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Giảm đau không dùng thuốc:** Cắt cơn đau nhức cơ xương khớp nhanh chóng, an toàn cho dạ dày và gan thận.
- **Đa dạng chế độ mô phỏng chuyên gia:** Đấm bóp, day ấn, nhào nặn cơ nhịp nhàng chuyên sâu.
- **Nhỏ gọn bỏ túi:** Dễ dàng mang theo sử dụng trong giờ nghỉ trưa tại văn phòng hay khi đi công tác xa.
- **Độ bền chuẩn Nhật Bản:** Miếng dán rửa nước tái sử dụng bền bỉ, vận hành ổn định lâu dài.`;
  }

  // 2. Súng Massage cầm tay (Philips PPM7323, Oromi OMR-677)
  if (name.includes('Súng Massage') || name.includes('Massage') || code === 'TEC-100084' || code === 'TEC-100085') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là súng massage cơ bắp chuyên sâu (Percussive Massage Gun) cầm tay mini cao cấp, ứng dụng lực đấm mạnh mẽ tác động sâu vào các mô cơ (Fascia) đến 8mm – 10mm.

Sản phẩm đặc biệt phù hợp với:
- **Người chơi thể thao, gymer, vận động viên:** Đào thải axit lactic tích tụ, làm tan các nút cơ co cứng sau khi tập luyện.
- **Dân văn phòng, người làm việc bàn giấy:** Giảm cảm giác căng cứng ê ẩm vùng cơ thang bả vai, lưng và mông.
- **Người lớn tuổi lưu thông máu kém:** Mát xa thư giãn cơ bắp, hỗ trợ khí huyết lưu thông dễ chịu.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Lắp đầu massage phù hợp:**
  - *Đầu bóng tròn:* Dành cho các nhóm cơ lớn như đùi, mông, bắp chân.
  - *Đầu chữ U:* Dành cho hai bên cột sống lưng, gáy và gân gót chân (tránh đè lên xương).
  - *Đầu hình đạn:* Dành cho các điểm kích hoạt cơ (Trigger Point), lòng bàn tay, lòng bàn chân.
  - *Đầu phẳng:* Dành cho thư giãn toàn thân nhẹ nhàng.
- **Bước 2: Khởi động:** Nhấn giữ nút nguồn 2 – 3 giây để bật máy. Nhấn nhấp nút nguồn để điều chỉnh tốc độ rung từ nhẹ đến mạnh.
- **Bước 3: Mát xa cơ:** Tỳ đầu súng nhẹ lên bề mặt cơ đau mỏi, di chuyển chậm rãi khoảng 2cm/giây. Mỗi nhóm cơ mát xa 1 – 2 phút, toàn thân không quá 15 phút/lần.
- **Bước 4: Tắt máy:** Nhấn giữ nút nguồn để tắt máy, sạc lại pin định kỳ qua cổng sạc Type-C.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Tuyệt đối không đấm trực tiếp lên các khớp xương, đốt sống cổ, đầu gối, vùng trước cổ hoặc vùng bụng, tim.**
- Không sử dụng liên tục quá 30 phút một lần để bảo vệ động cơ.
- Tránh xa tầm tay trẻ nhỏ.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** trang bị động cơ không chổi than lực đẩy lên đến 10kg, tần số rung lên đến 3200 vòng/phút, giảm ồn vượt trội (< 45dB) và tích hợp pin lithium dung lượng lớn sạc Type-C.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Biên độ dao động sâu | 8 mm – 10 mm tác động sâu vào mô mạc cơ |
| Tần số rung | 1.800 – 3.200 RPM (5 cấp độ lực) |
| Cổng sạc | Cổng USB Type-C hiện đại |
| Trọng lượng | ~450 g – 680 g (cầm đầm tay, chống mỏi) |
| Bộ phụ kiện | Thân súng, 4-6 đầu massage tháo rời, cáp sạc Type-C, hộp đựng cao cấp |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Đấm sâu mô cơ Fascia:** Giải phóng co cứng cơ tức thì chỉ sau vài phút sử dụng.
- **Động cơ không chổi than siêu êm:** Vận hành mạnh mẽ mà không gây rung giật cổ tay hay tiếng ồn lớn.
- **Thiết kế công thái học gọn nhẹ:** Cầm nắm chắc tay, dễ dàng tự mát xa sau lưng mà không cần người hỗ trợ.`;
  }

  // 3. Máy nén ép trị liệu suy giãn tĩnh mạch GBM-034
  if (name.includes('SUY GIÃN TĨNH MẠCH') || code === 'TEC-1000110') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Máy nén ép trị liệu suy giãn tĩnh mạch GBM-034** là thiết bị phục hồi chức năng tuần hoàn chi dưới chuyên sâu, giải pháp vàng cho hệ tĩnh mạch chi dưới.

Sản phẩm đặc biệt phù hợp với:
- **Người bị suy giãn tĩnh mạch chân mạn tính, phù thũng chân:** Nặng chân, tê buốt và sưng phù mắt cá chân về chiều tối.
- **Người bệnh nằm liệt giường sau tai biến hoặc phẫu thuật:** Cần phòng ngừa biến chứng huyết khối tĩnh mạch sâu nguy hiểm (DVT).
- **Người già hay bị lạnh buốt chân tay, chuột rút ban đêm:** Kích thích máu lưu thông sưởi ấm tự nhiên.
- **Người phải đứng hoặc ngồi lâu một chỗ:** Giáo viên, nhân viên bán hàng, bác sĩ phẫu thuật.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Cho người bệnh ngồi trên ghế hoặc nằm ngửa thẳng chân thoải mái trên giường.
- **Bước 2:** Mở khóa kéo hai bao chân, luồn chân người bệnh vào trong rồi kéo khóa kín lại (ôm vừa vặn, không quá chặt).
- **Bước 3:** Cắm các đầu ống dẫn khí của bao chân vào cổng cắm trên máy chính.
- **Bước 4:** Cắm nguồn điện và bật công tắc máy.
- **Bước 5:** Vặn núm chỉnh áp lực ở mức vừa phải (mới tập để mức 60 – 90 mmHg, sau tăng dần lên 120 – 150 mmHg theo cảm nhận êm ái). Cài đặt thời gian từ 20 đến 30 phút.
- **Bước 6:** Máy sẽ tự động bơm xả nén ép chân tuần tự từ bàn chân lên đến đùi. Khi hết giờ máy tự tắt, mở khóa kéo tháo bao chân ra ngoài.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không sử dụng khi chân đang bị viêm da mủ cấp tính, vết loét hở hoặc gãy xương chưa liền.
- Điều chỉnh mức áp lực tăng dần từ tốn, không ép mức áp lực quá cao ngay lần đầu sử dụng.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Máy nén ép GBM-034** sử dụng công nghệ bơm khí nén tuần hoàn theo chiều sinh lý từ xa về gần (từ ngón chân -> bắp chân -> đùi), đẩy dòng máu ứ trệ ngược về tim hiệu quả.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Máy nén ép trị liệu suy giãn tĩnh mạch GBM-034 |
| Thương hiệu | GBM |
| Dải áp lực nén | 20 – 250 mmHg tùy chỉnh linh hoạt |
| Số khoang khí | 4 khoang khí tuần hoàn độc lập mỗi bên chân |
| Thời gian trị liệu | Hẹn giờ tự động 10 – 30 phút |
| Chất liệu bao chân | Vải bọc TPU y tế kháng khuẩn, khóa kéo bản lớn siêu bền |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Bơm nén tuần hoàn chuẩn sinh lý:** Giải tỏa nhanh chóng cảm giác căng tức nặng chân và phù nề.
- **Khoang khí đa vùng độc lập:** Nén ép êm ái như bàn tay chuyên viên xoa bóp dẫn lưu dịch bạch huyết.
- **Vận hành bền bỉ, dễ sử dụng:** Bảng điều khiển cơ trực quan, người lớn tuổi hoàn toàn tự dùng được tại nhà.`;
  }

  // 4. Máy đạp chân tập phục hồi chức năng (OEM, Hueloi, GBM-082)
  if (name.includes('ĐẠP CHÂN') || name.includes('TẬP CHÂN') || code === 'TEC-100086' || code === 'TEC-100087' || code === 'TEC-100088') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là thiết bị tập vận động phục hồi chức năng tích hợp 2 trong 1 (đạp chân chi dưới và quay tay chi trên) nhỏ gọn tại chỗ, được các bác sĩ và kỹ thuật viên vật lý trị liệu khuyên dùng trong phác đồ phục hồi vận động sớm tại nhà.

Sản phẩm đặc biệt được chỉ định cho các nhóm đối tượng sau:
- **Người bệnh liệt nửa người sau tai biến mạch máu não (đột quỵ):** Gặp di chứng suy giảm cơ lực, yếu hoặc co cứng chi, khó khăn trong việc nhấc chân bước đi. Tập luyện đều đặn giúp kích thích tái tạo kết nối dẫn truyền thần kinh vận động tại vỏ não (cơ chế Neuroplasticity), chống teo cơ và ngăn ngừa xơ cứng các khớp chi dưới.
- **Bệnh nhân sau phẫu thuật chấn thương chỉnh hình:** Sau phẫu thuật thay khớp háng nhân tạo, thay khớp gối, mổ tái tạo dây chằng chéo trước/sau (ACL/PCL) hoặc sau tháo bột gãy xương cẳng chân. Thiết bị hỗ trợ khôi phục tầm vận động khớp (ROM) an toàn mà không gây áp lực tải trọng lên xương đang liền.
- **Người cao tuổi thể lực suy giảm, ít vận động:** Giúp duy trì độ linh hoạt của hệ cơ xương khớp, thúc đẩy tuần hoàn máu ngoại vi, giảm nguy cơ hình thành cục máu đông (huyết khối tĩnh mạch sâu DVT) và giảm cảm giác tê bì, phù nề bàn chân.
- **Bệnh nhân suy giãn tĩnh mạch chi dưới:** Động tác đạp chân liên tục tạo áp lực co bóp cơ bắp chân (bơm cơ), hỗ trợ tĩnh mạch đẩy máu nghèo oxy trở về tim hiệu quả hơn.
- **Người làm việc văn phòng, ngồi lâu một chỗ:** Vận động nhẹ nhàng dưới gầm bàn làm việc giúp đốt cháy calo dư thừa, giảm căng thẳng và giảm đau mỏi lưng hông.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Quy trình tập luyện phục hồi an toàn:**

- **Bước 1: Chuẩn bị vị trí tập:**
  - Khi tập chi dưới: Đặt máy trên mặt phẳng sàn nhà (sàn gỗ, gạch men hoặc thảm tập), cách ghế ngồi của người bệnh khoảng 40 – 50 cm. Người bệnh ngồi thẳng lưng trên ghế tựa có đệm chắc chắn (tuyệt đối không ngồi ghế xoay hoặc ghế có bánh xe trượt).
  - Khi tập chi trên: Đặt máy ngay ngắn trên mặt bàn phẳng, chiều cao ngang tầm ngực người bệnh khi ngồi.

- **Bước 2: Cài đặt và cố định bàn chân/bàn tay:**
  - Đặt lòng bàn chân vào bàn đạp, điều chỉnh quai đai cao su mềm ôm sát mu bàn chân theo 4 nấc cài sao cho chân không bị tuột khi quay.
  - Đối với người bệnh liệt nửa người có bàn tay co quắp hoặc bàn chân yếu: Người nhà hỗ trợ cố định chân bên yếu vào bàn đạp trước, sau đó mới đặt chân lành.

- **Bước 3: Lộ trình tập luyện 3 giai đoạn khuyến nghị:**
  - **Giai đoạn 1 (Làm quen & Khởi động - 5 đến 7 phút):** Xoay núm kháng lực về mức nhẹ nhất (ngược chiều kim đồng hồ). Đạp nhẹ nhàng theo chiều kim đồng hồ với tốc độ vừa phải, nhịp nhàng để làm ấm các khớp gối, cổ chân và khớp háng.
  - **Giai đoạn 2 (Tập tăng sức bền & Cơ lực - 10 đến 15 phút):** Vặn núm kháng lực theo chiều kim đồng hồ để tăng dần độ nặng. Người bệnh kết hợp tập đạp tiến 5 phút và đạp lùi (đạp ngược) 5 phút. Động tác đạp lùi kích hoạt nhóm cơ tam đầu đùi, cơ gân kheo và cơ mông sâu rất tốt cho bệnh nhân tai biến.
  - **Giai đoạn 3 (Thả lỏng & Hạ nhiệt - 3 phút):** Giảm nhẹ kháng lực về mức thấp, đạp chậm dần rồi dừng hẳn.
  - **Tập chi trên (Quay tay):** Ngồi đối diện bàn, hai tay nắm chắc bàn đạp, quay tròn vòng cung từ trước ra sau để mở rộng khớp vai, chống co cứng bao khớp vai (đông cứng khớp vai).

- **Bước 4: Theo dõi chỉ số trên màn hình LCD:**
  - Nhấn nút màu đỏ trên đồng hồ để chuyển đổi các thông số: **TMR** (Thời gian tập tính bằng phút:giây), **CNT** (Số vòng đạp đã thực hiện), **CAL** (Ước tính lượng Calo tiêu thụ), **RPM** (Tốc độ vòng quay trên phút) hoặc chế độ **SCAN** (Tự động quét lần lượt các chỉ số).

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Tư thế ngồi chuẩn:** Luôn ngồi tập trên ghế tựa cố định vững chắc. Tuyệt đối không đứng thẳng người đạp trên bàn đạp của máy.
- **Tập vừa sức:** Không nên vặn lực cản quá nặng ngay từ đầu. Người bệnh có tiền sử tăng huyết áp hoặc bệnh tim mạch cần theo dõi nhịp thở, nếu thấy mệt, khó thở hoặc chóng mặt cần dừng tập và nghỉ ngơi ngay.
- **Nhiệt độ ma sát:** Sau khi tập liên tục 20 – 30 phút ở mức kháng lực cao, trục kim loại bên trong có thể sinh nhiệt ấm nhẹ do ma sát cơ học, đây là hiện tượng vật lý bình thường. Sau khi tập xong để máy nguội tự nhiên.
- **Bảo quản:** Thường xuyên lau sạch bụi bẩn và mồ hôi bằng khăn ẩm mềm. Kiểm tra siết lại bu lông định kỳ để đảm bảo máy luôn vận hành êm ái.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** được nghiên cứu thiết kế theo tiêu chuẩn công thái học y sinh học, tối ưu cho việc tập luyện tại nhà mà không chiếm dụng không gian sống:

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Chức năng tập luyện | Đa năng 2 trong 1: Tập đạp chi dưới dưới sàn & Tập quay chi trên trên bàn |
| Cơ chế kháng lực | Núm xoay điều chỉnh vô cấp, tăng giảm độ nặng nhẹ mượt mà theo tiến trình hồi phục |
| Màn hình hiển thị LCD | Đồng hồ điện tử hiển thị đa thông số: Thời gian (Time), Số vòng quay (Count), Calo tiêu thụ (Calories), Tốc độ (RPM) |
| Cấu tạo khung sườn | Thép ống chịu lực cao cấp sơn tĩnh điện chống oxy hóa, chống rỉ sét ăn mòn |
| Thiết kế bàn đạp | Bề mặt vân nổi hạt matxa chống trượt, tích hợp quai cài cao su tùy chỉnh 4 nấc linh hoạt |
| Chân đế giữ thăng bằng | Bọc đệm cao su dẻo có giác hút chống trượt, bám dính chắc chắn trên nền gạch men và sàn gỗ |
| Kích thước tổng thể | Khoảng 40 cm x 35 cm x 30 cm (gọn gàng, dễ dàng xếp gọn dưới gầm giường hoặc gầm bàn) |
| Trọng lượng máy | Khoảng 3.2 kg – 4.5 kg (thuận tiện cho người cao tuổi hoặc người nhà di chuyển bằng một tay) |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Kích hoạt vận động kép cả tay và chân:** Một thiết bị phục vụ toàn diện cho cả bài tập chi trên và chi dưới, tiết kiệm tối đa chi phí mua sắm thiết bị phục hồi.
- **Tập luyện độc lập tại nhà:** Người bệnh có thể vừa ngồi xem tivi, nghe đài vừa đạp xe vận động nhẹ nhàng mỗi ngày mà không phụ thuộc vào người trợ giúp.
- **Kháng lực vô cấp mượt mà:** Cho phép điều chỉnh độ nặng từ mức gần như không trọng lượng cho người mới hồi tỉnh đến kháng lực cơ bắp nặng cho người tập giai đoạn tăng cường.
- **Đồng hồ đo lường tiến độ:** Cung cấp số liệu định lượng trực quan, giúp bệnh nhân và gia đình theo dõi sự tiến bộ từng ngày, tạo động lực tinh thần to lớn trong quá trình điều trị.
- **Thiết kế vững chãi, chống xê dịch:** Chân đế cao su công nghệ mới ôm chặt mặt sàn, hạn chế tối đa độ rung lắc khi bệnh nhân đạp mạnh.`;
  }

  // 5. Đèn hồng ngoại trị liệu (TEC-100083)
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Đèn hồng ngoại trị liệu y tế** là thiết bị vật lý trị liệu quang nhiệt kinh điển, sử dụng bức xạ nhiệt tia hồng ngoại bước sóng ngắn thâm nhập sâu vào các lớp mô dưới da.

Sản phẩm đặc biệt phù hợp với:
- **Người bị đau nhức xương khớp kinh niên, thoái hóa khớp:** Đau mỏi lưng, khớp gối, cổ vai gáy khi trời trở lạnh.
- **Người bị co thắt cơ, căng cơ sau lao động nặng:** Giúp cơ bắp thả lỏng và mềm mại tức thì.
- **Vết thương bầm tím, tụ máu sau chấn thương (đã qua giai đoạn cấp sau 48h):** Tăng tưới máu giúp tan máu bầm nhanh chóng.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn quy định y tế:**
- **Bước 1:** Cắm phích điện vào nguồn 220V.
- **Bước 2:** Đặt đèn cách xa vùng da cần chiếu từ **40cm đến 50cm**. **Tuyệt đối không đặt đèn quá gần dưới 30cm** để tránh nguy cơ bỏng nhiệt da.
- **Bước 3:** Bật công tắc và xoay núm chiết áp để chỉnh nhiệt độ ấm vừa phải, cảm nhận độ nóng ấm lan tỏa êm dịu trên da.
- **Bước 4:** Thời gian chiếu chuẩn: Từ **15 đến 20 phút mỗi lần**, ngày 1 – 2 lần.
- **Bước 5:** Tắt công tắc, để bóng đèn nguội tự nhiên trong 10 phút trước khi di chuyển (tránh rung lắc khi bóng đang nóng dễ đứt tóc bóng đèn).

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Không chiếu đèn trực tiếp vào mắt** (phải nhắm mắt hoặc dùng gạc che mắt nếu chiếu vùng mặt).
- Không dùng cho vết thương đang chảy máu tươi hoặc chấn thương mới trong 24h đầu (cần chườm lạnh, không được chườm nóng).

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Đèn hồng ngoại trị liệu** trang bị bóng đèn chuyên dụng công suất lớn, cổ ngỗng uốn xoay 360° linh hoạt và chiết áp Dimmer điều chỉnh nhiệt độ mượt mà.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Đèn hồng ngoại trị liệu giảm đau |
| Công suất bóng đèn | 150W – 250W bóng thủy tinh chịu nhiệt cao cấp |
| Khoảng cách chiếu chuẩn an toàn | 40 cm – 50 cm |
| Cổ ngỗng điều chỉnh | Thân kim loại dẻo uốn gập 360° định hướng tia sáng linh hoạt |
| Chiết áp điều chỉnh | Núm xoay Dimmer chỉnh độ nóng ấm liu riu đến ấm sâu |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Giãn mạch tăng tưới máu sâu:** Đẩy nhanh quá trình tự chữa lành của các mô cơ tổn thương.
- **Cổ uốn 360° linh hoạt:** Dễ dàng hướng luồng nhiệt chính xác vào lưng, vai hay đầu gối ở mọi tư thế nằm hoặc ngồi.
- **Chân đế đúc gang vững chãi:** Chống đổ ngã an toàn tuyệt đối trong quá trình sử dụng.`;
}
