const router = require('express').Router();

const googleSignInRouter = require('./googleSignIn');
const usersRouter = require('./users');

router.use('/google', googleSignInRouter);

router.use('/users', usersRouter);

module.exports = router;
