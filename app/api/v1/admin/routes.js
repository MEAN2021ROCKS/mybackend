const express = require('express');
const router = express.Router();
const userRoutes = require('./user/routes/user');
const categoriesRoutes = require('./categories/categories');

router.use('/user', userRoutes);
router.use('/categories', categoriesRoutes)

module.exports = router;