import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

# 1. Add regStep state
state_match = "const [regOtp, setRegOtp] = useState('');"
new_state = "const [regOtp, setRegOtp] = useState('');\n  const [regStep, setRegStep] = useState<1 | 2>(1);"
content = content.replace(state_match, new_state)

# 2. Reset regStep when changing mode
content = content.replace("setMode('register');", "setMode('register'); setRegStep(1);")

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
