const bcrypt = require('bcryptjs');

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function checkPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

return {
  hashPassword,
  checkPassword,
};
