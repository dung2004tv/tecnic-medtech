import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getXeLanDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'GBM / Lucass';
  const warranty = product.specifications?.warrantyMonths || 12;
  const warrantyText = getWarrantyText(warranty);

  // 1. Xe lăn ngả nằm đa năng có bô & nâng chân (X-7A, X-72, GBM-065B)
  if (name.includes('X-7') || code === 'TEC-100017' || code === 'TEC-100018' || code === 'TEC-100016') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng xe lăn ngả nằm đa năng toàn diện cao cấp, kết hợp khả năng ngả lưng thành giường nằm mini 180°, bàn nâng hạ chân chống phù nề và bô vệ sinh chống tràn tại chỗ.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh liệt nửa người sau tai biến, đột quỵ:** Không tự ngồi vững, cần gối tựa đầu nâng đỡ đốt sống cổ và tựa lưng êm ái.
- **Bệnh nhân sau chấn thương sọ não, chấn thương cột sống:** Cần thay đổi tư thế nằm - ngồi luân phiên để tránh loét tỳ đè và chống tụ máu ứ trệ.
- **Người cao tuổi suy kiệt thể lực nặng:** Cần sinh hoạt, ăn uống, đi vệ sinh và nằm ngủ trực tiếp ngay trên xe.
- **Người chăm sóc cần thiết bị hỗ trợ toàn năng:** Giảm thiểu tối đa việc phải bế ẵm, bưng vác người bệnh qua lại giữa giường và xe lăn.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn theo chuyên gia chăm sóc y tế:**
- **Bước 1: Mở xe lăn:** Đứng bên cạnh xe, dùng hai lòng bàn tay ấn đều xuống hai mép đệm ngồi cho đến khi khung xe mở rộng hết cỡ và mặt đệm căng phẳng hoàn toàn. Gạt hai bàn để chân xuống.
- **Bước 2: Hỗ trợ người bệnh lên xe:**
  - **Khóa chặt cần gạt phanh hai bên bánh sau.**
  - Gạt hai bàn để chân xoay sang hai bên để người bệnh dễ dàng đặt chân xuống sàn.
  - Dìu người bệnh ngồi lọt vào giữa ghế, sau đó gạt bàn để chân trở lại và đặt hai bàn chân lên bàn đạp.
- **Bước 3: Thao tác ngả lưng nằm (90° – 180°):**
  - Người chăm sóc đứng phía sau xe, hai tay nắm tay đẩy.
  - Bóp giữ cả 2 cần gạt ngả lưng (ở dưới tay đẩy) đồng thời từ từ hạ tựa lưng về phía sau đến góc nằm mong muốn.
  - Khi đạt độ ngả phù hợp, thả cần gạt ra để chốt cơ khí tự động khóa chặt góc nằm.
- **Bước 4: Nâng gác chân duỗi thẳng chống phù nề:** Nắm thanh đỡ bắp chân nâng lên từng nấc đến góc mong muốn (tự động khóa nấc). Khi muốn hạ chân xuống, gạt nhẹ lẫy mở khóa dưới khớp nâng.
- **Bước 5: Sử dụng bô vệ sinh tại chỗ:**
  - Khóa phanh bánh xe cố định.
  - Nhấc tấm đệm da chữ U ở giữa mặt ghế ra ngoài.
  - Cho bệnh nhân đi vệ sinh vào bô bên dưới.
  - Kéo bô ra từ phía sau hoặc nhấc thẳng lên mang đi xử lý, vệ sinh sạch sẽ bằng xà phòng rồi trượt lại vào rãnh đỡ.
