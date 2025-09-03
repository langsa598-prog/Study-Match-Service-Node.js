const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.get('/login', auth.login);
router.post('/login', auth.login_process);
router.get('/logout', auth.logout_process);
router.get('/register', auth.register);
router.post('/register', auth.register_process);

module.exports = router;