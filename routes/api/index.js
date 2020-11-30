const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes')
// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes)

module.exports = router;
