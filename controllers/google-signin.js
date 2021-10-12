const { OAuth2Client } = require('google-auth-library');

const httpStatusCode = require('../data/httpStatusCode');
const createResponse = require('../helpers/createResponse');

class Controller {
  static async googleSignIn(req, res, next) {
    try {
      const { credential } = req.body;

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
        // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      console.log(new Date(payload.exp * 1000).toLocaleString());
      console.log(payload);

      res
        .status(httpStatusCode.OK)
        .json(createResponse(httpStatusCode.OK, 'Success', { payload }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
