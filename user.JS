// 1.   ا  (الاتصال بالداتا بيز)
// تأكدي أن المسار يؤدي إلى ملف إعدادات mysql2 الخاص بكِ
const db = require('../config/db'); 

class User {
    
    // 2. دالة إنشاء مستخدم جديد (لعملية الـ Sign Up)
    static async create(userData) {
        const { name, email, password, role } = userData;
        
        // قمنا بوضع نص الـ SQL داخل علامات تنصيص ليعتبره الـ JavaScript نصاً (String)
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        
        // نستخدم await لأن العملية تأخذ وقتاً (Async)
        const [result] = await db.execute(sql, [name, email, password, role]);
        return result;
    }

    // 3. دالة البحث بالإيميل (لعملية الـ Login)
    static async findByEmail(email) {
        const sql = SELECT * FROM users WHERE email = ?;
        
        // db.execute بترجع مصفوفة، أول عنصر فيها هو النتائج (rows)
        const [rows] = await db.execute(sql, [email]);
        
        // بنرجع أول نتيجة تطلع (المستخدم) أو null لو مش موجود
        return rows.length > 0 ? rows[0] : null;
    }

    // 4. دالة البحث بالـ ID (لجلسات العمل أو الـ Middleware)
    static async findById(id) {
        const sql = SELECT * FROM users WHERE id = ?;
        const [rows] = await db.execute(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    }
}

// 5. تصدير الملف لاستخدامه في الـ Controllers
module.exports = User;