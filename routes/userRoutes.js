const express = require('express');
const { register, login, uploadAssignment } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', uploadAssignment);

module.exports = router;