- **Bước 6: Gấp gọn xe:** Tháo tựa đầu, rút bô vệ sinh ra ngoài, gập bàn để chân lên và kéo mạnh quai giữa mặt đệm ghế lên trên để xe tự khép lại.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Bắt buộc hạ 2 bánh phụ chống lật phía sau xuống** trước khi cho người bệnh ngả lưng quá 120° để loại trừ hoàn toàn nguy cơ lật ngửa xe ra sau.
- Luôn gạt khóa phanh hai bánh xe sau trước khi bế hoặc đỡ người bệnh lên/xuống xe.
- Không để người bệnh đứng trực tiếp lên bàn để chân khi lên xuống xe để tránh bị chúi đầu xe về phía trước.
- Vệ sinh và phơi khô đệm ngồi sau khi lau chùi để bảo vệ lớp da simili bền đẹp.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** sử dụng khung thép mạ crom hoặc sơn tĩnh điện cường lực chịu tải trọng lên tới 120kg. Hệ thống ngả lưng đa cấp độ vận hành bằng thanh đẩy thủy lực hoặc răng cưa cơ khí chính xác, êm ái, không gây giật cục làm người bệnh giật mình. Đệm ngồi bọc da simili cao cấp chống thấm nước tiểu, dễ dàng lau chùi khử khuẩn.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Độ ngả tựa lưng | Điều chỉnh đa góc từ 90° đến 180° (thành giường nằm) |
| Nâng hạ chân | Góc tùy biến 0° đến 90° có tấm đệm đỡ bắp chân |
| Phụ kiện chuyên sâu | Tựa đầu nâng đỡ cổ tháo rời + 2 bánh phụ chống lật phía sau |
| Bô vệ sinh | Bô nhựa cao cấp có nắp đậy kín mùi, rút trượt phía sau |
| Chất liệu khung | Thép hợp kim mạ crom sáng bóng chống han rỉ |
| Đệm ghế ngồi | Mút xốp đàn hồi bọc da simili chống thấm nước |
| Tải trọng tối đa | 120 kg |
| Trọng lượng | ~22 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Biến đổi linh hoạt từ xe lăn thành giường ngủ mini:** Giúp người bệnh ngả lưng chợp mắt mọi lúc mà không cần chuyển người sang giường.
- **Nâng bắp chân chống ứ trệ tĩnh mạch:** Hỗ trợ phục hồi tuần hoàn máu chi dưới cho bệnh nhân phải ngồi lâu ngày.
- **Bô vệ sinh khép kín tiện nghi:** Giữ vệ sinh tuyệt đối và không gian sinh hoạt thoáng đãng cho cả gia đình.
- **Bánh phụ chống lật tuyệt đối an toàn:** An tâm khi ngả phẳng 180 độ, bảo vệ trọn vẹn sự an toàn của người bệnh.`;
  }

  // 2. Xe lăn tay có bô vệ sinh (X-8, GBM-061C, GBM-061D)
  if (name.includes('X-8') || name.includes('GHẾ BÔ') || code === 'TEC-100022' || code === 'TEC-100019' || code === 'TEC-100020') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng xe lăn tay tiêu chuẩn y tế tích hợp bô vệ sinh chuyên dụng ngay dưới gầm ghế, vừa dùng để di chuyển người bệnh trong nhà và ngoài trời, vừa phục vụ việc đi vệ sinh tại chỗ nhanh chóng, giữ gìn sự tự chủ và riêng tư cho người sử dụng.

Sản phẩm phù hợp với:
- **Người cao tuổi đi lại khó khăn:** Chân yếu, khó đi bộ vào nhà vệ sinh đặc biệt vào ban đêm.
- **Người bệnh suy giảm khả năng vận động chi dưới:** Cần phương tiện di chuyển hàng ngày và giải quyết nhu cầu bài tiết tại chỗ.
- **Người khuyết tật:** Vừa có thể tự lăn tay tập thể lực, vừa tiện lợi trong sinh hoạt cá nhân.
- **Gia đình có không gian nhà tắm hẹp:** Xe lăn kiêm ghế bô vệ sinh giúp tiết kiệm tối đa không gian và chi phí thiết bị.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Mở xe và chuẩn bị:** Mở rộng hai bên khung xe sang hai bên, ấn phẳng mặt đệm ghế ngồi. Đặt bô vệ sinh vào ray trượt dưới ghế.
- **Bước 2: Hỗ trợ người bệnh lên xe:** Gạt cần phanh khóa cứng hai bánh sau. Dựng thẳng bàn để chân lên, dìu người bệnh ngồi xuống ngay ngắn rồi gạt bàn để chân xuống và đặt chân lên.
- **Bước 3: Sử dụng bô vệ sinh:**
  - Khóa phanh xe tại chỗ an toàn.
  - Nhấc miếng đệm nắp bô ở chính giữa ghế ngồi ra ngoài.
  - Cho người bệnh đi vệ sinh trực tiếp vào bô (nắp đậy ngăn mùi bên dưới).
  - Sau khi dùng xong, trượt kéo bô ra từ phía sau hoặc nhấc bô lên, mang đi đổ và vệ sinh súc rửa sạch sẽ.
  - Đặt bô lại vào ray trượt và đậy tấm đệm da lên ghế.
- **Bước 4: Tự lăn xe hoặc người nhà đẩy:** Người bệnh dùng hai tay nắm vành lăn phụ bên ngoài bánh xe để tự lăn di chuyển; hoặc người nhà đẩy bằng hai tay cầm phía sau.
- **Bước 5: Gấp gọn cất giữ:** Rút bô vệ sinh ra ngoài, gạt bàn để chân lên, cầm hai quai giữa mặt đệm ghế nhấc thẳng lên để xe thu gọn lại.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luôn khóa cần phanh bánh xe trước khi người bệnh ngồi xuống hoặc đứng lên khỏi xe.
- Không để người bệnh đứng tỳ trọng lượng lên bàn để chân khi lên xuống xe.
- Thường xuyên vệ sinh bô sạch sẽ bằng xà phòng hoặc dung dịch sát khuẩn y tế.
- Kiểm tra áp suất hoặc độ mòn của bánh xe định kỳ.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** được thiết kế với khung thép mạ crom sáng bóng chịu lực nén va đập cao, vành nan hoa bánh sau 24 inch trợ lực lăn êm ái cùng hệ thống bô vệ sinh rút trượt tiện lợi. Đệm ghế bọc da simili chống thấm nước tiểu tuyệt đối.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Chiều rộng ghế ngồi | 46 cm (khoảng cách ngồi rộng rãi) |
| Chiều sâu ghế ngồi | 40 cm |
| Chiều cao mặt ghế | 50 cm so với mặt đất |
| Bánh sau | 24 inch vành căm nan hoa có vành lăn tay trợ lực |
| Bánh trước | 8 inch xoay 360 độ điều hướng linh hoạt |
| Bô vệ sinh | Bô nhựa y tế cao cấp có nắp đậy khít mùi, có quai xách |
| Tải trọng tối đa | 100 kg |
| Trọng lượng | ~18 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Tích hợp 2 trong 1 hoàn hảo:** Vừa là xe lăn di chuyển ra ngoài trời, vừa là bô vệ sinh tiện lợi ngay trong phòng ngủ.
- **Vành lăn tay trợ lực:** Cho phép người bệnh chủ động tự lăn xe di chuyển xung quanh nhà, tăng cường vận động tay.
- **Ray trượt bô tiện lợi:** Rút bô từ phía sau nhẹ nhàng mà không làm phiền người đang ngồi trên xe.
- **Chất liệu da chống thấm nước:** Dễ dàng vệ sinh, kháng mùi hôi và ẩm mốc hiệu quả.`;
  }

  // 3. Xe lăn du lịch nhôm siêu nhẹ gấp gọn (GBM-061E, GBM-064A, GBM-064B)
  if (name.includes('061E') || name.includes('064') || code === 'TEC-100023' || code === 'TEC-100024' || code === 'TEC-100025') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng xe lăn du lịch hợp kim nhôm siêu nhẹ thế hệ mới, thiết kế gập siêu gọn chuyên dùng cho gia đình thường xuyên đưa người cao tuổi đi dạo phố, đi du lịch, về quê hay đi khám bệnh bằng ô tô hoặc xe máy.

