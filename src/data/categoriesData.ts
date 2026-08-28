import { Category, BannerSlide } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'ALL',
    name: 'Tất cả sản phẩm',
    shortName: 'Tất cả',
    slug: 'tat-ca',
    icon: 'Layers',
    count: 110,
    description: 'Hệ sinh thái thiết bị y tế, dụng cụ tập & phục hồi chức năng toàn diện TECNIC MEDTECH',
    popularKeywords: ['Nạng & Gậy', 'Khung tập đi', 'Xe lăn', 'Giường y tế', 'Đai Bonbone', 'Găng robot']
  },
  {
    id: 'GAY_NANG',
    name: 'Gậy Chống & Nạng Tập Đi',
    shortName: 'Gậy & Nạng',
    slug: 'gay-va-nang',
    icon: 'Footprints',
    count: 7,
    description: 'Gậy 3 chân, 4 chân chống trượt, nạng nhôm nách và nạng khuỷu trợ lực đi lại',
    popularKeywords: ['Gậy 4 chân Lucass', 'Gậy 3 chân OSADA', 'Nạng nhôm C12C02', 'Nạng khuỷu C-37']
  },
  {
    id: 'KHUNG_TAP_DI',
    name: 'Khung Tập Đi & Khung Có Ghế Ngồi',
    shortName: 'Khung Tập Đi',
    slug: 'khung-tap-di',
    icon: 'Activity',
    count: 8,
    description: 'Khung tập đi gấp gọn, có bánh xe, ghế ngồi nghỉ ngơi và đai nâng đỡ cho người tai biến',
    popularKeywords: ['Khung W-47', 'Khung bánh xe VK157', 'GBM-033A', 'GBM-037', 'GBM-021 3 chế độ']
  },
  {
    id: 'XE_LAN',
    name: 'Xe Lăn Tay & Xe Lăn Đa Năng',
    shortName: 'Xe Lăn Đa Năng',
    slug: 'xe-lan',
    icon: 'Accessibility',
    count: 10,
    description: 'Xe lăn du lịch siêu nhẹ, xe lăn ngả nằm 180°, xe lăn có bô vệ sinh, vành đúc bánh béo',
    popularKeywords: ['Xe lăn GBM-065B', 'Xe lăn Lucass X-7A', 'Xe lăn ngả nằm X-72', 'Xe lăn ghế bô X-8']
  },
  {
    id: 'GHE_BO_TAM',
    name: 'Ghế Bô Vệ Sinh & Ghế Tắm Đa Năng',
    shortName: 'Ghế Bô & Ghế Tắm',
    slug: 'ghe-bo-ve-sinh',
    icon: 'Bath',
    count: 9,
    description: 'Ghế bô vệ sinh có bánh xe, chui vừa bệt toilet, ghế tắm chống trượt gập gọn thông minh',
    popularKeywords: ['GBM-016', 'GBM-016A', 'GBM-017', 'GBM-018', 'Lucass G-96', 'GBM-026B']
  },
  {
    id: 'DAI_NEP_KHOP',
    name: 'Đai - Nẹp Chỉnh Hình',
    shortName: 'Đai & Nẹp Chỉnh Hình',
    slug: 'dai-nep-chinh-hinh',
    icon: 'ShieldCheck',
    count: 17,
    description: 'Đai nẹp khớp cổ, vai, khuỷu tay, đầu gối, mắt cá chân Bonbone Nhật Bản & đai nhiệt Famedi',
    popularKeywords: ['Đai nẹp cổ Bonbone', 'Đai nâng vai', 'Nẹp mắt cá chân', 'Đai gối Bonbone', 'Đai nhiệt lưng']
  },
  {
    id: 'ROBOT_NANG_HA',
    name: 'Găng Robot PHCN & Ghế Nâng Chuyển',
    shortName: 'Robot & Nâng Hạ',
    slug: 'robot-va-nang-ha',
    icon: 'Bot',
    count: 6,
    description: 'Găng tay Robot phục hồi cử động bàn tay, ghế nâng chuyển bệnh nhân có tay đòn trợ lực thủy lực',
    popularKeywords: ['Găng tay Robot 962', 'Găng PHCN Hueloi', 'Ghế nâng chuyển GBM-053', 'OSADA XDC-01/02']
  },
  {
    id: 'TRI_LIEU_XUNG_DIEN',
    name: 'Máy Vật Lý Trị Liệu & Xung Điện',
    shortName: 'Máy Vật Lý Trị Liệu',
    slug: 'may-vat-ly-tri-lieu',
    icon: 'Zap',
    count: 12,
    description: 'Máy xung điện Omron TENS Nhật Bản, máy nén khí suy giãn tĩnh mạch, súng massage trị liệu sâu, máy tập đạp chân',
    popularKeywords: ['Omron HV-F013', 'Omron HV-F028', 'Omron HV-F230', 'Trị liệu tĩnh mạch GBM-034', 'Súng massage']
  },
  {
    id: 'GIUONG_Y_TE',
    name: 'Giường Bệnh Nhân & Giường Kéo Giãn',
    shortName: 'Giường Y Tế & Kéo Giãn',
    slug: 'giuong-y-te',
    icon: 'Bed',
    count: 16,
    description: 'Giường y tế tay quay/điện đa năng có bô, lật nghiêng, giường kéo giãn cột sống lưng cổ bằng điện',
    popularKeywords: ['OSADA SD-11TC', 'Giường 4 tay quay GBM-092A', 'OSADA SD-33E điện', 'Kéo giãn SD-41GK']
  },
  {
    id: 'DEM_HOI_CHONG_LOET',
    name: 'Đệm Hơi Chống Loét & Thông Tiểu',
    shortName: 'Đệm Hơi Chống Loét',
    slug: 'dem-chong-loet',
    icon: 'BedDouble',
    count: 9,
    description: 'Đệm hơi múi/ống khí chống loét điểm tỳ, đệm khoét lỗ bô, nâng lưng 45° & bộ thông tiểu CLINY',
    popularKeywords: ['Đệm GBM-095B', 'Đệm khoét bô GBM-096B', 'Đệm nâng lưng GBM-073B', 'OSADA SD-AM05', 'CLINY']
  },
  {
    id: 'SAN_PHAM_HO_TRO',
    name: 'Dụng Cụ Sinh Hoạt & Chăm Sóc Sức Khỏe',
    shortName: 'Dụng Cụ Sinh Hoạt',
    slug: 'dung-cu-sinh-hoat',
    icon: 'HeartHandshake',
    count: 13,
    description: 'Bóng gai tập tay, ghế bệt tựa lưng, bồn cầu di động, đệm nâng hạ, bô tiểu, con lăn tập chân',
    popularKeywords: ['Bóng gai tập tay', 'Ghế bệt tựa lưng', 'Bồn cầu di động', 'Đệm nâng hạ', 'Chậu gội đầu']
  },
  {
    id: 'TAY_VIN_CAI_TAO',
    name: 'Khung Tay Vịn & Cải Tạo Nhà Ở',
    shortName: 'Tay Vịn Nhà Tắm',
    slug: 'khung-tay-vin',
    icon: 'Home',
    count: 3,
    description: 'Thanh tay vịn nhà tắm, tay vịn NKT chữ T, khung tay vịn bồn cầu chống té ngã',
    popularKeywords: ['Tay vịn ATMOR 8007', 'Tay vịn chữ T BNH-918', 'Khung tay vịn bồn cầu Toàn Tâm']
  }
];

