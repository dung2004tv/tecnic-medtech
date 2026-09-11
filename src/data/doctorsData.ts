import { Doctor } from '../types';

export const normalizeDoctorName = (input: string): string => {
  return (input || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ');
};

export const generateDoctorReferralCode = (name: string): string => {
  const norm = normalizeDoctorName(name);
  const words = norm.split(' ').filter(Boolean);
  if (words.length === 0) return 'BS' + Math.floor(1000 + Math.random() * 9000);
  const lastWord = words[words.length - 1]?.toUpperCase() || '';
  return `BS-${lastWord}`;
};

export const matchDoctor = (query: string, doctors: Doctor[]): Doctor | null => {
  if (!query || !query.trim()) return null;
  const rawQuery = query.trim();
  const cleanQuery = normalizeDoctorName(rawQuery);
  const cleanCodeQuery = rawQuery.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const cleanPhone = rawQuery.replace(/[^0-9]/g, '');

  // Strip common doctor title prefixes from normalized string (e.g. "bs", "bac si")
  const strippedQuery = cleanQuery
    .replace(/^b[s|c]\s+/, '')
    .replace(/^bac\s+si\s+/, '')
    .trim();

  for (const d of doctors) {
    if (!d.isActive) continue;
    const cleanDocName = normalizeDoctorName(d.name);
    const cleanDocCode = (d.code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const cleanDocPhone = (d.phone || '').replace(/[^0-9]/g, '');

    // 1. Check code exact match or substring in either direction
    if (cleanDocCode && (
      cleanCodeQuery === cleanDocCode ||
      cleanCodeQuery.includes(cleanDocCode) ||
      rawQuery.toUpperCase().includes(d.code.toUpperCase())
    )) {
      return d;
    }

    // 2. Check name match or substring
    if (cleanDocName === cleanQuery || cleanDocName === strippedQuery) {
      return d;
    }
    if (cleanDocName.length >= 4 && (cleanQuery.includes(cleanDocName) || strippedQuery.includes(cleanDocName))) {
      return d;
    }
    if (strippedQuery.length >= 4 && cleanDocName.includes(strippedQuery)) {
      return d;
    }

    // 3. Check phone match
    if (cleanPhone.length >= 9 && cleanDocPhone && cleanDocPhone === cleanPhone) {
      return d;
    }
  }

  return null;
};

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'DOC-01',
    name: 'Nguyễn Phú Sĩ',
    code: 'BS-SI',
    hospital: 'Bệnh viện Bạch Mai / Đại học Y Hà Nội',
    specialty: 'Bác sĩ chuyên khoa Phục hồi chức năng & Cơ xương khớp',
    phone: '0912345678',
    email: 'bs.nguyenphusi@gmail.com',
    discountType: 'PERCENT',
    discountValue: 5, // Giảm ngay 5% trên tổng giá trị đơn hàng
    commissionRate: 7,
    isActive: true,
    notes: 'Bác sĩ giới thiệu đầu tiên cho hệ thống bệnh nhân PHCN TECNIC MEDTECH.',
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'DOC-02',
    name: 'Trần Minh Đức',
    code: 'BS-DUC',
    hospital: 'Bệnh viện Việt Đức',
    specialty: 'Chấn thương chỉnh hình & Phục hồi chức năng thần kinh',
    phone: '0988223344',
    email: 'minhduc.med@gmail.com',
    discountType: 'PERCENT',
    discountValue: 5,
    commissionRate: 5,
    isActive: true,
    notes: 'Bác sĩ cố vấn điều trị các ca liệt sau đột quỵ tai biến.',
    createdAt: '2026-03-05T09:30:00.000Z'
  }
];
