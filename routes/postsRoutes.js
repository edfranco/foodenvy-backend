const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// endpoint api/v1/posts
router.post('/', ctrl.posts.create);
router.get('/', ctrl.posts.index);
router.get('/:id', ctrl.posts.show);
router.delete('/:id', ctrl.posts.destroy);
router.put('/:id', ctrl.posts.edit);

module.exports = router;