const router = require('express').Router();

const Controller = require('../controllers/google-signin');

router.post('/', Controller.googleSignIn);

module.exports = router;
