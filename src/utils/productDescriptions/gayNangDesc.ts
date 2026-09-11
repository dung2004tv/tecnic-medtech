import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getGayNangDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const brand = product.specifications?.brand || 'Lucass / Osada';
  const warranty = product.specifications?.warrantyMonths || 12;
  const warrantyText = getWarrantyText(warranty);

  if (code === 'TEC-10001' || name.includes('VC - 24') || name.includes('4 CHÂN THẤP')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Gậy 4 chân thấp Lucass VC-24** là sản phẩm hỗ trợ di chuyển và thăng bằng chi dưới chuyên sâu, được thiết kế đế thấp vững chãi giúp người dùng tạo điểm tựa ổn định trong từng bước chân.

Sản phẩm đặc biệt phù hợp với:
- **Người cao tuổi:** Chân run, khớp gối yếu, suy giảm cảm giác thăng bằng cần điểm tựa an toàn khi đi lại trong nhà và ngoài sân.
- **Bệnh nhân sau tai biến:** Đang trong giai đoạn tập phục hồi chức năng vận động nửa người, cần gậy trợ lực chống đổ ngã.
- **Người sau phẫu thuật xương khớp:** Bệnh nhân sau mổ thay khớp háng, phẫu thuật khớp gối hoặc điều trị bảo tồn chi dưới.
- **Người cần đi lại trên nhiều địa hình:** Thiết kế đế thấp vừa vặn với độ rộng các bậc cầu thang gia đình, không gây vướng víu.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn theo chuyên gia phục hồi chức năng:**
- **Bước 1: Điều chỉnh chiều cao phù hợp:** Cho người dùng đứng thẳng, hai tay buông thõng tự nhiên. Bấm nút chốt lò xo trên thân gậy để chỉnh độ dài sao cho tay nắm gậy nằm ngang bằng với nếp gấp cổ tay (khuỷu tay gập nhẹ khoảng 20° – 30°).
- **Bước 2: Siết chặt vòng ren định vị:** Sau khi chốt bấm khớp vào lỗ, xoay chặt vòng ren xoay hãm để triệt tiêu độ rung lắc và tiếng kêu kim loại khi bước đi.
- **Bước 3: Tư thế cầm gậy:** Cầm gậy bằng tay cùng bên với chân khỏe (hoặc bên tay thuận nếu yếu cả hai chân).
- **Bước 4: Nhịp bước đi an toàn:**
  - Đưa gậy về phía trước khoảng 20 – 30cm, đảm bảo cả 4 chân tiếp đất đồng thời.
  - Bước chân yếu lên ngang hàng với vị trí của gậy, dồn trọng lượng vừa phải lên tay cầm gậy.
  - Bước tiếp chân khỏe vượt qua gậy một bước tự nhiên và lặp lại nhịp nhàng.
- **Bước 5: Lên xuống cầu thang:** Ghi nhớ quy tắc: *Lên bằng chân lành trước – Xuống bằng gậy và chân đau trước*.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Lựa chọn đúng chiều cao nấc gậy để cột sống luôn ở tư thế thẳng tự nhiên, không bị gù lưng hay nghiêng người khi chống.
- Luôn kiểm tra 4 đế cao su tiếp đất định kỳ; nếu phát hiện rãnh gai bị mòn nhẵn cần thay thế đế mới để tránh trơn trượt trên sàn gạch ướt.
- Kiểm tra chốt bấm và vòng ren khóa trước mỗi lần sử dụng để đảm bảo độ an toàn chịu tải.
- Không dùng gậy trên các bề mặt lún sâu, bùn trơn hoặc sàn băng tuyết mà không có người thân hỗ trợ.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Gậy 4 chân thấp Lucass VC-24** sở hữu kết cấu hợp kim nhôm định hình mạ niken chống oxy hóa, mang lại khả năng chịu lực nén dọc trục lên tới 100kg trong khi trọng lượng gậy chỉ khoảng 820g, cực kỳ nhẹ nhàng cho người già cầm nắm. Chân đế 4 chạc hình thang phân tán trọng lực đều bốn góc, giúp gậy tự đứng vững trên sàn phẳng mà không sợ bị đổ khi buông tay.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Gậy 4 chân thấp Lucass VC-24 |
| Thương hiệu | ${brand} |
| Chiều cao điều chỉnh | 72 cm – 95 cm (10 nấc nút bấm định vị) |
| Khoảng cách bước nấc | 2.5 cm / nấc |
| Kích thước chân đế | Rộng 18 cm x Dài 22 cm (vừa vặn bậc cầu thang) |
| Chất liệu thân | Hợp kim nhôm chịu lực mạ Niken chống oxy hóa |
| Chất liệu tay nắm | Nhựa nguyên sinh công thái học lượn sóng |
| Đế tiếp đất | 4 đệm cao su đúc nguyên khối chống mòn có rãnh khía ma sát |
| Tải trọng an toàn | 100 kg |
| Trọng lượng | 820 g |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Đế 4 chân thấp ổn định vượt trội:** Tăng diện tích tiếp xúc với mặt sàn gấp 4 lần so với gậy 1 chân, loại bỏ hoàn toàn nguy cơ lật trượt.
- **10 nấc tăng đơ linh hoạt:** Dễ dàng căn chỉnh chuẩn xác theo chiều cao người sử dụng từ 1m45 đến 1m85.
- **Tay nắm công thái học bo viền mềm:** Thiết kế rãnh ngón tay theo đường cong giải phẫu lòng bàn tay, cầm êm ái, chống mỏi khớp ngón tay khi đi bộ lâu.
- **Vòng ren khóa chống rung lắc:** Khắc phục triệt để hiện tượng lỏng lẻo kêu lạch cạch ở các dòng gậy thông thường.`;
  }

  if (code === 'TEC-10002' || code === 'TEC-10003' || name.includes('3 CHÂN')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dòng gậy chống 3 chân trợ lực gọn nhẹ, kết hợp giữa khả năng tự đứng thăng bằng và độ cơ động cao khi xoay chuyển trong không gian sinh hoạt hằng ngày.

Sản phẩm phù hợp với:
- **Người cao tuổi:** Thể lực suy giảm, cần một điểm tựa trợ lực nhẹ nhàng khi đi dạo, đi chợ, đi lại trong nhà.
- **Người sau chấn thương hoặc sau mổ:** Giai đoạn phục hồi cần tập bước lại từng bước nhẹ nhàng.
- **Người cần dụng cụ tự đứng vững:** Cần rảnh hai tay khi mở cửa hoặc lấy đồ dùng mà không cần tìm tường để tựa gậy.
- **Người có vóc dáng vừa và nhỏ:** Thiết kế 3 chân gọn gàng, luồn lách dễ dàng qua hành lang và cửa hẹp.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Điều chỉnh độ cao:** Người dùng mang giày dép bình thường, đứng thẳng người. Bấm chốt bi thép trên thân gậy để điều chỉnh chiều cao sao cho khi nắm tay vào gậy, khớp khuỷu tay hơi chùng tự nhiên 20° – 30°.
- **Bước 2: Cầm gậy đúng bên:** Cầm gậy bên phía chân lành (chân không đau) để tạo thành thế kiềng ba chân vững chắc khi dồn lực.
- **Bước 3: Bước đi nhịp nhàng:**
  - Chống gậy chếch về phía trước một khoảng cách thoải mái (khoảng 20 – 25cm).
  - Bước chân đau lên ngang vị trí gậy, dồn một phần lực nén qua tay nắm xuống đế gậy.
  - Bước chân khỏe vượt qua gậy và tiếp tục chu trình bước đi.
- **Bước 4: Ngồi xuống ghế an toàn:** Dùng một tay giữ gậy, tay kia vịn vào tay vịn ghế hoặc thành bàn, từ từ gập đầu gối hạ người ngồi xuống.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Kiểm tra 3 đầu đệm cao su trước khi dùng, đảm bảo các chân tiếp xúc đều mặt sàn và không bị lệch góc.
- Luôn kiểm tra chốt định vị đã nhảy trọn vẹn vào lỗ khóa và siết chặt vòng đệm hãm.
- Hạn chế chống gậy lên vùng bùn đất nhão hoặc rêu mốc trơn trượt nếu không có người kèm bên cạnh.
- Sản phẩm có tác dụng hỗ trợ thăng bằng, không nên tỳ vượt quá tải trọng cho phép (100kg).

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** được gia công từ hợp kim nhôm định hình cao cấp, chịu lực uốn gập tốt với trọng lượng siêu nhẹ chỉ khoảng 750g. Kiềng 3 chân hình tam giác cân đối tạo độ thăng bằng tự nhiên, giúp gậy đứng vững trên sàn nhà mà không bị đổ ngã.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Kiểu chân đế | Kiềng tam giác 3 chân tự đứng thăng bằng |
| Khoảng điều chỉnh | 70 cm – 92 cm |
| Số nấc điều chỉnh | 8 – 10 nấc bấm nút bi lò xo |
| Chất liệu thân gậy | Hợp kim nhôm siêu nhẹ chống rỉ |
| Đế cao su | 3 đệm cao su đúc nguyên khối ma sát cao |
| Tải trọng tối đa | 100 kg |
| Trọng lượng | ~750 g |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Khả năng tự đứng tiện lợi:** Dễ dàng buông tay khi thanh toán tiền, mở cửa hay lấy đồ mà gậy vẫn đứng thẳng.
- **Trọng lượng siêu nhẹ:** Thao tác nhấc gậy êm ái, không gây nặng nề hay mỏi cơ vai gáy cho người già.
- **Chân đế cao su đàn hồi giảm chấn:** Triệt tiêu tiếng lách cách khi chống gậy, êm ái trên sàn gạch men và sàn gỗ.
- **Cơ động trong không gian hẹp:** Bán kính chân đế vừa phải, dễ dàng bước qua các bậc cửa hẹp và thang bộ.`;
  }

  if (code === 'TEC-10007' || name.includes('KHUỶU')) {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Nạng chống khuỷu tay C-37** là thiết bị y tế hỗ trợ di chuyển chi dưới hiện đại, chuyển dịch lực nâng đỡ từ nách xuống cẳng tay và bàn tay, bảo vệ toàn diện hệ thần kinh và mạch máu vùng nách.

Sản phẩm đặc biệt phù hợp với:
- **Người bị chấn thương cẳng chân, cổ chân:** Gãy xương cẳng bàn chân, rách dây chằng gối, bong gân nặng cần kiêng chống chân.
- **Người sau phẫu thuật chỉnh hình:** Cần giải tỏa áp lực tỳ đè lên một bên chân trong thời gian lành xương.
- **Người trẻ tuổi hoặc người năng động:** Cần sự cơ động, tự do cử động ngón tay và không muốn dùng nạng nách cồng kềnh.
- **Người cần phục hồi chức năng vận động:** Tập bước đi theo phác đồ bác sĩ vật lý trị liệu.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Luồn cẳng tay vào vòng chữ U:** Đưa cẳng tay vào vòng đỡ bán nguyệt, bàn tay nắm chắc tay nắm ngang. Vòng đỡ nên nằm dưới khớp khuỷu tay khoảng 3cm – 5cm để gập duỗi khuỷu tự do.
- **Bước 2: Căn chỉnh 2 cụm nấc dài:** Chỉnh khoảng cách từ vòng khuỷu đến tay nắm và từ tay nắm xuống mặt đất sao cho khi chống nạng đứng thẳng, khuỷu tay hơi chùng 20° – 30°.
- **Bước 3: Đi 3 điểm (khi 1 chân không chịu lực):**
  - Đưa 2 nạng về phía trước cách mũi chân khoảng 30cm.
  - Đưa chân đau về phía trước lọt giữa 2 nạng (không để chân chạm đất nếu kiêng tải).
  - Tỳ lực đều lên 2 tay nắm nạng và bước chân lành vượt lên phía trước.
- **Bước 4: Đi 4 điểm (khi cả 2 chân đều yếu):** Nạng phải -> Chân trái -> Nạng trái -> Chân phải nhịp nhàng.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Đảm bảo chốt bi ở cả hai đoạn tăng đơ đã bật khít 100% vào các lỗ định vị trước khi chống toàn thân.
- Không chỉnh nạng quá dài làm nhô cao khớp vai hoặc quá ngắn làm gập gù lưng khi bước đi.
- Giữ nạng thẳng đứng hoặc hơi chếch nhẹ theo phương bước đi, không chống nạng quá xa thân người.
- Luôn kiểm tra nút cao su giảm chấn ở đuôi nạng để đảm bảo độ bám sàn tối ưu.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Nạng khuỷu tay C-37** được cấu tạo từ ống hợp kim nhôm định hình sơn tĩnh điện chống trầy xước, kết hợp vòng đỡ cẳng tay bằng nhựa dẻo y tế kỹ thuật cao. Thiết kế công thái học giúp người bệnh di chuyển tự nhiên, thoải mái cử động ngón tay khi cần mở ví, cầm điện thoại mà nạng vẫn treo chắc trên cẳng tay.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Nạng chống khuỷu tay y tế C-37 |
| Thương hiệu | C-37 Y tế |
| Cấu trúc tay cầm | Vòng bán nguyệt ôm cẳng tay + Tay nắm ngang công thái học |
| Khoảng điều chỉnh chiều cao | 85 cm – 115 cm (tùy chỉnh 2 cụm độc lập) |
| Chất liệu thân | Hợp kim nhôm định hình cao cấp |
| Vòng ôm cẳng tay | Nhựa ABS dẻo chịu lực kháng gãy |
| Đế tiếp đất | Cao su giảm chấn đàn hồi cao chống trượt |
| Tải trọng chịu lực | 110 kg |
| Trọng lượng | 550 g / chiếc |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Triệt tiêu nguy cơ liệt thần kinh quay:** Không tỳ đè vào hõm nách như nạng nách truyền thống, tránh hoàn toàn cảm giác tê buốt ngón tay.
- **Điều chỉnh 2 tầng độc lập:** Phù hợp với mọi chiều dài cẳng tay và chiều cao người bệnh từ 1m45 đến 1m85.
- **Cơ động và giải phóng bàn tay:** Có thể thả bàn tay ra để nghe điện thoại hoặc mở cửa mà nạng vẫn ôm giữ trên cẳng tay, không bị rơi.
- **Thiết kế thể thao, thanh lịch:** Tối giản, gọn gàng, thuận tiện mang lên xe buýt, xe ô tô hoặc máy bay.`;
  }

  // Nạng nhôm đôi C12C02 / VCL500 / GBM-067B
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là bộ nạng nách hợp kim nhôm đôi tiêu chuẩn y tế, thiết bị phục hồi chức năng thiết yếu giúp người bệnh giải tỏa hoàn toàn tải trọng tỳ đè lên chi dưới bị tổn thương.

Sản phẩm phù hợp với:
- **Người bị gãy xương đùi, gãy cẳng chân, vỡ mắt cá:** Cần kiêng tỳ hoàn toàn chân bị thương trong thời gian bó bột hoặc nẹp đinh.
- **Người sau phẫu thuật thay khớp háng, khớp gối:** Giai đoạn đầu tập phục hồi theo chỉ định bác sĩ ngoại khoa.
- **Người bong gân độ nặng, đứt dây chằng:** Cần nâng đỡ ổn định để tổn thương mau lành.
- **Bệnh nhân yếu cả hai chi dưới:** Cần điểm tựa chắc chắn hai bên nách để di chuyển.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn theo quy định ngoại khoa:**
- **Bước 1: Điều chỉnh độ dài nạng đúng chuẩn y tế:**
  - Cho người bệnh mang dép thường dùng, đứng thẳng tự nhiên.
  - Đặt đầu nạng cách mũi bàn chân khoảng 15cm chếch ra ngoài 45°.
  - **Quy tắc vàng:** Khoảng cách giữa đệm nách và hõm nách người bệnh phải cách nhau từ 2 đến 3 ngón tay (khoảng 3cm – 5cm). **Tuyệt đối không để đệm nách tỳ sát nách khi đứng thẳng**.
- **Bước 2: Căn chỉnh tay nắm ngang:** Tay nắm ngang chỉnh cao bằng nếp gấp cổ tay, sao cho khi đặt tay lên tay nắm, khuỷu tay hơi gập nhẹ 20° – 30°.
- **Bước 3: Nguyên tắc dồn lực:** Toàn bộ lực cơ thể truyền qua **bàn tay và cánh tay**, siết chặt hai nẹp nạng vào mạng sườn; không tỳ nách đè lên đầu nạng để phòng tránh liệt đám rối thần kinh cánh tay.
- **Bước 4: Nhịp bước đi:** Đưa cả 2 nạng về trước khoảng 30cm -> Đưa chân đau về phía trước ngang hàng 2 nạng -> Dồn lực cánh tay nâng nhẹ người và bước chân lành lên trước.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Tuyệt đối không dồn trọng lượng tỳ đè trực tiếp lên hõm nách trong suốt quá trình đi đứng.
- Kiểm tra các ốc cánh bướm và chốt bi định vị xem đã siết chặt chưa trước mỗi buổi tập.
- Luôn kiểm tra hai núm cao su đế nạng; nếu gai đế mòn cần thay ngay để đảm bảo độ ma sát.
- Đi chậm rãi trên mặt sàn trơn ướt, sàn gỗ trơn hoặc khi trời mưa.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** sử dụng ống hợp kim nhôm định hình dập nguội chịu lực uốn cực cao, không bị han rỉ theo thời gian. Đầu đỡ nách bọc mút TPR êm ái chống ma sát cọ xát da, kết hợp tay cầm bọc cao su chống chai tay và nút tăng đơ chân kéo rút dễ dàng.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Thương hiệu | ${brand} |
| Quy cách đóng gói | Bộ 1 đôi (2 chiếc) |
| Kích cỡ (Size) | Size S (1m35 – 1m55), Size M (1m55 – 1m75), Size L (1m75 – 1m90) |
| Chất liệu thân nạng | Hợp kim nhôm chịu lực cao, phủ bóng chống oxy hóa |
| Đệm nách & Tay nắm | Mút cao su TPR đúc êm ái, chống kích ứng da |
| Đế cao su | Cao su đúc tự nhiên chịu mài mòn, có rãnh bám sàn sâu |
| Tải trọng tối đa | 120 kg |
| Trọng lượng | ~1.5 kg / đôi |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Kết cấu nhôm ống kép cường lực:** Chịu lực nén khỏe khoắn, không bị cong vênh khi người dùng dồn lực toàn thân.
- **Đệm nách mềm kháng khuẩn:** Giảm thiểu đau rát vùng hông sườn và nách khi di chuyển liên tục.
- **Hệ thống điều chỉnh đa cấp độ:** Cho phép chỉnh chiều dài nạng và vị trí tay nắm độc lập, vừa vặn từng dáng người.
- **Đế cao su ma sát cao:** Chống trơn trượt hiệu quả trên cả nền gạch hoa và nền đường bê tông gồ ghề.`;
}
