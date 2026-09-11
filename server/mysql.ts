import mysql from 'mysql2/promise';

// Cấu hình kết nối MySQL CloudPanel / VPS
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || 'tecnicuser';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Admin24122004@';
const DB_NAME = process.env.DB_NAME || 'tecnicdb';

// Thông tin tài khoản dự phòng trên XAMPP Local
const DB_LOCAL_USER = process.env.DB_LOCAL_USER || 'root';
const DB_LOCAL_PASSWORD = process.env.DB_LOCAL_PASSWORD ?? '';

let pool: mysql.Pool | null = null;

export function createPoolWithCredentials(user: string, password: string): mysql.Pool {
  return mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: user,
    password: password,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 4000,
  });
}

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = createPoolWithCredentials(DB_USER, DB_PASSWORD);
  }
  return pool;
}

// Kiểm tra kết nối an toàn: Tự động thử tài khoản VPS trước, nếu là máy tính cá nhân XAMPP thì tự chuyển sang tài khoản root
export async function testDbConnection(): Promise<boolean> {
  try {
    const p = getDbPool();
    const conn = await p.getConnection();
    await conn.ping();
    conn.release();
    console.log('✅ Đã kết nối thành công MySQL database:', DB_NAME, 'tại', `${DB_HOST}:${DB_PORT}`, `(User: ${DB_USER})`);
    return true;
  } catch (error: any) {
    // Nếu bị lỗi Access denied (do đang chạy trên XAMPP máy tính cá nhân chưa tạo user tecnicuser)
    if (error.code === 'ER_ACCESS_DENIED_ERROR' && DB_LOCAL_USER) {
      try {
        console.log(`ℹ️ Thử kết nối tự động bằng tài khoản XAMPP Local (${DB_LOCAL_USER})...`);
        const fallbackPool = createPoolWithCredentials(DB_LOCAL_USER, DB_LOCAL_PASSWORD);
        const conn = await fallbackPool.getConnection();
        await conn.ping();
        conn.release();
        pool = fallbackPool;
        console.log('✅ Đã kết nối thành công MySQL database:', DB_NAME, 'tại', `${DB_HOST}:${DB_PORT}`, `(Tài khoản Local: ${DB_LOCAL_USER})`);
        return true;
      } catch (fallbackError: any) {
        console.warn('⚠️ Kết nối MySQL XAMPP Local không thành công:', fallbackError.message);
      }
    }

    console.warn('⚠️ Chưa thể kết nối tới MySQL trực tiếp (nếu đang chạy trên môi trường Preview/Dev):', error.message);
    return false;
  }
}

