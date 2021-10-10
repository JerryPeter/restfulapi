var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');

router.post('/create', userController.create); // <===================== CREATE
router.get('/', authMiddleware.auth, userController.read); // <========= READ
router.patch('/', authMiddleware.auth, userController.update); // <===== UPDATE
router.delete('/', authMiddleware.auth, userController.destroy); // <=== DELETE
router.post('/signin', userController.signin); // <===================== SIGN IN / LOGIN

module.exports = router;