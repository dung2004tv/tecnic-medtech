import { useState, useEffect } from 'react';

/**
 * Hook xác định xem ứng dụng đang chạy ở chế độ APP (PWA Standalone, HomeScreen icon, Android APK)
 * hay đang xem trên trình duyệt WEB thông thường (Safari, Chrome).
 */
export function useIsAppMode(): boolean {
  const [isApp, setIsApp] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    
    // 1. Kiểm tra tham số URL (dành cho start_url của PWA hoặc test thủ công ?mode=app / ?app=true)
    const search = window.location.search;
    if (search.includes('mode=app') || search.includes('app=true') || search.includes('source=pwa')) {
      return true;
    }

    // 2. Kiểm tra chế độ display-mode: standalone (chuẩn quốc tế PWA / Android APK / TWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    // 3. Kiểm tra iOS Safari Standalone (khi người dùng bấm biểu tượng từ màn hình chính iPhone)
    const isIosStandalone = Boolean((window.navigator as unknown as { standalone?: boolean }).standalone);

    // 4. Kiểm tra nếu mở từ Android App wrapper
    const isAndroidApp = typeof document !== 'undefined' && document.referrer?.includes('android-app://');

    return Boolean(isStandalone || isIosStandalone || isAndroidApp);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsApp(true);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  return isApp;
}
