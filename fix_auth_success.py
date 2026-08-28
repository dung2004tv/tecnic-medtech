import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

old_interface = """interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose }) => {"""

new_interface = """interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess?: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose, onLoginSuccess }) => {"""

content = content.replace(old_interface, new_interface)

old_success = """  const handleAuthSuccess = async (user: any, additionalData?: any) => {
    // Check if user document exists, if not create it
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || additionalData?.name || 'Thành viên mới',
        phone: user.phoneNumber || additionalData?.phone || '',
        role: 'customer',
        createdAt: new Date().toISOString()
      });
    }
    onClose();
  };"""

new_success = """  const handleAuthSuccess = async (user: any, additionalData?: any) => {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    
    let userData: any = {};
    if (!snap.exists()) {
      // Auto-assign admin if it's the owner's email
      const isAdminEmail = user.email === 'nguyendungdbd1@gmail.com' || user.email === 'tecnic.vn.group@gmail.com';
      userData = {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || additionalData?.name || 'Thành viên mới',
        phone: user.phoneNumber || additionalData?.phone || '',
        role: isAdminEmail ? 'ADMIN' : 'CA_NHAN',
        createdAt: new Date().toISOString()
      };
      await setDoc(userRef, userData);
    } else {
      userData = snap.data();
    }

    if (onLoginSuccess) {
      onLoginSuccess({
        id: user.uid,
        fullName: userData.name || userData.fullName || user.displayName || 'Thành viên',
        phone: userData.phone || user.phoneNumber || '',
        email: userData.email || user.email || '',
        accountType: userData.role || userData.accountType || 'CA_NHAN',
        createdAt: userData.createdAt || new Date().toISOString()
      });
    }
    onClose();
  };"""

content = content.replace(old_success, new_success)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
