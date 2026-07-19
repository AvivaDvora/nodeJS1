// middleware/authMiddleware.js
// תפקיד: אימות בקשות נכנסות — בדיקה שה-header auth-key קיים ותקין
// אם האימות נכשל — מחזיר 401. אם הצליח — מעביר הלאה

const AUTH_KEY = 'my-secret-key-2024';

function authMiddleware(req, res, next) {
  console.log('🔐 [auth-middleware] נכנסתי! בודק auth-key...');

  const authHeader = req.headers['auth-key'];

  if (!authHeader) {
    console.log('❌ [auth-middleware] חסר auth-key — דחייה');
    return res.status(401).json({
      success: false,
      error: 'Unauthorized — auth-key header is missing'
    });
  }

  if (authHeader !== AUTH_KEY) {
    console.log('❌ [auth-middleware] auth-key שגוי — דחייה');
    return res.status(401).json({
      success: false,
      error: 'Unauthorized — auth-key is invalid'
    });
  }

  console.log('✅ [auth-middleware] אושר! מעביר הלאה');
  next();
}

module.exports = authMiddleware;
