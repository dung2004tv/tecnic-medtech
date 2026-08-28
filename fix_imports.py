with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "import { auth } from '../lib/firebase';\nimport { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';\nimport { auth } from '../lib/firebase';\nimport { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';",
    "import { auth } from '../lib/firebase';\nimport { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';"
)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