// Lưu người dùng mới vào MySQL bảng `users` (Hỗ trợ cả schema id string hoặc id auto-increment)
export async function insertUserToMysql(user: {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  password?: string;
  accountType?: string;
  companyName?: string;
  clinicName?: string;
  address?: string;
  city?: string;
  district?: string;
  role?: string;
  avatar?: string;
  authProvider?: string;
}) {
  const userId = user.id || `USR-${Date.now()}`;
  const userRole = user.role || (user.accountType === 'BAC_SI' ? 'BAC_SI' : user.accountType === 'DAI_LY' ? 'DAI_LY' : user.accountType === 'ADMIN' ? 'ADMIN' : 'CA_NHAN');

  // Hàm thử thực thi câu lệnh SQL với một pool nhất định
  const tryInsertWithPool = async (p: mysql.Pool) => {
    // Schema A: Bảng users có cột id (VARCHAR/INT), role ENUM, clinic_name (chuẩn Enterprise CloudPanel/XAMPP mới)
    try {
      const enterpriseQuery = `
        INSERT INTO users (id, full_name, phone, email, password_hash, auth_provider, role, clinic_name, address, status, avatar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?)
        ON DUPLICATE KEY UPDATE 
          full_name = VALUES(full_name),
          phone = VALUES(phone),
          clinic_name = VALUES(clinic_name),
          address = VALUES(address)
      `;
      const values = [
        userId,
        user.fullName,
        user.phone,
        user.email,
        user.password || '123456',
        user.authProvider || 'LOCAL',
        userRole,
        user.clinicName || user.companyName || null,
        user.address || null,
        user.avatar || null
      ];
      const [result] = await p.execute(enterpriseQuery, values);
      console.log('✅ Đã lưu thành công User mới vào MySQL phpMyAdmin bảng users (Schema A)!');
      return result;
    } catch (errA: any) {
      // Schema B: Nếu id là INT AUTO_INCREMENT và không cho ghi string id vào cột id
      try {
        const autoIdQuery = `
          INSERT INTO users (full_name, phone, email, password_hash, role, clinic_name, address, status, avatar)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?)
          ON DUPLICATE KEY UPDATE 
            full_name = VALUES(full_name),
            clinic_name = VALUES(clinic_name),
            address = VALUES(address)
        `;
        const autoValues = [
          user.fullName,
          user.phone,
          user.email,
          user.password || '123456',
          userRole,
          user.clinicName || user.companyName || null,
          user.address || null,
          user.avatar || null
        ];
        const [result] = await p.execute(autoIdQuery, autoValues);
        console.log('✅ Đã lưu thành công User mới vào MySQL phpMyAdmin bảng users (Schema B - Auto ID)!');
        return result;
      } catch (errB: any) {
        // Schema C: Fallback nếu schema cũ dùng account_type và company_name
        const legacyQuery = `
          INSERT INTO users (full_name, phone, email, password_hash, account_type, company_name, address, city, district)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const legacyValues = [
          user.fullName,
          user.phone,
          user.email,
          user.password || '123456',
          user.accountType || 'CA_NHAN',
          user.companyName || user.clinicName || null,
          user.address || null,
          user.city || null,
          user.district || null,
        ];
        const [result] = await p.execute(legacyQuery, legacyValues);
        console.log('✅ Đã lưu thành công User mới vào MySQL phpMyAdmin bảng users (Schema C - Legacy)!');
        return result;
      }
    }
  };

  try {
    const p = getDbPool();
    return await tryInsertWithPool(p);
  } catch (err: any) {
    // Nếu bị lỗi Access Denied khi dùng tecnicuser, tự động chuyển sang tài khoản root của XAMPP Local
    if (err.code === 'ER_ACCESS_DENIED_ERROR' && DB_LOCAL_USER) {
      try {
        console.log(`ℹ️ [XAMPP Local] Đang chuyển đổi sang tài khoản ${DB_LOCAL_USER} để lưu vào MySQL phpMyAdmin...`);
        const fallbackPool = createPoolWithCredentials(DB_LOCAL_USER, DB_LOCAL_PASSWORD);
        const res = await tryInsertWithPool(fallbackPool);
        pool = fallbackPool; // Cập nhật pool chính thành fallbackPool
        return res;
      } catch (fallbackErr: any) {
        console.error('❌ Lỗi khi ghi User vào MySQL XAMPP Local:', fallbackErr.message);
      }
    }
    console.error('❌ Lỗi khi ghi User vào MySQL:', err.message);
    return null;
  }
}

// Tìm kiếm user từ MySQL
export async function findUserInMysql(identifier: string) {
  const tryFind = async (p: mysql.Pool) => {
    const query = `SELECT * FROM users WHERE phone = ? OR email = ? LIMIT 1`;
    const [rows]: any = await p.execute(query, [identifier, identifier]);
    if (rows && rows.length > 0) {
      return rows[0];
    }
    return null;
  };

  try {
    const p = getDbPool();
    return await tryFind(p);
  } catch (err: any) {
    if (err.code === 'ER_ACCESS_DENIED_ERROR' && DB_LOCAL_USER) {
      try {
        const fallbackPool = createPoolWithCredentials(DB_LOCAL_USER, DB_LOCAL_PASSWORD);
        const res = await tryFind(fallbackPool);
        pool = fallbackPool;
        return res;
      } catch (fallbackErr: any) {
        console.error('❌ Lỗi khi tìm User từ MySQL XAMPP Local:', fallbackErr.message);
      }
    }
    console.error('❌ Lỗi khi truy vấn User từ MySQL:', err.message);
    return null;
  }
}

// Cập nhật thông tin user trong MySQL
export async function updateUserInMysql(id: string, updates: { password?: string; role?: string; email?: string; phone?: string }) {
  const tryUpdate = async (p: mysql.Pool) => {
    const setClauses: string[] = [];
    const values: any[] = [];
    if (updates.password) {
      setClauses.push('password_hash = ?');
      values.push(updates.password);
    }
    if (updates.role) {
      setClauses.push('role = ?');
      values.push(updates.role);
    }
    if (setClauses.length === 0) return;
    values.push(id);
    const query = `UPDATE users SET ${setClauses.join(', ')} WHERE id = ?`;
    return await p.execute(query, values);
  };

  try {
    const p = getDbPool();
    return await tryUpdate(p);
  } catch (err: any) {
    if (err.code === 'ER_ACCESS_DENIED_ERROR' && DB_LOCAL_USER) {
      try {
        const fallbackPool = createPoolWithCredentials(DB_LOCAL_USER, DB_LOCAL_PASSWORD);
        const res = await tryUpdate(fallbackPool);
        pool = fallbackPool;
        return res;
      } catch (fallbackErr: any) {
        console.warn('⚠️ Lỗi update user MySQL Local:', fallbackErr.message);
      }
    }
    console.warn('⚠️ Lỗi update user MySQL:', err.message);
    return null;
  }
}

