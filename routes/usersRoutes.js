const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// endpoint api/v1/users
router.get('/', ctrl.users.index);
router.post('/', ctrl.users.createUser);

module.exports = router;