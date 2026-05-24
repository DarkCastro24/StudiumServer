const express = require('express');
const router = express.Router();

const emailController = require('../controllers/email.controller');
const { authentication, authorization } = require('../middleware/auth.middleware');

// /api/email/...
router.post('/send-email',
    authentication,
    emailController.sendEmail);

module.exports = router;
