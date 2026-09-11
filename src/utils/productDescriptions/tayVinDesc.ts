import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getTayVinDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'ATMOR';
  const warranty = product.specifications?.warrantyMonths || 24;
  const warrantyText = getWarrantyText(warranty);

  // 1. Khung tay vịn bồn cầu (TEC-100054)
  if (name.includes('BỒN CẦU') || code === 'TEC-100054') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Khung tay vịn bồn cầu ATMOR** là giải pháp cải tạo nhà vệ sinh an toàn thiết yếu, giúp người dùng tự chủ đứng lên - ngồi xuống mà không lo bị chóng mặt hay té ngã nguy hiểm trong phòng tắm.

Sản phẩm đặc biệt phù hợp với:
- **Người cao tuổi:** Khớp gối thoái hóa, chân run yếu, khó khăn khi đứng dậy từ bệ bồn cầu thấp.
- **Bệnh nhân sau phẫu thuật xương khớp, tai biến:** Cần điểm tựa chắc chắn hai bên để phân bổ trọng lực đều hai tay.
- **Phụ nữ mang thai những tháng cuối:** Bụng nặng, khó giữ thăng bằng và cúi gập người.
- **Gia đình không muốn khoan đục tường gạch:** Lắp đặt kẹp ngàm độc lập, không làm nứt vỡ gạch ốp lát của nhà tắm.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Lắp đặt vào bồn cầu:**
  - Đặt khung ôm quanh bệ bồn cầu.
  - Điều chỉnh thanh giằng ngang và siết chặt ốc định vị sao cho hai tay vịn nằm cân đối hai bên hông bồn cầu.
  - Nhấn mạnh 4 chân đế cao su xuống nền gạch để giác hút bám dính tuyệt đối vào mặt sàn.
- **Bước 2: Thao tác khi ngồi xuống:** Đứng quay lưng lại bồn cầu, hai tay nắm chắc vào hai thanh tay vịn, từ từ hạ thấp trọng tâm ngồi xuống bệ bồn cầu.
- **Bước 3: Thao tác khi đứng dậy:** Cúi nhẹ người về phía trước, hai bàn tay nắm chặt tay vịn và ấn mạnh lực tay xuống để nâng cơ thể đứng thẳng lên an toàn.
- **Bước 4: Vệ sinh định kỳ:** Dùng khăn ẩm và xà phòng lau sạch bề mặt tay vịn mỗi tuần.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Đảm bảo mặt sàn nơi đặt chân hít cao su sạch sẽ, không đọng rêu mốc để giác hút bám chắc nhất.
- Kiểm tra các núm xoay siết ốc định kỳ để khung luôn giữ độ căng vững chãi.
- Không để trẻ em đu bám hoặc trèo lên thanh tay vịn.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Khung tay vịn bồn cầu ATMOR** sử dụng ống thép Inox dày dặn chịu lực nén tỳ lên tới 150kg. Tay nắm bọc hạt nhựa ABS có vân gai ma sát chống trượt kể cả khi tay dính nước xà phòng.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Khung tay vịn bồn cầu an toàn ATMOR |
| Thương hiệu | ATMOR |
| Chất liệu khung | Inox 304 không rỉ kết hợp vỏ bọc hạt nhựa ABS chống trượt |
| Chiều cao tay vịn | 65 cm – 75 cm (tùy chỉnh 5 nấc độ cao) |
| Chiều rộng lòng khung | 50 cm – 60 cm (ôm vừa mọi bồn cầu tiêu chuẩn) |
| Chân tiếp đất | 4 giác hút chân không cao su siêu bám |
| Tải trọng chịu lực | 150 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Không cần khoan đục tường:** Lắp đặt dễ dàng trong 5 phút, bảo toàn thẩm mỹ cho phòng tắm gia đình.
- **Giác hút chân không chống trượt:** Bám dính chắc chắn trên sàn gạch men ướt nước, không xê dịch.
- **Tùy chỉnh đa chiều linh hoạt:** Điều chỉnh cả chiều cao và chiều rộng lòng khung theo vóc dáng người dùng.
- **Bề mặt sần hạt chống trượt:** Cầm nắm chắc tay, an toàn tối đa cho người già và phụ nữ mang thai.`;
  }

  // 2. Thanh tay vịn chữ T gập mở 90 độ (TEC-100053)
  if (name.includes('CHỮ T') || code === 'TEC-100053') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Thanh tay vịn NKT chữ T gập mở ATMOR** là dòng tay vịn chuyên dụng dành cho người khuyết tật và người cao tuổi, thường được lắp đặt sát bên cạnh bồn cầu bệt hoặc bồn tắm.

Sản phẩm phù hợp với:
- **Người cao tuổi, người khuyết tật:** Cần thanh vịn chịu lực kiên cố để chuyển người từ xe lăn sang bồn cầu.
- **Phòng tắm gia đình có diện tích nhỏ:** Có thể gập dựng đứng 90° sát vào tường khi không dùng để tiết kiệm không gian.
- **Bệnh viện, khách sạn, trung tâm dưỡng lão:** Trang bị chuẩn mực cho phòng vệ sinh tiếp cận cho người khuyết tật.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Quy trình lắp đặt chuẩn kỹ thuật:**
  - Đo chiều cao chuẩn từ mặt sàn lên đến mặt trên tay vịn là 70cm – 75cm.
  - Áp mặt bích kim loại vào tường bên cạnh bồn cầu, lấy dấu các lỗ khoan trên tường bê tông.
  - Dùng mũi khoan bê tông phi 10 (10mm) khoan sâu khoảng 6cm.
  - Đóng tắc kê nở sắt chịu lực, siết chặt bu lông Inox bằng cờ lê và đậy nắp chụp thẩm mỹ.
  - Tỳ thử toàn bộ trọng lượng người lớn để kiểm tra độ cứng vững.
- **Bước 2: Thao tác sử dụng:** Kéo thanh tay vịn hạ xuống vị trí nằm ngang song song mặt sàn trước khi ngồi xuống bồn cầu. Đi vệ sinh xong, đẩy nhẹ thanh dựng đứng lên sát tường.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Bắt buộc gắn vít vào tường gạch đặc hoặc bê tông chịu lực; không lắp vào vách thạch cao rỗng.
- Kiểm tra độ siết của bu lông định kỳ 6 tháng một lần.
- Vệ sinh bề mặt bằng khăn ẩm, tránh hóa chất tẩy rửa axit cực mạnh.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Thanh tay vịn chữ T ATMOR** có lõi Inox 304 đúc nguyên khối dày 1.5mm, vỏ ngoài bọc nhựa nguyên sinh ABS dày 4mm dập nổi vân gai ma sát, tích hợp vòng huỳnh quang phát sáng trong đêm và móc treo giấy vệ sinh tiện dụng.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Thanh tay vịn chữ T gập mở 90° ATMOR |
| Thương hiệu | ATMOR |
| Cấu tạo vật liệu | Lõi Inox 304 nguyên khối + Vỏ nhựa nguyên sinh ABS kháng khuẩn |
| Chiều dài vươn ra | 60 cm – 70 cm |
| Cơ chế gập | Khớp bản lề gập đứng 90° có giảm chấn |
| Tính năng an toàn | Vòng huỳnh quang tự phát sáng trong đêm + Móc treo giấy vệ sinh |
| Tải trọng chịu lực | 200 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Chịu tải trọng siêu khủng 200kg:** An tâm tuyệt đối ngay cả khi người dùng dồn toàn bộ trọng lượng cơ thể.
- **Gập đứng 90° gọn gàng:** Tối ưu hóa không gian cho phòng tắm gia đình có diện tích khiêm tốn.
- **Vỏ ABS chống lạnh tay và kháng khuẩn:** Cầm êm, ấm áp vào mùa đông và không lo trơn trượt khi ướt bọt xà phòng.
- **Vòng dạ quang phát sáng trong bóng tối:** Giúp người lớn tuổi dễ dàng nhận biết vị trí tay vịn vào ban đêm.`;
  }

  // 3. Thanh tay vịn nhà tắm thẳng/chữ L (TEC-100052)
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Thanh tay vịn nhà tắm chống trượt ATMOR** là phụ kiện an toàn thiết yếu lắp đặt dọc tường phòng tắm, buồng tắm đứng hoa sen, khu vực bồn cầu hoặc bậc thềm cửa.

