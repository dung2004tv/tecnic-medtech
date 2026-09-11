import { Product } from '../types';

export interface SpecItem {
  label: string;
  value: string;
  isImportant?: boolean;
}

export interface SpecGroup {
  name: string;
  icon?: string;
  items: SpecItem[];
}

export interface ProductDetailedSpecs {
  highlights: {
    label: string;
    value: string;
    sub?: string;
  }[];
  groups: SpecGroup[];
}

export function getProductDetailedSpecs(product: Product): ProductDetailedSpecs {
  const code = product.code || '';
  const name = product.name || '';
  const specs = product.specifications || ({} as any);
  const brand = specs.brand || 'Chính hãng';
  const origin = specs.origin || 'Tiêu chuẩn quốc tế';
  const warranty = specs.warrantyMonths || 12;
  const model = specs.model || code;
  const category = (product.category || '').toUpperCase();
  const nameUpper = name.toUpperCase();

  // 1. GẬY & NẠNG CHỐNG (GAY_NANG)
  if (category.includes('GAY') || category.includes('NANG') || nameUpper.includes('GẬY') || nameUpper.includes('NẠNG')) {
    const isNang = nameUpper.includes('NẠNG');
    const is3Chan = nameUpper.includes('3 CHÂN');
    const isGhe = nameUpper.includes('GHẾ');
    const isGapKhuc = nameUpper.includes('GẤP KHÚC') || nameUpper.includes('KHIẾM THỊ');

    const maxLoad = isNang ? '120 kg' : (is3Chan ? '100 kg' : '100 - 110 kg');
    let weightVal = '820 g';
    if (isNang) weightVal = '0.9 kg / chiếc';
    else if (is3Chan) weightVal = '750 g';
    else if (specs.weight && !specs.weight.toLowerCase().includes('80kg') && !specs.weight.toLowerCase().includes('100kg')) {
      weightVal = specs.weight;
    }
    const heightRange = isNang ? '115 cm – 135 cm (9 nấc)' : (is3Chan ? '70 cm – 92 cm' : '72 cm – 95 cm (10 nấc)');
    const materialVal = specs.material || 'Hợp kim nhôm siêu nhẹ, mạ Niken chống oxy hóa';

    return {
      highlights: [
        { label: 'Tải trọng an toàn', value: maxLoad, sub: 'Chịu lực chống đổ vững chãi' },
        { label: 'Chiều cao điều chỉnh', value: heightRange, sub: 'Phù hợp người cao 1m45 – 1m85' },
        { label: 'Trọng lượng nhẹ', value: weightVal, sub: 'Cầm nắm êm, không mỏi tay' },
        { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng hỗ trợ kỹ thuật chu đáo` }
      ],
      groups: [
        {
          name: '1. Thông tin chung & Nhận diện',
          items: [
            { label: 'Tên sản phẩm', value: name, isImportant: true },
            { label: 'Mã sản phẩm (SKU)', value: code },
            { label: 'Model', value: model },
            { label: 'Thương hiệu', value: brand, isImportant: true },
            { label: 'Xuất xứ công nghệ', value: origin },
            { label: 'Phân loại thiết bị', value: 'Dụng cụ hỗ trợ di chuyển và thăng bằng y tế' }
          ]
        },
        {
          name: '2. Kích thước & Trọng lượng',
          items: [
            { label: 'Chiều cao sử dụng', value: heightRange, isImportant: true },
            { label: 'Khoảng điều chỉnh nấc', value: 'Nút bấm lò xo bi thép với các lỗ định vị cách nhau 2.5 cm' },
            { label: 'Đường kính đế chân', value: is3Chan ? 'Kiềng 3 chân tam giác rộng 20 cm' : (isNang ? 'Đế cao su đúc 4 cm' : 'Chân đế rộng 18 x 22 cm') },
            { label: 'Trọng lượng thiết bị', value: weightVal },
            { label: 'Tải trọng chịu lực tối đa', value: maxLoad, isImportant: true }
          ]
        },
        {
          name: '3. Vật liệu & Kết cấu cơ khí',
          items: [
            { label: 'Chất liệu khung chính', value: materialVal, isImportant: true },
            { label: 'Xử lý bề mặt', value: 'Mạ Niken / Sơn tĩnh điện chống hoen gỉ, chống trầy xước' },
            { label: 'Tay nắm cầm', value: 'Nhựa nguyên sinh ABS công thái học bo viền lượn sóng hoặc xốp EVA êm ái' },
            { label: 'Đế tiếp đất', value: 'Cao su đúc nguyên khối chịu mài mòn, có rãnh khía ma sát sâu chống trượt nước' },
            { label: 'Vòng ren chống rung', value: 'Trang bị đai ốc ren hãm chống rung lắc và triệt tiêu tiếng kêu khi chống gậy' }
          ]
        },
        {
          name: '4. Vận hành & Tính năng kỹ thuật',
          items: [
            { label: 'Cơ chế điều chỉnh', value: 'Chốt bấm định vị một chạm kết hợp khóa xoay an toàn' },
            { label: 'Khả năng gấp gọn', value: isGapKhuc || isGhe ? 'Có thể gấp gọn thành 4 khúc tiện bỏ balo, túi xách' : 'Dạng thân rút liền khối chắc chắn' },
            { label: 'Tính năng đặc biệt', value: isGhe ? 'Tích hợp mặt ghế ngồi nghỉ ngơi khi đi bộ mỏi chân' : (is3Chan ? 'Tự đứng thăng bằng trên sàn phẳng không cần dựa tường' : 'Đế 4 chân bám sàn chống trượt') }
          ]
        },
        {
          name: '5. Chỉ định y tế & Đóng gói',
          items: [
            { label: 'Đối tượng sử dụng', value: 'Người cao tuổi yếu chân, người phục hồi sau tai biến đột quỵ, người sau mổ xương khớp' },
            { label: 'Chứng nhận tiêu chuẩn', value: 'Đạt chuẩn trang thiết bị y tế loại A, tiêu chuẩn CE, ISO 13485' },
            { label: 'Quy cách đóng gói', value: 'Hộp carton chính hãng kèm sách hướng dẫn sử dụng' },
            { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
          ]
        }
      ]
    };
  }

  // 2. KHUNG TẬP ĐI (KHUNG_TAP_DI)
  if (category.includes('KHUNG') || nameUpper.includes('KHUNG TẬP ĐI') || nameUpper.includes('W-47') || nameUpper.includes('VK157')) {
    const hasWheels = nameUpper.includes('BÁNH') || nameUpper.includes('W-47B');
    const hasSeat = nameUpper.includes('GHẾ') || nameUpper.includes('ĐỆM');
    const hasArmrest = nameUpper.includes('NÁCH') || nameUpper.includes('TỰA TAY');

    const maxLoad = '120 kg – 150 kg';
    const weightVal = specs.weight || (hasArmrest ? '7.5 kg' : (hasWheels ? '4.2 kg' : '2.8 kg'));
    const heightRange = specs.dimensions || '79 cm – 97 cm (8 nấc điều chỉnh)';
    const materialVal = specs.material || 'Hợp kim nhôm cao cấp, chốt thép gia cường';

    return {
      highlights: [
        { label: 'Tải trọng chịu lực', value: maxLoad, sub: 'Khung kiên cố chống rung lắc' },
        { label: 'Chiều cao điều chỉnh', value: heightRange, sub: 'Phù hợp thể trạng 1m45 – 1m85' },
        { label: 'Trọng lượng khung', value: weightVal, sub: 'Gấp gọn nhẹ nhàng bằng 1 nút bấm' },
        { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng – Linh phụ kiện đầy đủ` }
      ],
      groups: [
        {
          name: '1. Thông tin chung & Nhận diện',
          items: [
            { label: 'Tên sản phẩm', value: name, isImportant: true },
            { label: 'Mã sản phẩm (SKU)', value: code },
            { label: 'Thương hiệu', value: brand, isImportant: true },
            { label: 'Xuất xứ công nghệ', value: origin },
            { label: 'Phân nhóm', value: 'Khung tập đi phục hồi chức năng vận động chi dưới' }
          ]
        },
        {
          name: '2. Kích thước & Trọng lượng chi tiết',
          items: [
            { label: 'Kích thước mở rộng', value: '52 cm (Rộng) x 48 cm (Sâu) x 79 - 97 cm (Cao)' },
            { label: 'Khoảng cách giữa 2 tay vịn', value: '45 cm (lòng trong rộng rãi, thoải mái đứng trong khung)' },
            { label: 'Kích thước khi gấp gọn', value: '52 cm x 10 cm x 80 cm (gọn gàng cất gầm giường, cốp xe ô tô)' },
            { label: 'Trọng lượng bản thân', value: weightVal },
            { label: 'Tải trọng tối đa', value: maxLoad, isImportant: true }
          ]
        },
        {
          name: '3. Vật liệu & Kết cấu cơ khí',
          items: [
            { label: 'Chất liệu khung chính', value: materialVal, isImportant: true },
            { label: 'Đường kính ống nhôm', value: 'Ống nhôm dầy phi 25 mm chịu uốn cong và va đập cao' },
            { label: 'Tay nắm', value: 'Mút cao su xốp EVA êm ái chống chai tay và thấm mồ hôi' },
            { label: 'Bánh xe & Chân đế', value: hasWheels ? '2 bánh xe trước dẫn hướng chống trượt + 2 chân sau đế cao su ma sát cao' : '4 chân bọc cao su đúc nguyên khối chống trơn trượt' },
            { label: 'Đệm ghế ngồi', value: hasSeat ? 'Tấm đệm da Simili chống thấm nước, có thể gập lên khi bước đi' : 'Tùy chọn phụ kiện ghế gài' }
          ]
        },
        {
          name: '4. Vận hành & Chế độ tập luyện',
          items: [
            { label: 'Chế độ bước đi Ziczac', value: 'Hai bên khung cử động nhịp nhàng theo từng bước chân người bệnh' },
            { label: 'Chế độ khung Cố định', value: 'Khóa cứng toàn bộ khung để tỳ tựa đứng lên hoặc bước thẳng' },
            { label: 'Cơ chế gấp gọn', value: 'Bấm một nút khóa trung tâm trên thanh giằng là khung gập lại ngay tức thì' }
          ]
        },
        {
          name: '5. Chỉ định y tế & Đóng gói',
          items: [
            { label: 'Đối tượng sử dụng', value: 'Người bệnh liệt nửa người sau tai biến, gãy xương cẳng chân/đùi, người già yếu chân' },
            { label: 'Chứng nhận chất lượng', value: 'Tiêu chuẩn an toàn y tế CE, ISO 9001, ISO 13485' },
            { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
          ]
        }
      ]
    };
  }

  // 3. XE LĂN TAY & XE LĂN ĐIỆN (XE_LAN)
  if (category.includes('XE_LAN') || nameUpper.includes('XE LĂN')) {
    const isElectric = nameUpper.includes('ĐIỆN');
    const isNgaNam = nameUpper.includes('NGẢ') || nameUpper.includes('NẰM') || code === 'TEC-100017' || code === 'TEC-100021';
    const isDuLich = nameUpper.includes('DU LỊCH') || nameUpper.includes('GẤP GỌN');

    const maxLoad = specs.weight || '120 kg – 130 kg';
    const netWeight = isElectric ? '28 kg – 34 kg' : (isDuLich ? '8.5 kg – 10 kg' : (isNgaNam ? '18 kg – 20 kg' : '15 kg – 17 kg'));
    const seatWidth = '46 cm – 50 cm (chuẩn vóc dáng người châu Á)';
    const materialVal = specs.material || (isDuLich ? 'Hợp kim nhôm siêu nhẹ' : 'Khung thép hợp kim mạ crom hoặc sơn tĩnh điện');

    return {
      highlights: [
        { label: 'Tải trọng chịu lực', value: maxLoad, sub: 'Chịu tải bền bỉ, an toàn' },
        { label: 'Chiều rộng đệm ngồi', value: seatWidth, sub: 'Ngồi êm ái, thoáng khí' },
        { label: 'Trọng lượng xe', value: netWeight, sub: 'Gấp gọn tiện mang lên xe hơi' },
        { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng khung và động cơ` }
      ],
      groups: [
        {
          name: '1. Thông tin chung & Nhận diện',
          items: [
            { label: 'Tên sản phẩm', value: name, isImportant: true },
            { label: 'Mã sản phẩm (SKU)', value: code },
            { label: 'Thương hiệu', value: brand, isImportant: true },
            { label: 'Xuất xứ', value: origin },
            { label: 'Phân loại', value: isElectric ? 'Xe lăn điện thông minh điều khiển Joystick' : (isNgaNam ? 'Xe lăn đa năng ngả nằm thành giường có bô' : 'Xe lăn tay tiêu chuẩn có phanh') }
          ]
        },
        {
          name: '2. Kích thước & Trọng lượng',
          items: [
            { label: 'Kích thước tổng thể (mở)', value: isNgaNam ? '120 cm x 68 cm x 122 cm' : '95 cm x 65 cm x 90 cm' },
            { label: 'Kích thước sau khi gấp', value: '90 cm x 28 cm x 90 cm (lọt vừa cốp mọi dòng xe ô tô)' },
            { label: 'Chiều rộng lòng ghế ngồi', value: seatWidth, isImportant: true },
            { label: 'Chiều cao từ sàn tới đệm', value: '48 cm – 50 cm' },
            { label: 'Đường kính bánh xe lớn', value: isElectric ? 'Bánh sau 12 inch hoặc 16 inch' : 'Bánh nan hoa/đúc 24 inch có vành lăn tay' },
            { label: 'Đường kính bánh dẫn hướng', value: 'Bánh trước 7 – 8 inch xoay 360 độ linh hoạt' },
            { label: 'Trọng lượng bản thân', value: netWeight },
            { label: 'Tải trọng tối đa', value: maxLoad, isImportant: true }
          ]
        },
        {
          name: '3. Cấu tạo vật liệu & Cơ khí',
          items: [
            { label: 'Chất liệu khung xe', value: materialVal, isImportant: true },
            { label: 'Chất liệu đệm ngồi & tựa lưng', value: 'Vải bạt Caro Oxford 2 lớp thoáng khí hoặc đệm da Simili chống thấm nước' },
            { label: 'Lốp bánh xe', value: 'Lốp cao su đúc đặc chống thủng đinh, không bao giờ phải bơm hơi' },
            { label: 'Hệ thống phanh', value: 'Phanh tay hãm cứng bánh xe cho người ngồi + Phanh bóp tay cho người đẩy phía sau' },
            { label: 'Chức năng ngả nằm', value: isNgaNam ? 'Góc ngả lưng từ 90° đến 180° thành giường nằm mini, có gối đỡ đầu' : 'Tựa lưng thẳng tiêu chuẩn' },
            { label: 'Khay bô vệ sinh', value: isNgaNam || nameUpper.includes('BÔ') ? 'Tích hợp bô vệ sinh tháo rời rút ngang dưới gầm ghế' : 'Không kèm bô' }
          ]
        },
        {
          name: '4. Thông số điện (Nếu là xe lăn điện)',
          items: isElectric ? [
            { label: 'Động cơ', value: 'Động cơ kép không chổi than 250W x 2 (Tổng công suất 500W)' },
            { label: 'Bộ điều khiển', value: 'Cần gạt thông minh Joystick 360 độ, điều chỉnh 5 tốc độ, còi báo động' },
            { label: 'Ắc quy / Pin', value: 'Pin Lithium 24V - 12Ah siêu bền, tháo rời tiện sạc' },
            { label: 'Quãng đường 1 lần sạc', value: '15 km – 20 km liên tục' },
            { label: 'Hệ thống phanh điện từ', value: 'Tự động hãm cứng khi nhả cần điều khiển, chống trôi dốc an toàn tuyệt đối' }
          ] : [
            { label: 'Cơ chế vận hành', value: 'Lăn tay độc lập bằng vành lăn inox hoặc người nhà đẩy tay phía sau' },
            { label: 'Gấp gọn', value: 'Nhấc nhẹ giữa hai mép đệm ngồi là xe gấp gọn lại trong 3 giây' }
          ]
        },
        {
          name: '5. Tiêu chuẩn y tế & Bảo hành',
          items: [
            { label: 'Chứng nhận kiểm định', value: 'CE, ISO 13485, Tiêu chuẩn an toàn Bộ Y tế' },
            { label: 'Phụ kiện kèm theo', value: 'Đai an toàn thắt bụng, bộ cờ lê sửa chữa, gối tựa đầu (với xe ngả nằm)' },
            { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
          ]
        }
      ]
    };
  }

  // 4. GHẾ BÔ VỆ SINH & GHẾ TẮM (GHE_BO_TAM)
  if (category.includes('GHE_BO') || category.includes('TAM') || nameUpper.includes('GHẾ BÔ') || nameUpper.includes('GHẾ TẮM')) {
    const hasWheels = nameUpper.includes('BÁNH') || code === 'TEC-100026' || code === 'TEC-100027';
    const isAlu = nameUpper.includes('NHÔM') || nameUpper.includes('GBM-016') || nameUpper.includes('G-96');

    const maxLoad = '120 kg – 130 kg';
    const netWeight = specs.weight || (hasWheels ? '7.8 kg – 9.2 kg' : '3.8 kg – 5.5 kg');
    const seatWidth = '45 cm – 48 cm';
    const materialVal = isAlu ? 'Hợp kim nhôm siêu nhẹ, không rỉ sét khi tiếp xúc nước xà phòng' : 'Thép mạ crom chống rỉ';

    return {
      highlights: [
        { label: 'Tải trọng an toàn', value: maxLoad, sub: 'Chân đế vững chãi chống lật' },
        { label: 'Chống nước 100%', value: 'Hợp kim không gỉ', sub: 'Tắm rửa xịt nước thoải mái' },
        { label: 'Đa chức năng 3 trong 1', value: 'Ghế ngồi - Bô - Xe tắm', sub: 'Đẩy thẳng trùm lên bồn cầu gia đình' },
        { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng khung và phụ kiện` }
      ],
      groups: [
        {
          name: '1. Thông tin chung & Nhận diện',
          items: [
            { label: 'Tên sản phẩm', value: name, isImportant: true },
            { label: 'Mã sản phẩm (SKU)', value: code },
            { label: 'Thương hiệu', value: brand, isImportant: true },
            { label: 'Xuất xứ', value: origin },
            { label: 'Phân loại', value: hasWheels ? 'Ghế bô vệ sinh có bánh xe kiêm xe đẩy tắm chống nước' : 'Ghế bô vệ sinh tĩnh có điều chỉnh độ cao' }
          ]
        },
        {
          name: '2. Kích thước & Trọng lượng',
          items: [
            { label: 'Kích thước tổng thể', value: '55 cm (Rộng) x 53 cm (Sâu) x 88 - 98 cm (Cao)' },
            { label: 'Chiều rộng lòng ghế ngồi', value: seatWidth, isImportant: true },
            { label: 'Chiều cao mặt đệm từ sàn', value: '45 cm – 55 cm (tùy chỉnh 5 nấc bấm chân)' },
            { label: 'Khoảng sáng gầm ghế', value: 'Cao 42 cm (đẩy trùm vừa vặn lên mọi bồn cầu bệt gia đình)' },
            { label: 'Trọng lượng bản thân', value: netWeight },
            { label: 'Tải trọng tối đa', value: maxLoad, isImportant: true }
          ]
        },
        {
          name: '3. Cấu tạo vật liệu & Thiết kế chi tiết',
          items: [
            { label: 'Chất liệu khung sườn', value: materialVal, isImportant: true },
            { label: 'Mặt đệm ngồi', value: 'Mút xốp PU nguyên khối chống thấm nước 100%, có nắp đệm chữ U đậy kín' },
            { label: 'Xô chứa bô vệ sinh', value: 'Nhựa y tế nguyên sinh tròn/vuông dung tích 5 lít, có nắp đậy ngăn mùi và quai xách' },
            { label: 'Bánh xe', value: hasWheels ? '4 bánh xe xoay 360 độ bằng nhựa chịu lực chống nước, có khóa đạp hãm phanh ở cả 4 bánh' : '4 chân bọc cao su đúc giác hút chống trượt sàn gạch ướt' },
            { label: 'Tựa tay & Gác chân', value: 'Gác tay bằng nhựa nhám chống trơn; bàn đạp để chân có thể gạt lên khi đứng dậy' }
          ]
        },
        {
          name: '4. Vận hành & Tính năng nổi bật',
          items: [
            { label: 'Tính năng đẩy trùm bồn cầu', value: 'Rút bô ra là có thể đẩy thẳng ghế lọt qua miệng bồn cầu bệt để đi vệ sinh trực tiếp' },
            { label: 'Khả năng gấp gọn', value: 'Có thể tháo rời tựa lưng và gấp chân xếp gọn khi đi xa hoặc du lịch' },
            { label: 'Chống đọng nước', value: 'Bề mặt ghế có các rãnh thoát nước, không đọng bọt xà phòng khi tắm gội' }
          ]
        },
        {
          name: '5. Chỉ định y tế & Đóng gói',
          items: [
            { label: 'Đối tượng sử dụng', value: 'Người cao tuổi đi lại khó khăn, người bệnh sau tai biến, gãy xương háng, phụ nữ sau sinh' },
            { label: 'Chứng nhận', value: 'Đạt chuẩn trang thiết bị y tế loại A, ISO 13485' },
            { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
          ]
        }
      ]
    };
  }

  // 5. ĐAI NẸP KHỚP & CỘT SỐNG (DAI_NEP_KHOP)
  if (category.includes('DAI_NEP') || nameUpper.includes('ĐAI') || nameUpper.includes('NẸP')) {
    const isLung = nameUpper.includes('LƯNG') || nameUpper.includes('CỘT SỐNG');
    const isDiChuyen = nameUpper.includes('DI CHUYỂN');
    const isKhopGoi = nameUpper.includes('GỐI');

    const materialVal = specs.material || 'Vải thun dệt kim co giãn 4 chiều kháng khuẩn, thanh nẹp hợp kim nhôm uốn định hình';
    const sizeRange = 'S, M, L, XL, XXL (đo chu vi vòng eo / vòng khớp)';

    return {
      highlights: [
        { label: 'Chất liệu cao cấp', value: 'Vải dệt kim thoáng khí', sub: 'Thoáng mồ hôi, không bí bách' },
        { label: 'Hệ thống thanh nẹp', value: isLung ? '4 - 6 thanh nẹp nhôm' : 'Bản lề trợ lực', sub: 'Cố định vững chắc đường cong sinh lý' },
        { label: 'Độ co giãn định hình', value: 'Dây đai tăng cường kép', sub: 'Tùy chỉnh lực siết ôm sát cơ thể' },
        { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng chất liệu và đường may` }
      ],
      groups: [
        {
          name: '1. Thông tin chung & Nhận diện',
          items: [
            { label: 'Tên sản phẩm', value: name, isImportant: true },
            { label: 'Mã sản phẩm (SKU)', value: code },
            { label: 'Thương hiệu', value: brand, isImportant: true },
            { label: 'Xuất xứ', value: origin },
            { label: 'Phân loại', value: isLung ? 'Đai cố định cột sống thắt lưng cao cấp' : (isDiChuyen ? 'Đai hỗ trợ tập đi và di chuyển bệnh nhân trợ lực' : 'Nẹp cố định khớp gối/cổ chân phục hồi chức năng') }
          ]
        },
        {
          name: '2. Kích thước & Hướng dẫn chọn size',
          items: [
            { label: 'Các size sẵn có', value: sizeRange, isImportant: true },
            { label: 'Cách đo chọn size', value: isLung ? 'Dùng thước dây đo quanh vòng bụng ngang rốn: Size S (65-75cm), M (75-85cm), L (85-95cm), XL (95-105cm), XXL (>105cm)' : 'Đo chu vi vòng đùi trên khớp gối 10 cm' },
            { label: 'Bản rộng thân đai', value: isLung ? 'Bản lưng cao 22 cm – 24 cm ôm trọn từ đốt L1 đến S1' : 'Bản đai rộng 15 cm có 6 quai cầm tay trợ lực' },
            { label: 'Trọng lượng', value: '250 g – 450 g (siêu nhẹ, mặc ẩn bên trong áo sơ mi thoải mái)' }
          ]
        },
        {
          name: '3. Vật liệu & Cấu tạo kỹ thuật',
          items: [
            { label: 'Vải dệt chính', value: materialVal, isImportant: true },
            { label: 'Thanh định hình', value: isLung ? 'Gồm 4 đến 6 thanh nẹp hợp kim nhôm định hình uốn cong theo giải phẫu cột sống thắt lưng' : 'Bản lề kim loại khóa góc gập duỗi' },
            { label: 'Khóa dán Velcro', value: 'Gai dán siêu dính thế hệ mới chịu lực xé trên 10.000 lần, không bám xơ vải' },
            { label: 'Dây tăng cường lực', value: 'Hệ thống 2 dây chéo tăng cường hai bên hông giúp siết chặt ôm khít hông' }
          ]
        },
        {
          name: '4. Tác dụng điều trị & Lâm sàng',
          items: [
            { label: 'Chỉ định y khoa', value: 'Thoát vị đĩa đệm thắt lưng, thoái hóa cột sống, đau thần kinh tọa, loãng xương, chấn thương xẹp đốt sống' },
            { label: 'Cơ chế tác động', value: 'Giảm 30% - 40% áp lực trọng lực cơ thể đè nặng lên các đĩa đệm và các khe liên đốt sống' },
            { label: 'Hướng dẫn giặt', value: 'Giặt tay bằng nước xà phòng loãng, phơi trong bóng râm, tháo thanh nẹp trước khi giặt' }
          ]
        },
        {
          name: '5. Tiêu chuẩn & Đóng gói',
          items: [
            { label: 'Chứng chỉ chất lượng', value: 'Đạt chuẩn thiết bị y tế loại A, ISO 13485' },
            { label: 'Bảo hành', value: `${warranty} tháng tại TECNIC MEDTECH` }
          ]
        }
      ]
    };
  }

  // 6. GIƯỜNG Y TẾ & GIƯỜNG KÉO GIÃN (GIUONG_Y_TE)
  if (category.includes('GIUONG') || nameUpper.includes('GIƯỜNG')) {
    const isKeoGian = nameUpper.includes('KÉO GIÃN');
    const isDien = nameUpper.includes('ĐIỆN');
    const is4Tay = nameUpper.includes('4 TAY QUAY') || code === 'TEC-100094' || code === 'TEC-1000100';

    const maxLoad = '250 kg – 300 kg';
    const bedDims = isKeoGian ? '200 cm x 60 cm x 65 cm' : '212 cm x 97 cm x 55 cm';
    const weightVal = isKeoGian ? '75 kg' : (isDien ? '95 kg' : '78 kg – 85 kg');
    const materialVal = specs.material || 'Khung thép hộp chịu lực dập nguội, sơn tĩnh điện chống oxy hóa công nghệ cao';

    return {
      highlights: [
        { label: 'Tải trọng tối đa', value: maxLoad, sub: 'Khung thép chịu tải cực đại' },
        { label: 'Kích thước tiêu chuẩn', value: bedDims, sub: 'Rộng rãi, thoải mái xoay trở' },
        { label: 'Đa chức năng toàn diện', value: isKeoGian ? 'Kéo giãn lưng & cổ điện tử' : (is4Tay ? '4 tay quay + Bô + Chậu gội' : 'Điều khiển điện êm ái'), sub: 'Chăm sóc người bệnh tại nhà' },
        { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng hỗ trợ tận nơi` }
      ],
      groups: [
        {
          name: '1. Thông tin chung & Nhận diện',
          items: [
            { label: 'Tên sản phẩm', value: name, isImportant: true },
            { label: 'Mã sản phẩm (SKU)', value: code },
            { label: 'Thương hiệu', value: brand, isImportant: true },
            { label: 'Xuất xứ công nghệ', value: origin },
            { label: 'Phân loại', value: isKeoGian ? 'Giường vật lý trị liệu kéo giãn cột sống lưng cổ điện tử' : (isDien ? 'Giường y tế đa chức năng điều khiển bằng điện tự động' : 'Giường bệnh nhân 4 tay quay trợ lực đa năng') }
          ]
        },
        {
          name: '2. Kích thước & Trọng lượng',
          items: [
            { label: 'Kích thước phủ bì giường', value: bedDims, isImportant: true },
            { label: 'Kích thước lòng đệm', value: '198 cm x 90 cm x dày 7 cm' },
            { label: 'Chiều cao từ sàn tới đệm', value: '55 cm (chuẩn chiều cao nâng hạ người bệnh không bị với)' },
            { label: 'Trọng lượng bản thân', value: weightVal },
            { label: 'Tải trọng chịu lực an toàn', value: maxLoad, isImportant: true }
          ]
        },
        {
          name: '3. Cơ cấu vận hành & Góc nâng hạ',
          items: isKeoGian ? [
            { label: 'Lực kéo giãn thắt lưng', value: '0 kg – 99 kg (cài đặt điện tử vi xử lý chính xác từng kg)' },
            { label: 'Lực kéo giãn đốt sống cổ', value: '0 kg – 30 kg' },
            { label: 'Chế độ kéo', value: 'Kéo ngắt quãng chu kỳ / Kéo liên tục / Kéo bậc thang thích ứng' },
            { label: 'Mặt giường tách đôi', value: 'Nửa thân dưới trượt bi triệt tiêu ma sát hoàn toàn khi kéo' },
            { label: 'Công tắc dừng khẩn cấp', value: 'Emergency Switch cầm tay cho bệnh nhân tự ngắt lực kéo an toàn' }
          ] : [
            { label: 'Góc nâng lưng', value: '0° đến 85° (tùy chỉnh ngồi ăn uống, đọc sách chống sặc)' },
            { label: 'Góc hạ chân', value: '0° đến 90° (tư thế hạ cẳng chân buông thõng như ngồi ghế sofa)' },
            { label: 'Góc nâng chân', value: '0° đến 45° (nâng cao chân chống ứ trệ phù tĩnh mạch chi dưới)' },
            { label: 'Góc nghiêng người trái / phải', value: is4Tay ? '0° đến 55° mỗi bên (giúp lau lưng, vỗ rung long đờm chống loét)' : 'Không hỗ trợ' },
            { label: 'Cơ chế bô vệ sinh', value: 'Tay quay hoặc nút bấm điện đưa bô nâng khít sát mông tự động' }
          ]
        },
        {
          name: '4. Cấu tạo vật liệu & Phụ kiện đi kèm',
          items: [
            { label: 'Chất liệu khung giường', value: materialVal, isImportant: true },
            { label: 'Đầu và đuôi giường', value: 'Nhựa ABS đúc nguyên khối chống va đập, tháo lắp vệ sinh dễ dàng' },
            { label: 'Lan can bảo vệ hai bên', value: 'Thanh chắn hợp kim nhôm gập hạ thông minh chống té ngã ban đêm' },
            { label: 'Cấu tạo nệm giường', value: 'Đệm y tế 2 lớp: bên dưới xơ dừa ép nhiệt thoáng khí, bên trên mút xốp PU bọc vải chống thấm' },
            { label: 'Bánh xe di chuyển', value: '4 bánh xe lõi thép bọc cao su chịu tải 300kg, có phanh đạp khóa độc lập' },
            { label: 'Phụ kiện kèm theo trọn bộ', value: 'Bàn ăn di động gác thành giường, chậu gội đầu có ống xả, cọc truyền dịch inox 4 móc treo, bô vệ sinh' }
          ]
        },
        {
          name: '5. Tiêu chuẩn y tế & Bảo hành',
          items: [
            { label: 'Chứng nhận chất lượng', value: 'CE, ISO 9001, ISO 13485, Giấy phép lưu hành Bộ Y tế' },
            { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng cho khung giường và motor/tay quay)` }
          ]
        }
      ]
    };
  }

  // 7. ROBOT NÂNG HẠ & PHỤC HỒI CHỨC NĂNG (ROBOT_NANG_HA)
  if (category.includes('ROBOT') || nameUpper.includes('ROBOT') || nameUpper.includes('GĂNG TẬP') || nameUpper.includes('GHẾ NÂNG')) {
    const isGangTay = nameUpper.includes('GĂNG') || code === 'TEC-100077' || code === 'TEC-100078';
    
    if (isGangTay) {
      return {
        highlights: [
          { label: 'Công nghệ kích thích', value: 'Khí nén sinh học Bionic', sub: 'Mô phỏng chuyển động ngón tay tự nhiên' },
          { label: '3 chế độ tập chuyên sâu', value: 'Tự động - Gương - Từng ngón', sub: 'Tái lập bản đồ dẫn truyền vỏ não' },
          { label: 'Cấp độ áp lực khí', value: '9 mức tùy chỉnh', sub: 'Màn hình cảm ứng LCD thông minh' },
          { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng đổi mới nếu lỗi kỹ thuật` }
        ],
        groups: [
          {
            name: '1. Thông tin chung & Nhận diện',
            items: [
              { label: 'Tên sản phẩm', value: name, isImportant: true },
              { label: 'Mã sản phẩm (SKU)', value: code },
              { label: 'Thương hiệu', value: brand, isImportant: true },
              { label: 'Xuất xứ', value: origin },
              { label: 'Phân loại', value: 'Găng tay Robot phục hồi chức năng bàn tay và ngón tay thông minh' }
            ]
          },
          {
            name: '2. Thông số kỹ thuật & Vận hành',
            items: [
              { label: 'Công nghệ nén khí', value: 'Bionic Pneumatic khí nén sinh học vi áp suất an toàn' },
              { label: 'Màn hình điều khiển', value: 'Màn hình cảm ứng LCD LED hiển thị thời gian, cấp độ lực, chế độ' },
              { label: 'Thời gian tập cài đặt', value: 'Hẹn giờ tự động 10 – 30 phút mỗi lần' },
              { label: 'Cấp độ lực kéo duỗi', value: '9 cấp độ (từ mức 1 nhẹ nhàng đến mức 9 căng giãn sâu)' },
              { label: 'Nguồn điện / Pin', value: 'Pin Lithium sạc lại tích hợp tiện mang đi xa, kèm củ sạc Type-C' },
              { label: 'Chọn size găng tay', value: 'Size S (tay trẻ em), Size M (vừa tay nữ), Size L (tay nam vừa), Size XL (tay nam lớn)' }
            ]
          },
          {
            name: '3. Vật liệu & Cấu tạo',
            items: [
              { label: 'Chất liệu găng robot', value: 'Nhựa polyme dẻo mềm bọc ống silicon y tế, vải thun co giãn thoáng khí' },
              { label: 'Găng cảm biến tay lành', value: 'Găng tay cảm biến truyền tín hiệu không dây siêu nhạy' },
              { label: 'Van phân lập từng ngón', value: 'Khóa van cơ học độc lập trên lưng từng ngón tay để tập riêng ngón bị cứng' }
            ]
          },
          {
            name: '4. Ứng dụng điều trị & Bảo hành',
            items: [
              { label: 'Chỉ định lâm sàng', value: 'Liệt nửa người sau tai biến, chấn thương tủy sống, co cứng gân cơ tay, sau mổ gân bàn tay' },
              { label: 'Trọn bộ sản phẩm', value: 'Thân máy chính, găng robot bên liệt (Trái/Phải), găng cảm biến bên lành, bóng gai tập, củ sạc, hộp đựng' },
              { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
            ]
          }
        ]
      };
    } else {
      // Ghế nâng chuyển người bệnh
      return {
        highlights: [
          { label: 'Tải trọng chịu lực', value: '130 kg – 150 kg', sub: 'Khung thép hợp kim carbon siêu dày' },
          { label: 'Chiều cao nâng hạ', value: '40 cm – 65 cm', sub: 'Nâng thủy lực đạp chân nhẹ nhàng' },
          { label: 'Mở tách đôi 180°', value: 'Ôm đón từ mép giường', sub: '1 người chăm sóc thao tác nhẹ nhàng' },
          { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng khung và piston nâng` }
        ],
        groups: [
          {
            name: '1. Thông tin chung & Nhận diện',
            items: [
              { label: 'Tên sản phẩm', value: name, isImportant: true },
              { label: 'Mã sản phẩm (SKU)', value: code },
              { label: 'Thương hiệu', value: brand, isImportant: true },
              { label: 'Phân loại', value: 'Thiết bị nâng hạ di chuyển người bệnh đa năng 4 trong 1' }
            ]
          },
          {
            name: '2. Kích thước & Trọng lượng',
            items: [
              { label: 'Kích thước phủ bì', value: '70 cm (Dài) x 58 cm (Rộng) x 85 - 110 cm (Cao)' },
              { label: 'Độ rộng lọt cửa', value: '58 cm (lọt vừa mọi khuôn cửa phòng ngủ, phòng tắm gia đình)' },
              { label: 'Chiều cao nâng mặt ghế', value: '40 cm – 65 cm (phù hợp giường, sofa, bồn cầu)' },
              { label: 'Chiều rộng lòng ghế', value: '48 cm – 52 cm' },
              { label: 'Trọng lượng xe', value: '28 kg – 32 kg' },
              { label: 'Tải trọng tối đa', value: '130 kg – 150 kg', isImportant: true }
            ]
          },
          {
            name: '3. Vật liệu & Cơ chế an toàn',
            items: [
              { label: 'Chất liệu khung', value: 'Thép hợp kim carbon dày dặn sơn tĩnh điện chống rỉ sét tuyệt đối' },
              { label: 'Mặt đệm ngồi', value: 'Đệm mút xốp PU nguyên khối chống nước, êm ái, lau rửa xịt vòi hoa sen' },
              { label: 'Cơ chế nâng hạ', value: 'Piston thủy lực đạp chân trợ lực hoặc trục vít quay mượt mà' },
              { label: 'Hệ thống chốt an toàn', value: 'Khóa ngàm an toàn kép phía sau lưng + Dây đai bảo hiểm chống tuột' },
              { label: 'Bánh xe', value: '4 bánh xe y tế chịu lực cao có khóa phanh hãm độc lập chống trôi xe' }
            ]
          },
          {
            name: '4. Tiêu chuẩn & Bảo hành',
            items: [
              { label: 'Đối tượng sử dụng', value: 'Bệnh nhân liệt nằm giường, người tai biến, người mất khả năng đứng bước' },
              { label: 'Phụ kiện kèm theo', value: 'Đệm ngồi êm, bô vệ sinh có nắp, đai an toàn, dụng cụ lắp ráp' },
              { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
            ]
          }
        ]
      };
    }
  }

  // 8. TRỊ LIỆU & XUNG ĐIỆN (TRI_LIEU_XUNG_DIEN)
  if (category.includes('TRI_LIEU') || category.includes('XUNG_DIEN') || nameUpper.includes('XUNG ĐIỆN') || nameUpper.includes('MASSAGE') || nameUpper.includes('ĐẠP CHÂN')) {
    const isXungDien = nameUpper.includes('XUNG ĐIỆN') || nameUpper.includes('OMRON');
    const isMassage = nameUpper.includes('MASSAGE') || nameUpper.includes('SÚNG');
    const isDapChan = nameUpper.includes('ĐẠP CHÂN') || nameUpper.includes('TẬP CHÂN');

    if (isXungDien) {
      return {
        highlights: [
          { label: 'Công nghệ trị liệu', value: 'Dòng điện xung TENS', sub: 'Phong bế tín hiệu đau, giảm đau tức thì' },
          { label: 'Chương trình điều trị', value: 'Đa vùng cơ thể', sub: 'Vai, Lưng, Bắp chân, Bàn chân, Khớp gối' },
          { label: 'Cường độ xung điện', value: '10 – 15 mức điều chỉnh', sub: 'Mô phỏng đấm bóp, day miết chuyên sâu' },
          { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng hỗ trợ kỹ thuật chu đáo` }
        ],
        groups: [
          {
            name: '1. Thông tin chung & Nhận diện',
            items: [
              { label: 'Tên sản phẩm', value: name, isImportant: true },
              { label: 'Mã sản phẩm (SKU)', value: code },
              { label: 'Thương hiệu', value: brand, isImportant: true },
              { label: 'Xuất xứ công nghệ', value: origin },
              { label: 'Phân loại', value: 'Máy massage xung điện trị liệu giảm đau thần kinh cơ' }
            ]
          },
          {
            name: '2. Thông số kỹ thuật & Năng lượng',
            items: [
              { label: 'Tần số phát xung', value: '1 Hz đến 1.200 Hz (tần số thấp kích thích lưu thông máu)' },
              { label: 'Thời gian mỗi liệu trình', value: 'Tự động hẹn giờ và ngắt nguồn sau 15 phút an toàn' },
              { label: 'Mức cường độ', value: '10 đến 15 cấp độ từ nhẹ nhàng đến co bóp sâu' },
              { label: 'Nguồn điện cấp', value: '2 pin kiềm AAA 1.5V (sử dụng liên tục được khoảng 3 - 4 tháng)' },
              { label: 'Kích thước thân máy', value: '112 mm x 52 mm x 25 mm (bỏ túi siêu gọn nhẹ)' },
              { label: 'Trọng lượng', value: 'Khoảng 100 g (bao gồm pin)' }
            ]
          },
          {
            name: '3. Phụ kiện & Điện cực dán',
            items: [
              { label: 'Miếng dán điện cực', value: 'Cặp miếng dán Long Life Pad độ bền cao, rửa nước tái dùng 300 lần' },
              { label: 'Dây dẫn điện cực', value: 'Dây cáp bọc mềm chống đứt gãy lõi đồng truyền dẫn ổn định' },
              { label: 'Trọn bộ phụ kiện', value: 'Thân máy chính, 1 cặp miếng dán, dây cáp, tấm nhựa bảo quản, 2 pin AAA, túi đựng' }
            ]
          },
          {
            name: '4. Chỉ định y tế & An toàn',
            items: [
              { label: 'Chỉ định điều trị', value: 'Đau mỏi vai gáy, thoái hóa khớp gối, đau thắt lưng, viêm gân, mỏi cơ sau vận động' },
              { label: 'Chống chỉ định', value: 'Tuyệt đối không dùng cho người đang mang máy tạo nhịp tim hoặc thiết bị cấy ghép' },
              { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
            ]
          }
        ]
      };
    } else if (isMassage) {
      return {
        highlights: [
          { label: 'Động cơ lực đẩy', value: 'Không chổi than 12kg', sub: 'Tác động sâu vào màng cơ Fascia 10mm' },
          { label: 'Tần số rung đấm', value: '1.800 – 3.200 RPM', sub: '5 cấp độ đấm tan axit lactic' },
          { label: 'Pin sạc Type-C', value: 'Dùng 5 – 7 ngày', sub: 'Dung lượng pin lớn, sạc nhanh tiện lợi' },
          { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng đổi mới động cơ` }
        ],
        groups: [
          {
            name: '1. Thông tin chung & Nhận diện',
            items: [
              { label: 'Tên sản phẩm', value: name, isImportant: true },
              { label: 'Mã sản phẩm (SKU)', value: code },
              { label: 'Thương hiệu', value: brand, isImportant: true },
              { label: 'Xuất xứ', value: origin },
              { label: 'Phân loại', value: 'Súng massage cơ bắp chuyên sâu cầm tay mini' }
            ]
          },
          {
            name: '2. Thông số kỹ thuật & Động cơ',
            items: [
              { label: 'Biên độ dao động', value: '8 mm – 10 mm (thâm nhập sâu vào các bó cơ lớn)' },
              { label: 'Tần số rung', value: '1.800 – 3.200 vòng/phút (5 cấp độ điều chỉnh)' },
              { label: 'Độ ồn hoạt động', value: '< 45 dB (vận hành êm ái, không gây rung lắc tay)' },
              { label: 'Cổng sạc & Nguồn', value: 'Cổng sạc Type-C (5V/2A), pin Lithium cao cấp' },
              { label: 'Trọng lượng thân máy', value: 'Khoảng 450 g – 680 g (cầm nắm nhẹ nhàng, chống mỏi cổ tay)' }
            ]
          },
          {
            name: '3. Bộ đầu massage đi kèm',
            items: [
              { label: 'Đầu bóng tròn', value: 'Chất liệu EVA êm ái dành cho các nhóm cơ lớn (đùi, bắp chuối, mông)' },
              { label: 'Đầu chữ U', value: 'Mát xa hai bên cột sống cổ, thắt lưng, gân gót chân' },
              { label: 'Đầu đạn hình nón', value: 'Tác động sâu vào các điểm kích hoạt cơ (Trigger point), lòng bàn chân' },
              { label: 'Đầu phẳng', value: 'Thư giãn toàn thân, tạo độ rung đều các bó cơ nông' }
            ]
          },
          {
            name: '4. Tiêu chuẩn & Bảo hành',
            items: [
              { label: 'Chứng nhận', value: 'CE, FCC, RoHS' },
              { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
            ]
          }
        ]
      };
    } else {
      // Máy đạp chân phục hồi chức năng
      return {
        highlights: [
          { label: 'Tập luyện 2 trong 1', value: 'Tập Tay & Chân', sub: 'Vận động khớp háng, gối, cổ tay, vai' },
          { label: 'Lực cản kháng lực', value: 'Núm xoay vô cấp', sub: 'Tùy chỉnh từ nhẹ nhàng đến nặng cơ' },
          { label: 'Đồng hồ điện tử LCD', value: 'Theo dõi 4 chỉ số', sub: 'Số vòng đạp, thời gian, calo, tốc độ' },
          { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng kết cấu và đồng hồ` }
        ],
        groups: [
          {
            name: '1. Thông tin chung & Nhận diện',
            items: [
              { label: 'Tên sản phẩm', value: name, isImportant: true },
              { label: 'Mã sản phẩm (SKU)', value: code },
              { label: 'Thương hiệu', value: brand, isImportant: true },
              { label: 'Phân loại', value: 'Máy tập đạp chân và quay tay phục hồi chức năng tại chỗ' }
            ]
          },
          {
            name: '2. Kích thước & Trọng lượng',
            items: [
              { label: 'Kích thước', value: '40 cm x 35 cm x 32 cm (để vừa dưới gầm bàn làm việc)' },
              { label: 'Trọng lượng máy', value: '3.8 kg – 5.5 kg' },
              { label: 'Chất liệu khung', value: 'Thép ống sơn tĩnh điện dày dặn, chịu tải trọng đạp lớn' },
              { label: 'Bàn đạp chân', value: 'Bàn đạp có vân gai chống trượt kèm quai cao su mềm nhiều nấc gài' },
              { label: 'Chân đế', value: '4 đế cao su chống trượt hít chặt mặt sàn gạch men' }
            ]
          },
          {
            name: '3. Tiêu chuẩn & Bảo hành',
            items: [
              { label: 'Đối tượng sử dụng', value: 'Bệnh nhân tai biến tập vận động tại nhà, người sau phẫu thuật thay khớp gối, người già chân yếu' },
              { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
            ]
          }
        ]
      };
    }
  }

  // 9. ĐỆM HƠI CHỐNG LOÉT (DEM_HOI_CHONG_LOET)
  if (category.includes('DEM_HOI') || nameUpper.includes('ĐỆM HƠI') || nameUpper.includes('CHỐNG LOÉT')) {
    const hasToiletHole = nameUpper.includes('B') || code === 'TEC-100068' || code === 'TEC-100069' || code === 'TEC-100070';
    const isTube = nameUpper.includes('096') || nameUpper.includes('ỐNG');

    const maxLoad = isTube ? '150 kg' : '120 kg – 130 kg';
    const materialVal = isTube ? 'Nhựa TPU y tế bọc vải dù chống trầy rách' : 'Nhựa PVC y tế cao cấp kháng khuẩn tiêu chuẩn Châu Âu';

    return {
      highlights: [
        { label: 'Chu kỳ đảo áp suất khí', value: '6 – 8 phút / lần', sub: 'Múi A-B luân phiên giải tỏa áp lực tỳ đè' },
        { label: 'Thiết kế lỗ bô vệ sinh', value: hasToiletHole ? 'Có múi bô tháo rời' : 'Đệm phẳng tiêu chuẩn', sub: hasToiletHole ? 'Đi vệ sinh tại giường không cần nhấc đệm' : 'Nâng đỡ êm ái thoáng khí lưng' },
        { label: 'Máy bơm vi áp suất', value: 'Vận hành siêu êm < 20dB', sub: 'Chạy liên tục 24/24h, công suất chỉ 7W' },
        { label: 'Chế độ bảo hành máy bơm', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng đổi mới máy bơm` }
      ],
      groups: [
        {
          name: '1. Thông tin chung & Nhận diện',
          items: [
            { label: 'Tên sản phẩm', value: name, isImportant: true },
            { label: 'Mã sản phẩm (SKU)', value: code },
            { label: 'Thương hiệu', value: brand, isImportant: true },
            { label: 'Xuất xứ', value: origin },
            { label: 'Phân loại', value: hasToiletHole ? 'Đệm hơi chống loét có lỗ khoét bô vệ sinh chuyên dụng' : 'Đệm hơi y tế chống loét luân phiên áp lực khí' }
          ]
        },
        {
          name: '2. Kích thước & Cấu trúc múi khí',
          items: [
            { label: 'Kích thước đệm khi bơm căng', value: '200 cm (Dài) x 90 cm (Rộng) x 7.5 cm (Dày) (vừa khít giường y tế)' },
            { label: 'Phần vạt bạt gài giường', value: 'Hai đầu có thêm vạt bạt dài 40 cm để lót sâu dưới đệm chống trượt' },
            { label: 'Cấu trúc múi khí', value: isTube ? 'Gồm 22 thanh ống tròn độc lập bằng TPU bọc vải dù chịu lực cao' : 'Hơn 130 múi khí quả trám dập nhiệt cao tần phân tán đều lực tỳ đè' },
            { label: 'Lỗ bô khoét vệ sinh', value: hasToiletHole ? 'Có dải múi khí chữ nhật rút rời độc lập ngay vị trí mông' : 'Không có lỗ bô' },
            { label: 'Tải trọng chịu lực tối đa', value: maxLoad, isImportant: true }
          ]
        },
        {
          name: '3. Thông số máy bơm khí nén',
          items: [
            { label: 'Cơ chế bơm xả luân phiên', value: 'Hệ thống van kép đảo khí tự động chu kỳ 6 - 8 phút/lần' },
            { label: 'Lưu lượng khí bơm', value: '6 – 8 lít / phút' },
            { label: 'Áp lực khí nén', value: '40 – 100 mmHg (có núm vặn điều chỉnh độ căng/êm theo cân nặng)' },
            { label: 'Độ ồn hoạt động', value: '≤ 20 dB (vận hành êm ru suốt ngày đêm, không ảnh hưởng giấc ngủ)' },
            { label: 'Điện năng tiêu thụ', value: '7 Watt (siêu tiết kiệm điện, tương đương bóng đèn ngủ)' },
            { label: 'Nguồn điện', value: '220V / 50Hz dân dụng' }
          ]
        },
        {
          name: '4. Chất liệu & Bảo quản',
          items: [
            { label: 'Chất liệu đệm', value: materialVal, isImportant: true },
            { label: 'Tính năng bề mặt', value: 'Chống thấm nước tiểu, kháng khuẩn, dễ dàng lau chùi bằng khăn tẩm cồn' },
            { label: 'Bộ phụ kiện đi kèm', value: 'Tấm đệm hơi, máy bơm áp suất, dây dẫn khí đôi, móc treo thành giường, bộ miếng dán và keo vá dự phòng' }
          ]
        },
        {
          name: '5. Tiêu chuẩn y tế & Bảo hành',
          items: [
            { label: 'Chỉ định lâm sàng', value: 'Phòng ngừa và điều trị hoại tử loét da tỳ đè cho bệnh nhân nằm liệt giường' },
            { label: 'Chứng nhận', value: 'Đạt chuẩn CE Châu Âu, ISO 13485' },
            { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng cho máy bơm)` }
          ]
        }
      ]
    };
  }

  // 10. TAY VỊN CẢI TẠO NHÀ TẮM (TAY_VIN_CAI_TAO)
  if (category.includes('TAY_VIN') || nameUpper.includes('TAY VỊN')) {
    const isGocL = nameUpper.includes('CHỮ L');
    const isBatMo = nameUpper.includes('BẬT') || nameUpper.includes('CHỮ U');
    const isBonCau = nameUpper.includes('BỒN CẦU');

    const maxLoad = '150 kg – 200 kg';
    const materialVal = specs.material || 'Lõi ống thép không gỉ Inox 304 siêu dày, bọc ngoài lớp nhựa ABS nguyên sinh';

    return {
      highlights: [
        { label: 'Tải trọng thử nghiệm', value: maxLoad, sub: 'Chịu lực đu bám vững chãi' },
        { label: 'Lõi Inox 304', value: 'Không bao giờ hoen gỉ', sub: 'Chịu môi trường ẩm ướt nhà tắm' },
        { label: 'Hạt vân nổi chống trượt', value: 'Chống trơn khi dính xà phòng', sub: 'Có vòng dạ quang phát sáng ban đêm' },
        { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng chất liệu inox và phụ kiện` }
      ],
      groups: [
        {
          name: '1. Thông tin chung & Nhận diện',
          items: [
            { label: 'Tên sản phẩm', value: name, isImportant: true },
            { label: 'Mã sản phẩm (SKU)', value: code },
            { label: 'Thương hiệu', value: brand, isImportant: true },
            { label: 'Xuất xứ', value: origin },
            { label: 'Phân loại', value: isBatMo ? 'Tay vịn nhà tắm chữ U bật mở 90 độ tiết kiệm không gian' : (isGocL ? 'Tay vịn góc chữ L trợ lực đứng ngồi' : 'Thanh tay vịn an toàn nhà tắm bọc hạt chống trượt') }
          ]
        },
        {
          name: '2. Kích thước chi tiết',
          items: [
            { label: 'Chiều dài thanh tay vịn', value: specs.dimensions || (isGocL ? '60 cm x 40 cm' : (isBatMo ? '60 cm – 70 cm' : '40 cm / 50 cm / 60 cm')) },
            { label: 'Đường kính ngoài tay nắm', value: 'Phi 35 mm (chuẩn công thái học vừa vặn lòng bàn tay nắm chắc)' },
            { label: 'Khoảng cách từ tường tới tay vịn', value: '50 mm (không gây kẹt cổ tay khi bám)' },
            { label: 'Tải trọng kéo giật tối đa', value: maxLoad, isImportant: true }
          ]
        },
        {
          name: '3. Cấu tạo vật liệu & An toàn',
          items: [
            { label: 'Chất liệu lõi bên trong', value: 'Thép không gỉ Inox 304 dày 1.2mm chịu tải trọng cực cao', isImportant: true },
            { label: 'Chất liệu bọc bên ngoài', value: 'Nhựa kỹ thuật ABS/Nylon kháng khuẩn cao cấp, không gây lạnh tay mùa đông' },
            { label: 'Bề mặt tiếp xúc', value: 'Các hạt gai nổi ma sát chống trượt tuyệt đối ngay cả khi bàn tay dính bọt xà phòng' },
            { label: 'Vòng huỳnh quang dạ quang', value: 'Tích hợp 2 vòng phát sáng dạ quang ở hai đầu giúp người già nhận diện gậy trong đêm tối' },
            { label: 'Mặt bích bắt tường', value: 'Mặt bích đúc inox 304 kiên cố với 4 lỗ bắt bu lông nở nở thép mỗi đầu' }
          ]
        },
        {
          name: '4. Lắp đặt & Bảo hành',
          items: [
            { label: 'Cao độ lắp đặt khuyến nghị', value: 'Cao từ 70 cm đến 80 cm so với mặt sàn phòng tắm hoặc thành bồn cầu' },
            { label: 'Bộ phụ kiện đi kèm', value: 'Bộ bu lông nở inox 304, vít ren, nắp chụp che đầu ốc thẩm mỹ' },
            { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
          ]
        }
      ]
    };
  }

  // 11. SẢN PHẨM HỖ TRỢ CHĂM SÓC KHÁC (SAN_PHAM_HO_TRO)
  const isBonCauDiDong = nameUpper.includes('BỒN CẦU');
  const isBongGai = nameUpper.includes('BÓNG GAI');
  const isChauGoi = nameUpper.includes('CHẬU GỘI');

  return {
    highlights: [
      { label: 'Tiêu chuẩn chất lượng', value: 'Vật liệu y tế cao cấp', sub: 'Không gây kích ứng, độ bền cao' },
      { label: 'Thiết kế thông minh', value: 'Tiện lợi & Thân thiện', sub: 'Hỗ trợ tối đa cho người bệnh và người chăm sóc' },
      { label: 'Tải trọng an toàn', value: isBonCauDiDong ? '150 kg' : (isChauGoi ? 'Nhẹ bền' : 'Đàn hồi cao'), sub: 'Kiểm định an toàn nghiêm ngặt' },
      { label: 'Chế độ bảo hành', value: 'Tại TECNIC MEDTECH', sub: `${warranty} tháng hỗ trợ kỹ thuật chu đáo` }
    ],
    groups: [
      {
        name: '1. Thông tin chung & Nhận diện',
        items: [
          { label: 'Tên sản phẩm', value: name, isImportant: true },
          { label: 'Mã sản phẩm (SKU)', value: code },
          { label: 'Thương hiệu', value: brand, isImportant: true },
          { label: 'Xuất xứ', value: origin },
          { label: 'Phân loại', value: isBonCauDiDong ? 'Bồn cầu di động người già nắp kép chống mùi' : (isBongGai ? 'Bóng gai silicon tập phục hồi chức năng cơ bàn tay' : (isChauGoi ? 'Chậu gội đầu di động có chân đứng thoát nước' : 'Dụng cụ hỗ trợ chăm sóc người bệnh')) }
        ]
      },
      {
        name: '2. Kích thước & Trọng lượng',
        items: [
          { label: 'Kích thước chi tiết', value: specs.dimensions || (isBonCauDiDong ? '50 cm x 42 cm x 40 cm' : (isBongGai ? 'Đường kính 7.5 cm' : (isChauGoi ? 'Chân nâng hạ 85 - 120 cm' : 'Tiêu chuẩn'))) },
          { label: 'Trọng lượng', value: specs.weight || (isBonCauDiDong ? '3.5 kg' : (isBongGai ? '120 g' : '3.8 kg')) },
          { label: 'Tải trọng chịu lực', value: isBonCauDiDong ? '150 kg' : 'Độ bền nén đàn hồi cao' }
        ]
      },
      {
        name: '3. Vật liệu & Cấu tạo',
        items: [
          { label: 'Chất liệu chính', value: specs.material || (isBonCauDiDong ? 'Nhựa nguyên sinh PP cao cấp chịu lực dày dặn' : (isBongGai ? 'Silicon cao cấp đàn hồi' : 'Nhựa ABS + chân đế thép sơn tĩnh điện')), isImportant: true },
          { label: 'Đặc điểm thiết kế', value: isBonCauDiDong ? 'Nắp đậy kép ngăn mùi tuyệt đối, có xô đựng bô riêng biệt kèm quai xách' : (isBongGai ? 'Gai tròn mềm kích thích đầu mút dây thần kinh và huyệt đạo' : 'Hõm đỡ cổ êm ái kèm ống dẫn xả nước ruột gà') }
        ]
      },
      {
        name: '4. Ứng dụng & Bảo hành',
        items: [
          { label: 'Đối tượng phù hợp', value: 'Người cao tuổi, người hạn chế vận động, người bệnh nằm liệt dưỡng bệnh tại nhà' },
          { label: 'Chế độ bảo hành', value: `Bảo hành tại TECNIC MEDTECH (${warranty} tháng)` }
        ]
      }
    ]
  };
}
