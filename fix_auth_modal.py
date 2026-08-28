import re
with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

content = content.replace("  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);\n  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);", "  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);")

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
