export class ErrorResponse {
    constructor(res, message, statusCode) {
      this.success = false;
      this.message = message;
      this.statusCode = statusCode;
  
      return res.status(statusCode).json({ success: false, message });
    }
  
    static badRequest(res, message = 'Bad Request') {
      return new ErrorResponse(res, message, 400);
    }
  
    static unauthorized(res, message = 'Unauthorized') {
      return new ErrorResponse(res, message, 401);
    }
  
    static forbidden(res, message = 'Forbidden') {
      return new ErrorResponse(res, message, 403);
    }
  
    static notFound(res, message = 'Not Found') {
      return new ErrorResponse(res, message, 404);
    }
  
    static internalServerError(res, message = 'Internal Server Error') {
      return new ErrorResponse(res, message, 500);
    }
  }
  