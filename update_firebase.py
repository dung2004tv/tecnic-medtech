import re

with open('src/lib/firebase.ts', 'r') as f:
    content = f.read()

if 'GoogleAuthProvider' not in content:
    content = content.replace("import { getAuth } from 'firebase/auth';", "import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';")
    content += "\nexport const googleProvider = new GoogleAuthProvider();\nexport const facebookProvider = new FacebookAuthProvider();\n"

    with open('src/lib/firebase.ts', 'w') as f:
        f.write(content)
