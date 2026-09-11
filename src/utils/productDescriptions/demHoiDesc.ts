import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getDemHoiDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'GBM / Osada';
  const warranty = product.specifications?.warrantyMonths || 12;
  const warrantyText = getWarrantyText(warranty);

  // 1. Bộ thông tiểu ngắt quãng dành cho Nam / Nữ (TEC-100075, TEC-100076)
  if (name.includes('THÔNG TIỂU') || code === 'TEC-100075' || code === 'TEC-100076') {
    const isMale = name.includes('NAM') || code === 'TEC-100075';
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là bộ dụng cụ thông tiểu ngắt quãng (Intermittent Catheterization) vô trùng tiệt khuẩn y tế, giúp giải phóng bàng quang êm ái, giảm tới 90% nguy cơ nhiễm trùng đường tiết niệu so với việc đặt ống thông tiểu lưu cố định lâu ngày.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh tổn thương tủy sống, bàng quang thần kinh sau tai biến:** Mất phản xạ co bóp cơ bàng quang tự nhiên.
- **Bệnh nhân phì đại tiền liệt tuyến, hẹp niệu đạo:** Thường xuyên bí tiểu cấp hoặc tiểu không hết bàng quang.
- **Bệnh nhân sau phẫu thuật ngoại khoa:** Cần làm rỗng bàng quang định kỳ theo chỉ định của bác sĩ chuyên khoa tiết niệu.
- **Người bệnh cần sự chủ động trong sinh hoạt:** Bộ que thông tiểu đóng túi nhỏ gọn, tiện lợi mang theo khi đi làm hoặc đi xa.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng quy trình vô trùng an toàn:**
- **Bước 1: Chuẩn bị và vệ sinh tay:** Rửa tay kỹ bằng xà phòng dưới vòi nước chảy ít nhất 30 giây, lau khô bằng khăn sạch. Mở túi vô trùng, trải săng lót sạch dưới mông.
- **Bước 2: Sát khuẩn vùng kín:**
  - Dùng gạc tẩm dung dịch sát khuẩn y tế (Betadine hoặc Povidone Iodine) lau nhẹ nhàng lỗ tiểu và khu vực xung quanh theo chiều từ trong ra ngoài.
${isMale ? '  - Ở nam giới: Một tay nâng dương vật thẳng đứng vuông góc 90° so với thân người để làm thẳng đoạn gập niệu đạo trước.\n' : '  - Ở nữ giới: Tách nhẹ hai môi bé để bộc lộ rõ lỗ niệu đạo phía trên âm đạo.\n'}- **Bước 3: Đưa ống thông vào bàng quang:**
  - Cầm ống thông cách đầu ống khoảng 5cm (tuyệt đối không để đầu ống chạm vào bất kỳ bề mặt nào bên ngoài).
  - Nhẹ nhàng luồn đầu ống vào lỗ niệu đạo, đẩy từ từ từng đoạn vào sâu. Người bệnh hít thở sâu, thả lỏng cơ bụng và cơ thắt đáy chậu.
  - Khi thấy nước tiểu bắt đầu chảy ra từ đuôi ống vào túi chứa hoặc bồn cầu, đẩy thêm vào khoảng 2cm nữa rồi giữ yên ống.
- **Bước 4: Làm rỗng bàng quang hoàn toàn:** Đợi nước tiểu chảy hết. Dùng tay ấn nhẹ vùng bụng dưới trên xương mu để tống hết những giọt nước tiểu tồn dư cuối cùng.
- **Bước 5: Rút ống an toàn:** Kẹp gập nhẹ đuôi ống lại rồi từ từ rút ống thông ra ngoài theo đường thẳng. Lau sạch vùng kín và bỏ toàn bộ dụng cụ vào thùng rác y tế (sản phẩm tiệt trùng dùng 1 lần, tuyệt đối không tái sử dụng).

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luôn thao tác nhẹ nhàng, không dùng lực thô bạo. Nếu gặp lực cản chặt, dừng lại bảo người bệnh thở sâu thả lỏng cơ rồi từ từ đưa vào tiếp.
- Uống đủ nước mỗi ngày theo chỉ định của bác sĩ chuyên khoa để hỗ trợ làm sạch hệ tiết niệu tự nhiên.
- Nếu thấy có máu tươi chảy nhiều hoặc sốt cao rét run, ngừng thao tác và liên hệ ngay bác sĩ chuyên khoa.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** sử dụng chất liệu nhựa nhiệt dẻo y tế kháng khuẩn siêu mềm, bề mặt tráng phủ gel bôi trơn y tế trơn láng, đầu ống gia công vi nhiệt bo tròn tuyệt đối (Atraumatic Eyes) giúp ống trượt êm vào bàng quang mà không gây trầy xước niêm mạc niệu đạo.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Cỡ ống thông (Fr) | ${isMale ? 'Fr 12 – Fr 14 (chuẩn giải phẫu nam giới)' : 'Fr 10 – Fr 12 (chuẩn giải phẫu nữ giới)'} |
| Chiều dài ống | ${isMale ? '40 cm (chuyên biệt cho niệu đạo nam)' : '20 cm (gọn gàng, vừa khít niệu đạo nữ)'} |
| Tiệt trùng | Đóng gói vô trùng khí EO từng que riêng biệt |
| Quy cách đóng gói | Bộ sản phẩm kèm găng tay, khăn tẩm cồn sát khuẩn và túi chứa nước tiểu |
| Hạn dùng | 3 năm kể từ ngày sản xuất |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Đầu ống bo nhiệt nhẵn mịn (Atraumatic Eyes):** Bảo vệ tối đa niêm mạc niệu đạo, không gây rách xước hay chảy máu.
- **Gel bôi trơn trượt êm ái:** Thao tác nhẹ nhàng, không gây đau buốt hay khó chịu cho người bệnh.
- **Đóng gói vô trùng khép kín:** An toàn tuyệt đối, loại trừ nguy cơ nhiễm khuẩn ngược dòng lên thận.
- **Chủ động và riêng tư:** Giúp người bệnh tự tin hòa nhập cuộc sống hàng ngày mà không phải đeo túi nước tiểu lưu bên hông.`;
  }

  // 2. Đệm hơi chống loét có bô (GBM-095B, GBM-096B, GBM-073B)
  if (name.includes('B') || code === 'TEC-100068' || code === 'TEC-100069' || code === 'TEC-100070') {
    const isTube = name.includes('096') || code === 'TEC-100069';
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng đệm hơi y tế chống loét chuyên dụng tích hợp lỗ khoét bô vệ sinh thông minh, thiết kế đồng bộ với các dòng giường y tế tay quay/điện có khoang bô hoặc sử dụng bô dẹt trên giường thường.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh nằm liệt giường dài ngày:** Bại liệt sau đột quỵ tai biến, chấn thương sọ não hoặc gãy xương phức tạp.
- **Bệnh nhân cần đi vệ sinh tại giường:** Người chăm sóc chỉ cần rút múi khí rời ra là mở lối cho khoang bô của giường bên dưới, không cần nhấc người bệnh dậy.
- **Người cao tuổi da mỏng yếu:** Các vùng tỳ đè (mông, xương cùng cụt, gót chân, bả vai) rất dễ bị hoại tử loét da nếu nằm đệm mút thông thường.
- **Bệnh viện và các phòng chăm sóc tích cực:** Ngăn ngừa và hỗ trợ điều trị vết loét tỳ đè độ 1, độ 2, độ 3.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Trải đệm:** Trải phẳng tấm đệm hơi lên mặt đệm mút của giường. Đặt đầu có hai vòi dẫn khí hướng về phía đuôi giường. Canh chỉnh lỗ bô của đệm khớp đúng vào nắp bô của giường y tế.
- **Bước 2: Kết nối máy bơm vi áp suất:** Cắm dây dẫn khí đôi một đầu vào hai vòi trên đệm, đầu kia cắm vào hai cổng xuất khí trên máy bơm. Treo máy bơm vào thanh chắn đuôi giường bằng hai móc treo tiện lợi.
- **Bước 3: Bơm căng đệm lần đầu:** Cắm phích điện vào ổ 220V, bật công tắc nguồn và vặn núm xoay áp suất ở mức cao nhất (Max) trong khoảng 15 – 20 phút để các múi khí căng phồng đều.
- **Bước 4: Điều chỉnh độ êm ái:** Đặt người bệnh nằm lên đệm, vặn núm xoay áp suất về mức trung bình hoặc theo thể trọng (khoảng số 3 – 4) để các múi khí có độ nhún êm ái đàn hồi nâng đỡ tốt nhất.
- **Bước 5: Thao tác khi người bệnh đi vệ sinh:**
  - Nhấc múi khí rời ngay vị trí mông ra ngoài.
  - Mở nắp bô giường y tế để bô đưa lên sát mông người bệnh đi vệ sinh.
  - Xong việc, vệ sinh sạch sẽ, hạ bô giường xuống và lắp lại múi khí đệm vào rãnh cũ.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Máy bơm phải cắm điện chạy liên tục 24/24h** để duy trì chu trình đảo khí luân phiên đều đặn. Máy tiêu thụ điện năng cực thấp chỉ khoảng 7W (tương đương bóng đèn ngủ).
- Không đặt các vật nhọn (kéo, dao cạo, kim tiêm) lên mặt đệm.
- Nên trải thêm một tấm ga mỏng bằng vải cotton thoáng khí lên trên đệm để thấm hút mồ hôi tối ưu.
- Vệ sinh bề mặt đệm bằng khăn mềm thấm nước ấm xà phòng hoặc cồn y tế lau sạch, không dùng bàn chải cứng cọ xát mạnh.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** hoạt động theo nguyên lý chu kỳ van đảo áp lực kép A-B tự động mỗi 6 – 8 phút: Nhóm múi A căng phồng nâng đỡ thì nhóm múi B xẹp xuống giải phóng điểm tỳ đè, sau đó luân phiên ngược lại, kích thích vi tuần hoàn máu dưới da nuôi dưỡng mô liên tục suốt ngày đêm.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Kích thước đệm | Dài 200 cm x Rộng 90 cm x Dày 7.5 cm (chuẩn kích thước giường bệnh) |
| Cấu trúc múi khí | ${isTube ? 'Dạng 22 ống tròn độc lập bằng TPU bọc vải dù cao cấp (kèm lỗ bô)' : 'Hơn 130 múi quả trám dập nhiệt cao tần (kèm khoang bô rút rời)'} |
| Chu kỳ đảo khí | 6 – 8 phút / chu kỳ tự động đảo chiều áp suất |
| Độ ồn máy bơm | Siêu êm ≤ 20 dB (vận hành êm ru suốt đêm ngày) |
| Tải trọng tối đa | 130 kg – 150 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Khoang bô rút rời thông minh:** Đi vệ sinh trực tiếp tại giường mà không cần di chuyển hay bê nhấc người bệnh.
- **Đảo khí luân phiên 24/7:** Ngăn ngừa 100% nguy cơ hình thành vết loét tỳ đè do nằm bất động.
- **Máy bơm siêu tĩnh âm:** Hoạt động bền bỉ, không rung lắc, giữ trọn giấc ngủ sâu cho người bệnh.
- **Chất liệu PVC/TPU y tế kháng khuẩn:** Chống thấm nước tiểu, dễ lau chùi khử khuẩn hằng ngày.`;
  }

  // 3. Đệm hơi chống loét tiêu chuẩn không bô (GBM-095, GBM-096, Osada SD-AM05, SD-AM01)
  const isTube = name.includes('096') || name.includes('AM05');
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là đệm hơi y tế chống loét cao cấp thế hệ mới, giải pháp vàng giúp phòng ngừa và hỗ trợ điều trị loét da tỳ đè (Bedsores) ở người bệnh phải nằm dài ngày trên giường bệnh hoặc giường ngủ gia đình.

