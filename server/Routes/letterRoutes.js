const express = require('express');
const router = express.Router();
const letterController = require('../controller/letter');
const emailController = require('../controller/email')

// generateLetter route
router.post('/generate', letterController.generateLetter);

// get All letters route
router.get('/getAllLetters', letterController.getAllLetters);

// get Letter By Email
router.get('/getLetterByEmail/:email', letterController.getLetterByEmail)

//send email
router.post('/sendEmail', emailController.sendEmail)

module.exports = router;