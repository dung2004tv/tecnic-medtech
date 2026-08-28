import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

old_social_auth = """  const handleSocialAuth = async (provider: any) => {
    setError('');
    setLoading(true);
    try {
      const userCred = await signInWithPopup(auth, provider);
      await handleAuthSuccess(userCred.user);
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError('Đăng nhập mạng xã hội thất bại. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };"""

new_social_auth = """  const handleSocialAuth = async (provider: any) => {
    setError('');
    setLoading(true);
    try {
      const userCred = await signInWithPopup(auth, provider);
      await handleAuthSuccess(userCred.user);
    } catch (err: any) {
      console.error('Social Auth Error:', err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        if (err.code === 'auth/operation-not-allowed') {
          setError('Lỗi: Bạn chưa BẬT tính năng đăng nhập (Google/Facebook) trong Firebase Console -> Authentication -> Sign-in method.');
        } else if (err.code === 'auth/unauthorized-domain') {
          setError(`Lỗi tên miền: Cần thêm ${window.location.hostname} vào Firebase Console -> Authentication -> Settings -> Authorized domains.`);
        } else {
          setError(`Lỗi (${err.code}): ${err.message}`);
        }
      }
    } finally {
      setLoading(false);
    }
  };"""

content = content.replace(old_social_auth, new_social_auth)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
