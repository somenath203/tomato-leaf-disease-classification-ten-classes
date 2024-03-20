const { StatusCodes } = require('http-status-codes');

const Feedback = require('./../models/feedbackModel');


const createFeedbackOfUser = async (req, res) => {

    try {

        const { fullName, emailAddress, feedback } = req.body;

        await Feedback.create({
            fullname: fullName,
            emailAddress: emailAddress,
            userFeedback: feedback,
            createdBy: req.body.idOfTheAuthUser
        });

        res.status(StatusCodes.CREATED).send({
            success: true,
            message: 'your feedback has been stored successfully',
            data: null
        });
        
    } catch (error) {
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: error?.message,
            data: null,
          });

    }

};


module.exports = {
    createFeedbackOfUser
};