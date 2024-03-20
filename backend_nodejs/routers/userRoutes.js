const router = require('express').Router();

const { signInsignUpUser, getUserProfile } = require('../controllers/userControllers');
const { auth } = require('./../middlewares/auth');


router.post('/sign-in-sign-up', signInsignUpUser);

router.post('/get-user-profile', auth, getUserProfile)


module.exports = router;