// data/fileStore.js
// תפקיד: עזר גנרי לקריאה/כתיבה של מערך מאובחן מקובץ JSON
// משתמש ב-fs.promises כדי לא לחסום את ה-thread

const fsPromises = require('fs/promises');
const path = require('path');

// הקובץ נמצא בתיקייה של fileStore.js עצמו — לא תלוי מתי השרת הופעל
const DATA_DIR = __dirname;

/**
 * יוצר אובייקט שמנהל קובץ JSON אחד ומחזיק בו מערך
 * @param {string} fileName — שם הקובץ, למשל 'courses.json'
 * @param {number} startId — המזהה הבא שיוקצה לאיבר חדש
 */
function createFileStore(fileName, startId) {
  const filePath = path.join(DATA_DIR, fileName);
  let nextId = startId;

  // קריאה: קובץ חסר = מערך ריק; כל שגיאה אחרת עוברת הלאה
  async function readAll() {
    try {
      const text = await fsPromises.readFile(filePath, 'utf8');
      return JSON.parse(text);
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }

  // כתיבה: קודם JSON, אחר כך לקובץ; שגיאת JSON נדבקת כשגיאה רגילה
  async function writeAll(items) {
    let text;
    try {
      text = JSON.stringify(items, null, 2);
    } catch (err) {
      throw new Error(`Failed to serialize ${fileName}: ${err.message}`);
    }
    await fsPromises.writeFile(filePath, text, 'utf8');
  }

  // מחזיר את מזהה הרצף הבא; מגלגל קדימה אם הקובץ כבר מכיל מזהה גבוה יותר
  function allocateId(items) {
    const maxExisting = items.reduce((max, item) => Math.max(max, item.id), 0);
    nextId = Math.max(nextId, maxExisting + 1);
    return nextId++;
  }

  return { readAll, writeAll, allocateId };
}

module.exports = { createFileStore };
