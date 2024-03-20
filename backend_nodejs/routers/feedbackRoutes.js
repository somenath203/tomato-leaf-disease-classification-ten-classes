const router = require('express').Router();

const { auth } = require('./../middlewares/auth');
const { createFeedbackOfUser } = require('./../controllers/feedbackController');


router.post('/create-feedback', auth, createFeedbackOfUser);


module.exports = router;