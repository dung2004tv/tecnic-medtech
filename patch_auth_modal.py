import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

# Add imports
imports = """import { auth } from '../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';"""

content = content.replace("import { User, UserRole } from '../types';", "import { User, UserRole } from '../types';\n" + imports)

# Add confirmationResult state
state_match = "const [isSendingOtp, setIsSendingOtp] = useState(false);"
new_state = "const [isSendingOtp, setIsSendingOtp] = useState(false);\n  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);"
content = content.replace(state_match, new_state)

# Replace handleSendOtp
handle_send_otp_start = "  const handleSendOtp = async (targetEmail: string, targetPhone: string, channel: 'email' | 'phone') => {"
handle_send_otp_end = """        }
      } else {
        setErrorMessage(data.message || 'Lỗi gửi OTP. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Lỗi gửi OTP:', error);
      setErrorMessage('Không thể kết nối máy chủ để gửi OTP.');
    } finally {
      setIsSendingOtp(false);
    }
  };"""

# We'll use regex to replace the function body
import re
new_handle_send_otp = """  const handleSendOtp = async (targetEmail: string, targetPhone: string, channel: 'email' | 'phone') => {
    setErrorMessage('');
    setSuccessMessage('');

    if (channel === 'email') {
      if (!targetEmail || !targetEmail.includes('@')) {
        setErrorMessage('Vui lòng nhập địa chỉ Email / Gmail hợp lệ để nhận OTP.');
        return;
      }
    } else {
      const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
      if (!cleanPhone || cleanPhone.length < 9) {
        setErrorMessage('Vui lòng nhập số điện thoại hợp lệ để nhận mã OTP qua SMS.');
        return;
      }
    }

    setIsSendingOtp(true);
    try {
      if (channel === 'phone') {
        // Firebase Phone Auth
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible'
          });
        }
        
        let formattedPhone = targetPhone;
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '+84' + formattedPhone.slice(1);
        }

        const appVerifier = window.recaptchaVerifier;
        const confResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(confResult);
        
        setOtpCountdown(60);
        setSuccessMessage('Mã OTP SMS đã được gửi thành công qua Firebase.');
      } else {
        // Email OTP via Backend
        const res = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: targetEmail, method: 'email' })
        });
        const data = await res.json();
        if (data.success) {
          setOtpCountdown(60);
          setSuccessMessage(data.message || 'Mã OTP đã được gửi tới Gmail của bạn.');
        } else {
          setErrorMessage(data.message || 'Lỗi gửi OTP. Vui lòng thử lại sau.');
        }
      }
    } catch (error: any) {
      console.error('Lỗi gửi OTP:', error);
      setErrorMessage(error.message || 'Không thể gửi OTP.');
      
      // Reset recaptcha if error
      if (channel === 'phone' && window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId: any) => {
          grecaptcha.reset(widgetId);
        });
      }
    } finally {
      setIsSendingOtp(false);
    }
  };"""

content = re.sub(
    r"  const handleSendOtp = async \(.*?=> \{.*?\n  \};\n", 
    new_handle_send_otp + "\n", 
    content, 
    flags=re.DOTALL
)

# We need to add the recaptcha-container inside the modal body
modal_header = """        {/* MODAL HEADER */}"""
new_modal_header = """        {/* RECAPTCHA CONTAINER FOR FIREBASE */}
        <div id="recaptcha-container"></div>
        {/* MODAL HEADER */}"""
content = content.replace(modal_header, new_modal_header)

# In handleDirectLogin, we need to verify firebase OTP if loginMethod is 'otp' and channel is 'phone'
# Wait, handleDirectLogin calls backend. But now Firebase OTP verification needs to happen on client!

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
