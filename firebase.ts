import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  fetchSignInMethodsForEmail,
  updateProfile,
  signOut as fbSignOut, 
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Khởi tạo Firebase App duy nhất
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth & Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

// Providers cho đăng nhập mạng xã hội thật
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.addScope('openid');
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

/**
 * Định dạng số điện thoại Việt Nam chuẩn quốc tế E.164 (+84...)
 */
export const formatVietnamPhoneNumber = (phone: string): string => {
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('84')) {
    return `+${clean}`;
  }
  if (clean.startsWith('0')) {
    return `+84${clean.slice(1)}`;
  }
  return `+84${clean}`;
};

/**
 * Gửi mã OTP xác thực qua tin nhắn SMS Firebase
 */
let recaptchaVerifierInstance: RecaptchaVerifier | null = null;

export const sendFirebasePhoneOtp = async (phoneNumber: string, containerId: string = 'recaptcha-container'): Promise<ConfirmationResult> => {
  const formattedPhone = formatVietnamPhoneNumber(phoneNumber);
  
  // Đảm bảo container tồn tại hoặc dùng invisible recaptcha
  if (typeof window !== 'undefined') {
    if (!recaptchaVerifierInstance) {
      recaptchaVerifierInstance = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          recaptchaVerifierInstance = null;
        }
      });
      await recaptchaVerifierInstance.render();
    }
  }

  if (!recaptchaVerifierInstance) {
    throw new Error('Không thể khởi tạo trình xác minh reCAPTCHA của Google.');
  }

  const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifierInstance);
  return confirmationResult;
};

/**
 * Đăng nhập thật bằng Google Popup
 */
export const signInWithGoogleReal = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  
  const userData = {
    id: user.uid,
    fullName: user.displayName || user.email?.split('@')[0] || 'Khách Hàng Google',
    email: user.email || '',
    phone: user.phoneNumber || '',
    avatar: user.photoURL || '',
    accountType: (user.email === 'tecnic.vn.group@gmail.com' || user.email === 'admin@ytetecnic.vn') ? 'ADMIN' : 'CA_NHAN',
    status: 'ACTIVE',
    updatedAt: new Date().toISOString()
  };

  // Đồng bộ hoặc tạo bản ghi người dùng trong Firestore
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp()
      }, { merge: true });
    } else {
      await setDoc(userRef, userData, { merge: true });
    }
  } catch (fsErr) {
    console.warn("Firestore user sync warning (non-fatal):", fsErr);
  }

  return userData;
};

/**
 * Đăng nhập thật bằng Facebook Popup
 */
export const signInWithFacebookReal = async () => {
  const result = await signInWithPopup(auth, facebookProvider);
  const user = result.user;

  const userData = {
    id: user.uid,
    fullName: user.displayName || 'Khách Hàng Facebook',
    email: user.email || `${user.uid}@facebook.com`,
    phone: user.phoneNumber || '',
    avatar: user.photoURL || '',
    accountType: (user.email === 'tecnic.vn.group@gmail.com' || user.email === 'admin@ytetecnic.vn') ? 'ADMIN' : 'CA_NHAN',
    status: 'ACTIVE',
    updatedAt: new Date().toISOString()
  };

  // Đồng bộ hoặc tạo bản ghi người dùng trong Firestore
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp()
      }, { merge: true });
    } else {
      await setDoc(userRef, userData, { merge: true });
    }
  } catch (fsErr) {
    console.warn("Firestore user sync warning (non-fatal):", fsErr);
  }

  return userData;
};

/**
 * Đăng ký tài khoản thật với Firebase Authentication & Firestore
 * Hỗ trợ email thật hoặc số điện thoại @ytetecnic.vn
 */
