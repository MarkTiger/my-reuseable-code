function createResponse(statusCode, message, data) {
  return {
    statusCode,
    message,
    data,
  };
}

module.exports = createResponse;
