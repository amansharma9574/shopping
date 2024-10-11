const { login } = require('../controllers/loginController');
const {signup} = require('../controllers/signupController');

const express = require('express');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;