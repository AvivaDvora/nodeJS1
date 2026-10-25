// controllers/BaseController.js
// תפקיד: עזר משותף לכל ה-controllers — מיפוי שגיאות ושליחת תגובת שגיאה
// ה-then וה-catch יושבים בכל controller בנפרד, כפי שנדרש במשימה

const {
  AppError,
  NotFoundError,
  ValidationError,
  DuplicateError,
  UnauthorizedError
} = require('../utils/errors');

class BaseController {
  /**
   * שולח תגובת שגיאה ללקוח לפי סוג השגיאה
   * נקרא מתוך ה-catch של כל controller
   * @param {object} res — אובייקט התגובה של Express
   * @param {Error} err — השגיאה שנתפסה
   */
  static sendError(res, err) {
    const { statusCode, message } = BaseController.mapError(err);

    // אם התגובה כבר נשלחה — אי אפשר לשלוח שוב
    if (res.headersSent) return;

    res.status(statusCode).json({ success: false, error: message });
  }

  /**
   * ממיר סוג שגיאה לסטטוס HTTP ולהודעה ללקוח
   * @param {Error} err
   * @returns {{statusCode: number, message: string}}
   */
  static mapError(err) {
    if (err instanceof NotFoundError)     return { statusCode: 404, message: err.message };
    if (err instanceof ValidationError)   return { statusCode: 400, message: err.message };
    if (err instanceof DuplicateError)    return { statusCode: 409, message: err.message };
    if (err instanceof UnauthorizedError) return { statusCode: 401, message: err.message };
    if (err instanceof AppError)          return { statusCode: err.statusCode, message: err.message };

    // שגיאה לא צפויה — למשל קובץ JSON פגום או בעיית הרשאות בדיסק
    console.error('Data layer error:', err);
    return { statusCode: 500, message: 'Internal server error' };
  }
}

module.exports = BaseController;