Sản phẩm phù hợp với:
- **Người bệnh đột quỵ tai biến, chấn thương sọ não:** Nằm liệt giường, mất khả năng tự trở mình.
- **Bệnh nhân sau phẫu thuật xương đùi, khớp háng, cột sống:** Bắt buộc phải nằm bất động trong thời gian dài điều trị.
- **Người cao tuổi suy kiệt thể lực:** Khối cơ teo nhót, xương nhô cao dễ bị cấn ép gây thâm tím hoại tử da.
- **Gia đình chăm sóc bệnh nhân tại nhà:** Giảm thiểu công sức lật trở bệnh nhân liên tục suốt ngày đêm.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Trải đệm:** Đặt đệm hơi phẳng phiu lên trên đệm giường. Hướng vòi cắm khí về phía đuôi giường. Gài hai vạt bạt ở hai đầu đệm xuống dưới đáy đệm giường để cố định tấm đệm không bị xô lệch.
- **Bước 2: Kết nối máy bơm:** Cắm ống dẫn khí đôi vào hai đầu vòi trên đệm và hai cổng trên máy bơm. Dùng móc treo chuyên dụng treo máy bơm vào thành chắn đuôi giường.
- **Bước 3: Bơm căng đệm:** Cắm điện máy bơm vào nguồn 220V, bật công tắc nguồn và vặn núm điều chỉnh áp suất lên nấc lớn nhất (Max) trong khoảng 15 – 20 phút.
- **Bước 4: Cân chỉnh độ êm ái:** Cho người bệnh nằm lên đệm. Vặn núm xoay áp suất về mức vừa vặn theo thể trọng của người bệnh (khoảng số 3 – 4) để các múi khí có độ nhún đàn hồi êm ái nhất.
- **Bước 5: Vận hành liên tục:** Cắm điện cho máy bơm hoạt động liên tục 24/24h trong suốt thời gian người bệnh nằm dưỡng bệnh.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luôn cắm máy bơm hoạt động liên tục suốt ngày đêm. Trong trường hợp mất điện, đệm vẫn duy trì được độ căng nâng đỡ trong 1 – 2 giờ.
- Không để các vật sắc nhọn chọc vào bề mặt đệm.
- Trải thêm một tấm ga mỏng bằng vải cotton thoáng mát lên mặt đệm để tạo cảm giác êm ái và thấm hút mồ hôi.
- Khi lau chùi, dùng khăn mềm thấm nước ấm hoặc cồn y tế lau nhẹ nhàng, không phơi trực tiếp dưới nắng gắt.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** vận hành theo nguyên lý đảo chiều áp lực khí chu kỳ kép: Hệ thống múi khí được chia làm 2 nhánh độc lập A và B, máy bơm liên tục bơm căng nhánh này và xả nhánh kia mỗi 6 – 8 phút, giúp bề mặt tiếp xúc da luôn được thay đổi vị trí, lưu thông tuần hoàn máu nuôi dưỡng mô liên tục.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Kích thước đệm | Dài 200 cm x Rộng 90 cm x Dày 7 cm |
| Cấu trúc múi khí | ${isTube ? 'Múi dạng thanh ống tròn nằm ngang độc lập bằng TPU bọc vải dù' : 'Hơn 130 múi khí quả trám dập nhiệt cao tần chống thấm'} |
| Chu kỳ đảo áp suất | 6 – 8 phút / chu kỳ tự động |
| Công suất tiêu thụ điện | 7 Watt (siêu tiết kiệm điện năng) |
| Độ ồn máy bơm | ≤ 20 dB (vận hành êm ru trong đêm) |
| Tải trọng chịu lực | 120 kg – 140 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Công nghệ đảo khí luân phiên A-B:** Đảm bảo các mao mạch máu dưới da không bao giờ bị đè nén thiếu máu cục bộ, ngăn ngừa hoại tử da.
- **Máy bơm tĩnh âm tiết kiệm điện:** Vận hành êm ái 24/7, điện năng tiêu thụ chỉ ngang một bóng đèn ngủ nhỏ.
- **Vạt đuôi đệm chống trượt:** Giữ tấm đệm luôn cố định phẳng phiu trên giường bệnh.
- **Chất liệu y tế đạt chuẩn:** Êm ái, kháng khuẩn, không gây kích ứng da người bệnh.`;
}
