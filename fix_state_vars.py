import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

# Fix register variables
content = content.replace("fullName: regName,", "fullName: fullName,")

# Fix reset password variables
content = content.replace("if (resetPassword !== resetPasswordConfirm) {", "if (newPassword !== confirmPassword) {")
content = content.replace("newPassword: resetPassword,", "newPassword: newPassword,")

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
