const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    emailAddress: {
        type: String
    },
    userFeedback: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Feedback', feedbackSchema);