Sản phẩm phù hợp với:
- **Người lớn tuổi:** Cần phương tiện gọn gàng, êm ái để đi khám bệnh tại bệnh viện đông đúc hoặc dạo chơi công viên.
- **Gia đình thường xuyên di chuyển:** Cần chiếc xe lăn trọng lượng siêu nhẹ dưới 10kg, có thể bỏ vừa cốp mọi dòng xe ô tô kể cả xe hatchback nhỏ.
- **Người có sức vóc khiêm tốn:** Phụ nữ hoặc người già đều có thể nhấc bổng xe bằng một tay nhẹ nhàng.
- **Người cần ngồi thoáng mát:** Đệm ngồi lưới tổ ong 3D tản nhiệt siêu thoáng, không lo hầm bí vào mùa hè.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Mở xe chỉ trong 3 giây:**
  - Dựng thẳng tựa lưng lên cho đến khi nghe tiếng "Tách" (khóa ngàm tựa lưng đã ăn khớp 100%).
  - Tách hai bên thành xe ra và ấn mép ghế ngồi xuống phẳng hoàn toàn.
  - Gạt bàn để chân xuống vị trí nằm ngang.
- **Bước 2: Cho người ngồi lên xe:** Khóa phanh hãm bánh sau. Cho người ngồi vào ghế, thắt khóa đai an toàn qua eo bụng và căn chỉnh độ căng dây vừa vặn.
- **Bước 3: Đẩy và kiểm soát phanh:** Người đẩy giữ chắc hai tay cầm, bóp nhẹ cần phanh tay phía sau khi xuống dốc để hãm tốc độ mượt mà.
- **Bước 4: Xếp gọn xe:**
  - Mở chốt đai an toàn bụng.
  - Gạt bàn để chân lên thẳng đứng.
  - Bóp hai lẫy gập phía sau tựa lưng để hạ phần tựa lưng gãy xuống.
  - Cầm hai quai kéo ở giữa mặt ghế nhấc thẳng lên, xe sẽ thu gọn lại bằng kích thước một chiếc vali xách tay.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luôn kiểm tra lẫy khóa tựa lưng đã vào ngàm chắc chắn trước khi cho người ngồi tựa lưng ra sau.
