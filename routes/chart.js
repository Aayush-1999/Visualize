const express      = require("express"),
      router       = express.Router(),
      multer       = require("multer"),
    //   csv          = require('xlsx-parse-json');
      csv          = require("csvtojson");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/aayush_a/Downloads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
   
const upload = multer({ storage: storage });

router.post("/uploadFile", upload.single('file'), async(req,res)=>{
    try{  
        //CHECK FILE TYPE
        const file = req.file;
        let x = file.originalname.split('.').pop();

        // IF CSV
        if(x === "csv"){
            const csvData = await csv().fromFile(file.path);

            let parsedCSV = {
                columns: [],
                chartId: "e",
                dataTypeInfo: {
                    1: "Date",
                    2: "Number",
                    3: "Boolean",
                    4: "String",
                    5: "Blank"
                }
            };

            for(const property in csvData[0]) {
                parsedCSV.columns.push({
                    dataType: 0,
                    header: property,
                    values: []
                });
            }

            csvData.forEach(el => {
                parsedCSV.columns.forEach(parsedDataObj => {
                    let value = el[parsedDataObj.header];
                    parsedDataObj.values.push(value);
                    
                    //SETTING DATATYPE FIELD
                    if(parsedDataObj.dataType === 0) {
                        if(/\d/.test(value) === false) {
                            if(value === "") {
                                parsedDataObj.dataType = 5;
                            }
                            else if((value === "true") || (value === "false")) {
                                parsedDataObj.dataType = 3;
                            }
                            else {
                                parsedDataObj.dataType = 4;
                            }
                        }
                        else {
                            if(value.search("-") === -1) {
                                parsedDataObj.dataType = 2;
                            }
                            else {
                                parsedDataObj.dataType = 1;
                            }
                        }
                    }
                })
            });

            parsedCSV.data = {};
            parsedCSV.data.columns = parsedCSV.columns;
            parsedCSV.data.numRows = parsedCSV.columns.length;
            delete parsedCSV.columns;

            res.status(200).json(parsedCSV);
        }
        //IF XLSX
        else {
           res.json("Excel data")
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Some server error occured"});
    }
})

module.exports=router;