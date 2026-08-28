import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

old_useeffect = """  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);"""

new_useeffect = """  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  useEffect(() => {
    if (!isOpen && window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {}
      window.recaptchaVerifier = undefined;
    }
  }, [isOpen]);"""

content = content.replace(old_useeffect, new_useeffect)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