- Luôn cài dây đai an toàn qua eo khi di chuyển ngoài đường phố hoặc qua nơi gồ ghề.
- Không để vật nặng quá tải trọng 100kg lên xe.
- Giặt sạch đệm lưới định kỳ bằng nước ấm và xà phòng nhẹ, phơi nơi râm mát.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** được đúc từ hợp kim nhôm định hình hàng không siêu nhẹ, trọng lượng toàn bộ xe chỉ từ 9.5kg đến 11kg. Bánh xe sử dụng lốp cao su đặc PU nguyên khối không cần bơm hơi, không bao giờ lo thủng lốp hay xì hơi khi đang di chuyển ngoài đường.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Trọng lượng siêu nhẹ | 9.5 kg – 11.5 kg (nhấc bổng bằng 1 tay) |
| Kích thước gấp gọn | 70 cm x 30 cm x 65 cm (nhỏ gọn như vali) |
| Chất liệu khung | Hợp kim nhôm định hình phủ sơn tĩnh điện nano chống xước |
| Đệm ghế ngồi | Lưới tổ ong 3D tản nhiệt siêu thoáng khí, tháo rời giặt được |
| Bánh xe | Bánh trước 6 inch xoay 360°, bánh sau 12-16 inch lốp cao su đặc PU |
| Hệ thống an toàn | Phanh tay hãm cho người đẩy + Đai an toàn thắt bụng |
| Tải trọng tối đa | 100 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Gập gọn siêu tốc:** Tựa lưng gập gãy đôi thông minh giúp xe bỏ gọn vào cốp xe ô tô hoặc chở phía trước xe máy dễ dàng.
- **Trọng lượng siêu nhẹ:** Loại bỏ hoàn toàn sự mệt mỏi, nặng nhọc khi phải khuân vác xe lăn truyền thống.
- **Đệm lưới 3D tổ ong thoáng khí:** Giữ cho vùng lưng và mông luôn mát mẻ, chống hăm loét da hiệu quả.
- **Lốp cao su đặc PU không săm:** Vận hành êm ái, bám đường tốt và không tốn công bơm vá bảo trì.`;
  }

  // 4. Xe lăn sắt tiêu chuẩn X-9
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Xe lăn sắt tiêu chuẩn X-9** là dòng xe lăn cơ bản phổ thông, bền bỉ và kinh tế nhất, là thiết bị hỗ trợ vận động không thể thiếu tại các bệnh viện, phòng khám, viện dưỡng lão và các hộ gia đình.

Sản phẩm phù hợp với:
- **Bệnh viện và cơ sở y tế:** Trang bị tại sảnh đón tiếp, khoa phục hồi chức năng để tiếp nhận bệnh nhân.
- **Người già, người tàn tật chi dưới:** Sử dụng đi lại hằng ngày với chi phí tiết kiệm tối ưu.
- **Người cần vận động tay:** Vành lăn trợ lực bánh sau 24 inch giúp người bệnh tự tập luyện thể lực cánh tay.
- **Người cần độ chịu lực và độ bền dài lâu:** Khung sắt sơn tĩnh điện/mạ crom dày dặn có tuổi thọ trên 10 năm.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Mở xe:** Đặt hai bàn tay lên hai thanh khung hai bên đệm ngồi, ấn mạnh xuống dưới cho đến khi mặt đệm căng phẳng hoàn toàn. Gạt hai bàn để chân xuống.
- **Bước 2: Hỗ trợ người bệnh lên xe:**
  - Gạt hai cần phanh hãm ở hai bánh sau về phía trước để khóa cứng bánh xe.
  - Gạt bàn để chân dựng đứng lên để tránh người bệnh dẫm chân làm bập bênh mũi xe.
  - Dìu người bệnh ngồi lọt vào lòng ghế rồi hạ bàn để chân xuống và đặt chân lên.
  - Nhả cần phanh hãm ra sau để bắt đầu di chuyển.
- **Bước 3: Cách tự lăn tay:** Người ngồi cầm vào hai vành lăn phụ bên ngoài bánh xe, đẩy đều hai tay về phía trước để đi thẳng, đẩy tay trái để rẽ phải và ngược lại.
- **Bước 4: Cách xếp gọn:** Gạt hai bàn để chân lên thẳng đứng. Cầm chính giữa mặt đệm ngồi nhấc bổng lên, khung giằng chữ X sẽ tự động ép hai bên xe sát lại với nhau.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Tuyệt đối không đứng tỳ chân lên bàn để chân khi lên hoặc xuống xe lăn.
- Luôn khóa cần phanh bánh xe khi xe dừng trên đoạn đường dốc hoặc khi chuyển người bệnh sang giường.
- Thường xuyên lau sạch bùn đất trên nan hoa bánh xe sau khi đi mưa để bảo vệ lớp mạ crom bền đẹp.
- Tra dầu nhớt bôi trơn vào trục bánh xe và khớp phanh định kỳ 6 tháng/lần.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Xe lăn X-9** có kết cấu khung thép ống carbon gia cường sơn tĩnh điện/mạ crom sáng bóng, chịu lực va đập vượt trội và tải trọng lên tới 120kg. Hệ giằng đôi chữ X dưới gầm ghế gia cố độ vững chãi, chống rung lắc tối đa khi lăn bánh trên đường phố gồ ghề.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Xe lăn sắt tiêu chuẩn X-9 |
| Thương hiệu | ${brand} |
| Bề rộng ghế ngồi | 46 cm |
| Chiều sâu ghế ngồi | 40 cm |
| Chiều cao ghế ngồi | 49 cm |
| Bánh sau | 24 inch vành căm nan hoa kèm vành lăn tay kim loại |
| Bánh trước | 8 inch cao su đúc xoay 360 độ |
| Chất liệu đệm | Vải simili chống thấm nước, dễ lau chùi |
| Tải trọng tối đa | 120 kg |
| Trọng lượng | ~17.5 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Khung thép gia cường chịu lực bền bỉ:** Khung ống thép dày dặn, các mối hàn robot chắc chắn, tuổi thọ sử dụng trên 10 năm.
- **Vành lăn tay trợ lực 24 inch:** Giúp người bệnh tự chủ lăn xe di chuyển xung quanh nhà, tăng cường vận động khớp vai và cổ tay.
- **Bàn để chân hợp kim nhôm có gân:** Bền chắc, có dải đai đỡ bắp chân phía sau chống tuột chân khi di chuyển.
- **Gấp phẳng nhanh chóng:** Chiều rộng khi gấp lại chỉ còn 28cm, cất gọn sát tường hoặc sau cánh cửa.`;
}
