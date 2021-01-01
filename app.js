const express               = require("express"),
      app                   = express(),
      cors                  = require("cors"),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      middleware            = require("./middlewares/index");

require("dotenv").config();

//ROUTES
const indexRoute  = require("./routes/index");
const chartRoute  = require("./routes/chart");

mongoose.connect(process.env.DATABASEURL,{ useUnifiedTopology: true ,useNewUrlParser:true});
mongoose.set("useFindAndModify",false);
mongoose.set("useCreateIndex",true);

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/us-east-2.elasticbeanstalk.com', express.static('us-east-2.elasticbeanstalk.com'));

middleware(app);

app.use("/",indexRoute);
app.use("/chart",chartRoute);

app.listen(process.env.PORT)
{
    console.log("Server has started");
}