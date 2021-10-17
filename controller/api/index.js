const router = require('express').Router();
const userApi = require('./user-routes');
const thoughtsApi = require('./thought-routes');

router.use('/users', userApi);
router.use('/thoughts', thoughtsApi);

module.exports = router;