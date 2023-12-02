const express = require('express');
const router = express.Router();

const emailController = require('../controllers/email.controller');

// /api/email/...
router.post('/send-email', emailController.sendEmail);

module.exports = router;
