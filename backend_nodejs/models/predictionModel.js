const mongoose = require('mongoose');


const predictionSchema = new mongoose.Schema({
    predictionResult: {
        type: String
    },
    confidenceOfThePrediction: {
        type: String
    },
    predImageURL: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Prediction', predictionSchema);