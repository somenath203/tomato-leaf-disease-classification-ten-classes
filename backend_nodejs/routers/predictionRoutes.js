const router = require('express').Router();

const { auth } = require('./../middlewares/auth');
const { createPrediction, allPredictions } = require('./../controllers/predControllers');


router.post('/create-pred-result', auth, createPrediction);

router.post('/get-all-pred-results', auth, allPredictions);


module.exports = router;