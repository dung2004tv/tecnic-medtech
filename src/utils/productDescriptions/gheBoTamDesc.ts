import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getGheBoTamDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'GBM / Lucass';
  const warranty = product.specifications?.warrantyMonths || 12;
  const warrantyText = getWarrantyText(warranty);

  // 1. Ghế bô gấp gọn không bánh xe (Lucass G-96)
  if (code === 'TEC-100033' || name.includes('G-96') || name.includes('G96')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Ghế bô vệ sinh gấp gọn Lucass G-96** là giải pháp vệ sinh tại chỗ an toàn, vững chãi và tiết kiệm không gian dành riêng cho người cao tuổi đi lại khó khăn, người bệnh sau mổ hay phụ nữ sau sinh kiêng di chuyển xa vào ban đêm.

Sản phẩm đặc biệt phù hợp với:
- **Người cao tuổi hay đi tiểu đêm:** Khớp gối yếu, mắt mờ, ngại đi bộ vào nhà vệ sinh xa hoặc trơn trượt vào ban đêm.
- **Người bệnh sau phẫu thuật xương khớp, chấn thương:** Cần kiêng cử động mạnh hoặc khó ngồi bồn cầu bệt quá thấp.
- **Người sống trong không gian phòng ngủ nhỏ:** Cần một chiếc ghế bô gấp phẳng siêu gọn chỉ 15cm để cất dưới gầm giường hoặc khe tủ khi không dùng.
- **Gia đình cần thiết bị nâng chiều cao bồn cầu:** Khung ghế có thể đặt trùm trực tiếp lên bồn cầu gia đình để tạo điểm tựa hai tay nắm khi đứng lên ngồi xuống.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Mở ghế:** Mở rộng hai chân ghế sang hai bên cho đến khi thanh giằng chữ X khóa thẳng hoàn toàn. Đặt ghế ở vị trí bằng phẳng, sát mép giường của người bệnh.
- **Bước 2: Lắp bô vệ sinh:** Mở nắp bệt tròn của ghế lên, đặt xô bô có nắp vào rãnh đỡ dưới ghế (hoặc mở sẵn nắp bô khi người bệnh chuẩn bị đi vệ sinh).
- **Bước 3: Hỗ trợ người bệnh ngồi:** Dìu người bệnh xoay người, hai tay vịn chặt vào hai bên tay nắm của ghế và từ từ hạ trọng tâm ngồi xuống bệ.
- **Bước 4: Xử lý sau khi sử dụng:**
  - Người bệnh đứng dậy xong, đậy nắp kín của xô bô lại để ngăn mùi bay ra phòng.
  - Nhấc xô bô bằng quai xách mang vào nhà vệ sinh đổ chất thải.
  - Dùng vòi xịt rửa sạch sẽ lòng bô với xà phòng hoặc dung dịch tẩy rửa nhẹ, tráng nước rồi lau khô, đặt lại vào ghế.
- **Bước 5: Sử dụng như khung nâng bồn cầu:** Tháo xô bô ra, đặt toàn bộ khung ghế Lucass G-96 trùm lên bồn cầu bệt toilet trong nhà vệ sinh để người già tỳ tay đứng dậy an toàn.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Đảm bảo 4 chân cao su tiếp đất hoàn toàn và thanh giằng chữ X đã mở căng trước khi người bệnh ngồi xuống.
- Không để người bệnh nhún nhảy hoặc nghiêng người quá mức sang một bên thành ghế.
- Rửa sạch bô ngay sau mỗi lần sử dụng bằng xà phòng để giữ phòng ngủ luôn thơm tho, sạch sẽ.
- Lau chùi khung thép bằng khăn ẩm, không ngâm toàn bộ khung ghế trong bồn nước lâu ngày.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Ghế bô Lucass G-96** sở hữu khung thép ống mạ niken sáng bóng chống hoen rỉ, khả năng chịu tải trọng lên tới 100kg. Bệ ngồi và nắp đậy bằng nhựa nguyên sinh kháng khuẩn, bề mặt nhẵn bóng dễ lau chùi. 4 chân bọc nút cao su ma sát cao bám chặt sàn nhà chống trơn trượt.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Ghế bô vệ sinh gấp gọn Lucass G-96 |
| Thương hiệu | Lucass |
| Kích thước mở rộng | Rộng 50 cm x Sâu 45 cm x Cao 78 cm |
| Chiều cao mặt ngồi | 48 cm so với mặt sàn |
| Kích thước gấp gọn | Dày chỉ 15 cm (gấp phẳng cất gầm giường) |
| Chất liệu khung | Thép ống carbon mạ niken chống gỉ sét |
| Mặt ngồi & Bô xô | Nhựa nguyên sinh y tế PP cao cấp, có quai xách và nắp kín mùi |
| Đế chân | 4 nút cao su đúc nguyên khối chống trượt |
| Tải trọng tối đa | 100 kg |
| Trọng lượng | 5.5 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Gấp phẳng siêu gọn chỉ 1 giây:** Tiết kiệm không gian tối đa cho các căn phòng ngủ nhỏ hẹp.
- **Nắp bô khít mùi tuyệt đối:** Giữ cho không khí trong phòng ngủ luôn thông thoáng, sạch sẽ.
- **Khung thép mạ niken chắc chắn:** Chịu lực tốt, không rung lắc, tạo cảm giác an tâm tuyệt đối cho người cao tuổi.
- **Đa năng 2 trong 1:** Vừa dùng làm bô tại chỗ phòng ngủ, vừa đặt trùm lên bồn cầu làm khung vịn tay tiện lợi.`;
  }

  // 2. Ghế bô kiêm xe đẩy tắm hợp kim nhôm chống rỉ 100% (GBM-016A)
  if (code === 'TEC-100027' || name.includes('016A')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Ghế bô tắm hợp kim nhôm GBM-016A** là dòng ghế bô cao cấp siêu nhẹ, thiết kế chuyên dụng 3 trong 1: **Ghế bô đi vệ sinh + Ghế đẩy tắm chống nước 100% + Xe đẩy di chuyển trong nhà**.

Sản phẩm đặc biệt phù hợp với:
- **Người cao tuổi, người bại liệt, người sau mổ:** Cần được hỗ trợ tắm rửa và đi vệ sinh hằng ngày một cách an toàn.
- **Gia đình có phòng tắm ẩm ướt:** Khung 100% hợp kim nhôm Anode kháng nước tuyệt đối, không bao giờ bị oxy hóa hay rỉ sét trong môi trường xà phòng.
- **Người chăm sóc cần giảm tải công việc:** Dễ dàng đẩy người bệnh trùm thẳng lên bồn cầu gia đình mà không cần bế ẵm vất vả.
- **Người có làn da nhạy cảm:** Bàn đệm mút xốp đúc nguyên khối êm ái, chống thấm nước, không gây đau rát hay hăm loét da.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Đưa người bệnh lên ghế:** Đạp chốt phanh ở các bánh xe để ghế đứng yên. Gạt bàn để chân dựng lên, dìu người bệnh ngồi vào ghế ngay ngắn rồi gạt bàn để chân xuống. Mở khóa phanh để đẩy xe.
- **Bước 2: Sử dụng bô vệ sinh tại chỗ:**
  - Nhấc miếng nắp đệm chữ U trên mặt ghế ra ngoài.
  - Cho người bệnh đi vệ sinh vào bô có rãnh trượt bên dưới.
  - Đậy nắp bô lại, trượt rút bô ra phía sau mang đi đổ và xịt rửa sạch sẽ.
- **Bước 3: Đẩy trùm trực tiếp lên bồn cầu vệ sinh:**
  - Rút bô nhựa dưới gầm ra ngoài.
  - Đẩy ghế lùi thẳng vào miệng bồn cầu bệt của gia đình (chiều cao gầm ghế 42cm vừa vặn mọi bồn cầu tiêu chuẩn).
  - Đạp khóa phanh bánh xe, người bệnh đi vệ sinh thẳng xuống bồn cầu và xả nước bồn cầu bình thường.
- **Bước 4: Sử dụng khi tắm rửa:**
  - Đẩy ghế vào phòng tắm, đạp khóa phanh bánh xe.
  - Dùng vòi sen xịt tắm rửa thoải mái; nước sẽ tự thoát nhanh qua khe hở của ghế.
  - Tắm xong, dùng khăn mềm lau khô ráo đệm và khung nhôm trong vài giây.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luôn đạp khóa phanh 4 bánh xe khi tắm rửa hoặc khi người bệnh ngồi trên bồn cầu vệ sinh.
- Không để người bệnh đứng tỳ trọng lượng lên bàn để chân khi lên xuống ghế.
- Sau khi tắm bằng xà phòng tạo nhiều bọt, nên xịt tráng nước sạch qua khung ghế để giữ ghế luôn sáng bóng.
- Vệ sinh bánh xe định kỳ, loại bỏ tóc và bụi sợi cuốn vào trục bi.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Ghế bô GBM-016A** sở hữu khung hợp kim nhôm Anode hóa siêu bền, siêu nhẹ chỉ 8.5kg nhưng chịu lực lên tới 120kg. Đệm ngồi và tựa lưng đúc từ bọt xốp PU mềm mại chống thấm nước 100%, không bị xẹp lún theo thời gian.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Ghế bô tắm hợp kim nhôm GBM-016A |
| Thương hiệu | GBM |
| Chất liệu khung | 100% Hợp kim nhôm Anode chống rỉ sét trọn đời |
| Chất liệu đệm | Bọt xốp PU đúc nguyên khối chống thấm nước tuyệt đối |
| Kích thước mặt ngồi | 43 cm x 42 cm |
| Chiều cao đáy gầm ghế | 42 cm (đẩy trùm lọt lòng mọi bồn cầu bệt tiêu chuẩn) |
| Bánh xe | 4 bánh xe cao su y tế có khóa đạp phanh độc lập |
| Bô vệ sinh | Bô vuông có nắp kín mùi và quai xách chắc chắn |
| Tải trọng tối đa | 120 kg |
| Trọng lượng | 8.5 kg (siêu nhẹ, đẩy nhẹ nhàng) |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Kháng nước 100% trọn đời:** Hoàn toàn yên tâm xịt rửa tắm gội hằng ngày mà không lo mục rỉ khung kim loại.
- **Thiết kế 3 trong 1 thông minh:** Đi vệ sinh tại chỗ, đẩy trùm lên bồn cầu gia đình và làm ghế tắm an toàn.
- **Đệm xốp PU êm ái chống thấm:** Ngồi êm, lau khô ngay lập tức chỉ với một đường khăn khô.
- **Bánh xe có khóa an toàn 4 góc:** Giữ ghế đứng bất động vững chãi trên nền gạch men nhà tắm ướt nước.`;
  }

  // 3. Ghế bô ngả nằm có tựa đầu (GBM-017)
  if (code === 'TEC-100028' || name.includes('017')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Ghế bô ngả nằm đa năng GBM-017** là giải pháp chăm sóc cao cấp dành cho người bệnh nặng, người liệt toàn thân, chấn thương sọ não hoặc người già suy kiệt cần gội đầu, tắm rửa và đi vệ sinh trực tiếp ngay trên ghế.

Sản phẩm phù hợp với:
- **Người bệnh liệt toàn thân hoặc chấn thương cột sống:** Không thể tự giữ thăng bằng đầu và thân mình, cần gối tựa đầu nâng đỡ.
- **Người cần gội đầu và vệ sinh cá nhân tại chỗ:** Cần ngả tựa lưng ra sau để gội đầu thoải mái như ở tiệm salon.
- **Bệnh nhân cần nâng chân chống phù nề:** Hai bàn để chân nâng hạ góc duỗi thẳng chống mỏi mệt cho chi dưới.
- **Người chăm sóc bệnh nhân nặng:** Thao tác chăm sóc toàn diện trên một chiếc ghế duy nhất, tránh việc di chuyển bệnh nhân nhiều lần gây đau đớn.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Chuẩn bị ghế:** Đạp phanh khóa cứng 4 bánh xe. Điều chỉnh gối tựa đầu ôm sát vùng cổ gáy của bệnh nhân.
- **Bước 2: Thao tác ngả lưng và gội đầu:**
  - Bóp cần gạt điều chỉnh ngả lưng phía sau tay đẩy.
  - Từ từ hạ tựa lưng ra phía sau đến góc nằm thoải mái (từ 90° đến 150°).
  - Đặt chậu gội đầu hoặc máng gội đầu vào hõm cổ người bệnh để xịt nước gội đầu thuận tiện.
- **Bước 3: Nâng hạ chân:** Nhấc thanh gác chân lên từng nấc theo nhu cầu để chân duỗi thẳng. Khi hạ chân, gạt nhẹ lẫy mở khóa dưới khớp nâng.
- **Bước 4: Sử dụng bô vệ sinh:** Nhấc tấm đệm da ở giữa mặt ghế ra, cho người bệnh đi vệ sinh vào bô bên dưới rồi rút bô ra mang đi đổ và lau rửa sạch sẽ.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Luôn kiểm tra khóa phanh cả 4 bánh xe** trước khi ngả lưng cho người bệnh nằm xuống.
- Khi gội đầu xong, lau khô tựa đầu và vùng gáy trước khi chỉnh ghế ngồi thẳng trở lại.
- Thao tác ngả lưng từ từ, không hạ giật đột ngột khiến người bệnh hoảng hốt.
- Vệ sinh bô sạch sẽ sau mỗi lần sử dụng.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Ghế bô ngả nằm GBM-017** có kết cấu khung thép hợp kim sơn tĩnh điện dày dặn, chịu tải trọng 120kg. Hệ thống ngả lưng đa cấp độ kết hợp tựa đầu công thái học và bàn nâng chân độc lập, mang lại sự thư giãn tối đa cho người bệnh.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Ghế bô ngả nằm đa năng GBM-017 |
| Thương hiệu | GBM |
| Góc ngả tựa lưng | Tùy chỉnh linh hoạt từ 90° đến 150° |
| Phụ kiện chuyên biệt | Gối tựa đầu ôm gáy tháo rời + Bàn nâng gác chân độc lập |
| Bánh xe | 4 bánh xe cao su chống trượt có khóa đạp phanh độc lập |
| Bô vệ sinh | Bô nhựa y tế rút trượt tiện lợi, có nắp đậy kín |
| Tải trọng tối đa | 120 kg |
| Trọng lượng | ~14 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Tựa lưng ngả đa cấp độ:** Cho phép người bệnh nằm thư giãn và phục vụ việc gội đầu tại chỗ cực kỳ thuận tiện.
- **Gối tựa đầu nâng đỡ đốt sống cổ:** Chống gục đầu, nâng niu trọn vẹn phần đầu và gáy cho người bệnh suy yếu cơ cổ.
- **Bàn gác chân nâng duỗi thẳng:** Phòng ngừa ứ trệ tuần hoàn máu và giảm thiểu tình trạng sưng phù bàn chân.
- **Bánh xe xoay 360 độ lăn êm:** Dễ dàng điều hướng trong hành lang và các góc cua hẹp của căn hộ.`;
  }

  // 4. Các dòng ghế bô GBM-016, 018, 019, 203, 022, 026B
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng ghế bô vệ sinh kiêm xe đẩy tắm đa năng đa tiện ích, hỗ trợ đắc lực cho gia đình và người chăm sóc trong việc đưa người già, người tai biến, người suy giảm vận động đi vệ sinh và tắm rửa an toàn mỗi ngày.

Sản phẩm phù hợp với:
- **Người cao tuổi, người sau phẫu thuật:** Chân yếu, khó tự đứng tắm hoặc ngồi bồn cầu thấp.
- **Người cần giải pháp vệ sinh tại chỗ lẫn phòng tắm:** Sử dụng bô tròn tại phòng ngủ vào ban đêm và đẩy vào nhà tắm xịt rửa ban ngày.
- **Gia đình cần thiết bị đẩy trùm bồn cầu:** Đẩy thẳng người bệnh lọt lòng bồn cầu bệt toilet trong nhà, xả nước trực tiếp tiện lợi.
- **Cơ sở điều dưỡng, dưỡng lão:** Thiết bị chăm sóc chuẩn mực, bền bỉ và dễ bảo quản lau chùi.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Cho người bệnh lên ghế:** Đạp khóa phanh bánh xe. Gạt bàn để chân dựng đứng lên. Dìu người bệnh ngồi vào lòng ghế ngay ngắn, sau đó gạt bàn để chân xuống và đặt hai chân bệnh nhân lên. Mở phanh bánh xe để đẩy đi.
- **Bước 2: Sử dụng bô tại phòng ngủ:** Khóa phanh bánh xe. Nhấc tấm nắp đệm da ở giữa ghế ra ngoài. Cho người bệnh đi vệ sinh vào bô bên dưới. Sau đó đậy nắp bô, rút bô mang đi đổ chất thải và xịt rửa sạch bằng nước. Đậy miếng nắp đệm da lại vị trí cũ.
- **Bước 3: Đẩy trùm lên bồn cầu gia đình:** Rút xô bô dưới gầm ra ngoài. Đẩy ghế lùi thẳng vào miệng bồn cầu bệt trong nhà. Đạp khóa phanh bánh xe. Người bệnh đi vệ sinh thẳng xuống bồn cầu và xả nước như bình thường.
- **Bước 4: Sử dụng khi tắm rửa:** Đẩy ghế vào phòng tắm, khóa phanh và tắm bằng vòi hoa sen thoải mái. Tắm xong, dùng khăn mềm lau khô ráo đệm và khung ghế.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luôn đạp khóa phanh bánh xe khi người bệnh ngồi xuống hoặc đứng lên khỏi ghế để tránh xe bị xê dịch.
- Không để người bệnh tự ý nghiêng người với lấy đồ vật ở quá xa mép ghế.
- Xịt rửa bô sạch sẽ và để nơi khô thoáng sau mỗi lần dùng.
- Thường xuyên kiểm tra các ốc vít cố định khung và các trục bánh xe.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** có kết cấu khung thép cường lực sơn tĩnh điện hoặc mạ crom bền chắc, chịu lực tải trọng lên đến 120kg. Đệm ngồi bọc da PU êm ái chống thấm nước tiểu, dễ dàng lau chùi vệ sinh cùng hệ thống 4 bánh xe có khóa hãm an toàn.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Kích thước mặt ghế | 44 cm x 43 cm |
| Chiều cao mặt ghế | 48 cm – 52 cm |
| Khung sườn | Thép cường lực sơn tĩnh điện / mạ crom chống gỉ |
| Đệm ghế ngồi | Mút xốp đàn hồi bọc da PU chống thấm nước |
| Bánh xe | 4 bánh xe cao su xoay 360 độ có khóa đạp phanh độc lập |
| Bô vệ sinh | Bô nhựa y tế có nắp đậy khít và quai xách tiện lợi |
| Tải trọng tối đa | 120 kg |
| Trọng lượng | ~10 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Khung thép gia cường chịu tải 120kg:** Vững chãi, không rung lắc, tạo cảm giác an tâm tuyệt đối khi ngồi.
- **Đệm da PU chống thấm nước:** Lau sạch tức thì bằng khăn ẩm, kháng khuẩn và không lưu giữ mùi hôi.
- **Đa năng 3 trong 1:** Ghế bô phòng ngủ, xe đẩy tắm chống nước và ghế nâng bồn cầu gia đình.
- **Bàn để chân gập gọn linh hoạt:** Thuận tiện khi người bệnh bước lên xuống ghế mà không bị vướng chân.`;
}
