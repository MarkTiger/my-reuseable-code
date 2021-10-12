const httpStatusCode = require('../data/httpStatusCode');

function createError(statusCode, message) {
  const error = new Error();
  error.message = message;

  switch (statusCode) {
    case httpStatusCode.BAD_REQUEST:
      error.name = 'Bad Request';
      return error;
    case httpStatusCode.UNAUTHORIZED:
      error.name = 'Unauthorized';
      return error;
    case httpStatusCode.FORBIDDEN:
      error.name = 'Forbidden';
      return error;
    case httpStatusCode.NOT_FOUND:
      error.name = 'Not Found';
      return error;
    case httpStatusCode.INTERNAL_SERVER_ERROR:
      error.name = 'Internal Server Error';
      return error;
  }
}

module.exports = createError;
