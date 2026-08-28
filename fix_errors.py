import re

with open('src/components/CheckoutModal.tsx', 'r') as f:
    checkout_content = f.read()

old_clock = """                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <div className="flex flex-col text-xs space-y-0.5">
                    <span><b>Thời gian làm việc:</b></span>
                    <span>• Thứ 2 – Thứ 6: sáng 08:00 – 12:00, chiều 14h30 – 17h30</span>
                    <span>• Thứ 7 – Chủ nhật: Nghỉ (Hotline hỗ trợ 24/7)</span>
                  </div>
                </p>"""

new_clock = """                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col text-xs space-y-0.5 text-slate-700">
                    <span><b>Thời gian làm việc:</b></span>
                    <span>• Thứ 2 – Thứ 6: sáng 08:00 – 12:00, chiều 14h30 – 17h30</span>
                    <span>• Thứ 7 – Chủ nhật: Nghỉ (Hotline hỗ trợ 24/7)</span>
                  </div>
                </div>"""

checkout_content = checkout_content.replace(old_clock, new_clock)

with open('src/components/CheckoutModal.tsx', 'w') as f:
    f.write(checkout_content)

with open('src/components/AuthModal.tsx', 'r') as f:
    auth_content = f.read()

old_recaptcha = """      <div 
        className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >"""

new_recaptcha = """      <div 
        className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="recaptcha-container"></div>"""

auth_content = auth_content.replace(old_recaptcha, new_recaptcha)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(auth_content)
