const createError = require('../helpers/createError');
const createResponse = require('../helpers/createResponse');
const httpStatusCode = require('../data/httpStatusCode');
const { checkPassword } = require('../helpers/bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const payload = {
        email,
        password,
      };

      const { id } = await User.create(payload);
      res
        .status(httpStatusCode.OK)
        .json(createResponse(httpStatusCode.OK, 'Success', { id, email }));
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (findUser) {
        const { id, password: hashedPassword } = findUser;
        if (checkPassword(password, hashedPassword)) {
          const payload = {
            id,
            email,
          };

          const access_token = generateToken(payload);

          res
            .status(httpStatusCode.OK)
            .json(
              createResponse(httpStatusCode.OK, 'Success', { access_token })
            );
        } else {
          throw createError(
            httpStatusCode.UNAUTHORIZED,
            'Invalid email/password'
          );
        }
      } else {
        throw createError(
          httpStatusCode.UNAUTHORIZED,
          'Invalid email/password'
        );
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
