const httpStatusCode = require('../data/httpStatusCode');
const createResponse = require('../helpers/createResponse');

class Controller {
  static async googleSignIn(req, res, next) {
    try {
      console.log(req.body);
      const { credential } = req.body;
      res
        .status(httpStatusCode.OK)
        .json(createResponse(httpStatusCode.OK, 'Success', { credential }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
