// controllers/BaseController.js
// תפקיד: מחלקת בסיס גנרית לכל ה-controllers
// מרכזת את הלוגיקה המשותפת: try-catch, מיפוי שגיאות לסטטוס קודים

const {
  NotFoundError,
  ValidationError,
  DuplicateError,
  UnauthorizedError
} = require('../utils/errors');

class BaseController {
  /**
   * מפעיל פונקציית service ומחזיר תגובת JSON בפורמט אחיד
   * @param {Function} fn — פונקציה שמקבלת את req ומחזירה את הנתונים
   * @param {number} successStatus — סטטוס ברירת מחדל להצלחה (200)
   * @returns {Function} middleware של Express
   */
  static handleRequest(fn, successStatus = 200) {
    return (req, res) => {
      try {
        const data = fn(req);
        res.status(successStatus).json({ success: true, data });
      } catch (err) {
        const { statusCode, message } = BaseController._mapError(err);
        res.status(statusCode).json({ success: false, error: message });
      }
    };
  }

  // ── פונקציות עזר מקוצרות ──────────────────────────────────

  static getAll(serviceMethod) {
    return BaseController.handleRequest(() => serviceMethod());
  }

  static getById(serviceMethod) {
    return BaseController.handleRequest((req) =>
      serviceMethod(req.params.id)
    );
  }

  static create(serviceMethod) {
    return BaseController.handleRequest((req) =>
      serviceMethod(req.body)
    , 201);
  }

  static update(serviceMethod) {
    return BaseController.handleRequest((req) =>
      serviceMethod(req.params.id, req.body)
    );
  }

  static remove(serviceMethod) {
    return BaseController.handleRequest((req) => {
      serviceMethod(req.params.id);
      return { message: 'Deleted successfully' };
    });
  }

  // ── מיפוי שגיאות פנימי ────────────────────────────────────

  static _mapError(err) {
    if (err instanceof NotFoundError)    return { statusCode: 404, message: err.message };
    if (err instanceof ValidationError)  return { statusCode: 400, message: err.message };
    if (err instanceof DuplicateError)   return { statusCode: 409, message: err.message };
    if (err instanceof UnauthorizedError) return { statusCode: 401, message: err.message };
    // שגיאה לא צפויה
    return { statusCode: 500, message: err.message || 'Internal server error' };
  }
}

module.exports = BaseController;
