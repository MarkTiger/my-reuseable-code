const router = require('express').Router();
const googleSignInRouter = require('./googleSignIn');

router.use('/google', googleSignInRouter);

module.exports = router;
