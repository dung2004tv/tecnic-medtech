import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getKhungTapDiDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'GBM / Osada';
  const warranty = product.specifications?.warrantyMonths || 12;
  const warrantyText = getWarrantyText(warranty);

  if (code === 'TEC-10008' || name.includes('W-47')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Khung tập đi gấp gọn W-47** là sản phẩm hỗ trợ phục hồi chức năng vận động chi dưới kinh điển, kết hợp giữa khả năng trợ lực chịu tải vững chắc và cơ chế chuyển đổi chế độ bước đi linh hoạt.

Sản phẩm đặc biệt phù hợp với:
- **Người cao tuổi:** Chân run yếu, suy giảm thăng bằng, hay lo sợ té ngã khi đi lại trong nhà hoặc ra sân.
- **Người bệnh sau tai biến mạch máu não:** Giai đoạn tập đứng và tập bước từng bước phục hồi khả năng vận động.
- **Người sau phẫu thuật xương khớp chi dưới:** Sau mổ gãy xương đùi, thay khớp háng hoặc phẫu thuật dây chằng khớp gối cần dụng cụ bao bọc nâng đỡ 3 mặt.
- **Gia đình cần sản phẩm gọn nhẹ:** Cần gấp gọn nhanh chỉ với 1 nút bấm để cất gầm giường hoặc mang theo ô tô.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Điều chỉnh độ cao 4 chân:** Cho người bệnh đứng thẳng bên trong lòng khung, hai tay buông tự nhiên. Chỉnh 4 chân khung sao cho tay nắm ngang bằng với nếp gấp cổ tay (khuỷu tay hơi chùng tự nhiên 20° – 30°).
- **Bước 2: Lựa chọn chế độ tập:**
  - *Chế độ Ziczac (Khuyên dùng cho người yếu sức):* Gạt chốt cơ chế Ziczac để hai bên khung cử động tiến lùi nhịp nhàng theo bước chân. Đẩy bên phải khung -> Bước chân trái lên; Đẩy bên trái khung -> Bước chân phải lên. Người bệnh không cần tốn sức nhấc toàn bộ khung.
  - *Chế độ Cố định:* Khóa cứng hai bên khung. Nhấc nhẹ toàn bộ khung về trước 20 – 30cm, đặt 4 chân tiếp đất vững chắc rồi bước chân yếu lên, sau đó bước chân khỏe.
- **Bước 3: Tỳ tựa đứng lên từ ghế:** Đặt hai tay lên hai bên tay nắm khung, hơi nghiêng người về phía trước và đẩy lực cánh tay nâng thẳng người đứng lên.
- **Bước 4: Gấp gọn sau khi dùng:** Bấm nhẹ nút khóa trung tâm trên thanh giằng trên cùng và ép hai bên khung lại vào giữa.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luôn kiểm tra 4 nút bấm bi lò xo ở 4 chân đã nhảy khớp hoàn toàn vào các lỗ định vị trước khi tỳ tải trọng.
- Đảm bảo 4 đế cao su tiếp xúc đều mặt sàn phẳng, không sử dụng khi các chân cao su bị mòn trơ kim loại.
- Bước đi trong phạm vi lòng khung, không nghiêng người quá nhiều ra ngoài thành khung để tránh mất trọng tâm.
- Chú ý bước chậm rãi khi đi qua mép thảm, gờ cửa hoặc nền gạch nhà tắm còn ướt nước.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Khung tập đi W-47** được chế tạo từ ống hợp kim nhôm định hình dập nguội cao cấp, mạ lớp anode chống trầy xước và hoen gỉ. Trọng lượng tổng thể chỉ 2.4kg nhưng có khả năng chịu lực nén ép dọc trục lên tới 100kg, mang lại cảm giác an tâm tuyệt đối cho người già khi sử dụng hằng ngày.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Khung tập đi gấp gọn đa năng W-47 |
| Thương hiệu | ${brand} |
| Kích thước mở rộng | Rộng 50 cm x Sâu 48 cm x Cao (75 – 92) cm |
| Chiều rộng lòng trong | 44 cm (thoải mái đứng xoay trở) |
| Kích thước gấp gọn | 50 cm x 10 cm x 76 cm |
| Khoảng điều chỉnh chiều cao | 75 cm – 92 cm (8 nấc tùy chỉnh) |
| Chất liệu khung | Hợp kim nhôm siêu nhẹ chịu lực |
| Tay nắm | Mút cao su xốp EVA êm ái chống chai mỏi tay |
| Chân đế | 4 núm cao su đúc nguyên khối chống trơn trượt |
| Tải trọng tối đa | 100 kg |
| Trọng lượng | 2.4 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Cơ chế bước đi Ziczac độc quyền:** Giúp người bệnh tập bước nhẹ nhàng mà không cần dùng sức nâng khung, tiết kiệm 70% thể lực.
- **Gập gọn 1 chạm siêu tốc:** Xếp phẳng trong 2 giây, tiện lợi cất giữ gọn gàng hoặc mang theo khi đi khám bệnh.
- **Ống nhôm cường lực:** Vừa đảm bảo độ chắc chắn chống rung lắc, vừa siêu nhẹ cho người già dễ dàng sử dụng.
- **Tay nắm công thái học êm ái:** Thấm hút mồ hôi, không gây đau buốt cổ tay khi tập luyện lâu dài.`;
  }

  if (code === 'TEC-10009' || code === 'TEC-100010' || name.includes('VK157') || name.includes('033A')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng khung tập đi có 2 bánh xe lăn dẫn hướng phía trước và 2 chân cao su hãm ma sát phía sau, giải pháp tối ưu cho người bệnh có lực tay yếu không nhấc nổi khung tập đi thông thường.

Sản phẩm phù hợp với:
- **Người cao tuổi thể trạng yếu:** Cơ tay và cơ vai suy giảm lực, khó nhấc khung đi bộ bổng lên khỏi sàn.
- **Người bệnh liệt nửa người sau tai biến:** Cần một thiết bị lăn nhẹ nhàng về phía trước để hỗ trợ nhịp bước chân.
- **Bệnh nhân sau phẫu thuật thay khớp:** Cần dụng cụ hỗ trợ tập phục hồi chức năng bước đi tự nhiên tại nhà hoặc phòng vật lý trị liệu.
- **Người cần điểm tựa vững chãi:** Tích hợp cơ chế phanh tự động khi tỳ lực xuống hai chân sau.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Mở rộng khung và chỉnh độ cao:** Mở rộng hai bên khung cho đến khi thanh khóa định vị vào khớp. Căn chỉnh 4 nấc chân sao cho hai tay nắm ngang nếp gấp cổ tay của người dùng.
- **Bước 2: Cơ chế di chuyển:**
  - Hai tay nắm chắc hai bên tay vịn.
  - Đẩy nhẹ khung lăn về phía trước khoảng 20 – 30cm nhờ hai bánh xe dẫn hướng phía trước.
  - Khi chuẩn bị bước chân, ấn nhẹ bàn tay xuống: 2 chân cao su phía sau sẽ ghì sát xuống mặt sàn, tạo điểm tựa hãm cứng vững chãi.
  - Bước chân đau lên trước, sau đó bước tiếp chân lành lên ngang hàng.
- **Bước 3: Dừng lại và đứng yên:** Dồn trọng lượng người đều vào hai tay nắm, toàn bộ khung sẽ được khóa cứng tự nhiên nhờ độ bám của hai núm cao su phía sau.
- **Bước 4: Gấp lại khi không dùng:** Nhấn chốt khóa trung tâm trên thanh giằng ngang để xếp gọn hai bên khung lại.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không đẩy khung lăn quá nhanh hoặc chạy theo khung vượt quá tầm kiểm soát bước chân.
- Luôn kiểm tra hai bánh xe phía trước xem có bị kẹt sợi vải, tóc hay rác bụi ở trục bánh xe hay không.
- Đảm bảo bề mặt sàn bằng phẳng khi tập luyện; tránh sử dụng ở đoạn dốc cao nếu không có người hỗ trợ đi kèm.
- Kiểm tra độ ma sát của hai nút cao su hãm phía sau định kỳ.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** kết hợp hoàn hảo giữa bánh xe cao su đúc nguyên khối lăn êm ái và hai chân hãm an toàn, mang lại sự tự tin cho người bệnh trong từng bước đi mà không lo bị trôi xe mất kiểm soát.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Hệ thống di chuyển | 2 bánh xe cao su đặc 5 inch phía trước + 2 chân bọc cao su hãm phía sau |
| Chiều cao điều chỉnh | 78 cm – 96 cm (nút bấm định vị nhiều nấc) |
| Kích thước sử dụng | Rộng 52 cm x Sâu 49 cm x Cao (78 – 96) cm |
| Chiều rộng lòng trong | 45 cm |
| Chất liệu khung | Hợp kim nhôm phủ bóng chống oxy hóa |
| Tải trọng tối đa | 110 kg |
| Trọng lượng | 2.8 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Di chuyển không tốn sức:** Bánh xe 5 inch trợ lực lăn nhẹ tênh, người bệnh đẩy đi dễ dàng không cần dùng lực nâng.
- **Phanh tỳ đè tự động an toàn:** Tự hãm cứng ngay tức thì khi người dùng tỳ tay xuống, loại bỏ hoàn toàn nguy cơ trượt ngã.
- **Gấp gọn tiện lợi:** Dễ dàng xếp gọn cất sau cánh cửa, gầm giường hoặc mang lên cốp xe ô tô khi đi tái khám.
- **Bánh xe cao su đặc chống mòn:** Vận hành êm ái trên sàn gạch men, không phát ra tiếng ồn khó chịu.`;
  }

  if (code === 'TEC-100011' || code === 'TEC-100012' || name.includes('037')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng xe tập đi (Rollator) 4 bánh cao cấp tích hợp ghế ngồi nghỉ ngơi và hệ thống phanh tay đa năng, giải pháp di chuyển ngoài trời và đi dạo lý tưởng cho người lớn tuổi.

Sản phẩm phù hợp với:
- **Người cao tuổi thích đi dạo ngoài trời:** Đi bộ rèn luyện sức khỏe trong công viên, khuôn viên chung cư, sân vườn.
- **Người dễ bị mỏi cơ, hụt hơi khi đi xa:** Cần một chiếc ghế ngồi êm ái để có thể dừng lại nghỉ ngơi bất kỳ lúc nào.
- **Người phục hồi chức năng giai đoạn tiến bộ:** Có khả năng bước đi tương đối tốt nhưng cần điểm tựa nâng đỡ và phanh hãm an toàn.
- **Người cần mang theo đồ dùng cá nhân:** Tích hợp giỏ đựng đồ rộng rãi để bình nước, sổ khám bệnh, thuốc men.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Tập đi:**
  - Hai tay đặt lên hai tay nắm, các ngón tay tựa hờ vào cần phanh tay.
  - Đẩy nhẹ xe lăn đều về phía trước và bước đi nhịp nhàng theo xe.
  - Khi xe lăn nhanh hoặc khi xuống dốc, bóp nhẹ hai cần phanh lên trên để giảm tốc độ mượt mà.
- **Bước 2: Ngồi nghỉ an toàn (QUY TẮC BẮT BUỘC):**
  - Đưa xe vào vị trí mặt đất bằng phẳng.
  - **Dùng hai lòng bàn tay ấn mạnh hai cần phanh xuống phía dưới** cho đến khi nghe tiếng "Cạch" (chế độ khóa bánh Parking).
  - Kiểm tra chắc chắn xe đã khóa cứng bánh và không thể xê dịch.
  - Từ từ quay người lại, vịn vào hai tay nắm và ngồi xuống đệm ghế, tựa lưng vào thanh đệm cong.
- **Bước 3: Tiếp tục đi:** Nắm cần phanh gạt nhẹ ngược lên trên để nhả khóa phanh đỗ xe.
- **Bước 4: Xếp gọn xe:** Nhấc dây quai kéo ở giữa mặt đệm ngồi lên, khung xe sẽ tự động gập phẳng theo chiều ngang.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- **Tuyệt đối không ngồi lên ghế khi chưa khóa phanh đỗ xe (Parking Lock).**
- Không sử dụng xe như một chiếc xe lăn để người khác đẩy từ phía sau khi người bệnh đang ngồi (trừ khi có gác chân chuyên dụng đi kèm).
- Thường xuyên kiểm tra dây cáp phanh và độ căng của má phanh ở hai bánh sau.
- Không để xe lăn tự do trên các dốc nghiêng mà không có tay người giữ phanh.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** sở hữu kết cấu khung thép hợp kim sơn tĩnh điện bền bỉ, 4 bánh xe lớn chịu mài mòn cao cùng hệ thống phanh đôi an toàn. Mặt đệm ngồi mút PU bọc da simili êm ái kết hợp thanh tựa lưng cong công thái học, mang lại tư thế ngồi nghỉ ngơi thoải mái nhất.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Số bánh xe | 4 bánh xe cao su đặc đúc vành nan hoa chịu lực |
| Chiều cao tay nắm | Điều chỉnh từ 80 cm đến 93 cm |
| Chiều cao mặt ghế ngồi | 52 cm so với mặt sàn |
| Kích thước mặt ghế | 35 cm x 32 cm (bọc da PU chống thấm) |
| Tải trọng tối đa | 120 kg |
| Trọng lượng xe | ~6.5 kg |
| Phụ kiện đi kèm | Ghế ngồi đệm êm, thanh tựa lưng, giỏ để đồ tiện lợi |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Phanh tay thông minh 2 chế độ:** Vừa phanh bóp giảm tốc khi đi bộ, vừa khóa đỗ bánh xe thành ghế ngồi bất động an toàn tuyệt đối.
- **Ghế ngồi nghỉ tiện lợi mọi lúc:** Giúp người lớn tuổi tự tin đi dạo xa nhà mà không lo mỏi chân, kiệt sức giữa đường.
- **Bánh xe xoay 360 độ linh hoạt:** Đổi hướng mượt mà, vượt qua các đoạn gờ vỉa hè nhẹ nhàng.
- **Gấp phẳng nhanh chóng:** Thu gọn chỉ trong 3 giây, tiện lợi xếp vào cốp sau ô tô hay góc nhà.`;
  }

  // Khung tập đi có đệm tỳ nách / tỳ cẳng tay chữ U / đai đỡ chống ngã (GBM-034, GBM-021, Osada SD-K05)
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng khung tập đi phục hồi chức năng toàn diện chuyên sâu, trang bị bàn đệm tỳ cẳng tay chữ U công thái học và hệ thống đai bảo hiểm chống té ngã 360 độ.

Sản phẩm phù hợp với:
- **Người bệnh liệt nửa người sau đột quỵ tai biến:** Mất thăng bằng, cơ chân chưa đủ sức chịu trọng lượng cơ thể.
- **Người chấn thương tủy sống hoặc sau phẫu thuật lớn:** Cần nâng đỡ toàn thân để tập đứng và tập bước đi an toàn.
- **Người cao tuổi yếu cơ toàn thân:** Tay không đủ sức cầm nắm gậy hay khung tập đi thông thường, cần tỳ toàn bộ cẳng tay lên bàn đệm.
- **Bệnh viện, trung tâm phục hồi chức năng & gia đình:** Thiết bị tiêu chuẩn trong các bài tập phục hồi chức năng vận động.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Cố định khung an toàn:** Gạt khóa phanh cả 4 bánh xe để khung đứng bất động cạnh giường hoặc xe lăn của bệnh nhân.
- **Bước 2: Hỗ trợ người bệnh vào khung:**
  - Hỗ trợ người bệnh ngồi lên mép giường, thắt đai an toàn quanh hông và đáy chậu.
  - Cho người bệnh đặt hai cẳng tay lên bàn đệm chữ U, hai bàn tay nắm vào thanh cầm phía trước.
  - Cài các móc khóa của đai nâng đỡ vào các điểm neo trên khung.
- **Bước 3: Tập đứng thăng bằng:** Hỗ trợ người bệnh đứng thẳng người, điều chỉnh độ cao bàn đệm chữ U sao cho vai người bệnh không bị so rụt và bàn chân tiếp xúc tự nhiên với sàn. Tập đứng 5 – 10 phút để tái lập phản xạ thăng bằng.
- **Bước 4: Tập bước đi:**
  - Mở khóa phanh 4 bánh xe.
  - Người hỗ trợ đứng bên cạnh khích lệ người bệnh tỳ cẳng tay đẩy khung tiến về phía trước và bước từng bước chậm rãi. Đai bảo hiểm bên dưới sẽ đỡ người bệnh ngay tức khắc nếu chân bị khuỵu.
- **Bước 5: Kết thúc buổi tập:** Đưa khung về sát mép giường, khóa phanh bánh xe, tháo đai bảo vệ và hỗ trợ bệnh nhân ngồi xuống nghỉ ngơi.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luôn có người thân hoặc kỹ thuật viên phục hồi chức năng giám sát trong suốt quá trình tập luyện.
- Kiểm tra các móc khóa đai bảo vệ và chốt khóa bánh xe cẩn thận trước khi cho bệnh nhân đứng lên.
- Không tập quá sức; chia nhỏ thời gian tập thành nhiều đợt trong ngày (mỗi đợt 15 – 30 phút).
- Vệ sinh bề mặt bàn đệm chữ U bằng khăn ẩm lau sạch mồ hôi sau mỗi buổi tập.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** có kết cấu khung thép hợp kim carbon siêu dày dập nguội, sơn tĩnh điện công nghệ cao chống gỉ sét. Bàn đệm tỳ cẳng tay chữ U bọc da PU êm ái chống tỳ đè cùng hệ thống bánh xe y tế xoay 360 độ có khóa phanh độc lập.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Chất liệu khung | Thép hợp kim carbon cường lực sơn tĩnh điện cao cấp |
| Bàn đệm đỡ thân trên | Đệm mút xốp PU chữ U bọc da chống thấm mồ hôi |
| Chiều cao đệm tỳ | Điều chỉnh từ 100 cm đến 125 cm (phù hợp vóc dáng 1m45 – 1m85) |
| Đai bảo hiểm chống ngã | Đai nâng đỡ hông và đai đáy chậu vải dù dệt sợi thoáng khí |
| Hệ thống bánh xe | 4 – 6 bánh xe đa hướng xoay 360° có khóa hãm độc lập |
| Tải trọng tối đa | 130 kg |
| Trọng lượng | 12 kg – 16 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Bàn đệm chữ U trợ lực toàn thân:** Giải tỏa áp lực lên cổ tay, cho phép bệnh nhân tỳ trọn vẹn cánh tay và thân trên nhẹ nhàng.
- **Đai nâng đáy chậu chống ngã tuyệt đối:** Bảo hiểm 100% cho bệnh nhân, loại bỏ hoàn toàn nỗi sợ ngã khuỵu khi tập bước.
- **Bánh xe đa hướng chống lật:** Khung xòe rộng chân đế hình chữ H chống lật nghiêng sang hai bên.
- **Tùy chỉnh góc tay cầm đa năng:** Tay nắm phía trước có thể xoay góc linh hoạt theo độ co cứng của khớp bàn tay người bệnh.`;
}
