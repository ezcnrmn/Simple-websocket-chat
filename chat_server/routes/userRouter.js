const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/user/signin', userController.loginUser);
router.post('/user/signup', userController.registerUser);
router.post('/user/logout', userController.logout);
router.get('/user/refresh', userController.refresh);

// API FOR TESTS
router.get('/test-api', authMiddleware, userController.testApi);

module.exports = router;
