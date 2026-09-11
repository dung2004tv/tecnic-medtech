import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';

// Đăng ký Service Worker trực tiếp chuẩn W3C để kích hoạt sự kiện beforeinstallprompt của trình duyệt
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        console.log('Service Worker TECNIC đăng ký thành công:', reg.scope);
      })
      .catch((err) => {
        console.warn('Lỗi đăng ký Service Worker:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
