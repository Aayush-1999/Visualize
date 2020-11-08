const express               = require("express"),
      app                   = express(),
      cors                  = require("cors"),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      middleware            = require("./middlewares/index");

require("dotenv").config();

//ROUTES
const indexRoute         = require("./routes/index");

mongoose.connect(process.env.DATABASEURL,{ useUnifiedTopology: true ,useNewUrlParser:true});
mongoose.set("useFindAndModify",false);
mongoose.set("useCreateIndex",true);

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

middleware(app);

app.use("/",indexRoute);

app.listen(5000)
{
    console.log("Server has started");
}