const express      = require("express"),
      router       = express.Router(),
      path         = require("path"),
      utils        = require("../utils/functions"),
      multer       = require("multer"),
      XLSX         = require('xlsx');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/aayush_a/Downloads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
   
const upload = multer({ storage: storage });

router.post("/uploadFile", upload.single('file'), (req,res) => {
    try{  
        const file = req.file;
        const workbook = XLSX.readFile(file.path, {cellDates: true});
        const sheet_name_list = workbook.SheetNames;
        const tableData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { raw: false, defval: ""});
        const result = utils.generateJSONOutput(tableData)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Some server error occured"});
    }
})

router.post("/uploadData", (req, res) => {
    try{
        const tableData = XLSX.utils.aoa_to_sheet(req.body.data, { cellDates: true, sheetStubs: true});
        const jsonData = XLSX.utils.sheet_to_json(tableData, { raw: false, defval: ""});
        const result = utils.generateJSONOutput(jsonData)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "Some server error occured"});
    }
})

module.exports=router;