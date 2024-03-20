const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const auth = (req, res, next) => {

    try {
        
        const tokenFromHeader = req.headers.authorization.split(' ')[1];

        const tokenDecoded = jwt.verify(tokenFromHeader, process.env.JWT_SECRET);
    
        req.body.idOfTheAuthUser = tokenDecoded.userId;
    
        next();

    } catch (error) {
        
        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: 'you are not authorized to access this route'
        });

    }

};


module.exports = {
    auth
};