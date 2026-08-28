import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

old_catch = """    } catch (error: any) {
      console.error('Lỗi gửi OTP:', error);
      setErrorMessage(error.message || 'Không thể gửi mã OTP.');
      if (channel === 'phone' && window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId: any) => window.grecaptcha.reset(widgetId));
      }
    }"""

new_catch = """    } catch (error: any) {
      console.error('Lỗi gửi OTP:', error);
      
      if (channel === 'phone' && error.code === 'auth/unauthorized-domain') {
         setErrorMessage(`Lỗi bảo mật Firebase: Tên miền chưa được cấp phép. Bạn cần vào Firebase Console -> Authentication -> Settings -> Authorized domains -> Thêm tên miền này vào: ${window.location.hostname}`);
      } else if (channel === 'phone' && error.code === 'auth/argument-error') {
         setErrorMessage(`Lỗi cấu hình Firebase hoặc reCAPTCHA. Hãy tải lại trang và thử lại.`);
      } else {
         setErrorMessage(error.message || 'Không thể gửi mã OTP.');
      }

      if (channel === 'phone' && window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.render().then((widgetId: any) => window.grecaptcha.reset(widgetId));
        } catch(e) {}
      }
    }"""

content = content.replace(old_catch, new_catch)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
