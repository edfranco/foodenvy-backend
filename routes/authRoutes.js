const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// endpoint api/v1/register

router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.post('/logout', ctrl.auth.logout);

module.exports = router;
