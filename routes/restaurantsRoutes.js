const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/', ctrl.restaurants.create);
router.get('/', ctrl.restaurants.index);
router.get('/:id', ctrl.restaurants.show);
router.put('/:id', ctrl.restaurants.edit);
router.delete('/:id', ctrl.restaurants.destroy);

module.exports = router