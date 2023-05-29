const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connect = (uri) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(res => console.log(`Connection Successful...`))
        .catch(err => console.log(`Error in DB connection`, err));
}



module.exports = connect(process.env.mongoURI);    