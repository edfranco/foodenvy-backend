const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// endpoint api/v1/register

router.post('/register', ctrl.auth.register)

module.exports = router;
