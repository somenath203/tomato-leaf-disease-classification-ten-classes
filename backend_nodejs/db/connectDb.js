const mongoose = require('mongoose');


const dbConnect = async () => {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI);

        if(connect) {
            console.log('connection to mongoDB successful');
        }
        
    } catch (error) {
        
        console.log(error);

    }

}


module.exports = { dbConnect };