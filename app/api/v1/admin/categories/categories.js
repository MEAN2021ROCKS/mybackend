const express = require('express');
const router = express.Router();
const { createCategory} = require('./controller/categories');

router.get('list');
router.post('/add', createCategory);
router.put('update');
router.delete('delete');
router.get('findone')

module.exports = router;