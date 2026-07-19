// utils/errors.js
// תפקיד: מחלקות שגיאה מותאמות — מאפשרות זיהוי מדויק של סוג השגיאה
// במקום להשוות מחרוזות, משווים instanceof

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400);
  }
}

class DuplicateError extends AppError {
  constructor(message = 'Duplicate entry') {
    super(message, 409);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  DuplicateError,
  UnauthorizedError
};
