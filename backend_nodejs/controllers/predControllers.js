const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

const Prediction = require('./../models/predictionModel');

const createPrediction = async (req, res) => {
  try {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      const predResult = fields.predictedResult;

      const confidence = fields.confidence;

      const imgUploadedByUser = files.fileUploadedByUser;


      const uploadImageToCloudinary = await cloudinary.uploader.upload(
        imgUploadedByUser.filepath,
        {
          use_filename: true,
          folder: 'leaf_img_tomato',
        }
      );

      const urlOfTheImg = uploadImageToCloudinary.secure_url;

      await Prediction.create({
        predictionResult: predResult,
        confidenceOfThePrediction: confidence,
        predImageURL: urlOfTheImg,
        createdBy: req.body.idOfTheAuthUser,
      });

      res.status(StatusCodes.CREATED).send({
        success: true,
        message:
          'your prediction has been successfully made and stored inside the database',
      });

    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error?.message,
      data: null,
    });
  }
};

const allPredictions = async (req, res) => {
  try {
    const allPredictions = await Prediction.find({
      createdBy: req.body.idOfTheAuthUser,
    });

    res.status(StatusCodes.OK).send({
      success: true,
      message: 'your prediction history has been fetched successfully',
      totalNumberOfPredictions: allPredictions.length,
      allPredictions: allPredictions,
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
  createPrediction,
  allPredictions,
};
