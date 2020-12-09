const express      = require("express"),
      router       = express.Router(),
      csv          = require("csvtojson");

router.post("/getdata",async(req,res)=>{
    try{  
        //CHECK FILE TYPE
        let x = "Book1.csv".split('.').pop();
        
        //IF CSV
        if(x === "csv"){
            const csvData = await csv().fromFile("file path insert here");
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
                    if(parsedDataObj.dataType === 0){
                        if(/\d/.test(value) === false){
                            if(value === "")
                                parsedDataObj.dataType = 5;
                            else if((value === "true") || (value === "false"))
                                parsedDataObj.dataType = 3;
                            else
                                parsedDataObj.dataType = 4;
                        }
                        else{
                            if(value.search("-") === -1)
                                parsedDataObj.dataType = 2;
                            else
                                parsedDataObj.dataType = 1;
                        }
                    }
                })
            });

            res.json(parsedCSV);
        }
        //IF XLSX
        else{
           res.json("Excel data")
        }
    }
    catch(err){
        res.status(500).json({msg:"Some server error occured"});
    }
})

module.exports=router;