Sản phẩm phù hợp với:
- **Người lớn tuổi, người bệnh xương khớp:** Cần điểm tựa nắm chắc chắn trong suốt thời gian tắm đứng hoặc đi vệ sinh.
- **Phụ nữ mang thai và trẻ nhỏ:** Phòng ngừa trơn trượt trên sàn nhà tắm ẩm ướt xà phòng.
- **Các gia đình có người cao tuổi:** Nâng cấp không gian sống an toàn, phòng chống tai nạn té ngã tại nhà.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Vị trí lắp đặt khuyên dùng:**
  - *Khu vực vòi sen tắm:* Lắp thanh thẳng đứng hoặc nằm ngang ở độ cao 90cm – 110cm để vịn khi đứng tắm.
  - *Khu vực bồn cầu:* Lắp thanh ngang ở độ cao 70cm – 75cm bên cạnh bồn cầu để vịn đứng lên ngồi xuống.
  - *Bậc cửa / hành lang:* Lắp nghiêng theo chiều dốc bước chân.
- **Bước 2: Lắp đặt:** Lấy dấu lỗ khoan trên tường bê tông phẳng, dùng mũi khoan phi 8, đóng tắc kê nở và siết chặt vít Inox đi kèm, sau đó xoay nắp chụp thẩm mỹ che kín mặt bích.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Lắp đặt trên bề mặt tường bê tông hoặc gạch ốp lát kiên cố.
- Lau sạch bọt xà phòng sau khi tắm để giữ độ ma sát của các hạt gai luôn ở trạng thái tốt nhất.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Thanh tay vịn ATMOR** sở hữu lõi Inox 304 không gỉ kết hợp lớp vỏ bọc nhựa ABS dập nổi hạt gai ma sát hình quả trám, tích hợp 2 vòng dạ quang huỳnh quang tự phát sáng xanh dịu ban đêm.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Thanh tay vịn nhà tắm chống trượt ATMOR |
| Thương hiệu | ATMOR |
| Chiều dài thanh | 38 cm / 48 cm / 58 cm |
| Đường kính ống | Phi 35 mm (chuẩn công thái học vừa vặn lòng bàn tay) |
| Cấu tạo | Lõi ống Inox 304 chịu lực + Vỏ ngoài hạt nhựa ABS vân sần |
| Vòng dạ quang | 2 vòng huỳnh quang phát sáng xanh trong bóng tối |
| Tải trọng tối đa | 150 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Không trơn trượt khi ướt bọt xà phòng:** Hạt gai ABS quả trám tạo lực bám tuyệt vời cho lòng bàn tay.
- **Không buốt tay vào mùa lạnh:** Lớp vỏ nhựa cách nhiệt giữ cho cảm giác tiếp xúc luôn ấm áp, dễ chịu.
- **Lõi Inox 304 chịu tải 150kg:** Bền bỉ vĩnh cửu theo thời gian, không hoen rỉ trong môi trường ẩm ướt.
- **Dạ quang định vị ban đêm:** An toàn tối đa khi người già thức giấc đi vệ sinh trong đêm tối.`;
}