export const HERO_BANNERS: BannerSlide[] = [
  {
    id: 1,
    title: 'TECNIC MEDTECH - GIẢI PHÁP TOÀN DIỆN TÁI SINH CUỘC SỐNG',
    subtitle: 'Hệ sinh thái thiết bị y tế & phục hồi chức năng chính hãng - Đồng hành cùng người bệnh & người cao tuổi',
    badge: 'Chính Hãng 100%',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    linkText: 'Khám phá ngay',
    targetCategory: 'ALL',
    bgGradient: 'from-[#0e387a] via-[#143472] to-[#0071ba]'
  },
  {
    id: 2,
    title: 'ĐAI NẸP ĐỊNH HÌNH & XƯƠNG KHỚP BONBONE NHẬT BẢN',
    subtitle: 'Cố định chuẩn xác, trợ lực vận động và hỗ trợ phục hồi tổn thương chuyên sâu cho cột sống, vai, gối',
    badge: 'Công Nghệ Nhật Bản',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&auto=format&fit=crop&q=80',
    linkText: 'Xem sản phẩm',
    targetCategory: 'DAI_NEP_KHOP',
    bgGradient: 'from-[#143472] via-[#0e387a] to-blue-800'
  },
  {
    id: 3,
    title: 'GIƯỜNG Y TẾ ĐA NĂNG & GĂNG TAY ROBOT PHỤC HỒI CHỨC NĂNG',
    subtitle: 'Nâng cao chất lượng chăm sóc người bệnh tại nhà - Tự chủ sinh hoạt, giảm bớt gánh nặng gia đình',
    badge: 'Giải Pháp Hiện Đại',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&auto=format&fit=crop&q=80',
    linkText: 'Xem chi tiết',
    targetCategory: 'ROBOT_NANG_HA',
    bgGradient: 'from-[#0e387a] via-blue-900 to-indigo-900'
  }
];
