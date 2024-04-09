const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');

const signInsignUpUser = async (req, res) => {

  try {


    const { fullname, emailAddress, profilePic } = req.body;

    const user = await User.findOne({ email: emailAddress });

    const token = await jwt.sign(
      { userId: user?._id },
      process.env.JWT_SECRET
    );


    if (user) {
      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'you have signed in successfully',
        data: {
          token: token,
        },
      });
    }


    await User.create({
      fullname: fullname,
      email: emailAddress,
      profilePic: profilePic,
    });
    

    res.status(StatusCodes.CREATED).send({
      success: true,
      message: 'you have signed in successfully',
      data: {
        token: token,
      },
    });


  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error?.message,
      data: null,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body.idOfTheAuthUser);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
        message: 'User does not exist',
        data: null,
      });
    }

    res.status(StatusCodes.OK).send({
      success: true,
      message: '',
      data: user,
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
  signInsignUpUser,
  getUserProfile,
};
