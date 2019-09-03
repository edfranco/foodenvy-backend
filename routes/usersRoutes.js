const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// endpoint api/v1/users
router.get('/', ctrl.users.index);
router.post('/', ctrl.users.createUser);
router.get('/:id', ctrl.users.show);
router.delete('/:id', ctrl.users.destroy);
router.put('/:id', ctrl.users.edit);

module.exports = router;