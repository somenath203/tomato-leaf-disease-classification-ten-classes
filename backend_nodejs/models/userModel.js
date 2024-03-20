const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    profilePic: {
        type: String
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);