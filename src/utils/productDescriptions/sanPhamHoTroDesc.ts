import { Product } from '../../types';
import { TECNIC_CONTACT_FOOTER, getWarrantyText } from './common';

export function getSanPhamHoTroDescription(product: Product): string {
  const code = product.code;
  const name = product.name;
  const warranty = product.specifications?.warrantyMonths || 6;
  const warrantyText = getWarrantyText(warranty);

  // 1. Bóng gai tập tay 4 ngón, 5 ngón, bóng tròn
  if (name.includes('BÓNG GAI')) {
    const isRing = name.includes('BỐN NGÓN') || name.includes('NĂM NGÓN') || code === 'TEC-100056' || code === 'TEC-100057';
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dụng cụ vật lý trị liệu phục hồi chức năng bàn tay và các ngón tay nhỏ gọn, giải pháp luyện tập hàng ngày cho bệnh nhân suy giảm cơ lực chi trên.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh liệt nửa người sau tai biến mạch máu não:** Các ngón tay co cứng, khó khăn khi xòe bàn tay hoặc cầm nắm đồ vật.
- **Người bị chấn thương liệt dây thần kinh quay, thần kinh giữa:** Cần phục hồi phản xạ cảm giác và lực bóp ngón tay.
- **Người già bị run tay (Parkinson) hoặc cứng khớp ngón tay:** Giúp làm mềm các khớp và kích thích tuần hoàn máu.
- **Dân văn phòng, người dùng máy tính nhiều:** Tê rần bàn tay, mỏi các khớp ngón do hội chứng ống cổ tay.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Thao tác cầm/đeo:**
${isRing ? '  - Xỏ các ngón tay vào từng vòng xỏ silicon trên bóng sao cho các núm gai áp sát vào lòng bàn tay (không lo bóng bị rơi xuống đất khi tay buông thõng).\n' : '  - Đặt quả bóng gai vào chính giữa lòng bàn tay.\n'}- **Bước 2: Bài tập bóp nhả cơ bản:** Dùng lực các ngón tay bóp chặt quả bóng trong 3 – 5 giây, sau đó từ từ thả lỏng mở rộng các ngón tay ra. Thực hiện 50 – 100 lần mỗi buổi tập.
- **Bước 3: Bài tập lăn bóng massage:** Đặt bóng lên mặt bàn hoặc kẹp giữa hai lòng bàn tay, xoa tròn lăn bóng qua lại để kích thích các huyệt đạo lòng bàn tay.
- **Bước 4: Bài tập gan bàn chân:** Đặt bóng dưới sàn nhà, người bệnh ngồi trên ghế và đặt lòng bàn chân lên bóng lăn nhẹ từ gót đến mũi chân.
- **Bước 5: Vệ sinh:** Rửa sạch bóng bằng nước xà phòng ấm sau mỗi tuần sử dụng.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Luyện tập đều đặn mỗi ngày 2 – 3 lần, mỗi lần 15 – 20 phút.
- Không dùng vật sắc nhọn đâm vào bề mặt cao su.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** đúc từ cao su nhiệt dẻo TPR y tế nguyên sinh đàn hồi cao, phủ hàng trăm núm gai tròn mềm mại tác động kích thích các thụ cảm thể thần kinh dưới da.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Chất liệu | Cao su nhiệt dẻo TPR y tế nguyên sinh kháng khuẩn |
| Kích thước | Đường kính khoảng 7 cm – 9 cm (vừa vặn lòng bàn tay) |
| Kiểu dáng | ${isRing ? 'Tích hợp vòng xỏ ngón tay chống rơi tuột khi cơ tay yếu' : 'Bóng gai hình cầu mát xa tự do'} |
| Độ bền | Bóp nhả hàng ngàn lần không biến dạng hay xẹp lún |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Kích thích huyệt đạo sâu:** Đánh thức phản xạ dẫn truyền thần kinh cảm giác và vận động.
- **Vòng xỏ ngón chống rơi tuột độc quyền:** Người bệnh tự tin tập luyện một mình mà không sợ rơi bóng.
- **Nhỏ gọn mang theo bên mình:** Bỏ túi áo hoặc balo để tập luyện mọi lúc mọi nơi.`;
  }

  // 2. Chậu gội đầu có chân (TEC-100066)
  if (name.includes('GỘI ĐẦU') || code === 'TEC-100066') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Chậu gội đầu có chân đứng di động** là thiết bị chuyên dụng phục vụ gội đầu, chăm sóc vệ sinh tóc và da đầu ngay tại giường hoặc ghế ngồi.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh nằm liệt giường, người sau phẫu thuật:** Không thể tự đi lại vào nhà tắm để gội đầu.
- **Người cao tuổi suy kiệt thể lực:** Cúi đầu trong phòng tắm dễ bị hoa mắt, chóng mặt hoặc trượt ngã.
- **Phụ nữ sau sinh trong thời kỳ kiêng cữ:** Cần gội đầu nhanh chóng, kín gió ngay tại phòng ngủ.
- **Gia đình và nhân viên y tế:** Tiết kiệm công sức khi chăm sóc người bệnh, không làm ướt ga giường.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Lắp đặt:** Lắp chậu vào chân đứng chữ thập, siết chặt núm xoay điều chỉnh độ cao. Nối ống xả nước mềm vào đáy chậu và thả đầu ống xả vào xô hứng nước đặt dưới sàn.
- **Bước 2: Kê sát giường bệnh:** Đẩy chân chậu luồn sát vào mép đầu giường, chỉnh chiều cao chậu ngang bằng mặt đệm, nghiêng nhẹ lòng chậu về phía sau.
- **Bước 3: Kê đầu người bệnh:** Đưa đầu người bệnh kê nhẹ lên hõm cong chữ U có lót đệm cao su mềm, quàng khăn quanh cổ.
- **Bước 4: Gội đầu:** Dùng gáo dội nước ấm hoặc vòi xịt gội đầu nhẹ nhàng, thoa dầu xả sạch. Toàn bộ nước bẩn sẽ theo ống xả tự động chảy xuống xô bên dưới.
- **Bước 5: Vệ sinh:** Lau khô tóc cho người bệnh, tráng sạch chậu và bảo quản nơi khô ráo.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Đặt đầu ống xả dốc xuống xô để nước thoát nhanh, không bị đọng lại trong chậu.
- Vặn chặt các khớp nối và núm hãm chân đứng trước khi kê đầu người bệnh.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Chậu gội đầu có chân** làm từ nhựa PP nguyên sinh chịu nhiệt độ cao, chân thép sơn tĩnh điện nâng hạ chiều cao từ 90cm đến 130cm và ống xả ruột gà co giãn dài 1.5m.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Chậu gội đầu có chân đứng di động |
| Chất liệu chậu | Nhựa dẻo PP/ABS cao cấp chịu nhiệt, chống va đập |
| Chiều cao chân đứng | Nâng hạ linh hoạt từ 90 cm đến 130 cm bằng núm xoay |
| Kích thước lòng chậu | Dài 48 cm x Rộng 45 cm x Sâu 25 cm |
| Chiều dài ống xả | 1.5 m (ống ruột gà co giãn tự do) |
| Đệm đỡ cổ | Cao su dẻo mềm chống đau mỏi gáy |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Gội đầu sạch sẽ ngay tại giường:** Không cần di chuyển người bệnh, không vương vãi nước ra phòng ngủ.
- **Chân nâng hạ đa nấc:** Vừa vặn với mọi loại giường ngủ gia đình hay giường y tế.
- **Đệm cổ chữ U êm ái:** Chống mỏi gáy và ngăn nước chảy ngược vào cổ áo người bệnh.`;
  }

  // 3. Bồn cầu di động (TEC-100061)
  if (name.includes('BỒN CẦU DI ĐỘNG') || code === 'TEC-100061') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Bồn cầu di động cao cấp** là giải pháp vệ sinh thay thế toilet hiện đại mô phỏng chuẩn xác bồn cầu bệt gia đình, đặt ngay cạnh giường ngủ.

Sản phẩm phù hợp với:
- **Người cao tuổi, người tiểu đêm nhiều lần:** Không phải thức giấc đi vào nhà vệ sinh xa xôi ban đêm, phòng chống tai biến đột quỵ và té ngã.
- **Người bệnh sau tai biến, gãy xương chân:** Đi lại khó khăn, cần đi vệ sinh ngay cạnh giường.
- **Phụ nữ mang thai những tháng cuối:** Đi lại nặng nề, khó ngồi xổm.
- **Dùng cho các chuyến dã ngoại, cắm trại hoặc xe ô tô du lịch.**

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1: Bố trí:** Đặt bồn cầu trên mặt sàn bằng phẳng ngay cạnh mép giường người bệnh.
- **Bước 2: Chuẩn bị:** Mở nắp bệt và nắp xô chứa. Lót một túi đựng rác tự hủy vào trong lòng xô chứa (có thể cho một ít nước hoặc rắc bột khử mùi), sau đó đậy vành bệt lên để cố định miệng túi.
- **Bước 3: Sử dụng:** Người bệnh ngồi lên bồn cầu đi vệ sinh thoải mái như trên bồn cầu toilet thông thường.
- **Bước 4: Xử lý sau khi dùng:** Đậy nắp xô chứa lại (ngăn mùi tuyệt đối), nhấc xô bằng quai xách mang vào nhà tắm đổ và tráng rửa sạch sẽ.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Kiểm tra các đệm cao su dưới chân đế bám chặt mặt sàn gạch để bồn cầu không bị xê dịch.
- Đậy kín nắp kép sau khi đi vệ sinh để giữ không khí phòng ngủ luôn thông thoáng.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Bồn cầu di động** đúc từ nhựa nguyên sinh PP dày dặn chịu lực tới 150kg, tích hợp hệ thống nắp đậy kép ngăn mùi tuyệt đối và xô chứa chất thải có quai xách riêng biệt.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Bồn cầu di động gia đình cao cấp |
| Chất liệu | Nhựa nguyên sinh PP cao cấp, dày dặn chịu lực |
| Kích thước phủ bì | Dài 50 cm x Rộng 42 cm x Cao 40 cm (chuẩn chiều cao toilet) |
| Dung tích xô chứa | 6.5 Lít kèm quai xách và nắp đậy kín |
| Cơ chế ngăn mùi | Nắp đậy kép 2 tầng kín khít |
| Chân chống trượt | Dải viền cao su chống trượt toàn phần |
| Tải trọng tối đa | 150 kg |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Ngăn mùi tuyệt đối 100%:** Nắp kép khóa kín mùi hôi, giữ phòng ngủ luôn trong lành.
- **Chịu tải 150kg vững chãi:** Người lớn tuổi ngồi tự tin, không lo bập bênh hay trơn trượt.
- **Xô rác quai xách tiện lợi:** Thao tác đổ rửa vệ sinh nhanh gọn và sạch sẽ.`;
  }

  // 4. Bô tiểu 2000ml (TEC-100063)
  if (name.includes('BÔ TIỂU') || code === 'TEC-100063') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Bô tiểu y tế 2000ml có dây dẫn và nắp chống tràn** là vật dụng chăm sóc thiết yếu cho bệnh nhân nằm bất động trên giường bệnh hoặc người già tiểu đêm nhiều lần.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh nam/nữ nằm bất động sau mổ, bó bột chân:** Không thể ngồi dậy hoặc đi ra khỏi giường.
- **Người già tiểu nhiều lần trong đêm:** Giúp người bệnh đi tiểu thoải mái suốt đêm mà không cần làm phiền người nhà thức dậy trợ giúp.
- **Bệnh nhân cần theo dõi thể tích nước tiểu:** Có vạch chia độ rõ ràng từ 200ml đến 2000ml.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Đặt bình chứa ở vị trí thấp hơn giường (treo ở thanh giằng thành giường hoặc đặt dưới sàn cạnh mép giường) để nước tiểu tự chảy xuôi dòng.
- **Bước 2:** Đưa đầu phễu tiểu áp nhẹ vào bộ phận sinh dục ở tư thế nằm hoặc nửa ngồi.
- **Bước 3:** Người bệnh đi tiểu tự nhiên qua phễu, nước tiểu theo ống dẫn chảy êm vào bình chứa.
- **Bước 4:** Sáng hôm sau, mang bình bô vào nhà tắm mở nắp đổ và tráng rửa sạch bằng nước xà phòng loãng, phơi râm mát.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Đảm bảo ống dẫn không bị gấp khúc để nước tiểu lưu thông thông suốt.
- Đậy kín nắp bình sau khi dùng để ngăn mùi hôi.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Bô tiểu 2000ml** làm từ nhựa y tế PE nguyên sinh dẻo dai trong suốt, vạch chia thể tích rõ ràng và phễu tiểu bo tròn công thái học không gây trầy xước da.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Bô tiểu y tế 2000ml có dây dẫn chống tràn |
| Dung tích bình chứa | 2000 ml (vạch chia ml chính xác) |
| Chiều dài ống dẫn | 1.2 m – 1.6 m ống mềm trong suốt |
| Chất liệu | Nhựa y tế PE nguyên sinh kháng khuẩn, dẻo dai chống vỡ |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Dung tích lớn 2000ml:** Đi tiểu suốt đêm không lo tràn bô, người nhà ngủ trọn giấc.
- **Phễu tiểu mềm mại:** Thiết kế bo tròn nhẵn mịn, áp sát chống rò rỉ nước tiểu ra ga giường.
- **Theo dõi lượng dịch bài tiết:** Hỗ trợ bác sĩ theo dõi chức năng thận chính xác.`;
  }

  // 5. Nẹp bàn chân rũ (TEC-100060, TEC-100065)
  if (name.includes('CHÂN RŨ') || code === 'TEC-100060' || code === 'TEC-100065') {
    const hasPump = name.includes('CÓ BƠM') || code === 'TEC-100065';
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là thiết bị nẹp chỉnh hình chi dưới chuyên dụng điều trị tật bàn chân rũ (Drop Foot) do tổn thương dây thần kinh mác, di chứng sau đột quỵ tai biến hoặc chấn thương cột sống.

Sản phẩm đặc biệt phù hợp với:
- **Người bệnh liệt nửa người sau tai biến:** Bàn chân bị rũ chúc xuống đất, khi bước đi mũi chân quẹt xuống sàn dễ vấp ngã.
- **Bệnh nhân tổn thương dây thần kinh mác chung:** Mất khả năng gập mu bàn chân lên trên.
- **Người cần nẹp định hình cổ chân ở tư thế 90°:** Giữ khớp cổ chân ổn định, tập đi lại an toàn.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Mở lỏng các quai dán của nẹp.
- **Bước 2:** Đặt gót chân người bệnh áp sát hoàn toàn vào góc vuông đáy nẹp.
- **Bước 3:** Dán quai đai ngang cẳng chân trên và quai đai quanh mắt cá chân với lực siết vừa vặn.
${hasPump ? '- **Bước 4 (Đối với nẹp có bơm):** Bóp bóng cao su mini vài lần để bơm khí căng êm hai bên mắt cá chân, ôm khít chống cọ xát. Khi tháo nẹp, nhấn núm xả hơi.\n' : ''}- **Bước 5:** Xỏ chân đã đeo nẹp vào giày thể thao hoặc giày lười rộng rãi để tập đi lại.
- **Bước 6:** Cho người bệnh bước đi thử: Mũi bàn chân được nhấc cao tự nhiên ngang mặt đất, không còn bị rũ quẹt mũi chân là đạt yêu cầu.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không siết đai quá chật làm tím tái hoặc tê bì các đầu ngón chân.
- Chọn giày thể thao có kích thước lớn hơn 1 size để xỏ nẹp thoải mái nhất.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** đúc từ nhựa dẻo Polypropylene (PP) định hình nhiệt, mỏng nhẹ luồn vừa trong giày, tạo lực đẩy đàn hồi nâng mũi bàn chân nhịp nhàng theo từng bước chân.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Chất liệu | Nhựa dẻo PP chịu lực cao cấp, đệm lót xốp thoáng khí |
| Phân loại | Chân Trái / Chân Phải |
| Kích cỡ | Size S (size giày 35–37), Size M (38–40), Size L (41–44) |
| Tính năng đặc biệt | ${hasPump ? 'Túi khí kép bơm xả êm ái ôm sát mắt cá chân' : 'Bản đế siêu mỏng mang vừa trong giày thể thao'} |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Khắc phục hoàn toàn tật bàn chân rũ:** Nâng mũi chân vuông góc 90°, bước đi tự tin không lo vấp ngã.
- **Mỏng nhẹ luồn vừa trong giày:** Đi lại ngoài phố tự nhiên mà không ai phát hiện đang mang nẹp.
- **Hỗ trợ phục hồi thần kinh cơ:** Tạo dáng đi chuẩn sinh lý, kích thích các nhóm cơ chân hồi phục.`;
  }

  // 6. Ghế bệt tựa lưng giường (TEC-100058)
  if (name.includes('GHẾ BỆT TỰA LƯNG') || code === 'TEC-100058') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Ghế bệt tựa lưng giường điều chỉnh độ nghiêng** là phụ kiện chăm sóc thông minh đặt trực tiếp lên giường ngủ gia đình, giúp nâng đỡ lưng người bệnh ở tư thế Fowler để ăn uống, đọc sách hoặc thở dễ dàng.

Sản phẩm phù hợp với:
- **Người cao tuổi, người bệnh dưỡng bệnh tại nhà:** Cần ngồi dậy sinh hoạt mà không phải đầu tư giường y tế đắt đỏ.
- **Người khó thở khi nằm phẳng (suy tim, viêm phế quản, trào ngược dạ dày):** Kê cao đầu lưng để thở êm ái hơn.
- **Người thích ngồi tựa lưng đọc sách, xem tivi thư giãn trên giường.**

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Đặt ghế tựa lưng lên trên mặt đệm giường, sát về phía đầu giường.
- **Bước 2:** Nhấc khung tựa lưng lên và cài thanh chống chịu lực vào một trong 6 rãnh răng cưa theo góc nghiêng mong muốn (góc 75° – 85° khi ăn uống, góc 45° khi đọc sách, góc 30° khi nằm nghỉ).
- **Bước 3:** Cho người bệnh ngồi tựa lưng êm ái, căn chỉnh gối kê đầu phù hợp với tầm gáy.
- **Bước 4:** Khi không dùng, nhấc nhẹ khung để trả thanh chống về và gập phẳng cất gọn dưới gầm giường.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Cài thanh chống chắc chắn vào đúng rãnh răng cưa trước khi tựa lưng.
- Lau sạch lưới đệm định kỳ bằng khăn ẩm.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Ghế tựa lưng giường** có khung thép ống sơn tĩnh điện chịu tải 120kg, 6 nấc chỉnh độ nghiêng từ 20° đến 85°, lưới đệm thoáng khí và gối tựa đầu rời êm ái.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Ghế bệt tựa lưng giường điều chỉnh độ nghiêng |
| Khung sườn | Thép ống carbon sơn tĩnh điện chống oxy hóa |
| Kích thước tựa lưng | 60 cm x 60 cm rộng rãi |
| Nấc điều chỉnh góc ngả | 6 nấc linh hoạt từ 20° đến 85° |
| Tải trọng tối đa | 120 kg |
| Gối tựa đầu | Có gối đệm kê gáy tháo rời tiện lợi |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Biến giường thường thành giường y tế:** Tiết kiệm chi phí tối đa cho gia đình.
- **6 nấc ngả linh hoạt:** Thỏa mãn mọi nhu cầu ăn uống, đọc sách, nghỉ ngơi.
- **Gấp phẳng siêu gọn:** Dày chỉ 5cm khi gấp, cất gọn gàng không tốn diện tích.`;
  }

  // 7. Khung trợ lực khớp gối (TEC-100059)
  if (name.includes('TRỢ LỰC KHỚP GỐI') || code === 'TEC-100059') {
    return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**Khung trợ lực khớp gối lò xo kép PowerKnee** là thiết bị trợ lực sinh học đeo ngoài khớp gối, giúp giảm tải trực tiếp tới 40kg áp lực tỳ đè lên sụn khớp gối.

Sản phẩm đặc biệt phù hợp với:
- **Người cao tuổi thoái hóa khớp gối nặng:** Đau nhói, phát ra tiếng lạo xạo khi đứng lên ngồi xuống hoặc leo cầu thang.
- **Người lao động nặng, khuân vác, ngồi xổm nhiều:** Cần giảm tải trọng tỳ đè phá hủy sụn khớp gối.
- **Người chơi thể thao, leo núi đường dài:** Bảo vệ dây chằng và sụn chêm chống quá tải.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Đặt cụm lò xo trợ lực nằm chính xác ở phía sau kheo chân.
- **Bước 2:** Vòng quai đai phía trên quấn chặt quanh đùi (cách xương bánh chè khoảng 5 – 7cm), dán băng dán Velcro.
- **Bước 3:** Vòng quai đai phía dưới quấn chặt quanh bắp chân và dán cố định.
- **Bước 4:** Gập thử đầu gối và bước đi: Cảm nhận rõ rệt lực đẩy bung của lò xo hỗ trợ đẩy người đứng thẳng dậy khi duỗi gối.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Quấn đai với độ siết vừa phải, không làm tê bàn chân do nghẽn mạch máu.
- Không để cát bụi lọt vào cụm lò xo trợ lực.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**Khung trợ lực PowerKnee** trang bị 3 cụm lò xo thép carbon đàn hồi cực mạnh mỗi bên nẹp, khung hợp kim nhôm hàng không siêu nhẹ và đệm silicon tổ ong thoáng khí.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | Khung trợ lực khớp gối lò xo PowerKnee |
| Quy cách đóng gói | 1 đôi (2 chiếc trợ lực cho hai bên chân) |
| Lực đàn hồi trợ lực | Giảm khoảng 20kg áp lực cho mỗi bên khớp gối (tổng 40kg) |
| Cấu trúc | Khung nhôm siêu nhẹ + 3 cụm lò xo thép carbon chịu lực |
| Đệm lót | Vải lặn Neoprene bọc đệm silicon tổ ong thoáng khí |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Giảm ngay 40kg áp lực lên hai đầu gối:** Đứng lên, leo cầu thang nhẹ nhõm như có người trợ lực nâng đỡ.
- **Bảo vệ toàn diện sụn chêm:** Phòng chống mài mòn sụn khớp gối hiệu quả.
- **Thiết kế công thái học:** Ôm sát, có thể mặc bên trong quần dài kín đáo.`;
  }

  // 8. Kẹp bóp tay kháng lực & Con lăn tập chân (TEC-100067, 64)
  return `### 1. ĐỐI TƯỢNG SỬ DỤNG PHÙ HỢP
**${name}** là dụng cụ phục hồi chức năng và rèn luyện thể lực chuyên dụng, thiết kế nhỏ gọn, độ bền cao, hỗ trợ phục hồi khả năng cầm nắm và tăng cường sức mạnh cơ bắp.

Sản phẩm phù hợp với:
- **Người phục hồi chức năng sau chấn thương:** Cần tăng lực cơ bàn tay hoặc cơ cẳng chân.
- **Người cao tuổi:** Rèn luyện phản xạ và độ dẻo dai của cơ bắp mỗi ngày.

### 2. HƯỚNG DẪN SỬ DỤNG VÀ TẬP LUYỆN
**Cách dùng chuẩn:**
- **Bước 1:** Khởi động nhẹ nhàng các khớp trước khi bắt đầu bài tập.
- **Bước 2:** Thực hiện các động tác nhịp nhàng, tăng dần cường độ từ nhẹ đến vừa theo khả năng của cơ thể.
- **Bước 3:** Duy trì tập luyện đều đặn 15 – 20 phút mỗi ngày.

### 3. LƯU Ý AN TOÀN KHI SỬ DỤNG
- Không tập quá sức gây đau mỏi cơ kéo dài.
- Vệ sinh dụng cụ bằng khăn ẩm sau khi tập.

### 4. ĐẶC ĐIỂM THIẾT KẾ & CẤU TẠO CHI TIẾT
**${name}** được sản xuất từ vật liệu y tế chuyên dụng cao cấp, an toàn cho da và chịu lực tác động liên tục bền bỉ.

| Tiêu chí | Thông số chi tiết |
| :--- | :--- |
| Tên sản phẩm | ${name} |
| Chất liệu | Vật liệu y tế chuyên dụng cao cấp |
| Chế độ bảo hành | ${warrantyText} |

### 5. TÍNH NĂNG & ƯU ĐIỂM NỔI BẬT
- **Tăng cường sức mạnh cơ bắp tự nhiên:** Kích hoạt tuần hoàn máu và tái tạo sợi cơ.
- **Nhỏ gọn bền đẹp:** Sử dụng tiện lợi mọi lúc mọi nơi.`;
}
