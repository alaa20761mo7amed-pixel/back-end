 const { promisePool } = require('../config/db'); 
class User {
    
     
    static async create(userData) {
        const { name, email, password, role } = userData;
        const userRole = role || 'student';  
        
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        const [result] = await promisePool.execute(sql, [name, email, password, userRole]);
        return result;
    }

    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await promisePool.execute(sql, [email]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async findById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await promisePool.execute(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = User;