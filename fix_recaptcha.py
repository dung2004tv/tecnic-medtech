import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

old_close = """          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
            title="Đóng cửa sổ"
          >"""

new_close = """          <button
            onClick={() => {
              if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = undefined;
              }
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
            title="Đóng cửa sổ"
          >"""

content = content.replace(old_close, new_close)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
