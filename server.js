// requiring features
const mongodb = require("./mongodb/config");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const AppError = require("./helpers/appError");
const errorHandler = require("./helpers/errorHandler");
const headers = require("./helpers/headers");
const cors = require("cors");
//const router = require("./routes/users.routes");

const bodyParser = require("body-parser");
const app = express();
const port = process.env.port;

const Userrouter = require("./routes/users.routes");

//body-parser config;  
//register the enpoints  
app.use(cors())
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded()); 
app.use(bodyParser.urlencoded({ extended: false }));


// for testing index page 
app.get("/", (req, res) => {
    res.send(`<h1>Hello!</h1>`)
});
//app.use(router)

app.use("/api/user", Userrouter);

// node js apperror class (error) extanding  
app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.use(headers);
// using errors handler
app.use(errorHandler);




app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});


module.exports = app;