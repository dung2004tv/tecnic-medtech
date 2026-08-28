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
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible'
          });
        }
        
        let formattedPhone = targetPhone.trim();
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '+84' + formattedPhone.slice(1);
        }

        const appVerifier = window.recaptchaVerifier;
        const confResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(confResult);
        
        setOtpCountdown(60);
        setSuccessMessage('Mã OTP đã được gửi thành công qua SMS từ Firebase.');
      } else {
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
          setErrorMessage(data.message || 'Lỗi gửi OTP.');
        }
      }
    } catch (error: any) {
      console.error('Lỗi gửi OTP:', error);
      setErrorMessage(error.message || 'Không thể gửi mã OTP.');
      if (channel === 'phone' && window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId: any) => window.grecaptcha.reset(widgetId));
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

# Add the recaptcha-container inside the modal body
modal_header = """        {/* MODAL HEADER */}"""
new_modal_header = """        {/* RECAPTCHA CONTAINER FOR FIREBASE */}
        <div id="recaptcha-container"></div>
        {/* MODAL HEADER */}"""
content = content.replace(modal_header, new_modal_header)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