export const registerWithEmailReal = async (email: string, password: string, fullName: string, phone: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

  // Cập nhật displayName trong Firebase Auth
  try {
    await updateProfile(user, { displayName: fullName });
  } catch (e) {}

  // Lưu bản ghi người dùng vào Firestore
  const userData = {
    id: user.uid,
    fullName: fullName || user.email?.split('@')[0] || 'Khách Hàng TECNIC',
    email: user.email || email,
    phone: phone || '',
    avatar: '',
    accountType: (email === 'tecnic.vn.group@gmail.com' || email === 'admin@ytetecnic.vn') ? 'ADMIN' : 'CA_NHAN',
    status: 'ACTIVE',
    website: 'ytetecnic.vn',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      ...userData,
      serverCreatedAt: serverTimestamp()
    }, { merge: true });
  } catch (fsErr) {
    console.warn("Firestore user sync warning (non-fatal):", fsErr);
  }

  return userData;
};

/**
 * Đăng nhập tài khoản thật bằng Email / Password với Firebase
 */
export const signInWithEmailReal = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;

  const userData = {
    id: user.uid,
    fullName: user.displayName || user.email?.split('@')[0] || 'Khách Hàng TECNIC',
    email: user.email || email,
    phone: user.phoneNumber || '',
    avatar: user.photoURL || '',
    accountType: (user.email === 'tecnic.vn.group@gmail.com' || user.email === 'admin@ytetecnic.vn') ? 'ADMIN' : 'CA_NHAN',
    status: 'ACTIVE',
    website: 'ytetecnic.vn',
    updatedAt: new Date().toISOString()
  };

  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    }

    await setDoc(userRef, userData, { merge: true });
  } catch (fsErr) {
    console.warn("Firestore user sync warning (non-fatal):", fsErr);
  }

  return userData;
};

/**
 * Đăng xuất Firebase
 */
export const signOutFirebase = async () => {
  try {
    await fbSignOut(auth);
  } catch (err) {
    console.error("Firebase SignOut error:", err);
  }
};

/**
 * Gửi email đặt lại mật khẩu bằng Firebase Auth SDK
 */
export const sendFirebasePasswordReset = async (email: string) => {
  const cleanEmail = email.trim();
  
  // Kiểm tra phương thức đăng nhập của email
  try {
    const methods = await fetchSignInMethodsForEmail(auth, cleanEmail);
    if (methods.includes('google.com') && !methods.includes('password')) {
      return {
        success: false,
        isGoogleOnly: true,
        message: 'Tài khoản này được đăng ký qua Google. Quý khách vui lòng bấm nút "Đăng nhập bằng Google" để vào hệ thống ngay mà không cần mật khẩu.'
      };
    }
  } catch (checkErr: any) {
    console.warn("fetchSignInMethods note:", checkErr);
  }

  try {
    await sendPasswordResetEmail(auth, cleanEmail);
    return {
      success: true,
      isGoogleOnly: false,
      message: `Đã gửi liên kết đặt lại mật khẩu đến email ${cleanEmail}. Quý khách vui lòng kiểm tra hộp thư.`
    };
  } catch (err: any) {
    console.error("sendPasswordResetEmail error:", err);
    if (err?.code === 'auth/user-not-found') {
      return {
        success: false,
        isGoogleOnly: false,
        message: 'Không tìm thấy tài khoản với email này trong hệ thống.'
      };
    }
    if (err?.code === 'auth/invalid-email') {
      return {
        success: false,
        isGoogleOnly: false,
        message: 'Địa chỉ email không đúng định dạng.'
      };
    }
    throw err;
  }
};

/**
 * Xác nhận đặt lại mật khẩu từ liên kết email (oobCode)
 */
export const confirmFirebasePasswordReset = async (oobCode: string, newPass: string) => {
  return await confirmPasswordReset(auth, oobCode, newPass);
};

/**
 * Kiểm tra mã oobCode từ email
 */
export const verifyFirebaseResetCode = async (oobCode: string) => {
  return await verifyPasswordResetCode(auth, oobCode);
};

