const httpStatusCode = require('../data/httpStatusCode');
const createResponse = require('../helpers/createResponse');

function errorHandler(err, req, res, next) {
  // Send to express default error handler
  if (res.headersSent) {
    return next(err);
  }

  switch (err.name) {
    case 'Not Found':
      res
        .status(httpStatusCode.NOT_FOUND)
        .json(createResponse(httpStatusCode.NOT_FOUND, err.message, {}));
      break;
    case 'Bad Request':
      res
        .status(httpStatusCode.BAD_REQUEST)
        .json(createResponse(httpStatusCode.BAD_REQUEST, err.message, {}));
      break;
    case 'Unauthorized':
      res
        .status(httpStatusCode.UNAUTHORIZED)
        .json(createResponse(httpStatusCode.UNAUTHORIZED, err.message, {}));
      break;
    case 'Forbidden':
      res
        .status(httpStatusCode.FORBIDDEN)
        .json(createResponse(httpStatusCode.FORBIDDEN, err.message, {}));
      break;

    // SequelizeError
    case 'SequelizeUniqueConstraintError':
      res
        .status(httpStatusCode.BAD_REQUEST)
        .json(createResponse(httpStatusCode.BAD_REQUEST, err, {}));
      break;
    case 'SequelizeValidationError':
      let responseMessage = '';
      err.errors.forEach((error, i) => {
        if (i === err.errors.length - 1) {
          responseMessage += `${error.message}.`;
        } else {
          responseMessage += `${error.message}, `;
        }
      });

      res
        .status(httpStatusCode.BAD_REQUEST)
        .json(createResponse(httpStatusCode.BAD_REQUEST, responseMessage, {}));
      break;
    default:
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json(
          createResponse(httpStatusCode.INTERNAL_SERVER_ERROR, err.message, {})
        );
      break;
  }
}

module.exports = errorHandler;
